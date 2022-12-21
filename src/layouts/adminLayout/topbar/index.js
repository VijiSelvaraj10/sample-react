import React, { Component } from 'react';
import { Grid, TextField, IconButton, Button } from '@mui/material';
import { TbLogout } from 'react-icons/tb';
import Router from 'next/router';

class TopBar extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    logoutAction = () =>{
        Router.push({ pathname: '/' })
    }


    render() {
        return (
            <>
          
                <Grid container position="fixed" style={{zIndex:1, backgroundColor:"#FFF"}}>
                    <Grid item xs={10}>
                    <Grid container justifyContent={'space-between'} alignItems={'center'}>
                        <Grid item xs={9}>

                            {/* <div size='small' placeholder='Search' style={{ height: '40px', width: '25rem', border: '1px solid grey', borderRadius: '17px', marginLeft: '-5rem' }}>
                                <TextField placeholder='Search' style={{ marginTop: '-9px', width: '25rem' }} sx={{
                                    "& fieldset": { border: 'none' },
                                }} />
                            </div> */}
                        </Grid>
                        <Grid item xs={2}>
                            <Button style={{ backgroundColor: '#1368E9', fontWeight: 'bold', color: '#FFF' }}>Add Product</Button>
                        </Grid>
                        <Grid item xs={1}>
                            <IconButton style={{ color: '#1368E9', marginLeft: -20}} onClick={() => this.logoutAction()}><TbLogout size={35} /></IconButton>
                        </Grid>
                    </Grid>
                    </Grid>
                </Grid>
            </>
        )
    }

}
export default TopBar;