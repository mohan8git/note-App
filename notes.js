const fs = require('fs')
const chalk = require('chalk')
const getNotes = () => {

}
const listNotes = () => {
    console.log(chalk.inverse("Your List"))
    const data = loadNotes()
    data.forEach(note => {
        console.log(note.title);
    });
}
const readNotes = (title) => {
    const notes = loadNotes()
    const match = notes.find((note) => note.title === title)
    if (match) {
        console.log(chalk.inverse(match.title))
        console.log(match.body);
    }
    else
        console.log(chalk.red("Note not found"));

}
const addNotes = (title, body) => {
    const notes = loadNotes()
    // const duplicateNotes = notes.filter((note) => note.title === title)
    const duplicateNote = notes.find((note) => note.title === title)
    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.inverse.green("Notes Saved"))
    }
    else
        console.log(chalk.inverse.red("Note title taken!"))
}
const saveNotes = (notes) => {
    const data = JSON.stringify(notes)
    fs.writeFileSync('notes-data.json', data)
}
const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes-data.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    }
    catch (e) {
        return []
    }
}
const removeNotes = (title) => {
    const notes = loadNotes()
    const removedNotes = notes.filter((note) => note.title !== title)
    if (removedNotes.length === notes.length)
        console.log(chalk.inverse.red("No Note Found"))
    else {
        saveNotes(removedNotes);
        console.log(chalk.inverse.green("removed data: " + title))
    }
}

module.exports = {
    getNotes: getNotes,
    addNotes: addNotes,
    removeNotes: removeNotes,
    listNotes: listNotes,
    readNotes: readNotes
}