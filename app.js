const express = require('express')
const app = express()
const port = 3000
const bodyParser = require("body-parser")
const db = require("./connection")
const response = require("./response")

app.use(bodyParser.json)
app.get('/',(req, res) =>{
  response (200, "List", "Success", res)
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
