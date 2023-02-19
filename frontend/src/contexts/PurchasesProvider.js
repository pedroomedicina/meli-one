import {createContext, useState} from "react";

export const PurchasesContext = createContext({})
const WithPurchasesProvider = ({children}) => {
  const [purchases, setPurchases] = useState(null)
  return <PurchasesContext.Provider value={{purchases, setPurchases}}>
    {children}
  </PurchasesContext.Provider>
}

export default WithPurchasesProvider