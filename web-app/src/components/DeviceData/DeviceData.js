import { FirebaseDataCard, FirebaseToggleButton }  from './FirebaseDataCard/FirebaseDataCard';
import { AuthContext } from '../../context/AuthContext';
import { useContext } from 'react';
import './DeviceData.css'
import { Icon } from '@iconify/react';

const sensors = [
    { name: "soil", unit: "%" },
    { name: "temperature", unit: "°C" },
    { name: "humidity", unit: "%" },
    { name: "rain", unit: "%" },
]



function DeviceData({ device_id }) {
    const { handleLogout } = useContext(AuthContext);
    return (
        <div  style={{ backgroundColor:"black", minHeight:"100vh"}}>
            <div className="wrapper">
                <h1>DASHBOARD</h1>
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
                </ul>

                <ul className="flex cards">
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

export default DeviceData;
