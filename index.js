const { listContacts, getContactById, addContact, removeContact } = require("./contacts");
const argv = require("yargs").argv;
const { Command } = require('commander');

const program = new Command();

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

async function invokeAction({ action, contactId, name, email, phone }) {
    try {
      switch (action) {
        case "list":
          const allContacts = await listContacts();
          console.log("Contacts list:", allContacts);
          break;
  
        case "get":
          const singleContact = await getContactById(contactId);
          console.log("Contact:", singleContact);
          break;
  
        case "add":
          const newContact = await addContact(name, email, phone);
          console.log("Added contact:", newContact);
          break;
  
        case "remove":
          const removed = await removeContact(contactId);
          console.log(removed ? "Contact removed successfully" : "Contact not found");
          break;
  
        default:
          console.warn("\x1B[31m Unknown action type!");
      }
    } catch (e) {
      console.log("Error:", e.message);
    }
  }
  
  invokeAction(argv);