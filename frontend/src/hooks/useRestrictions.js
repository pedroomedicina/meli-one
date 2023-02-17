import {useEffect, useState} from "react";
import {proxy_api_url} from "../settings/Services";

export const useRestrictions = () => {
  const [loadingRestrictions, setLoadingRestrictions] = useState(false)
  const [error, setError] = useState('')
  const [restrictions, setRestrictions] = useState()

  async function getUserRestrictions() {
    try {
      setLoadingRestrictions(true)
      const userResponse = await fetch(`${proxy_api_url}/`)
      const user = await userResponse.json()
      const restrictionsResponse = await fetch(`${proxy_api_url}/restricciones?id_usuario=${user['id_usuario']}`)
      const restrictions = await restrictionsResponse.json()
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