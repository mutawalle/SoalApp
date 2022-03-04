// Express
const express = require('express')
const app = express()
const port = 4000
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'Content-type, Authorization')
    next()
})

// body parser
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Mongoose
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: String,
    password: String,
    sudahDikerjakan: [Boolean]
})

const User = mongoose.model('userSchema', userSchema)

main().catch(err => console.log(err));
async function main() {
    await mongoose.connect('mongodb+srv://admin:admin123@cluster0.wjwre.mongodb.net/Cluster0?retryWrites=true&w=majority');
}

// start
app.post('/api/login', async (req, res) => {
    const akun = await User.findOne({username: req.body.username, password: req.body.password});
    if(akun) {
        res.send(akun);
    } else {
        res.status(400).send('gagal');
    }
})
        

app.post('/api/update', async (req, res) => {
    const akun = await User.updateOne({username: req.body.username},{ $set: {sudahDikerjakan: req.body.sudahDikerjakan}})
    if(akun) {
        res.sendStatus(200);
    } else {
        res.status(400).send('gagal');
    }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})