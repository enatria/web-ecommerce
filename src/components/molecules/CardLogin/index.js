import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { makeStyles } from '@mui/styles';
import { Button } from '../../atoms';
import { toast } from 'react-toastify';
import { isAuthenticated, authenticate  } from '../../../config/authService';
import { setTokens, setAdmin } from '../../../config/tokenCreator';
import { success, error } from '../../../redux/authenticationSlice';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles({
    root: {
        borderColor:'#fff'
    },
    input : {
        color:'#fff'
    }
});


  
const CardLogin = () => {
    
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory()
    const dispatch = useDispatch();

    

    if (isAuthenticated()) {
        history.push('/')
    }

    const classes = useStyles()

    const userData = { username: username, password: password };
        

    const handleSubmit = async (e) => {
        e.preventDefault();
            if(!username || !password){
                return toast.error("Fill up all the form!", {
                    position: "top-right"
                })
            }
        try {
            const authData = await authenticate(
                userData
            );
            console.log("auth", authData)
            if (authData.status === "admin") {
                setAdmin(authData.data);
                dispatch(success(authData));
                history.push('/admin')
                toast.success("Login success as admin!", {
                    position: "top-right"
                })
            }else if(authData.status === "true"){
                
                setTokens(authData.data);
                dispatch(success(authData));
                history.push('/')
                toast.success("Login success as user!", {
                    position: "top-right"
                })
            }else {
                dispatch(error(authData))
                toast.error(authData.data, {
                    position: "top-right"
                })
            }
        } catch (err) {
            dispatch(error("Something went wrong"));
        }
    }

    return (
        <Box sx={{
            backgroundColor: 'white',
            marginTop:3,
            display: "flex",
            flexDirection: 'column',
            width: '35vw',
            padding:5,
            justifyContent: 'space-between',
            alignItems:'center',
            borderRadius:4
        }}>
            <Box style={{
                marginBottom:25
            }}>
                <Typography variant="h5" color="primary.main" fontWeight="fontWeightBold">Login here!</Typography>
            </Box>
            <form  onSubmit={handleSubmit} method="POST">
                <TextField size="small" className={classes.root} id="outlined-basic" sx={{ marginBottom: 2, width: '100%' }} color='primary' label="Username" variant="outlined" value={username} onChange={(e)=>setUsername(e.target.value)}/>
                <TextField size="small" id="outlined-basic" sx={{ width: '100%' }} color="primary" label="Password" type="password" variant="outlined" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                <Box  sx={{marginTop:3, width:'100%'}}>
                    <Button type="submit">Login</Button>
                </Box>
                </form>
        </Box>
    )
}

export default CardLogin
