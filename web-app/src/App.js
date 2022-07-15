import './App.css';
import { database } from './firebase/firebase';
import { useEffect, useState } from 'react';
import { onValue, ref } from 'firebase/database';

function App() {

    const [soilData, setSoilData] = useState();
    useEffect(() => {
        const querySoil = ref(database,  "A123-12387876123873288123/soil");
        return onValue(querySoil, (snapshot) => {
            if (snapshot.exists()) {
                setSoilData(snapshot.val());
            }
        });
    });

    return (
        <div className="App">
            <p>Soil moisture = { soilData }%</p>
        </div>
    );
}

export default App;
