import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Button } from 'react-bootstrap';
import './App.css';
import BookCard from './BookCard';
import AddBookModal from './AddBookModal';
import EditBookModal from './EditBookModal';

const apiEndpoint = "https://672971846d5fa4901b6d2b72.mockapi.io/api/books";

function App() {
  const [books, setBooks] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  const fetchBooks = async () => {
      const response = await axios.get(apiEndpoint);
      setBooks(response.data);
  };

  useEffect(() => {
      fetchBooks();
  }, []);

  const handleEdit = (book) => {
      setSelectedBook(book);
      setShowEditModal(true);
  };

  const handleDelete = async (id) => {
      await axios.delete(`${apiEndpoint}/${id}`);
      fetchBooks();
  };

  return (
      <Container className="my-4">
          <h1 className="text-center mb-4">Book Management</h1>
          <Row className="mb-4 justify-content-center">
              <Col xs="auto">
                  <Button variant="primary" onClick={fetchBooks} className="me-2">Get Books</Button>
                  <Button variant="success" onClick={() => setShowAddModal(true)}>Add Book</Button>
              </Col>
          </Row>
          <Row>
              {books.map((book) => (
                  <Col key={book.id} xs={12} md={6} lg={4}>
                      <BookCard book={book} onEdit={handleEdit} onDelete={handleDelete} />
                  </Col>
              ))}
          </Row>
          <AddBookModal show={showAddModal} onHide={() => setShowAddModal(false)} onBookAdded={fetchBooks} />
          {selectedBook && (
              <EditBookModal
                  show={showEditModal}
                  onHide={() => setShowEditModal(false)}
                  book={selectedBook}
                  onBookUpdated={fetchBooks}
              />
          )}
      </Container>
  );
}

export default App;