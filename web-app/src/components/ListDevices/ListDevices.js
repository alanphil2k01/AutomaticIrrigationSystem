import { FirebaseDataCard, FirebaseToggleButton }  from './FirebaseDataCard/FirebaseDataCard';
import { AuthContext } from '../../context/AuthContext';
import { firestore } from '../../firebase/firebase';
import { useContext, useEffect, useState } from 'react';
import { arrayUnion, doc, getDoc, updateDoc } from 'firebase/firestore';
import { Icon } from '@iconify/react';
import './DeviceData.css'

const sensors = [
    { name: "soil", unit: "%" },
    { name: "temperature", unit: "°C" },
    { name: "humidity", unit: "%" },
    { name: "rain", unit: "%" },
]

function ListDevices() {
    const { handleLogout, currentEmail } = useContext(AuthContext);
    const [devices, setDevices ] = useState([]);
    const [addDevicePopUp, setAddDevicePopUp ] = useState(false)
    const [currentDevice, setCurrentDevice ] = useState()

    async function getDevices() {
        getDoc(doc(firestore, "users", currentEmail))
        .then((user) => {
            if (user.get('devices') !== undefined) setDevices(user.data().devices);
            console.log(devices);
        })
        .catch(error => {
            console.log(error)
        })
    }

    useEffect(() => {
        const fetchData = async() => {
            try {
                const user = await getDoc(doc(firestore, "users", currentEmail))
                if (user.exists()) {
                    var data = ""
                    if (user.get('devices') !== undefined) data = user.data().devices;
                    return data;
                }

            } catch(err) {
                console.log(err);
            }
        };

        fetchData().then((data) => {
            setDevices(data)
            if (devices.length > 0) setCurrentDevice(devices[0]);
        });

    }, []);

    return (
        <div  style={{ backgroundColor:"black", minHeight:"100vh"}}>
            <div className="wrapper">
            <div>
                <h1>DASHBOARD</h1>
                <Dropdown setCurrentDevice={setCurrentDevice} devices={devices} />
                { currentDevice ?
                    <DeviceData device_id={currentDevice}/> :
                    <p style={{ color: "white" }}>No devices selected</p> }
            </div>
                <ul className="flex cards">
                    <li>
                        <h2>ADD DEVICE</h2>
                        <Icon icon="bx:plus" style={{ fontSize: '140px',color:'teal'}} onClick={() => {
                            setAddDevicePopUp(!addDevicePopUp);
                        }}/>
                        { addDevicePopUp
                            ? <AddDevice style={{display: "block"}}
                                getDevices={getDevices}
                                setAddDevicePopUp={setAddDevicePopUp}/>
                            : <div></div> }
                    </li>
                    <li>
                        <h2>WIFI SETUP</h2>
                        <a href="/wifisetup"> <Icon icon="bx:wifi" style={{ fontSize: '140px'}} /></a>
                    </li>
                    <li>
                        <h2>LOGOUT</h2>
                        <Icon icon="websymbol:logout" style={{ fontSize: '140px',color:'red'}} onClick={handleLogout} />
                    </li>
                </ul>
            </div>
        </div>
    )
}

function DeviceData({ device_id }) {
    return (
        <div>
                <h3 style={{ color: "white" }}>Current device: {device_id}</h3>
                <ul className="flex cards">
                    <li className="red">
                        <h2 >SOIL MOISTURE</h2>
                        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css"></link>
                        <div className="blue">
                        <i className="bi-moisture"  style={{ fontSize: '110px'}} ></i> </div>
                        <span  style={ {fontSize : '20px', fontWeight: 'bold'}} >
                        <FirebaseDataCard device_id={device_id} sensor={sensors.name="soil"} unit="%" />
                        </span>
                    </li>

                    <li>
                        <h2 className="green">TEMPERATURE</h2>
                        <div className="red">
                        <i className="fa fa-thermometer-three-quarters" style={{ fontSize: '150px'}} ></i></div>
                        <span className="fa-layers-text fa-inverse" style={ {fontSize : '20px',fontWeight: 'bold'}} >
                        <FirebaseDataCard device_id={device_id} sensor={sensors.name="temperature"} unit={sensors.unit="°C"} />
                        </span>
                    </li>

                    <li>
                        <h2 className="yellow">HUMIDITY</h2>
                        <div className="darkblue">
                        <Icon icon="wi:humidity" style={{ fontSize: '150px',color:'blue'}}/></div>
                        <span  style={ {fontSize : '20px',fontWeight: 'bold'}} >
                        <FirebaseDataCard device_id={device_id} sensor={sensors.name="humidity"} unit={sensors.unit="%"} />
                        </span>
                    </li>

                    <li>
                        <h2> RAIN </h2>
                        <Icon className = "blue" icon="bi:cloud-rain-heavy" style={{ fontSize: '150px',color:'darkblue'}} />
                        <span  style={ {fontSize : '20px',fontWeight: 'bold'}} >
                        <FirebaseDataCard device_id={device_id} sensor={sensors.name="rain"} unit={sensors.unit="bool"} />
                        </span>
                    </li>
                    <li>
                        <h2> WATER PUMP</h2>
                        <div>
                            <span> <span style={{ color: 'rgb(0, 100, 0)' }}>green</span>=pump is on</span>
                            <span> <span style={{ color: 'rgb(255, 69, 0)' }}>orange</span>=pump is off </span>
                        </div>
                        <Icon className = "blue" icon="mdi:water-pump" style={{ fontSize: '150px',color:'blue'}} />
                        <span  style={ {fontSize : '20px',fontWeight: 'bold'}} >
                        <FirebaseToggleButton device_id={device_id} />
                        </span>
                    </li>
                </ul>

        </div>

    )
}
function AddDevice({ getDevices, setAddDevicePopUp }) {
    const { currentUser } = useContext(AuthContext);
    const userRef = doc(firestore, "users", currentUser.email);

    const handleAddDevice = async (e) => {
        e.preventDefault();
        const device_id = document.getElementById("device_id").value

        await updateDoc(userRef, {
            devices: arrayUnion(device_id)
        })
        .then(() => getDevices())
        .catch((error) => console.log(error))

        setAddDevicePopUp(false);
    }

    return (
        <div className="form-popup" id="myForm">
            <form className="form-container" onSubmit={handleAddDevice}>
                <h1>Add Device</h1>

                <label for="device id"><b>Device ID</b></label>
                <input id="device_id" type="text" placeholder="Enter Device ID" name="device id" required />

                <button type="submit" class="btn">Add Device</button>
                <button type="button" class="btn cancel" onClick={() => setAddDevicePopUp(false)}>Close</button>
            </form>
        </div>
    )
}

function Dropdown({ devices, setCurrentDevice }) {
    return (
        <div className="dropdown">
            <button className="dropbtn">Device List</button>
                <div className="dropdown-content">
                    { devices && devices.map(device_id => (
                        <div onClick={ () => {setCurrentDevice(device_id)}}>
                                {device_id}
                            </div>
                    )) }
                </div>
        </div>
    )
}
export default ListDevices;
