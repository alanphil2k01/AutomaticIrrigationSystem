import './WifiSetup.css'

function WifiSetup() {
    async function sendWifiCredentials(e) {
        e.preventDefault();

        const ssid = document.getElementById("ssid-field").value
        const pass = document.getElementById("password-field").value

        const res = await fetch(`http://192.168.4.1/setting?ssid=${ssid}&pass=${pass}`);
        console.log(res);
        const data = await res.json();
        alert(data);
    }

    return (
        <div className="login">
            <h2>Instructions:</h2>
            <p>1. Connect to ESP32-WiFi using password as password</p>
            <p>2. Enter credentials for your wifi network</p>
            <p>3. Reconnect back to your original network and <a href="/">click here</a></p>

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
