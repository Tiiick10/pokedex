import { useState} from "react"
import "./PokeTeam.css"
import BackButton from "../components/BackButton/BackButton"

export default function PokeTeam() {
  const [pokeTeam, setPokeTeam] = useState(() => {
    const savedTeam = localStorage.getItem("pokeTeam")
    return savedTeam ? JSON.parse(savedTeam) : []
  })

  const removeFromTeam = (id) => {
    const newTeam = pokeTeam.filter((p) => p.id !== id)
    setPokeTeam(newTeam)
    localStorage.setItem("pokeTeam", JSON.stringify(newTeam))
  }

  return (
    <>
    <BackButton pokeBack = {true}/>
    <div className="poke-team">
      <h2>Mon Équipe Pokémon</h2>
      <div className="team-grid">
        {pokeTeam.length === 0 ? (
          <p>Aucun Pokémon dans votre équipe.</p>
        ) : (
          pokeTeam.map((pokemon) => (
            <div key={pokemon.id} className="team-card">
              <img src={pokemon.image} alt={pokemon.name} className="team-image" />
              <h3>{pokemon.name}</h3>
              <button onClick={() => removeFromTeam(pokemon.id)} className="remove-btn">
                Retirer
              </button>
            </div>
          ))
        )}
      </div>
    </div>
    </>
  )
}
