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
console.log(__dirname);
//------------------------




app.get("/getquestion", async (req, res)=>{

  var question = req.query.question;

  if (question != "") {

    const answer = await generateResponse({
      prompt: question,
      history: conversationHistory
    });

    //res.send("Miko: " + answer);

    res.render('html', {
      title: 'Miko Bot',
      miko_output: answer

    })




  } 
  
  else response.send("Please provide us first name");
  

});



app.get("/", async (req, res) => {


  res.render('html', {
    title: 'Miko Bot',
    miko_output: 'Waiting for question...'

  })
  console.log('Rendering2')

});

//app.use("/assets", express.static('assets'));
app.use(express.static('public'));



// Starting a server
app.listen(80, () => {
  console.log("Server started on port 80");
});
