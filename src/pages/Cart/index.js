/* eslint-disable array-callback-return */
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, {tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Input from '@mui/material/Input';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import useFetch from '../../hook/useFetch';
import { Button } from '../../components/atoms';
import { styled } from '@mui/styles';
import { toast } from 'react-toastify';
import {useHistory} from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { isAuthenticated, isAdmin  } from '../../config/authService';
import { checkout } from '../../redux/productSlice';
import { addData } from '../../redux/productSlice';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.white,
        fontSize:25,
        fontWeight:600
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 18,
        fontWeight:600,
        border:0,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
      th: {
        border:0,
    }
  }));
  
  


export default function Cart() {
  const history = useHistory()
  const dispatch = useDispatch()
  const URL  = `https://fakestoreapi.com/products`
  
  const { loading, error, data } = useFetch(URL)
  const total = (data?.reduce((a, b) => a + (parseInt(b.totalCart) || 0), 0))
  const filteredData = data?.filter((item) => (item.cart > 0 ))
  if (!isAuthenticated()) {
    history.push('/login')
  }
  
  if (isAdmin()) {
    history.push('/')
  }

  const handleCheckout = (item,e) => {
    e.preventDefault();
    filteredData?.map(item => { 
      if (item.cart <= item.stock) {
        
        dispatch(checkout({
          ...item,
          countSales: item.cart >item.stock ? 0 : item.cart,
      }))
      toast.success("Success Checkout", {
        position: "top-right"
    })
      } else {
        toast.error(`${item.title} stock isnt available!`, {
          position: "top-right"
      })
      }
    })
    
  }

  const handleChange = (item,e)=> {
    const cart = e.target.value === 0 ? 0 : e.target.value
    const stock = item.stock
    console.log('cart: ', cart)
    console.log('stock: ', item.stock)
    dispatch(addData({
      ...item,
      cart,
      stock,
      countSales :item.countSales
    }))
    if (cart > stock) {
      toast.error(`${item.title} stock isnt available! Max ${stock} items`, {
        position: "top-right"
      })
    }
  }

  

  return (
      <Container>
      {
        loading ? <p>loading...</p>
          : error ? <p>{error}</p>
            :<Box sx={{backgroundColor:'#fff', padding:4 , borderRadius:4}}>
            <Box sx={{marginBottom:3}}>
                <Typography variant="h3">Cart</Typography>
            </Box>
            <TableContainer component={Paper} sx={{border:0}}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead sx={{bakgroundColor:'#ccc'}}>
            <StyledTableRow sx={{border:0}}>
              <StyledTableCell>My Product</StyledTableCell>
              <StyledTableCell >Qty</StyledTableCell>
              <StyledTableCell >Price</StyledTableCell>
              <StyledTableCell >Total</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
                {filteredData?.map((item) => (
              <StyledTableRow
              key={item.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <StyledTableCell >
              <Box sx={{display:'flex', alignItems:'center'}}>
                    <img src={item.image} alt={item.title} style={{width:'120px', objectFit:'contain'}}/>
                        <Box sx={{ marginLeft: 5 }}>
                  <Typography variant="h5" sx={{fontWeight:'fontWeightBold', fontSize:20}}>
                    {item.title}
                    </Typography>
                    <Typography variant="span" sx={{color:'primary.main'}}>
                    {item.description}
                    </Typography>
                    </Box>
              </Box>
              </StyledTableCell>
                    <StyledTableCell ><Input onChange={(e)=>handleChange(item, e)}label="Outlined secondary" type="number" color="secondary" value={item.cart}  />
                      {item.cart > item.stock && <Typography variant="small" sx={{fontSize: 14, color: 'red', display: 'block'}}>Out of stock, can't continue buying</Typography>}
                    </StyledTableCell>
              <StyledTableCell >${item.price}</StyledTableCell>
                    <StyledTableCell >${item.totalCart}</StyledTableCell>

                  </StyledTableRow>
                
            ))}
          </TableBody>
        </Table>
              </TableContainer>
              <Box sx={{display:'flex', justifyContent:'space-between', marginTop:3}}>
                <Typography variant="span" sx={{fontSize:20, fontWeight:'fontWeightBold'}}>Total</Typography>
                <Typography variant="span" sx={{fontSize:20, fontWeight:'fontWeightBold'}}>${total}</Typography>
            </Box>
            <Box sx={{display:'block'}}>
                <Button size="large" onClick={(e=>handleCheckout(data, e))}>Checkout</Button>
            </Box>
            </Box>
          }
    </Container>
  );
}
