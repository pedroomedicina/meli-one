import MenuItem from "@mui/material/MenuItem";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import * as React from "react";
import {Link} from "react-router-dom";
import styled from "@emotion/styled";

const MenuLink = ({children, ...rest}) => <Link {...rest}>{children}</Link>

const StyledMenuLink = styled(MenuLink)`
  text-decoration: none;
  color: unset;
`

export const AccountMenu = ({accountMenuAnchor, handleClose, paperProps}) => {
  const isOpen = Boolean(accountMenuAnchor);

  return <Menu
    anchorEl={accountMenuAnchor}
    id="account-menu"
    open={isOpen}
    onClose={handleClose}
    onClick={handleClose}
    PaperProps={paperProps}
    transformOrigin={{horizontal: 'right', vertical: 'top'}}
    anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
  >
    <StyledMenuLink to="/profile">
      <MenuItem onClick={handleClose}>
        <Avatar/><Typography>
        Perfil
      </Typography>
      </MenuItem>
    </StyledMenuLink>
    <StyledMenuLink to="/">
      <MenuItem onClick={handleClose} to>
        <Typography>Página principal</Typography>
      </MenuItem>
    </StyledMenuLink>
  </Menu>
}