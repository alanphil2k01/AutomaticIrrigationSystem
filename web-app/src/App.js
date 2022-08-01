import './App.css';
import {  Login, ListDevices, SignUp, WifiSetup } from './components';
import PrivateRoute from './utils/PrivateRoute';
import { BrowserRouter, Routes, Route} from 'react-router-dom';

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/"
                            element={<PrivateRoute>
                                    <ListDevices />
                                </PrivateRoute>}
                      />
                    <Route exact path="/login" element={<Login />} />
                    <Route exact path="/signup" element={<SignUp />} />
                    <Route exact path="/wifisetup" element={<WifiSetup />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
