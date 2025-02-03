const connectToMongo = require('./db');
var cors = require('cors')
const express = require('express')
const path = require('path');

const app = express();
const port = 5001 ;  

app.use(cors());
app.use(express.json()); //middle ware

app.use('/api/auth' , require('./routes/auth'))
app.use('/api/notes' , require('./routes/notes'));
   
//Production script

app.use(express.static("./build"));
app.get("*" , (req , res)=>{
    res.sendFile(path.resolve(__dirname , "" ,"build" , "index.html"))
})
  
app.listen(port, () => {
  console.log(`iNotebook app listening on port ${port}`)
});
 
  