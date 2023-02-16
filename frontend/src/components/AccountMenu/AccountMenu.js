import Menu from "@mui/material/Menu";
import * as React from "react";
import {AccountMenuitems} from "./AccountMenuItems";

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
    <AccountMenuitems handleClose={handleClose} />
  </Menu>
}