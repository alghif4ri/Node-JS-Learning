const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const {
  loadContact,
  findContact,
  addContact,
  cekDuplikat,
} = require("./Utils/contacts.js");
const { body, validationResult, check } = require("express-validator");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");
const app = express();
const port = 3000;

app.set("view engine", "ejs"); // gunakan EJS
app.use(expressLayouts); // Third-Party middleware

// built-in middleware
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
    success_msg: req.flash('success_msg')
  });
});

app.get("/contact/add", (req, res) => {
  res.render("add-contact", {
    title: "Form add contact",
    layout: "layouts/main-layouts",
  });
});

app.post(
  "/contact",
  [
    body("nama").custom((value) => {
      const duplikat = cekDuplikat(value);
      if (duplikat) {
        throw new Error("Nama sudah ada");
      }
      return true;
    }),
    check("email", "email tidak valid").isEmail(),
    check("noHP", "No HP tidak valid").isMobilePhone("id-ID"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render("add-contact", {
        title: "Form add contact",
        layout: "layouts/main-layouts",
        errors: errors.array(),
      });
    } else {
      addContact(req.body);
      req.flash("success_msg", "Data berhasil di tambahkan!");
      res.redirect("/contact");
    }
  }
);

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
