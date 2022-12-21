import React, { useState, useEffect } from 'react';
import { Grid, Typography, Checkbox, Button, Dialog, DialogContent } from '@mui/material';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllMembers } from '../../store/action/memberAction';
import EditPatient from './EditPatient';
import AddPatient from './AddPatient';
import CreateOrder from './CreateOrder';
import TopBar from '../../components/TopBar';
import ClearTwoToneIcon from '@mui/icons-material/ClearTwoTone';
import basicStyles from './index.module.scss';


function Patient() {
    const [state, setState] = useState({
        isOrder: false,
        orderOpen: false,
        detailOrder: false,
        mode: null,
        patientId: null,
        isView: true,
        isOpen: false
    })
    const dispatch = useDispatch();
    const router = useRouter();

    const members = useSelector((state) => state.memberReducer.members);

    const patientView = (id) => {
        router.push({ pathname: '/patients/view-patient', query:"patientId=" + id })
    }

    const editAction = (data) => {
        setState({ ...state, patientId: data.id, isOpen: true, mode: 'EDIT' })
    }

    const handleClose = () => {       
           setState({ ...state, isOpen: false, isView: false })
     }

    const buttonAction = () => {
        setState({ ...state, isOpen: true, mode: "CRO" })
    }

    useEffect(() => {
        dispatch(fetchAllMembers())
    }, [dispatch])

    return (
        <>
            <div style={{ position: 'fixed', width: "100vw", zIndex: 1 }}>
                <TopBar buttonAction={buttonAction} title={"Create Order"} />
            </div>
            <Grid container spacing={1}>
                <Grid item xs={12} style={{ backgroundColor: '#1368E9', borderTopRightRadius: '10px', borderBottomRightRadius: '10px', padding: '10px', position: "fixed", width: "83vw", top: '80px', zIndex: 1 }}>
                    <Grid container >
                        <Grid item xs={2}>
                            <Typography className = {basicStyles.textDesign} textAlign='center'>Name</Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography className = {basicStyles.textDesign} textAlign='center'>Email</Typography>
                        </Grid>
                        <Grid item xs={3}>
                            <Typography className = {basicStyles.textDesign} textAlign='center'>Phone</Typography>
                        </Grid>
                        <Grid item xs={1}>
                            <Typography className = {basicStyles.textDesign}>Allergies</Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography className = {basicStyles.textDesign} textAlign='center'>Detail</Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container spacing={2} position="relative" style={{ top: "140px", marginLeft: "1px" }}>
                    {!!members && members.map((item, index) => (
                        <Grid item xs={12} key={index.toString()}>
                            <Grid container alignItems={'center'} style={{ border: '1px solid grey', borderRadius: '10px', backgroundColor: '#EFEFEF', padding: '5px' }}>
                                <Grid item xs={2}>
                                    <Typography align='center' style={{ textDecoration: "underline", color: "#1368E9" }}><Button variant="text" style={{ textTransform: "none" }} onClick={() => patientView(item.id)}><span> {`${item.first_name} ${item.last_name}`}</span></Button></Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <Typography align='center'>{item.email}</Typography>
                                </Grid>
                                <Grid item xs={3}>
                                    <Typography align='center'>{item.phone_number}</Typography>
                                </Grid>
                                <Grid item xs={1}>
                                    <Checkbox checked = {item.allergies === "true" } icon={<ClearTwoToneIcon />} />
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
                    ))}
                </Grid>
            </Grid>
            <Dialog open={state.isOpen} onClose={() => handleClose()} PaperProps={{ sx: { borderRadius: '14px' } }} maxWidth={'md'}>
                <Typography className={basicStyles.DialogHeading}>{state.mode === "ADD" ? "Add Patient" : state.mode === "EDIT" ? "Edit Patient":"Create Order"}</Typography>
                   <DialogContent>
                    {state.mode === "ADD" ? <AddPatient closeAdd={handleClose} /> : state.mode === "EDIT" ? <EditPatient editPatientId={state.patientId} closeEdit={handleClose} />  :  <CreateOrder closeAdd={handleClose} />}
                </DialogContent>
            </Dialog>
        </>
    )
}

export default Patient;