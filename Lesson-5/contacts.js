const fs = require("fs");
const { resolve } = require("path");
const chalk = require("chalk");
const validator = require("validator");
// const readline = require("readline");

// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

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
  fs.writeFileSync(fileName, "[]", "utf8");
}

// synchronous
// rl.question(`Masukan Nama Anda : `, (nama) => {
//   rl.question(`Masukan Nomor HP Anda : `, (NoHP) => {
//     if (!isNaN(NoHP)) {
//       const contact = { nama, NoHP };
//       const file = fs.readFileSync(fileName, "utf8");
//       const contacts = JSON.parse(file);
//       // console.log(contacts)
//       contacts.push(contact);

//       fs.writeFile(fileName, JSON.stringify(contacts), (err) => {
//         console.log(err);
//       });
//       console.log(`Terimakasih, ${nama} !`);
//     } else {
//       console.log(`Hanya Inputkan angka untuk Nomor HP, Ulangi kembali!`);
//     }
//     rl.close();
//   });
// });

// Asynchronous
// const quest1 = () => {
//   return new Promise((resolve, reject) => {
//     rl.question(`Masukan Nama Anda : `, (nama) => {
//       resolve(nama);
//     });
//   });
// };

// const quest2 = () => {
//   return new Promise((resolve, reject) => {
//     rl.question(`Masukan Email Anda : `, (email) => {
//       resolve(email);
//     });
//   });
// };

// const quest3 = () => {
//   return new Promise((resolve, reject) => {
//     rl.question(`Masukan NoHP Anda : `, (NoHP) => {
//       resolve(NoHP);
//     });
//   });
// };

// const main = async () => {
//     const nama = await quest1();
//     const email = await quest2();
//     const NoHP = await quest3();

// Refactor dijadikan satu penampung pertanyaan
// const questions = (question) => {
//     return new Promise((resolve, reject) => {
//       rl.question(question, (answer) => {
//         resolve(answer);
//       });
//     });
//   };
const loadContact = () => {
  const file = fs.readFileSync(fileName, "utf8");
  const contacts = JSON.parse(file);
  return contacts;
};
const saveContact = (nama, email, noHP) => {
  const contact = { nama, email, noHP };
  //   const file = fs.readFileSync(fileName, "utf8");
  //   const contacts = JSON.parse(file);
  const contacts = loadContact();
  // cek duplikat
  const duplikat = contacts.find((contact) => contact.nama === nama);
  if (duplikat) {
    console.log(
      chalk.red.inverse.bold("Nama sudah terdaftar, gunakan nama lain!")
    );
    return false;
  }

  //cek email
  if (email) {
    if (!validator.isEmail(email)) {
      console.log(chalk.red.inverse.bold("email tidak valid!"));
      return false;
    }
    const duplikatEmail = contacts.find((contact) => contact.email === email);
    if (duplikatEmail) {
      console.log(
        chalk.red.inverse.bold("Email sudah terdaftar, gunakan email lain!")
      );
      return false;
    }
  }

  // cek nomor hp
  if (!validator.isMobilePhone(noHP, "id-ID")) {
    console.log(chalk.red.inverse.bold("Nomor HP tidak valid!"));
    return false;
  }

  contacts.push(contact);

  fs.writeFile(fileName, JSON.stringify(contacts), (err) => {
    console.log(err);
  });
  console.log(`Terimakasih, ${nama} !`);
  //   rl.close();
};

const listContact = () => {
  const contacts = loadContact();
  console.log(chalk.yellow.bold.inverse("Contact List : "));
  contacts.forEach((contact, i) => {
    console.log(`${i + 1}. ${contact.nama} - ${contact.noHP}`);
  });
};

const detailContact = (nama) => {
  const contacts = loadContact();

  const contact = contacts.find(
    (contact) => contact.nama.toLowerCase() === nama.toLowerCase()
  );

  if (!contact) {
    console.log(chalk.red.inverse.bold(`${nama} tidak ditemukan!`));
    return false;
  }

  console.log(chalk.cyan.bold.inverse(contact.nama));
  if (contact.email) {
    console.log(chalk.magenta.bold(contact.email));
  }
  console.log(chalk.red(contact.noHP));
};

const deleteContact = (nama) => {
  const contacts = loadContact();
  const newContacts = contacts.filter(
    (contact) => contact.nama.toLowerCase() !== nama.toLowerCase()
  );
  if (contacts.length === newContacts.length){
    console.log(chalk.red.inverse.bold(`${nama} tidak ditemukan!`));
    return false;
  }
  fs.writeFile(fileName, JSON.stringify(newContacts), (err) => {
    console.log(err);
  });
  console.log(`Contact ${nama} berhasil dihapus!`);
};

module.exports = { saveContact, listContact, detailContact, deleteContact };
