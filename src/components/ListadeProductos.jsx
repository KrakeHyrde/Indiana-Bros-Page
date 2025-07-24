import { Producto } from "./Producto";
import tommy from '../assets/Tommy.png';
import poe from '../assets/Poe.png';
import pillars from '../assets/Pillars.png';
import CardGroup from 'react-bootstrap/CardGroup';
import '../styles/lista.css';

const ListadeProductos = () => {
    return (
        <div className="productos-wrapper">
            <CardGroup className="lista-productos">
                <Producto className='tommy' img={tommy} title="Tommy's Adventure" text="Controla a Tommy, un joven atrapado en un bucle de habitaciones lineales que cambian
                    sutilmente cada vez que intenta escapar.
                    Para avanzar y reencontrarse con sus amigos, deberá resolver puzles cada vez más
                    desafiantes, mientras el entorno se vuelve más extraño e inquietante.
                    Rompe el bucle, resuelve los enigmas y enfrentá la verdad que ha estado evitando: el origen
                    de las sombras que lo rodean." />
                <Producto className='poe' img={poe} title="Midnight Tales: Echoes of Poe" text="Una antología de terror interactiva donde cada episodio reinventa un poema o relato de Edgar Allan Poe en una experiencia narrativa única. El jugador explora escenarios oscuros y decadentes, resolviendo acertijos simbólicos y tomando decisiones que afectan la atmósfera y el desenlace de cada historia. Cada episodio mezcla estética gótica, misterio psicológico y terror poético, transportando al jugador a un mundo donde la locura, la obsesión y la muerte susurran en cada rincón." />
                <Producto className='pillars' img={pillars} title="Elemental Pillars" text="La magia elemental, antaño fuente de equilibrio, es ahora una fuerza peligrosa y corrupta. Como Sualk, el último guardián de la escuela Krita, el jugador debe usar pilares de fuego, agua, viento y tierra para frenar hordas de criaturas invocadas por Mahadeva, el Dios de la Destrucción. Sin embargo, a medida que se desentrañan los secretos de los pilares, se revela una verdad inquietante: la magia que usas para salvar al mundo podría ser la misma que lo condene." />
            </CardGroup>
        </div>
    )    
}

export { ListadeProductos }