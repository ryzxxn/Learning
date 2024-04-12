const axios = require('axios');

async function wakeup() {
    console.log('Calling API...');
        // Ping the first endpoint
        const response1 = await axios.get('https://pixel-io.onrender.com/pixel-wake');
        console.log('Response from https://pixel-io.onrender.com/pixel-wake:', response1.data);

        // Ping the second endpoint
        const response2 = await axios.get('https://upload-io.onrender.com/pis-wake');
        console.log('Response from https://upload-io.onrender.com/pis-wake:', response2.data);
}

// Define the interval in milliseconds (14 minutes = 840000 milliseconds)
const interval = 600000;

// Execute the function initially
wakeup();

// Set up the interval to execute the function every 14 minutes
setInterval(wakeup, interval);
