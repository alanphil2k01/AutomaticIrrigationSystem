import FirebaseDataCard  from './FirebaseDataCard/FirebaseDataCard';
import { AuthContext } from '../../context/AuthContext';
import { useContext } from 'react';

function DeviceData(props) {
    const { handleLogout } = useContext(AuthContext);
    return (
        <div className="device-data">
            <FirebaseDataCard device_id={props.device_id} sensor="soil" />
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}

export default DeviceData;
