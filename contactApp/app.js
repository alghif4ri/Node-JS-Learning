const express = require("express");
const expressLayouts = require("express-ejs-layouts");
require("./utils/db");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");
const Contact = require("./model/contact");
const app = express();
const port = 3000;

// setu EJS
app.set("view engine", "ejs");
app.use(expressLayouts);
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser("secret"));
app.use(
  session({
    cookie: { maxAge: 6000 },
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(flash());
// Home
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

app.get("/contact", async (req, res) => {
  const contacts = await Contact.find();
  console.log(contacts);
  res.render("contact", {
    title: "Contact Page",
    layout: "layouts/main-layouts",
    contacts,
    success_msg: req.flash("success_msg"),
  });
});

app.get("/contact/:nama", async(req, res) => {
  // const contact = findContact(req.params.nama);
  const contact = await Contact.findOne({nama: req.params.nama})
  // console.log(contacts);
  res.render("detail", {
    title: "Detail contact",
    layout: "layouts/main-layouts",
    contact,
  });
});

app.listen(port, () => {
  console.log(`Mongo Contact app | Listening at http:localhost:${port}`);
});
