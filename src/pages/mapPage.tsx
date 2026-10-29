import GameMap from '../components/GameMap'
import {
  SHRINE_RUINS_FILTERS,
  SHRINE_RUINS_LOCATIONS,
} from '../data/shrineRuinsLocations'
import exampleMapImage from '../assets/shrine_ruins_map.jpg'

export default function MapPage() {
  return (
    <main className="app">
      <GameMap
        name="Shrine Ruins"
        image={exampleMapImage}
        children={SHRINE_RUINS_LOCATIONS}
        filterCategories={SHRINE_RUINS_FILTERS}
      />
    </main>
  )
}