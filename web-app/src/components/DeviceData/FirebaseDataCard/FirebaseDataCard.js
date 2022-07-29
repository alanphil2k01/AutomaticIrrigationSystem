import { database } from '../../../firebase/firebase';
import { useEffect, useState } from 'react';
import { onValue, ref, runTransaction } from 'firebase/database';

function FirebaseDataCard({device_id, sensor, unit}) {
    const [firebaseData, setFirebaseData] = useState();

    useEffect(() => {
        const queryData = ref(database,  device_id + "/" + sensor);
        return onValue(queryData, (snapshot) => {
            if (snapshot.exists()) {
                setFirebaseData(snapshot.val());
            }
        });
    });

    return (
        <div className="DataCard">
        { unit === "bool" ?
             firebaseData ? <p>true</p> : <p>false</p>
            : <p>{ firebaseData }{ unit }</p>
        }
        </div>
    )
}

function FirebaseToggleButton({device_id}) {
    const [firebaseData, setFirebaseData] = useState();

    function handleToggleButton() {
        const pumpRef = ref(database, device_id + "/start_water_pump");

        runTransaction(pumpRef, (start_pump) => {
            start_pump = !start_pump;
            return start_pump;
        });
    }

    useEffect(() => {
        const queryData = ref(database,  device_id + "/start_water_pump");
        return onValue(queryData, (snapshot) => {
            if (snapshot.exists()) {
                setFirebaseData(snapshot.val());
            }
        });
    });

    return (
        <div className="DataCard">
            <p><button style={{ backgroundColor:'transparent',  fontSize: "1em", fontWeight: 'bold', color: 'white'}} onClick={handleToggleButton}>Force start</button>
             <span> {firebaseData ? "true" : "false"}</span></p>
        </div>
    )
}

export { FirebaseDataCard, FirebaseToggleButton };
