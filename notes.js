const fs = require('fs');
const chalk = require('chalk');

const removeNote = function (title) {
    const note = loadNotes();

    const newNote = note.filter(function (task) {
        return task.title !== title;
    });
    if(newNote.length === note.length){
        console.log(chalk.red.bold.inverse("Note title not found."));
        return;
    }

    saveNote(newNote);
    console.log(chalk`{white.inverse.bold.strikethrough ${title}} {red.bold DELETED}`);
}


const addNote = function (title, body) {
    const note = loadNotes();

    for (let obj of note) {
        if (title === obj.title) {
            console.log(chalk.yellow.bold.inverse('This title already exists!!'));
            return;
        }
    }

    const curNote = {
        title: title,
        body: body
    }
    note.push(curNote);
    saveNote(note);
    console.log(chalk.green.bold.inverse("Note added!!"))
}

const saveNote = function (note) {
    const noteJSON = JSON.stringify(note);
    fs.writeFileSync('note.json', noteJSON);
}

const loadNotes = function () {
    try {
        const dataBuffer = fs.readFileSync('note.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    }
    catch (e) {
        return [];
    }
}

const listNotes = function(){
    const note = loadNotes(); 
    console.log(chalk.bold.inverse('Your Notes..'));
    note.forEach((task)=>{
        console.log(chalk.bold.cyan(task.title));
    });
}

const readNotes = (title) => {
    const note = loadNotes();
    const read = note.find((task)=> task.title === title);
    if(read){
        console.log(chalk`{bold.inverse ${title}} : {yellow ${read.body}}`);
    }
    else{
        console.log(chalk.red.bold.inverse('Note Title note found'));
    }
}

module.exports = {
    addNote: addNote,
    loadNotes: loadNotes,
    saveNote: saveNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNotes: readNotes,
}
