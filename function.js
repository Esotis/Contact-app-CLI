const fs = require('fs')
const readline = require('readline')
const validator = require('validator')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})

//membuat dan mengecek folder data
const path = './data'
console.log(`Folder data ${fs.existsSync(path) == true ? 'sudah ada' : "belum ada"}`)
if (!fs.existsSync(path)) {
    fs.mkdirSync(path)
}

// membuat dan mengecek file contact.json
const filePath = './data/contact.json'
console.log(`File contact.json ${fs.existsSync(filePath) == true ? 'sudah ada' : "belum ada"}`)
if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, '[]', 'utf-8')
}

const pertanyaan = (question) => {
    return new Promise((resolve, reject) => {
        rl.question(question, (output) => {
            resolve(output)
        })
    })
}

const loadContact = () => {
    const contacts = JSON.parse(fs.readFileSync('data/contact.json', 'utf8'))
    return contacts
}

const saveContact = (name, age, noHP, email) => {
    const data = { name, age, noHP, email }
    const readF = loadContact()
    const duplicate = readF.find((arr) => arr.name.toLowerCase() === name.toLowerCase())
    if (duplicate) {
        console.log('Name is already registered, choose another name!')
        rl.close()
        return false
    }
    if (email) {
        if (!validator.isEmail(email)) {
            console.log('Invalid email address')
            rl.close()
            return false
        }
    }
    readF.push(data)
    fs.writeFile('data/contact.json', JSON.stringify(readF, null, 2), (err) => {
        console.log(err)
    })
    rl.close()
}

const showingContact = () => {
    const readF = loadContact()
    readF.forEach((contact, i) => {
        console.log(`${i + 1}. ${contact.name} - ${contact.noHP}`)
    })
    rl.close()
}

const showingDetailedContact = (name) => {
    const readF = loadContact()
    const filter = readF.find((arr) => arr.name.toLowerCase() === name.toLowerCase())
    if (filter) {
        console.log(`Contact : ${filter.name} - ${filter.age} - ${filter.noHP} - ${filter.email}`)
        rl.close()
        return true
    }
    console.log('Contact is not found, please put the exact name')
    rl.close()
}

const removingContact = (name) => {
    const readF = loadContact()
    const index = readF.findIndex((arr) => arr.name.toLowerCase() === name.toLowerCase())
    if (index !== -1) {
        readF.splice(index, 1)
        fs.writeFile('data/contact.json', JSON.stringify(readF, null, 2), (err) => {
            console.log(err)
        })
        console.log(`Contact ${name} berhasil dihapus!`)
        rl.close()
        return true
    }
    console.log(`Contact ${name} tidak ditemukan!`)
    rl.close()
}
module.exports = { pertanyaan, saveContact, showingContact, showingDetailedContact, removingContact }
