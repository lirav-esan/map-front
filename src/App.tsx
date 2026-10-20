import './App.css'
import GameMap from './components/GameMap'

const exampleMapImage =
  'src/assets/shrine_ruins.jpg'

function App() {
  return (
    <main className="app">
      <GameMap name="Mapa de juego x" image={exampleMapImage} children={<div style={{ position: 'absolute', top: '50px', left: '50px' }}>Punto X</div>} />
      {
      /* 
      Pendiente: Crear componente de los puntos de interes que tenga como argumentos a que categoria pertenece,
      nombre, descripcion, imagen (o icono), coordenadas para ubicar, bool de visibilidad 
      */
      }
    </main>
  )
}

export default App
