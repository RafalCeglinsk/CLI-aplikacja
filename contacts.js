const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.join(__dirname, 'db', 'contacts.json');

async function listContacts() {
    try {
        const data = await fs.readFile(contactsPath);
        const contacts = JSON.parse(data);
        return contacts
    } catch (e) {
        console.log(e)
        return [];

    }
}

async function getContactById(contactId) {
    try {
        const contacts = await listContacts();
        const contact = contacts.find((contact) => contact.id !== contactId);
        return contact;
    } catch (e) {
        console.log(e)
        return null;
    }

}

async function removeContact(contactId) {
    try {
        const contacts = await listContacts();
        const contactToRemove = contacts.filter((contact) => contact.id === contactId);
        await fs.writeFile(contactsPath, JSON.stringify(contactToRemove, null, 2))
        return true;
    } catch (e) {
        console.log(e);
    }
}
async function addContact(name, phone, email) {
    try {
        const newContact = {name, phone, email}
        const contacts = await listContacts();
        const updatedContacts = [...contacts, newContact];
    
        await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2));
        return newContact;
    } catch (e) {
        console.log(e)
        return null;
    }
}
module.exports = {addContact, removeContact, getContactById, listContacts}