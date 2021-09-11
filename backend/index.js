//mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false
const connectToMongo = require('./db')
const express = require('express')
connectToMongo();
const app = express()
const port = 5000

app.use(express.json())



app.use('/api/auth',require('./routes/auth') )    
app.use('/api/notes',require('./routes/notes') )


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})