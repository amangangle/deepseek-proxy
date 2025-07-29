const axios = require("axios");
export default async function handler(req, res) {
 if (req.method !== "POST") {
   return res.status(405).json({ error: "Method not allowed" });
 }
 try {
   const deepseekResponse = await axios.post(
     "https://api.deepseek.com/v1/chat/completions",
     req.body,
     {
       headers: {
         "Content-Type": "application/json",
         Authorization: `Bearer ${process.env.DEEPSEEK_API_KEY}`,
       },
     }
   );
   res.status(200).json(deepseekResponse.data);
 } catch (error) {
   console.error("DeepSeek error:", error.response?.data || error.message);
   res.status(500).json({ error: "Failed to contact DeepSeek" });
 }
}
