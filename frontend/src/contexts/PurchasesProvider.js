import {createContext, useState} from "react";
import {useUserPurchases} from "../hooks/useUserPurchases";

export const PurchasesContext = createContext({})
const WithPurchasesProvider = ({children}) => {
  const [purchases, setPurchases] = useState(null)
  const {loadPurchases, loading, error, offset, limit, totalPurchases, setOffset} = useUserPurchases(setPurchases)

  return <PurchasesContext.Provider value={{
    purchases,
    loading,
    error,
    offset,
    setOffset,
    limit,
    totalPurchases,
    loadPurchases
  }}>
    {children}
  </PurchasesContext.Provider>
}

export default WithPurchasesProvider