import React, { useState, useEffect } from 'react'
import PokemonList from './components/PokemonList'
import axios from 'axios'

const App = () => {
  const [pokemon, setPokemon] = useState([])
  const [currentPageUrl, setCurrentPageUrl] = useState(
    'https://pokeapi.co/api/v2/pokemon'
  )
  const [nextPageUrl, setNextPageUrl] = useState()
  const [prevPageUrl, setPrevPageUrl] = useState()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    axios.get(currentPageUrl).then((res) => {
      setLoading(false)
      setNextPageUrl(res.data.next)
      setPrevPageUrl(res.data.previous)
      setPokemon(res.data.results.map((p) => p.name))
    })
  }, [currentPageUrl])

  if (loading) {
    return 'Loading...'
  }

  return <PokemonList pokemon={pokemon} />
}

export default App
