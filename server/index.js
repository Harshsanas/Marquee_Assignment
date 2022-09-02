const express = require("express");
const app = express();
const cors = require("cors");

//middleware 
app.use(express.json());
app.use(cors());


app.listen(8080,()=>{
    console.log("listening on port 8080");
});