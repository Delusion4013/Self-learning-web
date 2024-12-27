var express = require("express");
var app = express();
var cors = require('cors');
const fs = require('fs');

const path = "../";
const filename = "dataOut";


app.use(cors());
app.use(express.json()); 
app.post("/send", (req, res) => {
    console.log("Request received:");
    console.log(req.body);
    res.json(req.body);
    fs.writeFileSync(`${path}${filename}.json`, JSON.stringify(req.body)); 
});

app.listen(3005, () => {
    console.log("Server running on port 3005");
});