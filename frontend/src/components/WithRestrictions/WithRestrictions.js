import {useEffect, useState} from "react";
import axios from "axios";
import {proxy_api_url} from "../../settings/Services";
import {UnverifiedAccount} from "../UnverifiedAccount/UnverifiedAccount";
import {Skeleton} from "@mui/material";
import styled from "@emotion/styled";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1em;
  
  .MuiSkeleton-root {
    width: 100%;
    height: 3em;
  }
`

export function WithRestrictions({children}) {
  const [loadingRestrictions, setLoadingRestrictions] = useState(false)
  const [, setError] = useState('')
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

  const accountIsNotYetVerified = restrictions.length && restrictions.find(restriction => restriction['mensaje'].includes('Tu cuenta no ha sido verificada'))
  const Panel = () => accountIsNotYetVerified ? <UnverifiedAccount /> : <>{children}</>

  return loadingRestrictions ? <Wrapper><Skeleton variant="rectangular"/></Wrapper> : <Panel />
}