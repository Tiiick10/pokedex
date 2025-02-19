import "./PokemonCard.css"

export default function PokemonCard ({ pokemon }) {

  return (

    <div className="pokemon-card">

      <img src={pokemon.image} alt={pokemon.name} />

      <h3>{pokemon.name}</h3>

    </div>

  )
  
}
