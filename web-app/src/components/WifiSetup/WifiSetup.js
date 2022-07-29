import './WifiSetup.css'

function WifiSetup() {
    async function sendWifiCredentials(e) {
        e.preventDefault();

        const ssid = document.getElementById("ssid-field").value
        const pass = document.getElementById("password-field").value

        const res = await fetch(`http://192.168.4.1/setting?ssid=${ssid}&pass=${pass}`);
        if (res.status === 200) alert("Successfully sent wifi credentials")
    }

    return (
        <div className="login">
            <ol style={{ color: 'white' }}>
                <h2>Instructions:</h2>
                <li>Connect to ESP32-WiFi using password as password</li>
                <li>Enter credentials for your wifi network</li>
                <li>Reconnect back to your original network and <a style={{ color: 'orange' }} href="/">click here</a></li>
            </ol>

            <div className="login-triangle"></div>
            <h2 className="login-header">Wifi Setup</h2>
            <form className="login-container" onSubmit={sendWifiCredentials}>
                <p><input id="ssid-field" placeholder="SSID" name='ssid'  /></p>
                <p><input id="password-field" placeholder="password" name='pass'  /></p>
                <input type='submit' />
            </form>
        </div>
    )
}

export default WifiSetup;
