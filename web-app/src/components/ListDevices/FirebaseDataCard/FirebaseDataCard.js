import { database } from '../../../firebase/firebase';
import { useEffect, useState } from 'react';
import { onValue, ref, runTransaction } from 'firebase/database';
import ToggleButton from 'react-toggle-button'

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
        <div className="DataCard" >
        { unit === "bool" ?
             firebaseData ? <p>true</p> : <p>false</p>
            : <p>{ firebaseData }{ unit }</p>
        }
        </div>
    )
}

function FirebaseToggleButton({device_id}) {
    const [startWaterPump, setStartWaterPump] = useState();
    const [isPumpRunning, setIsPumpRunning] = useState();

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
                setStartWaterPump(snapshot.val());
            }
        });
    });

    useEffect(() => {
        const queryData = ref(database,  device_id + "/is_pump_running");
        return onValue(queryData, (snapshot) => {
            if (snapshot.exists()) {
                setIsPumpRunning(snapshot.val());
            }
        });
    });

    return (
        <div className="DataCard" style={{ display: 'flex', justifyContent: 'center'}}>
            <ToggleButton
            colors={{
                active: {
                    base:  isPumpRunning ? 'rgb(0, 100, 0)' : 'rgb(255,69,0)',
                },
                inactive: {
                    base:  isPumpRunning ? 'rgb(0, 100, 0)' : 'rgb(255,69,0)',
                }
            }}
            style={{ marginTop: '0px'}}
            value={startWaterPump}
            onToggle={ handleToggleButton } />
        </div>
    )
}

export { FirebaseDataCard, FirebaseToggleButton };
