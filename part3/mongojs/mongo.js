const mongoose = require('mongoose')

if (process.argv.length<3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://brokenwatch:${password}@cluster0-en0lx.mongodb.net/note-app?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const noteSchema = new mongoose.Schema({
    content: String,
    date: Date,
    important: Boolean,
})

const Note = mongoose.model(`Notezzz`, noteSchema )

const note = new Note({
    content: `HTML is easy`,
    date: new Date(),
    important: true,
})

//note.save().then(result => {
//    console.log('note saved!', result)
//    mongoose.connection.close()
//})

//Note.find({}).then(result => {
//    console.log(result)
//    mongoose.connection.close()
//})
