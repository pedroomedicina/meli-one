import {Button, Typography} from "@mui/material";
import axios from "axios";
import {useEffect, useState} from "react";
import {proxy_api_url} from "../../settings/Services";

export function AccountLevel() {

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [level, setLevel] = useState('')

  async function getUserLevel() {
    try {
      setLoading(true)
      const {data: user} = await axios.get(`${proxy_api_url}/`)
      const {data: level} = await axios.get(`${proxy_api_url}/nivel?id_nivel=${user['nivel']}`)
      setLevel(level['descripción'])
    } catch (error) {
      setError('Algo salio mal al cargar tu nivel')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getUserLevel()
  }, [])

  const LoadingFallback = () => 'Cargando informacion de nivel...'
  const ErrorFallback = () => <div><Typography>{error}</Typography><Button onClick={getUserLevel}>Reintentar</Button>
  </div>
  const ComponentWithErrorFallback = () => error ? <ErrorFallback/> : <Typography>Eres {level}</Typography>

  return loading ? <LoadingFallback/> : <ComponentWithErrorFallback/>
}