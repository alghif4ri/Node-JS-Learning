function cetakNama(nama) {
  return `Hallo, ${nama}`;
}

const PI = 3.14;

const mahasiswa = {
    nama : 'alghi',
    umur : 30,
    cetakMhs(){
        return` Haloo, nama saya ${this.nama} dan umur ${this.umur} tahun.`
    },
};

class Orang {
    constructor(){
        console.log('Objek Telah dibuat')
    }
}

// module.exports.cetakNama = cetakNama;
// module.exports.PI = PI;
// module.exports.mahasiswa = mahasiswa;
// module.exports.Orang = Orang;

// penulisan dengan ES6, {property : value }
// module.exports = {
//     cetakNama: cetakNama,
//     PI: PI,
//     mahasiswa:mahasiswa,
//     Orang: Orang
// }

// jika nama property sama dengan nama value, cukup tulis sekali
module.exports = { cetakNama, PI, mahasiwa, Orang}