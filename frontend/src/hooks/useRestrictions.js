import {useEffect, useState} from "react";
import axios from "axios";
import {proxy_api_url} from "../settings/Services";

export const useRestrictions = () => {
  const [loadingRestrictions, setLoadingRestrictions] = useState(false)
  const [error, setError] = useState('')
  const [restrictions, setRestrictions] = useState([])

  async function getUserRestrictions() {
    try {
      setLoadingRestrictions(true)
      const {data: user} = await axios.get(`${proxy_api_url}/`)
      const {data: restrictions} = await axios.get(`${proxy_api_url}/restricciones?id_usuario=${user['id_usuario']}`)
      setRestrictions(restrictions)
    } catch (error) {
      setError('Algo salio mal')
    } finally {
      setLoadingRestrictions(false)
    }
  }

  useEffect(() => {
    getUserRestrictions()
  }, [])

  return {loadingRestrictions, error, restrictions}
}