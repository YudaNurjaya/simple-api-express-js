const express = require('express')
const app = express()
const port = 3000
const bodyParser = require("body-parser")
const response = require("./response")
const {pool} = require('./connection')


app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/get',(req, res) =>{
  const sql = "select * from persons"

  pool.query(sql,(err,fields) => {
    response(200, fields, "Success", res)
  })
})



app.post('/post',(req,res)=>{
  const {name,age,address,sex} = req.body
  const sql = 'INSERT INTO persons (name,age,address,sex) VALUES ($1, $2, $3, $4) RETURNING *'
  pool.query(sql,[name,age,address,sex],(err,results)=>{
    if(err){
      throw err
    }
    response(200,`Data added with detail: ${results}`,"Created",res)
  })
})


app.put('/put',(req,res)=>{
  const {id,name,age,address,sex} = req.body
  const sql = `update persons set name = '${name}', age = '${age}', address = '${address}', sex = '${sex}' where id = '${id}'`
  pool.query(sql,(err,results)=>{
    console.log(results)
  })
  response(200,"Success","Updated",res)
})


app.delete('/delete',(req,res)=>{
  const {id} = req.body
  const sql = `delete from persons where id = '${id}'`
  pool.query(sql,(err,results)=>{
    console.log(results)
  })
  response(200,"Success","Deleted",res)
})

app.listen(port, () => {
  console.log(`Connect to ${port}`)
})
