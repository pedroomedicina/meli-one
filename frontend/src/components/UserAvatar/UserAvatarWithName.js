import Avatar from "@mui/material/Avatar";
import { Skeleton, Typography} from "@mui/material";
import styled from "@emotion/styled";
import {useUserInfo} from "../../hooks/useUserInfo";

function stringToColor(string) {
  let hash = 0;
  let i;

  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }

  return color;
}

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
  };
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;

  .MuiAvatar-root, .MuiSkeleton-root {
    margin-right: .5em;
  }
`

export const UserAvatarWithName = () => {

  const {loading, error, fullName, imageSource, getUser} = useUserInfo()

  const LoadingFallback = () => <Wrapper data-testid="skeleton-wrapper">
    <Skeleton height={32} width={32} variant="circular" data-testid="avatar-skeleton"/>
    <Skeleton data-testid="name-skeleton" width={128} height={32}/>
  </Wrapper>
  const ErrorFallback = () => <Typography onClick={getUser}>Reintentar</Typography>

  const AvatarWithImage = () => <Avatar data-testid="user-avatar" sx={{width: 32, height: 32}} src={imageSource}/>
  const NameAvatar = () => fullName && <Avatar {...stringAvatar(fullName)} />
  const AvatarWithNoImageFallback = () => imageSource ? <AvatarWithImage/> : <NameAvatar/>

  const UserFullName = () => <Typography>{fullName}</Typography>
  const User = () => <Wrapper><AvatarWithNoImageFallback/><UserFullName/></Wrapper>

  const ComponentWithErrorFallback = () => error ? <ErrorFallback/> : <User/>

  return loading ? <LoadingFallback/> : <ComponentWithErrorFallback/>
}