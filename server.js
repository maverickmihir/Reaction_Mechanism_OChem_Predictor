const http = require('http')
const fs = require('fs')
const express = require('express')
const path = require('path')
const app = express()
const cors = require('cors')
const jsonfile = require('jsonfile');

app.use(cors({
  origin: ['http://localhost:8080'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}))


app.use(express.static("public"))
const inputJsonPath = path.join(__dirname) + '/public/reaction_training_data.json';


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

app.get('/', (req, res) => {
  //go back to main page
  res.sendFile(path.join(__dirname) + '/public/index.html');
});

app.get('/PredictorTool', (req, res) => {
  //go back to main page
  res.sendFile(path.join(__dirname) + '/public/index.html');
});


//app.use(express.static(path.join(__dirname, 'public')));

app.get('/ReactionMechanism', (req, res) => {
    const name = req.query.name;
    res.sendFile(path.join(__dirname) + '/public/ReactionMechanismResults.html');
  });


  ///start of genAI

const { GoogleGenerativeAI } = require('@google/generative-ai');

// Replace 'YOUR_API_KEY' with your actual Google Cloud API key
const genAI = new GoogleGenerativeAI("AIzaSyDmL5Jlm2BcINE_1C-c_8_BcX7UP_H2qsc");
//const genAI = new GoogleGenerativeAI(process.env.API_KEY); // Accesses the API key from the 'API_KEY' environment variable
const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" }); // Choose a suitable model

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

// 
// get raction mechanism training data
const parts = [];

jsonfile.readFile(inputJsonPath)
  .then((jsonData) => {
    // Process the JSON data and create construct parts
    if (Array.isArray(jsonData) || (typeof jsonData === 'object' && jsonData !== null && jsonData.forEach)) {
      jsonData.forEach((row) => {
        jsonData.forEach((row) => {
          parts.push({ text: row.text });
        });
      });
    } else {
      console.error('jsondata is not an array or an object with a forEach method');
    }

  })
  .catch((error) => {
    console.error('Error processing JSON file:', error);
  });

//
app.use(express.json());

app.post('/generate', async (req, res) => {
  const prompt = req.body.prompt;
  //E.g. "CCCCCBr + [OH-]"
  try {
    parts.push({ text: prompt });
    parts.push({ text: " " });

    const result = await model.generateContent({
      contents: [{ role: "user", parts }],
      generationConfig,
    });
    //
  
    const response = await result.response;
    const text = response.text();

    res.json({ response: text });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error generating text' });
  }
});

  ///end of genAI

app.set('view engine', 'ejs')

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log('Server listening on port: ' + PORT);
});


























/*
const server = http.createServer(function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'})
    fs.readFile('index.html', function(error, data) {
        if (error) {
            res.writeHead(404)
            res.write('Error: File Not Found')
        }
        else {
            res.write(data)
        }
        res.end()
    })
})

server.listen(port, function(error) {
    if (error) {
        console.log('Something went wrong', error)
    }
    else {
        console.log('Server is listening on port ' + port)
    }
})
*/