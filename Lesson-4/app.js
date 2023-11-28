//Core Module
// Filesystem

// const { constants } = require('buffer');
// const fs = require('fs')

// menulis string ke file (synchronous)
// try{
//     fs.writeFileSync('data/test.txt', 'Haii World dengan syncrhonous!')
// } catch(err){
//     console.log(err)
// }

// menulis string ke file (asynchronous)
// fs.writeFile('data/test.txt', 'Haii World dengan synchronous! diupdate dengan Asynchronous!', (err) => {
//     console.log(err);;
// });

//membaca file dengan synchronous
// const data = fs.readFileSync('data/test.txt', 'utf-8');
// console.log(data.toString())

// membaca file dengan Asynchronous
// fs.readFile('datas/test.txt', 'utf8', (err, data) => {
//     if (err) throw err;
//     console.log(data);
// });

// mencoba Readline
const fs = require("fs");
const readline = require("readline");
// const {stdin: input,stdout: output} = require('node:process');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const fileName = 'data/contacts.json';

// Mengecek apakah file sudah ada atau belum
if (!fs.existsSync(fileName)) {
    // Jika file belum ada, buat file tersebut
    fs.writeFileSync(fileName, '[]', 'utf8');
}

rl.question(`Masukan Nama Anda : `, (nama) => {
  rl.question(`Masukan Nomor HP Anda : `, (NoHP) => {
    // fs.readFile(fileName, 'utf8', (err, data) => {
    //         if (err) throw err;
    //         console.log(data);
    //     });
    if (!isNaN(NoHP)) {
      const contact = { nama, NoHP };
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
  });
});