// API Base URL
const apiUrl = "https://kodessphere-api.vercel.app/devices/";

// Function to make API requests to control devices
async function controlDevice(device, value) {
    try {
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                teamid: "YOUR_TEAM_ID", // Replace with your team ID
                device: device,
                value: value
            })
        });

        if (!response.ok) {
            throw new Error("Failed to control device");
        }

        return await response.json();
    } catch (error) {
        console.error("Error:", error);
        throw error; // Rethrow the error for handling in the UI
    }
}

// Event listeners for device buttons and sliders
document.getElementById("fan-toggle").addEventListener("click", async function () {
    try {
        const fanSpeed = document.getElementById("fan-speed").value;
        await controlDevice("fan", fanSpeed);
        console.log("Fan toggled with speed:", fanSpeed);
        
        // Update button text
        const fanButton = document.getElementById("fan-toggle");
        fanButton.innerText = fanSpeed === "0" ? "Off" : "On";
    } catch (error) {
        console.error("Failed to control fan:", error.message);
    }
});

document.getElementById("bulb-toggle").addEventListener("click", async function () {
    try {
        await controlDevice("bulb", 1); // Toggle bulb (example value)
        console.log("Bulb toggled");
        
        // Update button text
        const bulbButton = document.getElementById("bulb-toggle");
        bulbButton.innerText = bulbButton.innerText === "Off" ? "On" : "Off";
    } catch (error) {
        console.error("Failed to control bulb:", error.message);
    }
});

document.getElementById("led-toggle").addEventListener("click", async function () {
    try {
        await controlDevice("led", 1); // Toggle LED (example value)
        console.log("LED toggled");
        
        // Update button text
        const ledButton = document.getElementById("led-toggle");
        ledButton.innerText = ledButton.innerText === "Off" ? "On" : "Off";
    } catch (error) {
        console.error("Failed to control LED:", error.message);
    }
});

document.getElementById("ac-toggle").addEventListener("click", async function () {
    try {
        const acTemperature = document.getElementById("ac-temperature").value;
        await controlDevice("ac", acTemperature);
        console.log("AC toggled with temperature:", acTemperature);
        
        // Update button text
        const acButton = document.getElementById("ac-toggle");
        acButton.innerText = acButton.innerText === "Off" ? "On" : "Off";
    } catch (error) {
        console.error("Failed to control AC:", error.message);
    }
});

