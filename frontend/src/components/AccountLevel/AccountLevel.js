import {Button, Typography} from "@mui/material";
import axios from "axios";
import {useEffect, useState} from "react";
import {proxy_api_url} from "../../settings/Services";

export function AccountLevel () {

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [level, setLevel] = useState('')

  async function getUserLevel() {
    try {
      setLoading(true)
      const { data } = await axios.get(`${proxy_api_url}/nivel`);
      setLevel(data['descripción'])
    } catch (error) {
      setError('Algo salio mal al cargar tu nivel')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getUserLevel()
  }, [])

  const LoadingFallback = () => 'Cargando ...'
  const ErrorFallback = () => <div><Typography>{error}</Typography><Button onClick={getUserLevel}>Reintentar</Button></div>
  const ComponentWithErrorFallback = () => error ? <ErrorFallback/> : <Typography>{level}</Typography>

  return loading ? <LoadingFallback /> : <ComponentWithErrorFallback />
}