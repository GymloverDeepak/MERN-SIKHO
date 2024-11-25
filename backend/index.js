const connectToMongo = require('./db');
const express = require('express')
connectToMongo();



const app = express()
const port = 5000
app.use(express.json())

// available routes 


// app.get('/', (req, res) => {
//   res.send('Hello Deepak ready to MERN!')
// })
// app.get('/welcome', (req, res) => {
//     res.send('Welcome to MERN ')
//   })
//   app.get('/login', (req, res) => {
//     res.send('Login Successfully in  MERN!') 
//   })

app.use('/api/auth',require('./routes/Auth'))
app.use('/api/notes',require('./routes/Notes'))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})