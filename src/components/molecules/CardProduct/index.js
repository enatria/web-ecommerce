import * as React from 'react';
import Box from '@mui/material/Box';
import Link from '../../atoms/Link';
import CardContent from '@mui/material/CardContent';
import {Button} from '../../atoms';
import Typography from '@mui/material/Typography';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import { toast } from 'react-toastify';
import { isAuthenticated } from '../../../config/authService';

import { useDispatch } from 'react-redux';
import { addData } from '../../../redux/productSlice';

const useStyles = makeStyles({
    root: {
        minHeight:450,
        borderRadius: 18,
        backgroundColor:'#fff'
    },
  });

export default function CardProduct({data}) {

    const classes = useStyles()
    const history = useHistory()
    const dispatch = useDispatch()

  function handleAddToCart() {
    if (!isAuthenticated()) {
      toast.error("Login before add product to cart!", {
        position: "top-right"
    })
      history.push('/login')
    } else {
      dispatch(addData({
        ...data,
        cart: 1 + data.cart,
        stock: data.stock,
        countSales :data.countSales
      }))
      toast.info(`${data.title} added to cart!`, {
        position: "top-right"
    })
    }
  }

  return (
    
    <Box className={classes.root}>
      <Box sx={{ display: 'flex', width: 120, minHeight:'180px',margin: 'auto', padding:3 }}>
        <img src={data.image} style={{width:'100%', objectFit:'contain'}} alt="" />
      </Box>
    <Link to={`/product/${data.id}`}>
      <CardContent>
          <Typography gutterBottom sx={{fontWeight:'fontWeightBold'}}  variant="h5"  color="text.primary" component="div">
            {data.title}
          </Typography>
          
        <Box sx={{
          marginBottom:1
        }}>
        <Typography variant="span" sx={{marginRight:3, fontSize:12, backgroundColor:'info.main', padding:0.5, borderRadius:1}} color="primary.dark">
          Stock: {data.stock}
        </Typography>
        <Typography variant="span" sx={{fontSize:12, backgroundColor:'info.main', padding:0.5, borderRadius:1}} color="primary.dark">
          Sales: ${data.totalSales}
        </Typography>
        </Box>

        <Typography variant="body2" sx={{maxHeight:'60px', minHeight:'60px', overflow:'hidden'}} color="text.secondary">
          {data.description}
        </Typography>
        </CardContent>
    </Link>
          <Box sx={{
            paddingLeft:2,
            paddingRight: 2,
            paddingBottom: 2,
            display: 'flex',
            justifyContent:'space-between',
            alignItems:'center'
      }}>
        <Typography variant="span" sx={{ fontWeight: 'fontWeightBold' }}>${data.price}</Typography>
        <Box>
          <Button size="small" disabled={data.stock !== 0 ? false : true} onClick={handleAddToCart}>Add To Cart</Button>
        </Box>
      </Box>
    </Box>
  );
}