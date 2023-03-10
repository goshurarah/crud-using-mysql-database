const mysql = require('mysql2')
const bodyparser = require('body-parser')

const express = require('express')
const app = express()
const port = process.env.PORT || 1122;

//mysql db credentials
let mysqlConnection = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'Password@1',
    database: 'crud',
  }
)
//mysql db connection
mysqlConnection.connect((error) => {
  if (error) {
    console.log(error)
  } else {
    console.log('MySQL Connection Successfully')
  }
})

//http request body handler(json data) 
app.use(bodyparser.json())

//get api
app.get('/users', (req, res) => {
  try {
    let sqlQuery = "SELECT * FROM users"
    mysqlConnection.query(sqlQuery, (err, result, fields) => {
      res.send(result)
    });
  } catch (error) {
    res.status(500).send(error.message)
  }
})

//post api
app.post('/users', (req, res) => {
  try {
    let sqlQuery = `INSERT INTO users (id,name,city,age) VALUES ('${req.body.id}','${req.body.name}','${req.body.city}','${req.body.age}')`;
    mysqlConnection.query(sqlQuery, (err, result, fields) => {
      res.send(result)
    });
  } catch (error) {
    res.status(500).send(error.message)
  }
})

//put api
app.put('/users/:id', (req, res) => {
  try {
    let sqlQuery = `UPDATE users SET name='${req.body.name}', city='${req.body.city}', age='${req.body.age}' WHERE id= ${req.params.id}`
    mysqlConnection.query(sqlQuery, (err, result, fields) => {
      res.send(result)
    });
  } catch (error) {
    res.status(500).send(error.message)
  }
})

//delete api
app.delete('/users/:id', (req, res) => {
  try {
    let sqlQuery = "DELETE FROM users WHERE id=?"
    mysqlConnection.query(sqlQuery, [req.params.id], (err, result, fields) => {
      res.send(result)
    });
  } catch (error) {
    res.status(500).send(error.message)
  }
})

app.listen(port, () => {
  console.log(`server is listening on the port ${port}`)
})