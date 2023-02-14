import styled from "@emotion/styled";
import {alpha} from "@mui/material/styles";
import {InputBase} from "@mui/material";
import {Search as SearchIcon} from "@mui/icons-material";
import * as React from "react";

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

export const SearchBar = () => <Search>
  <StyledInputBase
    placeholder="Buscar…"
    inputProps={{'aria-label': 'search'}}
  />
  <SearchIconWrapper>
    <SearchIcon/>
  </SearchIconWrapper>
</Search>