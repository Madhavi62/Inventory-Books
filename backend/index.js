//i import the required modules and libraries for the code.
const express = require("express");
const mongoose = require("mongoose");
const Book = require('./model')
const cors = require('cors')
const app = express();// here i created Express application and stored in the app variable.

//I used Middleware as this
app.use(express.json());
app.use(cors())//CORS for the app, allowing cross-origin requests.
// i Connect to MongoDB
mongoose
  .connect("mongodb+srv://madhavisurigala123:Madhavi123@cluster0.mmureua.mongodb.net/", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");//if it is success print this console statement
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);//if error print enter to this statement
  });

// Start the server
const port = 5000;
//I used get method to retrive all books
app.get("/allbooks", async (req, res) => {//i setup a route using the HTTP GET method at the path "/allbooks".
  try {
    const books = await Book.find();// Book model to find all books in the MongoDB database and stores the result in the books variable.
    res.json(books);// sends a JSON responsewith the books data.
  } catch (error) {
    res.status(500).json({ error: "Server error" });//If an error occurs it sends a JSON response with a status code of 500 and an error message.
  }
});

// for create a new book i used post method 
app.post("/books", async (req, res) => {//i sets up a route using the HTTP POST method at the path "/books"
  try {
    const { title, author } = req.body;//it extracts the title and author from the request body.
    const newBook = new Book({ title, author});//It creates a new Book instance using the extracted data.
    const savedBook = await newBook.save();//It saves the new book to the database and stores the result in the savedBook variable.
    res.json(savedBook);//It sends a JSON response with the savedBook data.
  } catch (error) {
    res.status(500).json({ error: "Server error" });//If an error occurs, it sends a JSON response with a status code of 500 and an error message.
  }
});

// to update a book a book i used pu method
app.put("/books/:id", async (req, res) => {//i setsup a route using the HTTP PUT method at the path "/books/:id".
  try {
    const { id } = req.params;//It extracts the id from the request parameters  and the title and author from the request body.
    const { title, author } = req.body;
    const updatedBook = await Book.findByIdAndUpdate(//It updates the book with the specified id in the database
      id,
      { title, author },
      { new: true }
    );
    res.json(updatedBook);//It sends a JSON response with the updatedBook data.
  } catch (error) {
    res.status(500).json({ error: "Server error" });//If an error occurs, it sends a JSON response with a status code of 500 and an error message.
  }
});

//for delete a book i used delete method
app.delete("/books/:id", async (req, res) => {//i setup a route using the HTTP DELETE method at the path "/books/:id"
  try {
    const { id } = req.params;//It extracts the id from the request parameters 
    await Book.findByIdAndRemove(id);//It finds the book with the specified id in the database ,which removes the book from the database.
    res.json({ message: "Book deleted" });//It sends a JSON response with a success message.
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(port, () => {//starts the server and listens for incoming requests on the specified port
  console.log(`Server is running on port ${port}`);//the server is successfully started,it print console with the port number.
});
