import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import {Link} from "react-router-dom"
import styled from "@emotion/styled";
import {Search as SearchIcon} from "@mui/icons-material";
import {Button, InputBase} from "@mui/material";
import {alpha} from '@mui/material/styles';
import {AccountLevel} from "../AccountLevel/AccountLevel";
import {UserAvatarWithName} from "../UserAvatar/UserAvatarWithName";

const NavigateHome = ({className}) => <Link to="/" className={className}/>

const Logo = styled(NavigateHome)`
  background-image: url("https://http2.mlstatic.com/frontend-assets/ml-web-navigation/ui-navigation/5.21.22/mercadolibre/logo__large_plus@2x.png");
  background-size: 134px 34px;
  height: 34px;
  width: 134px;
`

const SpaceFiller = styled.div`
  display: flex;
  flex: 1;
`

const Search = styled('div')(({theme}) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 1),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 1),
  },
  margin: '0 1em',
  width: '598px',
  textAlign: 'left',
}));

const SearchIconWrapper = styled('div')(({theme}) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  top: 0,
  right: 0,
  color: alpha(theme.palette.common.black, 0.5),
}));

const StyledInputBase = styled(InputBase)(({theme}) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 1),
  },
}));

const MenuLink = ({children, ...rest}) => <Link {...rest}>{children}</Link>

const StyledMenuLink = styled(MenuLink)`
  text-decoration: none;
  color: unset;
`

const headerBoxSx = {
  display: 'flex', alignItems: 'center', textAlign: 'center', padding: '1em 10em', backgroundColor: '#fff159',
  justifyContent: 'space-between'
}

export default function WithNavigation(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <React.Fragment>
      <Box sx={headerBoxSx}>
        <Logo/>
        <Search>
          <StyledInputBase
            placeholder="Buscar…"
            inputProps={{'aria-label': 'search'}}
          />
          <SearchIconWrapper>
            <SearchIcon/>
          </SearchIconWrapper>
        </Search>
        <AccountLevel/>
      </Box>
      <Box sx={headerBoxSx}>
        <SpaceFiller/>
        <Tooltip title="Menu">
          <Button
            variant="text"
            color="neutral"
            onClick={handleClick}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <UserAvatarWithName/>
          </Button>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
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
        }}
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
      {props.children}
    </React.Fragment>
  );
}
