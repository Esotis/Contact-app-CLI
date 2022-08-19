const yargs = require('yargs')
let { pertanyaan, saveContact, showingContact, showingDetailedContact, removingContact } = require('./function')


yargs.command({
    command: 'add',
    describe: 'Adding new contact',
    builder: {
        name: {
            describe: 'Full name',
            demandOption: true,
            type: 'string',
        },
        age: {
            describe: 'Your age',
            demandOption: false,
            type: 'string',
        },

        noHP: {
            describe: 'Your phone number',
            demandOption: true,
            type: 'string',
        },

        email: {
            describe: "Your email address",
            demandOption: false,
            type: 'string,'
        }
    },
    handler: (argv) => {
        saveContact(argv.name, argv.age, argv.noHP, argv.email)
    }


})

const mainFunction = async () => {
    const name = await pertanyaan('Input your name : ')
    const age = await pertanyaan('Input your age : ')
    const noHP = await pertanyaan('Input your phone number : ')
    const email = await pertanyaan('Input your email address : ')
    saveContact(name, age, noHP, email)
}

if (process.argv[2] == undefined) {
    mainFunction()
}

yargs.command({
    command: 'get',
    describe: 'Getting All Contacts',
    handler: () => {
        showingContact()
    }
})

yargs.command({
    command: 'getdetail',
    describe: 'Getting All Contacts',
    builder: {
        name: {
            describe: 'Contact name person',
            demandOption: true,
            type: 'string',
        }
    },
    handler: (argv) => {
        showingDetailedContact(argv.name)
    }
})

yargs.command({
    command: 'delete',
    describe: 'Remove a contact',
    builder: {
        name: {
            describe: 'Contact name person',
            demandOption: true,
            type: 'string',
        }
    },
    handler: (argv) => {
        removingContact(argv.name)
    }
})


yargs.parse()