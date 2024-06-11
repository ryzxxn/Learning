const axios = require('axios');

async function getPublicUrl() {
  const response = await axios.get('http://127.0.0.1:4040/api/tunnels');
  let publicUrl = response.data.tunnels[0].public_url;
  publicUrl = publicUrl.replace('tcp://', '');

  const webhookUrl = 'https://discord.com/api/webhooks/1151473677364379658/a1fsyU8zTLeS_GlcrQ46F2GVIeeGH3Mbw1GBKIpKkFWaPHFipm3sSQz-Da5QNR9NfqvN';
  const message = {
    content: `Ngrok tunnel URL: ${publicUrl}`
  };

  const result = await axios.post(webhookUrl, message);

  if (result.status === 204) {
    console.log('Message sent to Discord webhook');
  } else {
    console.error('Error sending message to Discord webhook:', result.statusText);
  }
}

getPublicUrl();