import React, { Component } from 'react';
import SideBar from "./sidebar";
import TopBar from "./topbar"
import { Grid } from '@mui/material';

class AdminLayout extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        const { children } = this.props;
        return (
            <>
                <Grid container>
                    <Grid item xs={2}>
                        <SideBar />
                    </Grid>
                    <Grid item xs={10}>
                        <div style={{ height: "100vh" }}>
                            <main>
                                {children}
                            </main>
                        </div>
                    </Grid>
                </Grid>
            </>
        )
    }
}
export default AdminLayout;