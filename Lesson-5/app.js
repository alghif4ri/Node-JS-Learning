// const contacts = require('./contacts')

// const main = async () => {
//   const nama = await contacts.questions('Masukan Nama : ');
//   const email = await contacts.questions('Masukan Email : ');
//   const NoHP = await contacts.questions('Masukan No HP : ');

// bisa juga ditulis dengan object destructuring
const {questions, saveContact} = require('./contacts')

const main = async () => {
  const nama = await questions('Masukan Nama : ');
  const email = await questions('Masukan Email : ');
  const NoHP = await questions('Masukan No HP : ');
  saveContact(nama, email, NoHP);
};
main();  