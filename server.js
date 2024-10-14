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

/**/
  

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
    //const param1 = req.query.param1; // Get parameters from query string
    //const param2 = req.query.param2;
    const name = req.query.name;
    res.sendFile(path.join(__dirname) + '/public/ReactionMechanismResults.html');
    //res.render(path.join(__dirname, 'public', 'index.html'), { name });
    // Use parameters in your target page logic
    //res.send(`<h1>Target Page</h1><p>Param1: ${param1}</p><p>Param2: ${param2}</p>`);
  });

 // res.redirect('/target?inparam='+req.query.name);

  ///start of genAI

const { GoogleGenerativeAI } = require('@google/generative-ai');

// Replace 'YOUR_API_KEY' with your actual Google Cloud API key
const genAI = new GoogleGenerativeAI("AIzaSyDmL5Jlm2BcINE_1C-c_8_BcX7UP_H2qsc");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" }); // Choose a suitable model

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

// 
// get training data
const parts = [];

jsonfile.readFile(inputJsonPath)
  .then((jsonData) => {
    // Process the JSON data and create construct parts
    if (Array.isArray(jsonData) || (typeof jsonData === 'object' && jsonData !== null && jsonData.forEach)) {
      jsonData.forEach((row) => {
        jsonData.forEach((row) => {
          parts.push({ text: row.text });
        });
    
        // Write the construct parts to the output file
        //console.log('Construct parts created successfully!'+ JSON.stringify(parts[0], null, 2));
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
    //console.log(prompt)
    /*const parts = [
      {text: "Context: - molArr[] is an array that keeps track of all of the molecules present on the screen. They are in order of when they are added.- displayReaction(reaction, lineNumber) visually displays a chemical reaction.- addElectronPusher(molArr[i], molArr[i], input1, input2) adds an electron pusher to the screen         - inputs1 and 2 are strings. They represent the atom# or the bond#. Input1 correlates to the first molArr[i] input. Input2 correlates to the second molArr[i], each representing either different or the same molecule. For example, in CCCCCC, the first “C” would be atom1. The final bond written from the smiles would be bond1. The bond[#] depends on the order of the elements in the smiles depicted in each molecule of displayReaction(). Hydrogens are not included in counting. For example, in OH-, O would be “atom1.”- addSideParticipant(molArr[i], smiles) adds the molecule depicted by the smiles right next to molArr[i]. This is used for mechanisms in which the species do not directly participate in the reaction, and is not often used.- If you need to DISPLAY an explicit hydrogen, then put the hydrogen in parentheses, like “(H)”. This is good for acids and for other reactions. For example, you would need to write “Br(H)” to display the Br-H bond.- display the atom where the electrons are going first. In this code, the atoms appear visually inverse to what they appear in the input string. For this reason, if an arrow is pointing from the right.\n\nONLY OUTPUT THE CODE"},
      {text: "CBr + [OH-]"},
      {text: "displayReaction(\"CBr + [OH-] -> CO + [Br-]\", 1); \naddElectronPusher(molArr[1], molArr[0], \"atom1\", \"atom1\");\naddElectronPusher(molArr[0], molArr[0], \"bond1\", \"atom2\");"},
      {text: "CCBr + [OH-]"},
      {text: "displayReaction(\"CCBr + [OH-] -> CCO + [Br-]\", 1);\naddElectronPusher(molArr[1], molArr[0], \"atom1\", \"atom2\");\naddElectronPusher(molArr[0], molArr[0], \"bond2\", \"atom3\");"},
      {text: "CCCBr + [OH-]"},
      {text: "displayReaction(\"CCCBr + [OH-] -> CCCO + [Br-]\", 1);\naddElectronPusher(molArr[1], molArr[0], \"atom1\", \"atom3\");\naddElectronPusher(molArr[0], molArr[0], \"bond3\", \"atom4\");"},
      {text: prompt},
      {text: " "},
    ];*/
    parts.push({ text: prompt });
    parts.push({ text: " " });
    //

    //console.log('Construct parts created successfully!');//+ JSON.stringify(parts, null, 2));

    const result = await model.generateContent({
      contents: [{ role: "user", parts }],
      generationConfig,
    });
    //
    //const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    //console.log(text);
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
//app.listen(3000)

























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