import GameMap from '../components/GameMap'
import {
  SHRINE_RUINS_FILTERS,
  SHRINE_RUINS_LOCATIONS,
} from '../data/shrineRuinsLocations'
import exampleMapImage from '../assets/shrine_ruins_map.jpg'
import { useParams } from 'react-router-dom'
import { ComingSoonPage } from './comingSoon';


export default function MapPage() {
    const { gameId } = useParams();

    const getMapConfig = () => {
        switch (gameId) {
            case 'monster-hunter':
                return {
                    name: "Shrine Ruins",
                    image: exampleMapImage,
                    children: SHRINE_RUINS_LOCATIONS,
                    filterCategories: SHRINE_RUINS_FILTERS
                };
            case 'wuthering-waves':
            case 'honkai-star-rail':
            case 'babys-nightmare':
            default:
                return null;

            //más casos agregar acá (Zelda, genshin, etc)
        }
    };
    //debug para verificar id del juego (QUITAR LUEGOO)
    console.log("ID del juego seleccionado:", gameId);

    const currentMap = getMapConfig()!;
    //el simbolito ! es para q typescript no se queje de q currentMap puede ser undefined
    // pero en realidad nunca lo va a ser porque el id del juego siempre va a ser uno de los casos del switch
    //(NO QUITAR EL ! XQ APARECEN ERRORES DE UNDEFINED)

    if (!currentMap) {
        return <ComingSoonPage />;
    }

    return (
        <main className="app">
        <GameMap
            name={currentMap.name}
            image={currentMap.image}
            children={currentMap.children}
            filterCategories={currentMap.filterCategories}
        />
        </main>
    );
}