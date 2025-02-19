import { useState } from "react"
import './SearchBar.css'

export default function SearchBar({ pokemons, setFilteredPokemons }) {

  const [searchTerm, setSearchTerm] = useState("")

  const handleSearch = (e) => {

    setSearchTerm(e.target.value)
    const filtered = pokemons.filter((p) =>
      p.name.toLowerCase().includes(e.target.value.toLowerCase())
    )
    setFilteredPokemons(filtered)
  }


  return (

    <div className="search-bar-container">

      <input
        type="text"
        className="search-bar"
        placeholder="Rechercher un Pokémon..."
        value={searchTerm}
        onChange={handleSearch}
      />

    </div>
    
  )
  
}
