import type { ReactNode } from 'react'
import { MapContainer, ImageOverlay, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css'
import './GameMap.css'

export interface GameMapProps {
  name: string
  image: string
  /** Elementos adicionales encima del mapa como puntos de interés. 
   * Ejemplo:
   *  <Popup>
        <strong>Campamento Base</strong> <br />
        Lugar de inicio.
      </Popup>
   * 
  **/
  children?: ReactNode
  className?: string
}



function GameMap({ name, image, children, className = '' }: GameMapProps) {
  const bounds: L.LatLngBoundsExpression = [[0, 0], [1000, 1000]];
  return (
    <section className={`game-map ${className}`.trim()} aria-label={`Mapa de ${name}`}>
      <header className="game-map__header">
        <h1 className="game-map__title">{name}</h1>
      </header>

      <div style={{ height: '22rem', width: '100%' }}>
        <MapContainer
          center={[500, 500]}
          zoom={-1}
          crs={L.CRS.Simple} 
          style={{ height: '100%', width: '50%', background: '#1a1a1a' }}
          minZoom={-2}
          maxZoom={2}
        >
          <ImageOverlay url={image} bounds={bounds} />

          <Marker position={[120, 470]}>
            <Popup>
              <strong>Campamento Base</strong> <br />
              Lugar de inicio.
            </Popup>
            {children && <Popup>{children}</Popup>}
          </Marker>
        </MapContainer>
      </div>
    </section>
  )
}

export default GameMap
