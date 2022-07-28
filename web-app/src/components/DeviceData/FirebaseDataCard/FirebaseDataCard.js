import { database } from '../../../firebase/firebase';
import { useEffect, useState } from 'react';
import { onValue, ref, update } from 'firebase/database';

function FirebaseDataCard({device_id, sensor, unit}) {
    const [firebaseData, setFirebaseData] = useState();

    useEffect(() => {
        const querySoil = ref(database,  device_id + "/" + sensor);
        return onValue(querySoil, (snapshot) => {
            if (snapshot.exists()) {
                setFirebaseData(snapshot.val());
            }
        });
    });

    return (
        <div className="DataCard">
            <p>{ firebaseData }{ unit }</p>
        </div>
    )
}

function FirebaseToggleButton({device_id}) {
    const [firebaseData, setFirebaseData] = useState();

    function startPump() {
        const updates = { };
        updates[`/${device_id}/start_water_pump`] = true;
        return update(ref(database), updates);
    }

    useEffect(() => {
        const querySoil = ref(database,  device_id + "/start_water_pump");
        return onValue(querySoil, (snapshot) => {
            if (snapshot.exists()) {
                setFirebaseData(snapshot.val());
            }
        });
    });

    return (
        <div className="DataCard">
            
            <button onClick={startPump}>ON/OFF{firebaseData}</button>
            <p>{firebaseData ? "true" : "false"}</p>
        </div>
    )
}

export { FirebaseDataCard, FirebaseToggleButton };
