const express = require('express')
const app = express()
const port = 3000
const bodyParser = require("body-parser")
const response = require("./response")
const { Pool } = require('pg')

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'expressjs',
  password: '1234',
  port: 5432,
})

app.use(bodyParser.json())


app.get('/get',(req, res) =>{
  const sql = "select * from persons"
  pool.query(sql,(err,fields) => {
    response (200, fields, "Success", res)
  })
})


app.post('/post',(req,res)=>{
  response(200,"Post","Success",res)
})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
