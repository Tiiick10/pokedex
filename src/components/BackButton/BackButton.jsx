import { useNavigate } from "react-router-dom"
import "./BackButton.css"

export default function BackButton ({pokeBack=false}) {
  const navigate = useNavigate()

  return (
    <button className={ pokeBack ? "back-button pokeBack" : "back-button" } onClick={() => navigate(-1)}> ⬅️ Retour </button>
  )
}

