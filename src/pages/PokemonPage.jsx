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
  const [pokeTeam, setPokeTeam] = useState(() => {
    const savedTeam = localStorage.getItem("pokeTeam")
    return savedTeam ? JSON.parse(savedTeam) : []
  })

  useEffect(() => {
    setLoading(true)
    fetch(`https://pokebuildapi.fr/api/v1/pokemon/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Pokémon introuvable !")
        return res.json()
      })
      .then((data) => {
        setPokemon(data)
      })
      .catch((err) => {
        setError(err.message)
      })
      .finally(() => setLoading(false))
  }, [id])

  // Vérifie si le Pokémon est déjà dans l'équipe
  const isInTeam = pokeTeam.some((p) => p.id === pokemon?.id)

  // Ajoute ou retire le Pokémon de l'équipe
  const togglePokemonInTeam = () => {
    let newTeam

    if (isInTeam) {
      newTeam = pokeTeam.filter((p) => p.id !== pokemon.id)
    } else {
      if (pokeTeam.length < 6) {
        newTeam = [...pokeTeam, pokemon]
      } else {
        alert("Votre équipe est pleine !")
        return
      }
    }

    setPokeTeam(newTeam)
    localStorage.setItem("pokeTeam", JSON.stringify(newTeam))
  }

  if (loading) return <LoadingSpinner />
  if (error) return <p>❌ {error}</p>
  if (!pokemon) return <p>❌ Pokémon introuvable</p>

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
          <p>❤️ PV : {pokemon.stats.HP}</p>
          <p>⚔️ Attaque : {pokemon.stats.attack}</p>
          <p>🛡️ Défense : {pokemon.stats.defense}</p>
        </div>
        <button onClick={togglePokemonInTeam} className={`team-btn ${isInTeam ? "remove" : "add"}`}>
          {isInTeam ? "Retirer de l'équipe" : "Ajouter à l'équipe"}
        </button>
      </div>
      <BackButton />
    </div>
  )
}
