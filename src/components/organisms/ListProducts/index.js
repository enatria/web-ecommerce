import React from 'react';
import { CardProduct } from '../../molecules';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import useFetch from '../../../hook/useFetch';
import { LoaderCatalog } from '../../molecules';

const ListProducts = () => {

  const URL  = `https://fakestoreapi.com/products/`

  const {loading, error, data} = useFetch(URL)
    return (
        <Box>
            <Container>
                    {loading ? <LoaderCatalog/> 
                        : error ? <div>{error} </div>             
                            : <Grid container spacing={4}>
                                {data?.map((item, key) => (
                                    <Grid item xs={12} xl={4} sm={6} lg={4} md={6} key={key} >
                                        <CardProduct data={item} />
                                    </Grid>
                                ))}
                        </Grid>
                }
            </Container>
        </Box>
    )
}

export default ListProducts
