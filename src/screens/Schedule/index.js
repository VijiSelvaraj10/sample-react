import React, { useState } from 'react';
import { Grid, Typography, Checkbox, Button, Dialog, DialogContent } from '@mui/material';
// import Router from 'next/router';
// import { useSelector, useDispatch } from 'react-redux';
import TopBar from '../../components/TopBar';
import AddSchedule from './AddSchedule';

function Schedule(props) {
    const [state, setState] = useState({
        name: "",
        orderDate: "",
        deliveryType: "",
        status: "",
        deliveryDate: "",
        isOrder: false,
        orderOpen: false,
        detailOrder: false,
        mode: null,
        patientId: null,
        isView: true,
        isOpen: false,
    })

    const [schedules, setSchedules] = useState([{
        name: "surya",
        orderDate: "1/12/2022",
        deliveryType: "Mobile",
        status: "Active",
        deliveryDate: "12/12/2022",
    }, {
        name: "Sabari",
        orderDate: "dfssfdsfsd",
        deliveryType: "In Office",
        status: "Active",
        deliveryDate: "12/12/2022",
    }])
    // const dispatch = useDispatch();

    const editAction = (data) => {
        setState({...state, patientId: data.id, isOpen: true, mode: 'EDIT' })
    }

    const handleClose = () => {
        setState({...state, isOpen: false })
    }

    const buttonAction = () => {
        setState({...state,isOpen: true, mode: "ADD" })
    }

    // useEffect(() => {
    //     dispatch(fetchAllMembers())
    // }, [dispatch])

    // console.log("state.schedules" + JSON.stringify(state.schedules))
    return (
        <>
            <div style={{ position: 'fixed', width: "100vw", zIndex: 1 }}>
                <TopBar buttonAction={buttonAction} title={"Add Schedule"} />
            </div>
            <Grid container spacing={1}>
            <Grid item xs={12} style={{ backgroundColor: '#1368E9', borderBottomRightRadius: '10px', borderTopRightRadius: '10px', padding: "10px", position: "fixed", width: "83vw", top: '80px', zIndex: 1 }}>
                    <Grid container>
                        <Grid item xs={2}>
                            <Typography color={'#fff'} align='center'>Name / Group Name </Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography color={'#fff'} align='center'>Order Date</Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography color={'#fff'} align='center'>Delivery Date</Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography color={'#fff'} align='center'>Delivery Type</Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography color={'#fff'} align={'center'}>Status</Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography color={'#fff'} align='center'>Action</Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container spacing={2} position="relative" style={{ top: "140px", marginLeft: "1px" }}>
                {schedules.length > 0 ?
                    schedules.map((item, index) =>
                        <Grid item xs={12} key={index.toString()}>
                            <Grid container alignItems={'center'} style={{ border: '1px solid grey', borderRadius: '10px', backgroundColor: '#EFEFEF', padding: '5px' }}>
                                <Grid item xs={2}>
                                    <Typography align='center' style={{ textDecoration: "underline", color: "#1368E9" }}><Button variant="text" style={{ textTransform: "none" }}
                                        onClick={() => patientView(item.id)}>{item.name}</Button></Typography>
                                </Grid>
                                <Grid item xs={2}>
                                    <Typography align='center'>{item.orderDate}</Typography>
                                </Grid>
                                <Grid item xs={2}>
                                    <Typography align='center'>{item.deliveryDate}</Typography>
                                </Grid>
                                <Grid item xs={2}>
                                    <Typography align='center'>{item.deliveryType}</Typography>
                                </Grid>
                                <Grid item xs={2}>
                                    <Typography align='center'>{item.status}</Typography>
                                </Grid>
                                <Grid item xs={2}>
                                    <Grid container textAlign='center'>
                                        <Grid item xs={12}>
                                            <Button variant='text' style={{ textTransform: 'none' }} onClick={() => editAction(item)}>Edit</Button>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    )
                    :
                    <Typography>There is no content</Typography>
                    }
            </Grid>
            </Grid>
            <Dialog open={state.isOpen} onClose={() => handleClose()} PaperProps={{ sx: { borderRadius: '14px' } }} maxWidth={'md'}>
                <Typography color={"#FFF"} style={{ backgroundColor: '#1368E9', padding: "15px", fontSize: "24px" }}>{state.mode === "ADD" ? "Add Schedule" : "Edit Schedule"}</Typography>
                <DialogContent>
                    <AddSchedule closeAdd={handleClose} />
                </DialogContent>
            </Dialog>
        </>
    )
}

export default Schedule;