import {useEffect, useState} from "react";
import axios from "axios";
import {proxy_api_url} from "../../settings/Services";
import Avatar from "@mui/material/Avatar";
import {Button, Typography} from "@mui/material";

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

export const UserAvatarWithName = () => {

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [imageSource, setImageSource] = useState('')
  const [fullName, setFullName] = useState('')

  async function getUser() {
    try {
      setLoading(true)
      const {data} = await axios.get(`${proxy_api_url}/`)
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

  const LoadingFallback = () => <Avatar sx={{width: 32, height: 32}}/>
  const ErrorFallback = () => <Button onClick={getUser}>Reintentar</Button>
  const AvatarWithImage = () => <Avatar sx={{width: 32, height: 32}} src={imageSource}/>

  const NameAvatar = () => fullName && <Avatar {...stringAvatar(fullName)} />

  const AvatarWithNoImageFallback = () => imageSource ? <AvatarWithImage/> : <NameAvatar/>

  const UserFullName = () => <Typography>{fullName}</Typography>

  const User = () => <><AvatarWithNoImageFallback/><UserFullName/></>

  const ComponentWithErrorFallback = () => error ? <ErrorFallback/> : <User/>

  return loading ? <LoadingFallback/> : <ComponentWithErrorFallback/>
}