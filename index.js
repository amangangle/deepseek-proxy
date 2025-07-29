const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const app = express();
app.use(cors());
app.use(express.json());
const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY || 'your_deepseek_api_key_here';
app.post('/chat', async (req, res) => {
 try {
   const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
     method: 'POST',
     headers: {
       'Authorization': `Bearer ${DEEPSEEK_API_KEY}`,
       'Content-Type': 'application/json',
     },
     body: JSON.stringify(req.body),
   });
   const data = await response.json();
   res.status(response.status).json(data);
 } catch (err) {
   res.status(500).json({ error: 'Proxy error', details: err.message });
 }
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
 console.log(`DeepSeek proxy server is running on port ${PORT}`);
});
