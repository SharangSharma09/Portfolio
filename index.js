//Prompt-------
import generateResponse from "./lib/generateResponse.js";
import promptSync from 'prompt-sync';
const prompt = promptSync();
const conversationHistory = [];

//Express----------------------------
import express from 'express';
import path from 'path'; // new import 
const app = express();
//View Engine setup
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
//HTML EJS template
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//console.log(__dirname);
//------------------------


app.get("/", function (req, res) {

  res.render('html', {
    title: 'Miko Bot',
    miko_output: 'Waiting for your question...'

  })
 // console.log('Rendering1')

});

app.get("/ask", async (req, res)=>{

  var question = req.query.question;

  if (question != "") {
    const answer = await generateResponse({
      prompt: question,
      history: conversationHistory
  });

    res.send({answer});

  } 
  
  

});





//app.use("/assets", express.static('assets'));
app.use(express.static('public'));



// Starting a server
app.listen(3000, () => {
  console.log("Server started on port 3000");
});
