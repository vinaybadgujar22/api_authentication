const mongoose = require('mongoose')

mongoose.connect("mongodb://localhost:27017",{
    dbName: "simple_auth", 
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('mongodb connected')
})
.catch(err => console.log(err.message))


mongoose.connection.on('connected',() => {
    console.log('Mongoose connected to db')
})

mongoose.connection.on('error',(err) => {
    console.log(err.message)
})

mongoose.connection.on('disconnected', () => {
    console.log("Mongoose connection is disconncted")
})

process.on('SIGINT', async () => {
    await mongoose.connection.close()
    process.exit(0)
})