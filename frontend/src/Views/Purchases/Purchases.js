import {Box, Container, Pagination, Skeleton, Stack, styled} from "@mui/material";
import WithNavigation from "../../components/WithNavigation/WithNavigation";
import {useCallback, useEffect, useState} from "react";
import {proxy_api_url} from "../../settings/Services";
import {serialize} from "../../utils/serializeObjectToQueryParameters";
import PurchaseListItem from "../../components/PurchaseListItem/PurchaseListItem";
import {WithRestrictions} from "../../components/WithRestrictions/WithRestrictions";

const StyledSkeleton = styled(Skeleton)`
  height: 250px;
  width: 100%;
`

const SkeletonStack = () => <Box sx={{ width: '100%', padding: '1em 0' }}>
  <Stack>
    <StyledSkeleton />
    <StyledSkeleton />
    <StyledSkeleton />
    <StyledSkeleton />
    <StyledSkeleton />
  </Stack>
</Box>

export const Purchases = () => {
  const [loading, setLoading] = useState(false)
  const [, setError] = useState('')
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
      setTotalPurchases(purchases['total'])
    } catch (error) {
      setError('Algo salio mal al cargar tus compras')
    } finally {
      setLoading(false)
    }
  }, [limit, offset])

  const handleChangePage = (event, value) => {
    setOffset((value - 1) * limit)
  };

  useEffect(() => {
    loadPurchases()
  }, [loadPurchases, offset])

  const WithLoadingFallback = ({children}) => loading ? <SkeletonStack /> : <>{children}</>

  return <>
    <WithRestrictions />
    <WithNavigation>
      <Container maxWidth='xl'>
        <WithLoadingFallback>
          <Box sx={{ width: '100%', padding: '1em 0' }}>
            <Stack spacing={2}>
              {Array.isArray(purchases) && purchases.map((purchase) => (<PurchaseListItem key={purchase['id_compra']} purchase={purchase} />))}
            </Stack>
          </Box>
          <Pagination
            size='large' sx={{display: 'flex', justifyContent: 'center', padding: '0.5em 0 1em'}}
            count={Math.round(totalPurchases / limit)} shape="rounded" showFirstButton showLastButton
            onChange={handleChangePage} page={(offset / limit) + 1}
          />
        </WithLoadingFallback>
      </Container>
    </WithNavigation>
  </>
}
