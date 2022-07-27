import { FirebaseDataCard, FirebaseToggleButton }  from './FirebaseDataCard/FirebaseDataCard';
import { AuthContext } from '../../context/AuthContext';
import { useContext } from 'react';

// const sensors = [ "soil", "temperature", "humidity" ]
const sensors = [
    { name: "soil", unit: "%" },
    { name: "temperature", unit: "°C" },
    { name: "humidity", unit: "%" },
]

function DeviceData({ device_id }) {
    const { handleLogout } = useContext(AuthContext);
    return (
        <div className="device-data">
            { sensors.map(sensor => (
                <FirebaseDataCard key={sensor.name} device_id={device_id} sensor={sensor.name} unit={sensor.unit} />
            ))}
            <button onClick={handleLogout}>Logout</button>
            <FirebaseToggleButton device_id={device_id} />
            <button><a href="/wifisetup">Setup Wifi</a></button>
        </div>
    )
}

export default DeviceData;
