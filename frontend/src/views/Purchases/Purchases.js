import {Box, Container, Pagination, Skeleton, Stack, styled} from "@mui/material";
import WithNavigation from "../../components/WithNavigation/WithNavigation";
import {useContext, useEffect} from "react";
import {PurchaseListItem} from "../../components/PurchaseListItem/PurchaseListItem";
import {WithRestrictions} from "../../components/WithRestrictions/WithRestrictions";
import {PurchasesContext} from "../../contexts/PurchasesProvider";

const StyledSkeleton = styled(Skeleton)`
  height: 250px;
  width: 100%;
`

const SkeletonStack = () => <Box sx={{width: '100%', padding: '1em 0'}}>
  <Stack data-testid='purchases-skeleton-stack'>
    <StyledSkeleton/>
    <StyledSkeleton/>
    <StyledSkeleton/>
  </Stack>
</Box>

export const Purchases = () => {
  const {purchases, loading, offset, limit, totalPurchases, loadPurchases, setOffset} = useContext(PurchasesContext)

  const handleChangePage = (event, value) => {
    setOffset((value - 1) * limit)
  };

  useEffect(() => {
    loadPurchases()
  }, [loadPurchases, offset])

  const WithLoadingFallback = () => loading ? <SkeletonStack/> :
    <>
      <Box sx={{width: '100%', padding: '1em 0'}}>
        <Stack spacing={2}>
          {Array.isArray(purchases) && purchases.map((purchase) => (
            <PurchaseListItem key={purchase['id_compra']} purchase={purchase}/>))}
        </Stack>
      </Box>
      <Pagination
        size='large' sx={{display: 'flex', justifyContent: 'center', padding: '0.5em 0 1em'}}
        count={Math.round(totalPurchases / limit)} shape="rounded" showFirstButton showLastButton
        onChange={handleChangePage} page={(offset / limit) + 1}
      />
    </>

  return <>
    <WithRestrictions/>
    <WithNavigation>
      <Container maxWidth='xl'>
          <WithLoadingFallback/>
      </Container>
    </WithNavigation>
  </>
}

