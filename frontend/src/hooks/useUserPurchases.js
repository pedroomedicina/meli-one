import {useCallback, useState} from "react";
import {proxy_api_url} from "../settings/Services";
import {serialize} from "../utils/serializeObjectToQueryParameters";

export const useUserPurchases = (storePurchases) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [purchases, setPurchases] = useState()
  const [totalPurchases, setTotalPurchases] = useState(0)
  const [offset, setOffset] = useState(0)
  const [limit] = useState(4)

  const loadPurchases = useCallback(async () => {
    const parameters = {
      limit,
      offset,
    }
    try {
      setLoading(true)
      const userResponse = await fetch(`${proxy_api_url}/`)
      const user = await userResponse.json()
      parameters['id_usuario'] = user['id_usuario']
      const purchasesResponse = await fetch(`${proxy_api_url}/compras/compras_usuario?${serialize(parameters)}`)
      const purchases = await purchasesResponse.json()
      setPurchases(purchases['data'])
      storePurchases(purchases['data'])
      setTotalPurchases(purchases['total'])
    } catch (error) {
      setError('Algo salio mal al cargar tus compras')
    } finally {
      setLoading(false)
    }
  }, [limit, offset, storePurchases])

  return {
    loading,
    error,
    purchases,
    totalPurchases,
    offset,
    limit,
    setOffset,
    loadPurchases
  }
}