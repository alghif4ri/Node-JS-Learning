// const contacts = require('./contacts')

// const main = async () => {
//   const nama = await contacts.questions('Masukan Nama : ');
//   const email = await contacts.questions('Masukan Email : ');
//   const NoHP = await contacts.questions('Masukan No HP : ');

// bisa juga ditulis dengan object destructuring
// const {questions, saveContact} = require('./contacts')

// const main = async () => {
//   const nama = await questions('Masukan Nama : ');
//   const email = await questions('Masukan Email : ');
//   const NoHP = await questions('Masukan No HP : ');
//   saveContact(nama, email, NoHP);
// };
// main();

// mengambil argumen dari cli

const yargs = require("yargs");
const contacts = require("./contacts");

yargs.command({
  command: "add",
  describe: "Add a new contact",
  builder: {
    nama: {
      describe: "Nama Contact",
      demandOption: true,
      type: "string",
    },
    email: {
      describe: "Email Address",
      demandOption: false,
      type: "string",
    },
    noHP: {
      describe: "Phone Number",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    // const contact = {
    //   nama: argv.nama,
    //   email: argv.email,
    //   noHP: argv.noHP,
    // };
    // console.log(contact);
    contacts.saveContact(argv.nama, argv.email, argv.noHP)
},
}).demandCommand(); // jika tidak argumen, tampilkan pesan

//Tampilakan daftar contact nama dan nomor HP

yargs.command({
    command: "list",
    describe: "Menampilkan semua contact nama & nomor HP",
    handler(){
        contacts.listContact();
    }
})

// Tampilkan detail sebuah contact
yargs.command({
    command: "detail",
    describe: "Menampilkan detail sebuah contact berdasarkan nama",
    builder:{
        nama :{
        describe:'contact detail',
        demandOption:true,
        type: 'string'
        },
    },
    handler(argv){
        contacts.detailContact(argv.nama);
    }
})

//Menghapus contact berdasarkan nama
yargs.command({
  command: "delete",
  describe: "Menghapus sebuah contact berdasarkan nama",
  builder:{
      nama :{
      describe:'contact detail',
      demandOption:true,
      type: 'string'
      },
  },
  handler(argv){
      contacts.deleteContact(argv.nama);
  }
})

yargs.parse();