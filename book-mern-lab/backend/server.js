require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Book = require("./models/Book");

const app = express();

app.use(express.json());
app.use(cors());


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Atlas Connected"))
  .catch(err => console.log("❌ MongoDB Error:", err));




app.get("/books", async (req, res) => {
  const books = await Book.find();
  res.json(books);
});


app.post("/books", async (req, res) => {
  const book = new Book(req.body);
  await book.save();
  res.json({ message: "📘 Book added!" });
});


app.put("/books/:id", async (req, res) => {
  await Book.findByIdAndUpdate(req.params.id, req.body);
  res.json({ message: "✏️ Book updated!" });
});


app.delete("/books/:id", async (req, res) => {
  await Book.findByIdAndDelete(req.params.id);
  res.json({ message: "🗑️ Book deleted!" });
});


app.listen(process.env.PORT, () =>
  console.log(`🚀 Server running on port ${process.env.PORT}`)
);
