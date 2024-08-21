const router = require("express").Router();
const fs = require('fs')
const books = require("../data/books.json");

//menampilkan semua books
//filtering-searching
router.get("/", (req, res)=>{
  const { q } = req.query;
  let filteredData = [...books];

  if(q){
      filteredData = books.filter((item)=>item.title.toLowerCase().includes(q.toLowerCase()));
  }
  res.render("books",{ books });
});

router.get("/books", (req, res)=>{
  res.json(books);
  //res.send("Berhasil");
});
//menampilkan 1 book berdasarkan id
router.get("/books/:id", (req, res) =>{
  const { id } = req.params;
  //res.send (`books ${id})
  const book = books.find((item) => item.id === Number(id));
  //res.render("book",{ book })
  if(!book){
    return res.status(404).send(`we can't find a Book detail with id ${id}, Please use another id`);
  }
  else{
    res.json(book);
  }
});

//show books dalam table
router.get("/ejs/books", (req, res) =>{

  res.render("bookTable",{ books });
});

module.exports = router;