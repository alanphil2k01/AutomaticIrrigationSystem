import './App.css';
import {  Login, DeviceData } from './components';
import PrivateRoute from './utils/PrivateRoute';
import { BrowserRouter, Routes, Route} from 'react-router-dom';

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/"
                            element={<PrivateRoute>
                                    <DeviceData device_id="A123-12387876123873288123"/>
                                </PrivateRoute>}
                      />
                    <Route exact path="/login" element={<Login />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
