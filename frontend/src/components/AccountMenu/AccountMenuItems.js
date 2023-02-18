import {Link, useNavigate} from "react-router-dom";
import styled from "@emotion/styled";
import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import {AccountGreeting} from "../AccountGreeting/AccountGreeting";

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
    <MenuItem>
      <AccountGreeting />
    </MenuItem>
    <MenuItem onClick={() => handleNavigate('/my-purchases')}>
      <Typography>Mis compras</Typography>
    </MenuItem>
  </>
}