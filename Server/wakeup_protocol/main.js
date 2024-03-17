import axios from "axios";

async function wakeup() {
    console.log('Executing function...');
    try {
        // Ping the first endpoint
        const response1 = await axios.get('https://pixel-websocket.onrender.com/pixel-wake');
        console.log('Response from https://pixel-websocket.onrender.com/pixel-wake:', response1.data);

        // Ping the second endpoint
        const response2 = await axios.get('https://upload-io.onrender.com/pis-wake');
        console.log('Response from https://upload-io.onrender.com/pis-wake:', response2.data);
    } catch (error) {
        console.error('Error:', error.message);
    }
}

// Define the interval in milliseconds (14 minutes = 840000 milliseconds)
const interval = 14 * 60 * 1000;

// Execute the function initially
wakeup();

// Set up the interval to execute the function every 14 minutes
setInterval(wakeup, interval);