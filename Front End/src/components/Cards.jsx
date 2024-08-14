import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './Card.css'
import { useDispatch,useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../store/cartSlice';
import { deleteBook, updateBook } from '../store/bookSlice';
import Form from '../components/Form';
import { useState } from 'react';


function Cards({book, index, value}) {

  const [modal, setModal] = useState(false);

  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(value? addToCart(book) : removeFromCart(book.id));
  }
  const admin = useSelector((store) => store.books.admin)

  const handleDelete = (id) => {
    dispatch(deleteBook(id));
  }
  const handleModal = () => {
    setModal(!modal);
  }

  return (<>
    <Card key={index} style={{ width: '18rem' }}>
      <Card.Img variant="top" className='card-image' src={`http://localhost:4001/uploads/images/${book.image}`} />
      <Card.Body>
           <Card.Title> <b>{book.name}</b> </Card.Title> <br />
           

        <div className='d-flex justify-content-between align-items-center'>
        <Card.Subtitle className="m-0 text-muted">{book.language}</Card.Subtitle> 

        <span> INR <b>{book.price}</b></span>
        </div>  <br />    
        <Card.Text>
          Author: <b> {book.author}</b>
        </Card.Text>
        <Card.Text>
          Published in: <b> {book.year}</b>
        </Card.Text>
        
        <Card.Text>
          {
            book.description
          } 
        </Card.Text>
        {
          admin ? 
          <div className='d-flex gap-2 justify-content-center'>
            <Button variant="success" onClick={handleModal}>Edit</Button>
            <Button variant="danger" onClick={() => {handleDelete(book._id)}}>Delete</Button>
          </div>
          : value ? <Button variant="primary" onClick={handleClick}>Add to Cart</Button> : <Button variant="danger">Remove to Cart</Button>
        }
        
      </Card.Body>
    </Card>
    {
      modal && <Form toggleModal={handleModal} data={book}/>
    }
    </> 
  ); 
}

export default Cards;