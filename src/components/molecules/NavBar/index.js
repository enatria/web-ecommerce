/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/function-component-definition */
import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import { makeStyles } from '@mui/styles';
import Button from '../../atoms/Button';
import Link from '../../atoms/Link'
import Brand from '../../atoms/Brand';

import { styled } from '@mui/material/styles';
import { isAuthenticated, isAdmin } from '../../../config/authService';
import { logout } from '../../../redux/authenticationSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Badge from '@mui/material/Badge';

const useStyles = makeStyles({
  root: {
    
  },
});

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));


export default function Navbar() {
  const dispatch = useDispatch();
  const history = useHistory();
  const data = useSelector(state=>state.product.items).map((item)=>item.cart)
  console.log("datanavbar", data)
  const countCart = data.length>0 ? data.reduce((prev, current)=>parseInt(prev)+parseInt(current)) : 0

  console.log("jml cart", countCart)

  const handleLogout = () => {
    dispatch(logout());
    history.push('/login')
  }
  const classes = useStyles();
  return (
    <Box sx={{ flexGrow: 1 }} className={classes.root}>
      <AppBar position="static" sx={{ boxShadow: 'none !important',}}  color="info">
        <Container>
          <Box
            sx={{
              display: 'flex',
              justifyContent:'space-between',
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <Box sx={{
              display: 'flex',
              justifyContent:'start',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
              <Brand />
             
              {
                  isAdmin() ?
                  <Box sx={{
                    display: 'flex',
                    justifyContent:'start',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }} >
                  <Box sx={{marginLeft:7}}>
                    <Link to="/admin">Admin</Link>
                  </Box>
                  <Box sx={{marginLeft:7}}>
                    <Link to="/rekap">Rekap Penjualan</Link>
                  </Box>
                  </Box> :  <Box sx={{marginLeft:7}}>
                <Link to="/">Home</Link>
              </Box>
                }
            </Box>
            <Box sx={{
              display: 'flex',
              justifyContent:'space-between',
              flexDirection: 'row',
              alignItems: 'center',
            }}>  
              {!isAdmin() ? <IconButton sx={{marginRight:2}} onClick={()=>history.push('/cart')}>
              <StyledBadge badgeContent={countCart>99 ? "99+" : countCart} color="secondary">
                    <ShoppingCartIcon color="primary" />
              </StyledBadge>
              </IconButton> : ""}
              {
                isAuthenticated() ? 
                <Button onClick={handleLogout}>Logout</Button> :
                <Button onClick={()=>history.push('/login')}>Login</Button>
              }
            </Box>
          </Box>
        </Container>
      </AppBar>
    </Box>
  );
}
