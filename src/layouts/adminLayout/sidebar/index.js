import React, { Component } from 'react';
import { Grid, Typography, Button, } from '@mui/material';
import basicStyles from './index.module.scss';
import { withRouter } from 'next/router';

const sideMenu =
    [{ title: 'Patients', href: '/patients' },
    { title: 'Product Management', href: '/product' },
    { title: 'Add-Ons', href: '/adon' },
    { title: 'Schedule', href: '/schedule' },
    { title: 'Coupon', href: '/coupon' }]

class SideBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedItem: 'Patients'
        }
    }

    handleSelect = (param) => {
        this.props.router.push(param.href)
        this.setState({ selectedItem: param.title });
    }

    render() {
        return (
            <>
                <Grid container spacing={1} position='fixed'>
                    <Grid item xs={2} style={{ backgroundColor: '#1368E9', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
                        <Grid container spacing={12}>
                            <Grid item xs={12}>
                                <Typography style={{ color: '#FFF', fontSize: '20px', textAlign: 'center', }}>Sabari Nathan</Typography>
                                <Typography style={{ color: '#FFF', fontSize: '12px', textAlign: 'center' }}>Admin</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Grid container spacing={6} >
                                    {sideMenu.map((item, index) =>
                                        <Grid item xs={12} key={index.toString()}>
                                            <Typography style={{ textAlign: 'center', cursor: 'pointer' }} ><Button className={this.state.selectedItem === item.title ? basicStyles.activeButton : basicStyles.button} style={{ textTransform: 'none', fontSize: "16px", borderRadius: "20px" }} onClick={() => this.handleSelect(item)}>{item.title}</Button></Typography>
                                        </Grid>
                                    )}
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </>
        )
    }
}

export default withRouter(SideBar);