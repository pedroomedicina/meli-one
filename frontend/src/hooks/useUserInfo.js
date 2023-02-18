import {useEffect, useState} from "react";
import {proxy_api_url} from "../settings/Services";

export const useUserInfo = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [imageSource, setImageSource] = useState('')
  const [fullName, setFullName] = useState('')

  async function getUser() {
    try {
      setLoading(true)
      const userResponse = await fetch(`${proxy_api_url}/`)
      const data = await userResponse.json()
      setFullName(`${data['nombre']} ${data['apellido']}`)
      setImageSource(data['imagen'])
    } catch (error) {
      setError(`Algo salio mal al cargar tu informacion: ${error}`)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getUser()
  }, [])

  return {
    loading, error, imageSource, fullName, getUser
  }
}