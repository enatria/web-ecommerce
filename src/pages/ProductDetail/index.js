/* eslint-disable array-callback-return */
import React from 'react'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Input from '@mui/material/Input';
import { useParams } from 'react-router-dom';
import Button from '../../components/atoms/Button'
import { toast } from 'react-toastify';
import { useState } from 'react';
import useFetch from '../../hook/useFetch';
import { useHistory } from 'react-router-dom';
import { isAuthenticated } from '../../config/authService';
import { useDispatch } from 'react-redux';
import { addData } from '../../redux/productSlice';

import { Rating } from '@mui/material';

const Content = ({data}) => {
    
    const [cart, setCart] = useState(data.cart)
        
    const history = useHistory()
    const dispatch = useDispatch()
    const handleChange = (e) => {
        e.preventDefault();
        setCart(e.target.value)
      }
    function handleAddToCart() {
    if (!isAuthenticated()) {
      toast.error("Login before add product to cart!", {
        position: "top-right"
    })
      history.push('/login')
    } else {
      dispatch(addData({
        ...data,
        cart: cart,
        stock: data.stock,
        countSales :data.countSales
      }))
      toast.info(`${data.title} added to cart!`, {
        position: "top-right"
    })
    }
  }

    return (
        <Box sx={{backgroundColor:"#fff", padding:5, marginTop:6, borderRadius:5}}>
        <Grid container spacing={3}>
            <Grid item xs={12} lg={6}>
                    <Box sx={{width:'50%', margin:'auto'}}>
                        <img style={{width:'100%'}} alt={data?.title} src={data?.image}/>
                </Box>
            </Grid>
            <Grid item xs={12} lg={6}>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent:'space-between'
                    }}>
                    <Box sx={{marginBottom:1}}>  
                         <Typography variant="p" sx={{backgroundColor:'primary.light', padding:0.7, borderRadius:4, fontSize:11, fontWeight:'fontWeightBold', color:'primary.main'}}>{data?.category}</Typography>
                    </Box>
                    <Box sx={{marginBottom:2}}>
                        <Typography variant="h3">{data?.title}</Typography>
                    </Box>
                    <Box sx={{marginBottom:2,  display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                            <Typography variant="span" sx={{fontWeight:'fontWeightBold', fontSize:"35px"}}>${data?.price}</Typography>
                            <Rating name="read-only" value={data.rating.rate} readOnly />
                        </Box>
                        <Box sx={{marginBottom:2}}>
                            <Typography variant="span" sx={{fontWeight:'fontWeightBold', fontSize:"20px"}}>Stock: {data?.stock}</Typography>
                        </Box>
                    <Box sx={{marginBottom:2}}>
                            <Typography variant="body1" color="primary">{data?.description}</Typography>
                        </Box>
                        <Box sx={{
                            display:'flex',
                            justifyContent:'space-between'
                        }}>
                        <Input onChange={(e)=>handleChange(e)} label="Outlined secondary" type="number" color="secondary" value={cart}   />
                            <Box>
                            <Button size="large" onClick={handleAddToCart}>Add To Cart</Button>
                            </Box>
                        </Box>
                </Box>
            </Grid>
        </Grid>
        </Box>
) 
                }

function ProductDetail() {
    
    const URL  = `https://fakestoreapi.com/products`
  
    const { loading, error, data } = useFetch(URL)

    const { id } = useParams();
    console.log("id", id)
    // eslint-disable-next-line eqeqeq
    const filteredData = data?.filter((item)=> item.id == id)
    console.log("filter", filteredData)


    
  
    return (
        <Box>
            <Container>
                {loading ? <p>loading...</p> : 
                    error ? <p>{error}</p>
                        :
                        filteredData?.map(filteredData => (
                            <Content data={filteredData}/>
                        ))
                }
            </Container>
        </Box>
    )
}

export default ProductDetail
