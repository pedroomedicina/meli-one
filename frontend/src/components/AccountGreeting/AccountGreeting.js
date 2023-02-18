import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import {AccountLevel} from "../AccountLevel/AccountLevel";
import * as React from "react";
import {useUserInfo} from "../../hooks/useUserInfo";
import {Box, Button, Skeleton, Stack} from "@mui/material";

export const AccountGreeting = () => {
  const { loading, error, fullName, imageSource, getUser } = useUserInfo()

  const LoadingFallback = () => <Skeleton height={40} width={120} />
  const ErrorFallback = () => <Button onClick={getUser}>Reintentar</Button>

  const ComponentWithLoadingFallback = () => loading ? <LoadingFallback/> :
    <Stack>
      <Box sx={{display: 'flex', alignItems: 'center'}}>
        <Avatar data-testid="user-avatar" sx={{width: 40, height: 40, marginRight: '.5em'}} src={imageSource}/>
        <Typography>Hola {fullName}</Typography>
      </Box>
     <Box>
       <AccountLevel variant='h6' sx={{margin: '.5em 0'}} />
     </Box>
    </Stack>


  return error ? <ErrorFallback/> : <ComponentWithLoadingFallback />
}