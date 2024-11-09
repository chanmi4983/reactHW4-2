import React from 'react';
import { Button, Card } from 'react-bootstrap';

const BookCard = ({ book, onEdit, onDelete }) => {
    return (
        <Card style={{ width: '18rem', margin: '1rem' }}>
            <Card.Body>
                <Card.Title>{book.Title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{book.Author}</Card.Subtitle>
                <Card.Text>
                    <strong>Year:</strong> {book.Year} <br />
                    <strong>Genre:</strong> {book.Genre} <br />
                    <strong>Pages:</strong> {book.Pages}
                </Card.Text>
                <Button variant="warning" onClick={() => onEdit(book)} className="me-2">Edit</Button>
                <Button variant="danger" onClick={() => onDelete(book.id)}>Delete</Button>
            </Card.Body>
        </Card>
    );
};

export default BookCard;

