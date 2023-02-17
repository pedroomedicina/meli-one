import {Link, useNavigate} from "react-router-dom";
import styled from "@emotion/styled";
import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

const MenuLink = ({children, to, ...rest}) => <Link to={to.toString()} {...rest}>{children}</Link>

export const StyledMenuLink = styled(MenuLink)`
  text-decoration: none;
  color: unset;
`

export const AccountMenuitems = ({handleClose}) => {
  const navigate = useNavigate();
  const handleNavigate = (route) => {
    navigate(route)
    handleClose()
  }

  return <>
    <MenuItem onClick={() => handleNavigate('/profile')}>
      <Avatar/><Typography>
      Perfil
    </Typography>
    </MenuItem>
    <MenuItem onClick={() => handleNavigate('/my-purchases')}>
      <Typography>Mis compras</Typography>
    </MenuItem>
    <MenuItem onClick={() => handleNavigate('/')}>
      <Typography>Página principal</Typography>
    </MenuItem>
  </>
}