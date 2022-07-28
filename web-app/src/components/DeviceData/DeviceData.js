import { FirebaseDataCard, FirebaseToggleButton }  from './FirebaseDataCard/FirebaseDataCard';
import { AuthContext } from '../../context/AuthContext';
import { useContext } from 'react';
import './DeviceData.css'
import { Icon } from '@iconify/react';

const sensors = [
    { name: "soil", unit: "%" },
    { name: "temperature", unit: "°C" },
    { name: "humidity", unit: "%" },
]



function DeviceData({ device_id }) {
    const { handleLogout } = useContext(AuthContext);
    return (
        <body  style={{ backgroundColor:"black"}}>
    
  <div class="wrapper">
    <h1>DASHBOARD</h1>
    <ul class="flex cards">
      <li class="red">
        <h2 >SOIL MOISTURE</h2>

        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css"></link>
        <div class="blue">
        <i class="bi-moisture"  style={{ fontSize: '110px'}} ></i> </div>

        
        
          <span  style={ {fontSize : '20px', fontWeight: 'bold'}} > 
                <FirebaseDataCard device_id={device_id} sensor={sensors.name="soil"} unit={sensors.unit} />
            </span>
  
      </li>
      <li>
        <h2 class="green">TEMPERATURE</h2>
        <div class="red">
        <i class="fa fa-thermometer-three-quarters" style={{ fontSize: '150px'}} ></i></div>
          <span class="fa-layers-text fa-inverse" style={ {fontSize : '20px',fontWeight: 'bold'}} >
                <FirebaseDataCard device_id={device_id} sensor={sensors.name="temperature"} unit={sensors.unit="°C"} />
            </span>
      </li>
      <li>
        <h2 class="yellow">HUMIDITY</h2>
        
        <div class="darkblue">
        <Icon icon="wi:humidity" style={{ fontSize: '150px',color:'blue'}}/></div>
        <span  style={ {fontSize : '20px',fontWeight: 'bold'}} >
          
                <FirebaseDataCard device_id={device_id} sensor={sensors.name="humidity"} unit={sensors.unit="%"} />
         </span>   
      </li>
      <li>
        <h2> WATER PUMP</h2>
        <Icon class = "blue" icon="mdi:water-pump" style={{ fontSize: '150px',color:'blue'}} />
        <span  style={ {fontSize : '20px',fontWeight: 'bold'}} >
          
        <FirebaseToggleButton device_id={device_id} />
         </span> 
        </li>

        <li>
        <h2>WIFI</h2>
        <a href="/wifisetup"> <Icon icon="bx:wifi" style={{ fontSize: '140px'}} /></a>      
        
                
         
       </li>

      <li>
        <h2>LOGOUT</h2>
        <Icon icon="websymbol:logout" style={{ fontSize: '140px',color:'red'}} onClick={handleLogout} />       
                
         
       </li>

    </ul>

    
  </div>
</body>

      
    )
}

export default DeviceData;
