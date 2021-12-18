import React from 'react'
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { CardLogin } from '../../components/molecules';
import Brand from '../../components/atoms/Brand';

const Login = () => {
    return (
        <Container>
            <Box sx={{
                width: '100vw',
                display: 'flex',
                flexDirection:'column',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop:2
        }}>
            <Brand/>
            <CardLogin/>
        </Box>
        </Container>
    )
}

export default Login
