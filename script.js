
async function controlDevice(device, value) {
    try {
        const response = await fetch("https://kodessphere-api.vercel.app/devices/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                teamid: "738Sw35", 
                device: device,
                value: value
            })
        });

        if (!response.ok) {
            throw new Error("Failed to control device");
        }

        const responseData = await response.json();
        console.log("Response data:", responseData);
        return responseData;
    } catch (error) {
        console.error("Error:", error);
        throw error; 
    }
}


function updateFanSpeedUI(speed) {
    document.getElementById("fan-speed-display").textContent = speed;
    const fanButton = document.getElementById("fan-toggle");
    fanButton.innerText = speed === "0" ? "Turn Fan On" : "Turn Fan Off";
}


document.getElementById("fan-speed-slider").addEventListener("input", function () {
    const fanSpeed = this.value;
    updateFanSpeedUI(fanSpeed);
});


document.getElementById("fan-toggle").addEventListener("click", async function () {
    try {
        const fanSpeed = document.getElementById("fan-speed-slider").value;
        await controlDevice("fan", fanSpeed);
        console.log("Fan toggled with speed:", fanSpeed);
        
        updateFanSpeedUI(fanSpeed);
    } catch (error) {
        console.error("Failed to control fan:", error.message);
    }
});

document.getElementById("led-toggle").addEventListener("click", async function () {
    try {
        const ledColor = document.getElementById("led-color").value;
        await controlDevice("led", ledColor);
        console.log("LED toggled with color:", ledColor);
        
        document.getElementById("led-message").textContent = "LED color changed to: " + ledColor;
    } catch (error) {
        console.error("Failed to control LED:", error.message);
    }
});


document.getElementById("ac-temperature-slider").addEventListener("input", async function () {
    try {
        const acTemperature = this.value;
        
        await controlDevice("ac", { temp: acTemperature, state: 1 }); // Assuming the AC is always turned on
        console.log("AC temperature changed to:", acTemperature);
        
        document.getElementById("ac-temp-display").textContent = acTemperature;
    } catch (error) {
        console.error("Failed to control AC temperature:", error.message);
    }
});

document.getElementById("ac-toggle").addEventListener("click", async function () {
    try {
        const acTemperature = document.getElementById("ac-temperature-slider").value;
        const newState = this.innerText === "Turn AC Off" ? 0 : 1;
        await controlDevice("ac", { temp: acTemperature, state: newState });
        console.log("AC toggled to state:", newState);
        
        this.innerText = newState ? "Turn AC Off" : "Turn AC On";
    } catch (error) {
        console.error("Failed to control AC:", error.message);
    }
});

document.getElementById("bulb-toggle").addEventListener("click", async function () {
    try {
        const bulbState = this.innerText === "Turn Bulb Off" ? 0 : 1;
        await controlDevice("bulb", bulbState);
        console.log("Bulb toggled to state:", bulbState);
        
        this.innerText = bulbState ? "Turn Bulb Off" : "Turn Bulb On";
    } catch (error) {
        console.error("Failed to control bulb:", error.message);
    }
});
