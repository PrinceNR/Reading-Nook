import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useDispatch } from "react-redux";
import { addBook } from "../store/bookSlice";

function FormAdd( {toggleModal}) {

     const dispatch = useDispatch();
    const [book, setBook] = useState({
        name: '',
        author: '',
        price: '',
        language: '',
        year: '',
        description: '',
        image: ''
    });
    const handleClose = () => toggleModal(false);
    

    const handleInputChange = (e) => {
        const {name, value} = e.target
        setBook({...book, [name]: value })
      }

      const handleSubmit = (e) => {
        e.preventDefault();
        // Add your API call here
        console.log(book);
        dispatch(addBook(book))
        setBook({
            name: '',
            author: '',
            price: '',
            language: '',
            year: '',
            description: '',
            image: ''
        });
        toggleModal(false);

      }
  return (
    <div>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Enter BooK Name </Form.Label>
          <Form.Control type="text" name="name" onChange={handleInputChange} placeholder="Enter Book Name" />
          <Form.Text className="text-muted"></Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Enter Author Name </Form.Label>
          <Form.Control type="text" name="author" onChange={handleInputChange} placeholder="Enter Author Name" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Enter Price Of The Book :</Form.Label>
          <Form.Control type="text" name="price" onChange={handleInputChange} placeholder="Enter Price" />
          <Form.Text className="text-muted"></Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Enter Language OF The Book:</Form.Label>
          <Form.Control type="text" name="language" onChange={handleInputChange} placeholder="Enter Language" />
          <Form.Text className="text-muted"></Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Enter Published Year :</Form.Label>
          <Form.Control type="text" name="year" onChange={handleInputChange} placeholder="Enter Published Year" />
          <Form.Text className="text-muted"></Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Enter Description Of The Book:</Form.Label>
          <Form.Control as="textarea" rows={3} name="description" onChange={handleInputChange} placeholder="Enter Description" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Paste Image Url :</Form.Label>
          <Form.Control type="text" name="image" onChange={handleInputChange} placeholder="Paste Url"/>
          <Form.Text className="text-muted"></Form.Text>
        </Form.Group>
        <div className="d-flex justify-content-between">
          <Button variant="primary" type="submit" onClick={handleSubmit}>
            Add Book
          </Button>
          <Button variant="danger" onClick={handleClose}>
            Cancel
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default FormAdd;
