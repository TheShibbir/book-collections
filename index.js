const express = require('express');
const app = express();

let books = [];

app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/books', (req, res) => {
  res.json(books);
});

app.post('/books', (req, res) => {
  const { title, author, publishedDate } = req.body;
  const id = books.length + 1;
  const book = { id, title, author, publishedDate };
books.push(book);
res.json(book);
});

app.delete('/books/:id', (req, res) => {
const id = parseInt(req.params.id);
const bookIndex = books.findIndex(book => book.id === id);
if (bookIndex === -1) {
res.status(404).json({ message: 'Book not found' });
} else {
books.splice(bookIndex, 1);
res.json({ message: 'Book deleted' });
}
});

const port = 8080;

app.listen(port, () => {
console.log(`Server listening on port ${port}`);
});