import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './Card.css'

function Cards({book, index}) {
  return (
    <Card key={index} style={{ width: '18rem' }}>
      <Card.Img variant="top" className='card-image' src={book.image} />
      <Card.Body>
           <Card.Title> <b>{book.name}</b> </Card.Title> <br />
           

        <div className='d-flex justify-content-between align-items-center'>
        <Card.Subtitle className="m-0 text-muted">{book.language}</Card.Subtitle> 

        <span> INR <b>{book.price}</b></span>
        </div>  <br />    
        <Card.Text>
          Author: <b>{book.author}</b>
        </Card.Text>
        <Card.Text>
          Published in: <b>{book.year}</b>
        </Card.Text>
        
        <Card.Text>
          {
            book.description
          }
        </Card.Text>
        <Button variant="primary">Add to Cart</Button>
      </Card.Body>
    </Card>
  );
}

export default Cards;