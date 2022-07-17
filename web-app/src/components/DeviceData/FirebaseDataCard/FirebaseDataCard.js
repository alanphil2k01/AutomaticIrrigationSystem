import { database } from '../../../firebase/firebase';
import { useEffect, useState } from 'react';
import { onValue, ref } from 'firebase/database';

function FirebaseDataCard(props) {
    const [firebaseData, setFirebaseData] = useState();
    useEffect(() => {
        const querySoil = ref(database,  props.device_id + "/" + props.sensor);
        return onValue(querySoil, (snapshot) => {
            if (snapshot.exists()) {
                setFirebaseData(snapshot.val());
            }
        });
    });
    return (
        <div className="DataCard">
            <p>{ firebaseData }%</p>
        </div>
    )
}

export default FirebaseDataCard;
