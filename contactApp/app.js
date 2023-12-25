const express = require("express");
const expressLayouts = require("express-ejs-layouts");
require("./utils/db");

const { body, validationResult, check } = require("express-validator");
const methodOverride = require("method-override");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");
const Contact = require("./model/contact");
const app = express();
const port = 3000;

app.use(methodOverride("_method"));
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

app.get("/contact/add", (req, res) => {
  res.render("add-contact", {
    title: "Form add contact",
    layout: "layouts/main-layouts",
  });
});

app.post(
  "/contact",
  [
    body("nama").custom(async (value) => {
      const duplikat = await Contact.findOne({ nama: value });
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
      Contact.insertMany(req.body, (error, result) => {
        req.flash("success_msg", "Data berhasil ditambahkan!");
        res.redirect("/contact");
      });
    }
  }
);

// app.get("/contact/delete/:nama", async (req, res) => {
//   const contact = await Contact.findOne({ nama: req.params.nama });
//   if (!contact) {
//     res.status(404);
//     res.send("<h1>404</h1>");
//   } else {
//     Contact.deleteOne({_id: contact._id}).then((result)=>{
//       req.flash("success_msg", "Data berhasil dihapus!");
//       res.redirect("/contact");
//     });
//   }
// });

app.delete("/contact", (req, res) => {
  Contact.deleteOne({ nama: req.body.nama }).then((result) => {
    req.flash("success_msg", "Data berhasil dihapus!");
    res.redirect("/contact");
  });
});

app.get("/contact/edit/:nama", async (req, res) => {
  const contact = await Contact.findOne({ nama: req.params.nama });
  res.render("edit-contact", {
    title: "Form edit contact",
    layout: "layouts/main-layouts",
    contact,
  });
});

app.put(
  "/contact",
  [
    body("nama").custom(async (value, { req }) => {
      const duplikat = await Contact.findOne({ nama: value });
      if (value !== req.body.oldNama && duplikat) {
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
      res.render("edit-contact", {
        title: "Form edit contact",
        layout: "layouts/main-layouts",
        errors: errors.array(),
        contact: req.body,
      });
    } else {
      Contact.updateOne(
        { _id: req.body._id },
        {
          $set: {
            nama: req.body.nama,
            email: req.body.email,
            noHP: req.body.noHP,
          },
        }
      ).then((result) => {
        req.flash("success_msg", "Data berhasil diubah!");
        res.redirect("/contact");
      });
    }
  }
);

app.get("/contact/:nama", async (req, res) => {
  // const contact = findContact(req.params.nama);
  const contact = await Contact.findOne({ nama: req.params.nama });
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
