import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import { Configuration, OpenAIApi } from "openai";
dotenv.config();

const configuration = new Configuration({
  apiKey: process.env.API_KEY,
});

const openai = new OpenAIApi(configuration);

const app = express();

app.use(cors());
app.use(express.json());

//route
app.get('/models', async (req, res) => {
  try {
      
    const response = await openai.listEngines();
    res.json({models:response.data.data})
  }
  catch (err) {
    res.status(500).json({ message: err.message })
    
  }
  
  
})

app.post("/chat", async (req, res) => {
  try {
    
    
    let { message, model } = req.body;
    console.log(message)

    model = model?.trim()

    console.log(model)

    
    let response = await openai.createCompletion(
      {model : `${model}`,
      prompt : `${message}`,
      temperature : 0.5,
      max_tokens : 1000,
      top_p : 1,
      frequency_penalty : 0.5,
        presence_penalty: 0,
      }
      
      );
      console.log(response.data.choices[0].text.trim());
      res.json({ message: response.data.choices[0].text.trim() });
  }
  catch (err) {
    res.status(500).json({message:err.message})
  }
});

app.listen(process.env.PORT, () => {
  console.log("Sever is running");
});
