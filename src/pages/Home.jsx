import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import PokemonCard from "../components/PokemonCard/PokemonCard"
import SearchBar from "../components/SearchBar/SearchBar"
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner"
import './Home.css'

const API_URL = "https://pokebuildapi.fr/api/v1/pokemon"

export default function Home() {
  const [pokemons, setPokemons] = useState(() => {
    const savedPokemons = localStorage.getItem("pokemons")
    return savedPokemons ? JSON.parse(savedPokemons) : []
  })

  const [filteredPokemons, setFilteredPokemons] = useState(pokemons)
  const [loading, setLoading] = useState(pokemons.length === 0)
  const [error, setError] = useState(null)
  const controller = new AbortController()

  useEffect(() => {

    if (pokemons.length > 0) return // Si déjà en cache, ne refait pas la requête

    setLoading(true)

    fetch(API_URL, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error("Erreur lors du chargement des Pokémon")
        return res.json()
      })

      .then((data) => {
        setPokemons(data)
        setFilteredPokemons(data)
        localStorage.setItem("pokemons", JSON.stringify(data)) // Sauvegarde en cache
      })

      .catch((err) => {
        if (err.name !== "AbortError") {
          setError(err.message)
        }
      })
      .finally(() => setLoading(false))

    return () => controller.abort()

  }, [pokemons])

  if (loading) return <LoadingSpinner />
  if (error) return <p>❌ {error}</p>

  return (

    <div>

      <h1 className="title">Pokédex</h1>
      <SearchBar pokemons={pokemons} setFilteredPokemons={setFilteredPokemons} />

      <div className="pokemon-grid">

        {filteredPokemons.map((pokemon) => (

          <Link key={pokemon.id} to={`/pokemon/${pokemon.id}`}>

            <PokemonCard pokemon={pokemon} />

          </Link>

        ))}

      </div>

    </div>

  )
  
}

