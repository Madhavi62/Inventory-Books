//myfrontend
import React, { useEffect, useState } from 'react';//i imported useeffect and usestate are imported from React to manage side effects and state in functional components.
import axios from 'axios';//i imported axios because is imported to make HTTP requests.

function App() {//i used function component with name App

  const [books, setBooks] = useState([]);//here i used usestate hook.the initial values is empty array for books
  const [newTitle, setNewTitle] = useState('');//empty strings for newTitle
  const [newAuthor, setNewAuthor] = useState('');//empty string for newAuthor.These state variables will be used to manage the application data and track changes.

  useEffect(() => {//The useeffect is triggered only once, right after the component is mounted
    fetchBooks();//The effect calls the fetchBooks function to load the initial list of books
  }, []);

  const fetchBooks = async () => {//asynchronous function fetchBooks that fetches the list of books from the server using an HTTP GET request.
    try {
      const response = await axios.get('http://localhost:5000/allbooks');//i used axios to make the request to 'http://localhost:5000/allbooks'.
      setBooks(response.data);//If the request is successful, the books state is updated with the response data.
    } catch (error) {
      console.error('Error fetching books:', error);//If an error occurs, this satement print.
    }
  };

  const handleAdd = async () => {//asynchronous function handleAdd is called when the "Add" button is clicked.
    try {
      const newBook = {//creates a new book object using the values of newTitle and newAuthor.
        title: newTitle,
        author: newAuthor,
      };

      await axios.post('http://localhost:5000/books', newBook);//It makes an HTTP POST request .with the new book object as the request payload.
      setNewTitle('');//If the request is successful, the newTitle and newAuthor states are reset to empty strings and the fetchBooks function is called to update the list of books.
      setNewAuthor('');
      fetchBooks();
    } catch (error) {//if it error this statement will occur
      console.error('Error in adding book:', error);
    }
  };

  const handleRemove = async (id) => {//asynchronous function handleRemove that is called when the "Remove" button is clicked.
    try {
      await axios.delete(`http://localhost:5000/books/${id}`);//It takes the book's id as a parameter.
      //It makes an HTTP delete request to 'http://localhost:5000/books/{id}' to remove the book with the specified id.
      fetchBooks();//If the request is successful, the fetchBooks function is called to update the list of books.
    } catch (error) {//if it an error it print console statement
      console.error('Error in removing book:', error);
    }
  };

  return (
    <div>
       <h1>Book Inventory</h1>{/*hedding */}
      <ul>
        {/*The books array is mapped over to create list items  for each book, displaying the book's title and author. */}
        {books.map((book) => (
          <li key={book._id}>
            {book.title} by {book.author}
            <button onClick={() => handleRemove(book._id)}>Remove</button>{/*here list item has a "Remove" button that calls the handleRemove */}
          </li>
        ))}
      </ul>
      <div>
        <h2>Add Book</h2>
        {/*i used input fields for the title and author have their values to the newTitle and newAuthor states*/}
        <input
          type="text" placeholder="Title"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)} /*onChange event handlers update thestates when the input values change.*/
        />
        <input
          type="text"
          placeholder="Author"
          value={newAuthor}
          onChange={(e) => setNewAuthor(e.target.value)} /*onChange event handlers update the states when the input values change.*/
        />
        <button onClick={handleAdd}>Add</button>{/*"Add" button calls the handleAdd function when clicked. */}
      </div>
    </div>
  );
}

export default App;
