import React, { memo} from 'react';
import { Grid, Button, IconButton, TextField, } from '@mui/material';
import { TbLogout } from 'react-icons/tb';
import Router from 'next/router';

function TopBar(props) {
   
     const logoutAction = () => {
        Router.push({ pathname: '/' })
    }

   const addButtonAction = () => {
        props.buttonAction()
   }
    return (
        <>
            <Grid container alignItems={"center"} height={80} style={{backgroundColor:"#FFF"}}>
                <Grid item xs={10}>
                    <Grid container justifyContent={'center'} alignItems={'center'}>
                        <Grid item xs={9}>
                            <div style={{  width: '25rem', border: '1px solid grey', borderRadius: '25px' }}>
                                <TextField placeholder='Search' size = "medium" style={{ marginTop: '-9px', width: '25rem' }} sx={{
                                    "& fieldset": { border: 'none' },
                                }} />
                            </div>
                        </Grid>
                        <Grid item xs={2} textAlign="center">
                            <Button style={{ backgroundColor: '#1368E9', fontWeight: 'bold', color: 'white', textTransform:"none"}}  onClick={() => addButtonAction()} >{!!props.title ? props.title:"Add Product" } </Button>
                        </Grid>
                        <Grid item xs={1}>
                            <IconButton  onClick={() => logoutAction()}  style={{ color: '#1368E9' }}><TbLogout size={35} /></IconButton>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}

export default memo(TopBar) ;