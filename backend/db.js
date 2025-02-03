const mongoose = require('mongoose')
const mongoURI = "mongodb+srv://abhishekupadhyay0007:ctVNn65DY8nVqRJO@cluster0.6i79h.mongodb.net/iNotebook?retryWrites=true&w=majority&appName=Cluster0"

mongoose.connect(mongoURI).then(()=>
    console.log("Connected")).catch((e)=>console.log(e.message))

