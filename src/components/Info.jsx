import '../styles/Info.css'
const Info = () => {
    return (
        <div className='information'>
            <div className='texto'>
                <h1 className='titulo'>Sobre Nosotros</h1>
                <div className='parrafo'>
                    <p>Somos una Empresa Indie de videojuegos orientados en juegos de Terror Emocional</p>
                    <p>Tenemos como objetivo poder llegar al jugador a traves de historias profundas y terrorificas</p>
                    <p>con distintos tipos de arte pero con un unico objetivo</p>
                    <p>ofrecer calidad al jugador</p>
                </div>
            </div>

            <div className='textoDirigido'>
                <h1 className='titulo'>Nuestro Publico</h1>
                <div className='parrafo'>
                <p>Buscamos llegar a cualquier persona que le gusten</p>
                <p>los videojuegos de puzzles, investigacion o historia a invertigar</p>
                </div>
            </div>
            <div className='textoTec'>
                <h1 className='titulo'>Tecnologias</h1>
                <div className='parrafo'>
                <p>Para esta pagina se utilizo</p>
                <p>react, bootstrap, router dom, vite y versel</p>
                </div>
            </div>
        </div>
    )
}

export {Info}