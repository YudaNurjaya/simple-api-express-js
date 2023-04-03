const express = require('express')
const app = express()
const port = 3000
const bodyParser = require("body-parser")
const response = require("./response")


app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/get',(req, res) =>{
  const sql = "select * from persons"
  pool.query(sql,(err,fields) => {
    response (200, fields, "Success", res)
  })
})


app.post('/post',(req,res)=>{
  const {name,age,address,sex} = req.body
  const query = 'INSERT INTO users (name,age,address,sex) VALUES ($1, $2, $3, $4) RETURNING *'
  pool.query(query,[name,age,address,sex],(err,results)=>{
    if(err){
      throw err
    }
    response(200,`Data added with detail: ${results}`,"Created",res)
  })
})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
