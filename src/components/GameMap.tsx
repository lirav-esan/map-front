import type { ReactNode } from 'react'
import './GameMap.css'

export interface GameMapProps {
  name: string
  image: string
  /** Elementos adicionales encima del mapa como puntos de interés. **/
  children?: ReactNode
  className?: string
}

function GameMap({ name, image, children, className = '' }: GameMapProps) {
  return (
    <section className={`game-map ${className}`.trim()} aria-label={`Mapa de ${name}`}>
      <header className="game-map__header">
        <h1 className="game-map__title">{name}</h1>
      </header>

      <div className="game-map__viewport">
        <img className="game-map__image" src={image} alt={`Mapa de ${name}`} />
        {children && <div className="game-map__overlays">{children}</div>}
      </div>
    </section>
  )
}

export default GameMap
