// const http = require("http");
// const fs = require("fs");

// const renderHtml = (path, res) => {
//   fs.readFile(path, (err, data) => {
//     if (err) {
//       res.writeHead(404);
//       res.write("Error: file not found");
//     } else {
//       res.write(data);
//     }
//     res.end();
//   });
// };

// http
//   .createServer((req, res) => {
//     res.writeHead(200, {
//       "Content-Type": "text/html",
//     });

//     // const url = req.url;
//     //dengan if
//     // if (url === "/about") {
//     //   renderHtml("/about.html", res);
//     // } else if (url === "/contact") {
//     //   renderHtml('./contact.html', res)
//     // } else {
//     //   renderHtml('./index.html', res);
//     // }

//     const url = req.url;
//     //dengan switch
//     switch (url) {
//       case "/about":
//         renderHtml("./about.html", res);
//         break;
//       case "/contact":
//         renderHtml("./contact.html", res);
//         break;
//       default:
//         renderHtml("./index.html", res);
//         break;
//     }
//   })
//   .listen(3000, () => {
//     console.log("server is running on port 3000");
//   });

// const express = require("express");
// const app = express();
// const port = 3000;

// app.get("/", (req, res) => {
//   // res.json({
//   //   nama: 'alghifari',
//   //   email: 'abudzar@gmail.com',
//   //   noHP: '082313'
//   // })
//   res.sendFile("./index.html", { root: __dirname });
// });
// app.get("/about", (req, res) => {
//   // res.send('Halaman about!')
//   res.sendFile("./about.html", { root: __dirname });
// });
// app.get("/contact", (req, res) => {
//   // res.send('Halaman contact!')
//   res.sendFile("./contact.html", { root: __dirname });
// });

// app.get("/product/:id", (req, res) => {
//   // res.send(
//   //   `Product ID : ${req.params.id} <br> Category ID : ${req.params.id_category}`
//   // );
//   res.send(
//     `Product ID : ${req.params.id} <br> Category : ${req.query.category}`
//   );
// });
// app.use("/", (req, res) => {
//   res.status(404);
//   res.send("<h1>404 Not Found!</h1>");
// });

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`);
// });

// Materi Templating Engine / View Engine

const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const app = express();
const port = 3000;

// gunakan EJS
app.set("view engine", "ejs");
app.use(expressLayouts);

app.get("/", (req, res) => {
  // res.sendFile("./index.html", { root: __dirname });
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
  // res.sendFile("./about.html", { root: __dirname });
  res.render("about", {
    title: "About Page",
    layout: "layouts/main-layouts",
  });
});
app.get("/contact", (req, res) => {
  // res.sendFile("./contact.html", { root: __dirname });
  res.render("contact", {
    title: "Contact Page",
    layout: "layouts/main-layouts",
  });
});

app.get("/product/:id", (req, res) => {
  res.send(
    `Product ID : ${req.params.id} <br> Category : ${req.query.category}`
  );
});
app.use("/", (req, res) => {
  res.status(404);
  res.send("<h1>404 Not Found!</h1>");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
