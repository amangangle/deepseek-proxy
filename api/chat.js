export default async function handler(req, res) {
 if (req.method === 'OPTIONS') {
   res.setHeader('Access-Control-Allow-Origin', '*');
   res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
   res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
   res.status(204).end();
   return;
 }
 if (req.method !== 'POST') {
   console.error(`Received an unsupported method: ${req.method}`);
   return res.status(405).json({ message: 'Method not allowed' });
 }
 try {
   const deepSeekRes = await fetch('https://api.deepseek.com/v1/chat/completions', {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json',
       'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`, // Ensure this key is in your Vercel environment
     },
     body: JSON.stringify(req.body),
   });
   const data = await deepSeekRes.json();
   res.setHeader('Access-Control-Allow-Origin', '*');
   res.status(deepSeekRes.status).json(data);
 } catch (error) {
   console.error('Error calling DeepSeek API:', error);
   res.setHeader('Access-Control-Allow-Origin', '*');
   res.status(500).json({ error: 'Internal Server Error', details: error.message });
 }
}
