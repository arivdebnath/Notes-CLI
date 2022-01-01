const yargs = require('yargs');
const chalk = require('chalk');
const notes = require('./notes.js');
const { string } = require('yargs');
const { listNotes } = require('./notes.js');

//updating version
yargs.version('1.1.0');

//Creating add command
yargs.command({
    command: 'add',
    description: 'Adds a Note.',
    builder: {
        title: {
            describe: "Title of the Note",
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: "Body of the Note",
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => {
        notes.addNote(argv.title, argv.body);
    }
})


//Creating remove command
yargs.command({
    command: 'remove',
    description: 'Removes a Note.',
    builder: {
        title: {
            describe: "Title of the note to be removed",
            demandOption: true,
            type: "string",
        }
    },
    handler: (argv) => {
        notes.removeNote(argv.title);
    }
})


//Creating list command
yargs.command({
    command: 'list',
    description: 'Lists the Note.',
    handler: () => {
        notes.listNotes();
    }
})


//Creating read command
yargs.command({
    command: 'read',
    description: 'Reads the Note.',
    builder: {
        title: {
            describe: 'Title of the note to be read',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => {
        notes.readNotes(argv.title);
    }
})

yargs.parse();
// console.log(yargs.argv);