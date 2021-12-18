import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, {tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import useFetch from '../../hook/useFetch';

import { styled } from '@mui/styles';




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
  
  


export default function RekapPenjualan() {
  const URL  = `https://fakestoreapi.com/products`
  
  const { loading, error, data } = useFetch(URL)
  
  const total = (data?.reduce((a, b) => a + (parseInt(b.totalSales) || 0), 0))

  return (
      <Container>
      {
        loading ? <p>Loading....</p> :
          error ? <p>{error}</p>
            :<Box sx={{backgroundColor:'#fff', padding:4 , borderRadius:4}}>
            <Box sx={{marginBottom:3}}>
                <Typography variant="h3">Rekap Penjualan</Typography>
            </Box>
            <TableContainer component={Paper} sx={{border:0}}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead sx={{bakgroundColor:'#ccc'}}>
            <StyledTableRow sx={{border:0}}>
              <StyledTableCell>My Product</StyledTableCell>
              <StyledTableCell >Harga</StyledTableCell>
              <StyledTableCell >Terjual</StyledTableCell>
              <StyledTableCell >Pendapatan</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
                {data?.filter((item) => (item.countSales !== 0))?.map((item) => (
              <StyledTableRow
              key={item.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <StyledTableCell >
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
              <StyledTableCell >{item.price}</StyledTableCell>
              <StyledTableCell >{item.countSales}</StyledTableCell>
              <StyledTableCell >${item.totalSales}</StyledTableCell>
            </StyledTableRow>
            ))}
          </TableBody>
        </Table>
                </TableContainer>
                <Box sx={{display:'flex', justifyContent:'flex-end', marginTop:3}}>
                <Typography variant="span" sx={{fontSize:20, marginRight:8,fontWeight:'fontWeightBold'}}>Total Pendapatan</Typography>
                <Typography variant="span" sx={{fontSize:20,  fontWeight:'fontWeightBold', marginRight:15}}>${total}</Typography>
            </Box>
            </Box>
            
          }
    </Container>
  );
}
