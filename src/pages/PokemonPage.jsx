import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner"
import BackButton from "../components/BackButton/BackButton"
import "./PokemonPage.css"

export default function PokemonPage() {
  const { id } = useParams()
  const [pokemon, setPokemon] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const controller = new AbortController()

  useEffect(() => {
    setLoading(true)
    fetch(`https://pokebuildapi.fr/api/v1/pokemon/${id}`, {
      signal: controller.signal,
    })
      .then((res) => {
        if (!res.ok) throw new Error("Pokémon introuvable !")
        return res.json()
      })

      .then((data) => {
        setPokemon(data)
      })

      .catch((err) => {
        if (err.name !== "AbortError") {
          setError(err.message)
        }
      })

      .finally(() => setLoading(false))
  }, [id])

  if (loading) return <LoadingSpinner />
  if (error) return <p>❌ {error}</p>
  if (!pokemon || Object.keys(pokemon).length === 0)
    return <p>❌ Pokémon introuvable</p>

  return (
    <div className="pokemon-page">
      <div className="pokemon-card-detail">
        <h1 className="pokemon-name">{pokemon.name}</h1>
        <img className="pokemon-image" src={pokemon.image} alt={pokemon.name} />
        <div className="pokemon-types">
          {pokemon.apiTypes.map((type) => (
            <span
              key={type.name}
              className={"type-badge " + type.name}
              style={{ backgroundColor: type.color }}
            >
              {type.name}
              <img src={type.image} alt={type.name} className="type-image" />
            </span>
          ))}
        </div>
        <div className="pokemon-stats">
          <p>❤️ Point de vie : {pokemon.stats.HP}</p>
          <p>⚔️ Attaque : {pokemon.stats.attack}</p>
          <p>🛡️ Défense : {pokemon.stats.defense}</p>
        </div>
      </div>
      <BackButton />
    </div>
  )
}
