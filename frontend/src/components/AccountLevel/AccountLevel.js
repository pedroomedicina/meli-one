import {Button, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import {proxy_api_url} from "../../settings/Services";

export function AccountLevel(props) {

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [level, setLevel] = useState('')

  async function getUserLevel() {
    try {
      setLoading(true)
      const userResponse = await fetch(`${proxy_api_url}/`)
      const user = await userResponse.json()
      const levelResponse = await fetch(`${proxy_api_url}/nivel?id_nivel=${user['nivel']}`)
      const level = await levelResponse.json()
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

  const LoadingFallback = () => <Typography sx={{margin: '.5em 0'}} >Cargando informacion de nivel...</Typography>
  const ErrorFallback = () => <div><Typography>{error}</Typography><Button onClick={getUserLevel}>Reintentar</Button>
  </div>
  const ComponentWithErrorFallback = () => error ? <ErrorFallback/> : <Typography {...props}>Eres {level}</Typography>

  return loading ? <LoadingFallback/> : <ComponentWithErrorFallback/>
}