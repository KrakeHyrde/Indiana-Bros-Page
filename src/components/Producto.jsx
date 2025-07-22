import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Placeholder from 'react-bootstrap/Placeholder';
import '../styles/productos.css'

      /*<Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src="holder.js/100px180" />
        <Card.Body>
          <Placeholder as={Card.Title} animation="glow">
            <Placeholder xs={6} />
          </Placeholder>
          <Placeholder as={Card.Text} animation="glow">
            <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />{' '}
            <Placeholder xs={6} /> <Placeholder xs={8} />
          </Placeholder>
          <Placeholder.Button variant="primary" xs={6} />
        </Card.Body>
      </Card>*/
function Producto(props) {
  return (
    <div className="cart">
      <Card style={{ width: '18rem' }}>
        <Card.Img className='imagen' variant="top" src={props.img} alt='Portada de Videojuego'/>
        <Card.Body>
          <Card.Title className='title'>{props.title}</Card.Title>
          <Card.Text className='text'>
            {props.text}
          </Card.Text>
          <Button variant="primary">Buy</Button>
        </Card.Body>
      </Card>
    </div>
  );
}
export {Producto}