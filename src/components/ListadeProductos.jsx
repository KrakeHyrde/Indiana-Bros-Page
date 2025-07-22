import { Producto } from "./Producto";
import tommy from '../assets/Tommy.png';
import poe from '../assets/Poe.png';
import pillars from '../assets/Pillars.png';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';

const ListadeProductos = () => {
    return (
        <CardGroup>
            <Producto className= 'tommy' img = {tommy} title= "Tommy's Adventure" text =""/>
            <Producto className= 'poe' img= {poe} title="Midnight Tales: Echoes of Poe" text=""/>
            <Producto className= 'pillars' img={pillars} title="Elemental Pillars" text=""/>
        </CardGroup>
    )    
}

export {ListadeProductos}