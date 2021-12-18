import React, {useState} from 'react';

import Button from '../../components/atoms/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, {tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import { isAdmin} from '../../config/authService';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import Input from '@mui/material/Input';
import { styled } from '@mui/styles';
import useFetch from '../../hook/useFetch';

import { addData } from '../../redux/productSlice';



const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.white,
        fontSize:25,
        fontWeight:600
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
        border:0,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
      th: {
        border:0,
    }
  }));
  
const Row = ({ item }) => {
  
    const dispatch = useDispatch();
    const [stock, setStock] = useState(item.stock);
      
      const updateStock = (item,e) => {
        e.preventDefault();
        dispatch(addData({
          ...item,
          stock: stock,
        }))
        toast.success(`${item.title} stock has been updated`, {
          position: "top-right"
      })
      }
    
      const onChange = (id) => e => {
        setStock(e.target.value)
      }
  
    return (
      <StyledTableRow
              key={item.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <StyledTableCell sx={{width:'60%', padding:'30px 30px 30px 20px'}} >
                <Box sx={{display:'flex', alignItems:'center'}}>
                    <img src={item.image} alt={item.title} style={{width:'120px', objectFit:'contain'}}/>
                  <Box sx={{marginLeft:5 }}>
                  <Typography variant="h5" sx={{fontWeight:'fontWeightBold', fontSize:20}}>
                    {item.title}
                    </Typography>
                    <Typography variant="span" sx={{color:'primary.main'}}>
                    {item.description}
                    </Typography>
                    </Box>
                </Box>
              </StyledTableCell>
              <StyledTableCell >
                <Input defaultValue="0" value={stock} type="number" onChange={onChange(item.id)}/>
              </StyledTableCell>
              <StyledTableCell >
                <Button onClick={e=>updateStock(item, e)}>Update Stock</Button>
              </StyledTableCell>
            </StyledTableRow>
     );
  } 


export default function Cart() {
  const URL  = `https://fakestoreapi.com/products`
  
  const { loading, error, data } = useFetch(URL)
  const history = useHistory()

  if (!isAdmin()) {
    history.push('/')
}
  
  return (
      <Container>
      {
        loading ? <p>loading...</p>:
          error ? <p>{error}</p> :
            <Box sx={{backgroundColor:'#fff', padding:4 , borderRadius:4}}>
          <Box sx={{marginBottom:3}}>
              <Typography variant="h3">Admin/Products</Typography>
          </Box>
          <TableContainer component={Paper} sx={{border:0}}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead sx={{bakgroundColor:'#ccc'}}>
          <StyledTableRow sx={{border:0}}>
            <StyledTableCell>My Product</StyledTableCell>
            <StyledTableCell >Stock</StyledTableCell>
            <StyledTableCell >Action</StyledTableCell>
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {data?.map((item) => (
            <Row item={item} />
          ))}
        </TableBody>
      </Table>
              </TableContainer>
          </Box>
          }
    </Container>
  );
}
