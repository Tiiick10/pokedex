import { useState } from "react"
import './SearchBar.css'

export default function SearchBar({ pokemons, setFilteredPokemons }) {
  const [searchTerm, setSearchTerm] = useState("")
  const [region, setRegion] = useState("all")

  // Correspondance des numéros de Pokédex selon les régions

  const regionRanges = {

    Kanto: { min: 1, max: 151 },       
    Johto: { min: 152, max: 251 },      
    Hoenn: { min: 252, max: 386 },      
    Sinnoh: { min: 387, max: 493 },     
    Unys: { min: 494, max: 649 },       
    Kalos: { min: 650, max: 721 },      
    Alola: { min: 722, max: 809 },      
    Galar: { min: 810, max: 898 },      

  }

  const handleSearch = (e) => {
    setSearchTerm(e.target.value)

    let filtered = pokemons.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(e.target.value.toLowerCase())
    )

    // Filtre par région

    if (region !== "all") {
      const { min, max } = regionRanges[region]
      filtered = filtered.filter(
        (pokemon) => pokemon.id >= min && pokemon.id <= max
      )
    }

    setFilteredPokemons(filtered)
  }

  const handleRegionChange = (e) => {
    setRegion(e.target.value)
    let filtered = pokemons.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
    )

    if (e.target.value !== "all") {
      const { min, max } = regionRanges[e.target.value]
      filtered = filtered.filter(
        (pokemon) => pokemon.id >= min && pokemon.id <= max
      )
    }

    setFilteredPokemons(filtered)
  }

  return (
    <div className="search-bar-container">
      <input
        type="text"
        placeholder="Rechercher un Pokémon..."
        value={searchTerm}
        onChange={handleSearch}
        className="search-bar"
      />
      <select
        value={region}
        onChange={handleRegionChange}
        className="region-select"
      >
        <option value="all">Toutes les régions</option>
        <option value="Kanto">Kanto (1G)</option>
        <option value="Johto">Johto (2G)</option>
        <option value="Hoenn">Hoenn (3G)</option>
        <option value="Sinnoh">Sinnoh (4G)</option>
        <option value="Unys">Unys (5G)</option>
        <option value="Kalos">Kalos (6G)</option>
        <option value="Alola">Alola (7G)</option>
        <option value="Galar">Galar (8G)</option>
      </select>
    </div>
  )
}
