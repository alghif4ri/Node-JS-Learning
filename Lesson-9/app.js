const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const { loadContact, findContact } = require("./Utils/contacts.js");

const app = express();
const port = 3000;

app.set("view engine", "ejs"); // gunakan EJS
app.use(expressLayouts); // Third-Party middleware

// built-in middleware
app.use(express.static("public"));

app.get("/", (req, res) => {
  const mahasiswa = [
    {
      nama: "Alghifari",
      email: "alghi@gmail.com",
    },
    {
      nama: "Aiman",
      email: "aiman@gmail.com",
    },
    {
      nama: "Acim",
      email: "acim@gmail.com",
    },
  ];
  res.render("index", {
    nama: "Alghifari",
    title: "Home Page",
    mahasiswa,
    layout: "layouts/main-layouts",
  });
});
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Page",
    layout: "layouts/main-layouts",
  });
});

app.get("/contact", (req, res) => {
  const contacts = loadContact();
  // console.log(contacts);
  res.render("contact", {
    title: "Contact Page",
    layout: "layouts/main-layouts",
    contacts,
  });
});


app.get("/contact/:nama", (req, res) => {
  const contact = findContact(req.params.nama);
  // console.log(contacts);
  res.render("detail", {
    title: "Detail contact",
    layout: "layouts/main-layouts",
    contact,
  });
});

app.use((req, res) => {
  res.status(404);
  res.send("<h1>404 Not Found!</h1>");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
