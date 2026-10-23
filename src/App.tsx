import './App.css'
import GameMap from './components/GameMap'
import {
  SHRINE_RUINS_FILTERS,
  SHRINE_RUINS_LOCATIONS,
} from './data/shrineRuinsLocations'
import exampleMapImage from './assets/shrine_ruins_map.jpg'

function App() {
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

export default App
