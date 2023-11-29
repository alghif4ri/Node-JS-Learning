const fs = require("fs");
const { resolve } = require("path");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

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
const questions = (question) => {
    return new Promise((resolve, reject) => {
      rl.question(question, (answer) => {
        resolve(answer);
      });
    });
  };

  const saveContact = (nama, email, NoHP) => {

  if (!isNaN(NoHP)) {
    const contact = { nama, email, NoHP };
    const file = fs.readFileSync(fileName, "utf8");
    const contacts = JSON.parse(file);
    // console.log(contacts)
    contacts.push(contact);

    fs.writeFile(fileName, JSON.stringify(contacts), (err) => {
      console.log(err);
    });
    console.log(`Terimakasih, ${nama} !`);
  } else {
    console.log(`Hanya Inputkan angka untuk Nomor HP, Ulangi kembali!`);
  }
  rl.close();
  }

  module.exports = { questions, saveContact}