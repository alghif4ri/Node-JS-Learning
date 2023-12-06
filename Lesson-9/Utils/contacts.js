const fs = require("fs");

const dirPath = "./data";
// Mengecek apakah folder sudah ada atau belum
if (!fs.existsSync(dirPath)) {
  //jika folder belum ada, buat folder tersebut
  fs.mkdirSync(dirPath);
}

const fileName = "data/contacts.json";
// Mengecek apakah file sudah ada atau belum
if (!fs.existsSync(fileName)) {
  // Jika file belum ada, buat file tersebut
  fs.writeFileSync(fileName, "[]", "utf-8");
}

const loadContact = () => {
  const file = fs.readFileSync(fileName, "utf-8");
  const contacts = JSON.parse(file);
  return contacts;
};

const findContact = (nama) => {
  const contacts = loadContact();
  const contact = contacts.find((contact) => contact.nama === nama)
  return contact;
}

module.exports = { loadContact, findContact };

