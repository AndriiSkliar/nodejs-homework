const contacts = require("./db/contacts");
const {program} = require("commander");

program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
          const allContacts = await contacts.listContacts();
          console.table(allContacts);
      break;

    case 'get':
          const oneContact = await contacts.getContact(id);
          console.table(oneContact);
      break;

    case 'add':
          const newContact = await contacts.addContact({ name, email, phone });
          console.table(newContact);
      break;

    case 'remove':
          const deleteContact = await contacts.removeContact(id);
          console.table(deleteContact);
      break;

    case 'update':
          const updateContact = await contacts.updateContact(id, name, email, phone );
          console.table(updateContact);
    break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(argv);