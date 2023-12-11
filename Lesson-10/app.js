const { MongoClient } = require("mongodb");
const ObjectID = require("mongodb").ObjectID;
const uri = "mongodb://127.0.0.1:27017";
const dbName = "contact";

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

client.connect((error, client) => {
  if (error) {
    return console.log("koneksi gagal");
  }

  const db = client.db(dbName);
  // menambahkan 1 data
  // db.collection("mahasiswa").insertOne(
  //   {
  //     nama: "Acim",
  //     email: "acim@gmail.com",
  //   },
  //   (error, result) => {
  //     if (error) {
  //       return console.log("gagal menambahkan data!");
  //     }
  //     console.log(result);
  //   }
  // );

  // menambahkan lebih dari 1 data
  // db.collection("mahasiswa").insertMany(
  //   [
  //     {
  //       nama: "caca",
  //       email: "caca@gmail.com",
  //     },
  //     {
  //       nama: "dodo",
  //       email: "dodo@gmail.com",
  //     },
  //   ],
  //   (error, result) => {
  //     if (error) {
  //       return console.log("data gagal ditambahkan!");
  //     }
  //     console.log(result);
  //   }
  // );

  // menampilkan semua data pada collection
  // console.log(
  //   db
  //     .collection("mahasiswa")
  //     .find()
  //     .toArray((error, result) => {
  //       console.log(result);
  //     })
  // );

  // menampilkan data berdasarkan kriteria
  // console.log(
  //   db
  //     .collection("mahasiswa")
  //     .find({ _id: ObjectID("6576a177fe1dae18499e65e7") })
  //     .toArray((error, result) => {
  //       console.log(result);
  //     })
  // );

  // mengubah data berdasarkan id
  // const updatePromise = db.collection("mahasiswa").updateOne(
  //   {
  //     _id: ObjectID("657420022ea3424586dee3bc"),
  //   },
  //   {
  //     $set: {
  //       email: "r.alghifari@gmail.com",
  //     },
  //   }
  // );
  // updatePromise
  //   .then((result) => {
  //     console.log(result);
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });

  // mengubah data lebih dari 1, berdasarkan kriteria
  // db.collection('mahasiswa').updateMany(
  //   {
  //     email: 'dodo@gmail.com'
  //   },
  //   {
  //     $set: {
  //       email: 'dodo@yahoo.com'
  //     },
  //   }
  // )

  // menghapus 1 data
  // db.collection('mahasiswa').deleteOne(
  //   {
  //     _id: ObjectID("6576a177fe1dae18499e65e7")
  //   }
  // ).then((result)=> {
  //   console.log(result);
  // }).catch((error)=> {
  //   console.log(error);
  // })

  // menghapus lebih dari 1 data
  // db.collection('mahasiswa').deleteMany(
  //   {
  //     email: "dodo@yahoo.com"
  //   }
  // ).then((result) => {
  //   console.log(result);
  // }).catch((error) => {
  //   console.log(error)
  // })
});
