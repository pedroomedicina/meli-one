import * as React from 'react';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import {Link} from "react-router-dom"
import styled from "@emotion/styled";
import {Button} from "@mui/material";
import {AccountLevel} from "../AccountLevel/AccountLevel";
import {UserAvatarWithName} from "../UserAvatar/UserAvatarWithName";
import {WithRestrictions} from "../WithRestrictions/WithRestrictions";
import {SearchBar} from "../SearchBar/SearchBar";
import {SpaceFiller} from "../SpaceFiller/SpaceFiller";
import {AccountMenu} from "../AccountMenu/AccountMenu";

const NavigateHome = ({className}) => <Link data-testid="logo" to="/" className={className}/>

const Logo = styled(NavigateHome)`
  background-image: url("https://http2.mlstatic.com/frontend-assets/ml-web-navigation/ui-navigation/5.21.22/mercadolibre/logo__large_plus@2x.png");
  background-size: 134px 34px;
  height: 34px;
  width: 134px;
`

const headerBoxSx = {
  display: 'flex', alignItems: 'center', textAlign: 'center', padding: '1em 10em', backgroundColor: '#fff159',
  justifyContent: 'space-between'
}

const commonPaperProps = {
  elevation: 0,
  sx: {
    overflow: 'visible',
    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
    mt: 1.5,
    '& .MuiAvatar-root': {
      width: 32,
      height: 32,
      ml: -0.5,
      mr: 1,
    },
    '&:before': {
      content: '""',
      display: 'block',
      position: 'absolute',
      top: 0,
      right: 14,
      width: 10,
      height: 10,
      bgcolor: 'background.paper',
      transform: 'translateY(-50%) rotate(45deg)',
      zIndex: 0,
    },
  },
}

export default function WithNavigation(props) {
  const [accountMenuAnchor, setAccountMenuAnchor] = React.useState(null)
  const handleClickAccountMenu = (event) => {
    setAccountMenuAnchor(event.currentTarget)
  };
  const handleCloseAccountMenu = () => {
    setAccountMenuAnchor(null)
  };
  const accountMenuisOpen = Boolean(accountMenuAnchor)

  return (
    <React.Fragment>
      <Box sx={headerBoxSx}>
        <Logo />
        <SearchBar/>
        <AccountLevel/>
      </Box>
      <Box sx={headerBoxSx}>
        <SpaceFiller/>
        <Tooltip title="Menu">
          <Button
            variant="text"
            color="neutral"
            onClick={handleClickAccountMenu}
            aria-controls={accountMenuisOpen ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={accountMenuisOpen ? 'true' : undefined}
          >
            <UserAvatarWithName/>
          </Button>
        </Tooltip>
      </Box>
      <AccountMenu accountMenuAnchor={accountMenuAnchor} paperProps={commonPaperProps}
                   handleClose={handleCloseAccountMenu}/>
      <WithRestrictions>
        {props.children}
      </WithRestrictions>
    </React.Fragment>
  );
}
