import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import basicStyles from './index.module.scss';
import { useSelector } from 'react-redux';
import { fetchMedicalHistories } from '../../store/action/medicalHistory';
import { Grid, Typography, Button, Divider, Dialog, DialogContent, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import TopBar from '../../components/TopBar';
import moment from 'moment';
import EditPatient from './EditPatient';
import { fetchAllMembers } from '../../store/action/memberAction';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { fetchOrdersByMemberId, fetchAllOrders } from '../../store/action/orderAction';
import Image from 'next/image';

function ViewPatient(props) {
    const [state, setState] = useState({
        detailOpen: false,
        historyOpen: false,
        history: [],
        patientId: null,
        isOpen: false,
        isViewHistory: false,
        isViewMedication: false
    });

    const dispatch = useDispatch();

    const members = useSelector((state) => state.memberReducer.members);
    const histories = useSelector((state) => state.medicalHistoryReducer.histories);
    const order = useSelector((state) => state.orderReducer.order);

    useEffect(() => {
        dispatch(fetchMedicalHistories())
        dispatch(fetchAllMembers())
        dispatch(fetchAllOrders())
    }, [dispatch])

    const handleDetail = () => {
        setState({ ...state, detailOpen: true, historyOpen: false })
    }

    const handleHistory = () => {
        dispatch(fetchOrdersByMemberId(props.patientId))
        setState({ ...state, historyOpen: true, detailOpen: false })
    }

    const closeHistory = () => {
        setState({ ...state, isViewHistory: false })
    }

    const closeMedication = () => {
        setState({ ...state, isViewMedication: false })
    }

    const handleClose = () => {
        setState({ ...state, isOpen: false, patientId: null })
    }

    const medicalHistoryView = (param) => {
        setState({ ...state, isViewHistory: true, history: histories.filter((item) => item.member_id === param) })
    }

    const medicationView = (param) => {
        setState({ ...state, isViewMedication: true, isViewHistory: false, history: histories.filter((item) => item.member_id === param) })
    }

    const buttonAction = () => {
        setState({ ...state, isOpen: true, patientId: parseInt(props.patientId) })
    }

    let member = members.find((item) => item.id == props.patientId);
    console.log("^^^^^^^^"+JSON.stringify(order))

    return (
        <>
            <div style={{ position: 'fixed', width: "100vw", zIndex: 1 }}>
                <TopBar buttonAction={buttonAction} title={"Edit"} />
            </div>
            <Grid container spacing={2} justifyContent='center' alignItems='center'>
                <Grid item xs={12} style={{ backgroundColor: '#1368E9', borderTopRightRadius: '10px', borderBottomRightRadius: '10px', paddingTop: '5px', position: "fixed", width: "83vw", top: '80px', zIndex: 1 }}>
                    <Grid container textAlign='center'>
                        <Grid item xs={6}>
                            <Button className={!state.historyOpen ? basicStyles.activeButton : basicStyles.button} style={{ fontWeight: '500', fontSize: '20px', textTransform: 'none', borderTopRightRadius: '20px', borderTopLeftRadius: '20px', borderBottomRightRadius: '0px', borderBottomLeftRadius: '0px', padding: '4px 25px 5px 25px' }} onClick={() => handleDetail()}>Details</Button>
                        </Grid>
                        <Grid item xs={6}>
                            <Button style={{ fontWeight: '500', fontSize: '20px', textTransform: 'none', borderTopRightRadius: '20px', borderTopLeftRadius: '20px', borderBottomLeftRadius: '0px', borderBottomRightRadius: '0px', padding: '4px 25px 5px 25px' }} className={state.historyOpen ? basicStyles.activeButton : basicStyles.button} onClick={() => handleHistory()}>Order History</Button>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container spacing={2} position="relative" style={{ top: "140px", marginLeft: "1px" }}>
                    {state.historyOpen ?
                        <Grid item xs={12}>
                            <Grid container spacing={2} style={{ marginTop: "1px" }}>
                                <Grid item xs={4}>
                                    <Typography className={basicStyles.historyList}>Product Name</Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <Typography className={basicStyles.historyList}>Date Administered</Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <Typography className={basicStyles.historyList}>Payment Status</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Grid container style={{ border: '1px solid grey', borderRadius: '10px', backgroundColor: '#EFEFEF', padding: '5px' }}>
                                        <Grid item xs={12}>
                                            <Accordion>
                                                <AccordionSummary
                                                    expandIcon={<ExpandMoreIcon />}
                                                    aria-controls="panel1a-content"
                                                    id="panel1a-header">
                                                    <Grid item xs={4}>
                                                        <Typography><span style={{ fontWeight: "bold" }}>Order No:</span>{order.invoice !== undefined && order.order_number}</Typography>
                                                    </Grid>
                                                    <Grid item xs={4}>
                                                        <Typography><span style={{ fontWeight: "bold" }}>Paid Date:</span>{order.invoice !== undefined && order.invoice.paid_date}</Typography>
                                                    </Grid>
                                                    <Grid item xs={4}>
                                                        <Typography><span style={{ fontWeight: "bold" }}>Status:</span>{order.invoice !== undefined && order.invoice.status === "Active" ? "Paid" : "Unsuccess"}</Typography>
                                                    </Grid>
                                                </AccordionSummary>
                                                <AccordionDetails>
                                                    <Grid item xs={12}>
                                                        <Grid container>
                                                            <Grid item xs={3}>
                                                                <h3 style={{ fontWeight: "bold", textAlign: "center" }}>Product Name: </h3>
                                                            </Grid>
                                                            <Grid item xs={4}>
                                                                <h3 style={{ fontWeight: "bold", textAlign: "center", paddingLeft: "5rem" }}>Price: </h3>
                                                            </Grid>
                                                            <Grid item xs={5}>
                                                                <h3 style={{ fontWeight: "bold", textAlign: "center" }}>Quantity: </h3>
                                                            </Grid>
                                                        </Grid>
                                                        {order.orderItems !== undefined && order.orderItems.map((ele, index) =>
                                                            <Grid container key={index.toString()}>
                                                                <Grid item xs={1}>
                                                                    <Image src="/Atheletes.png" alt="Package" height="40px" width={"40px"} />
                                                                </Grid>
                                                                <Grid item xs={3} style={{ float: 'left' }}>
                                                                    <Typography>{index + 1}. {ele.product_name}</Typography>
                                                                </Grid>
                                                                <Grid item xs={3} style={{ textAlign: "center" }}>
                                                                    <Typography>{"$ " + ele.price}</Typography>
                                                                </Grid>
                                                                <Grid item xs={5} style={{ textAlign: "center" }}>
                                                                    <Typography>{ele.quantity}</Typography>
                                                                </Grid>
                                                            </Grid>
                                                        )}
                                                    </Grid>
                                                </AccordionDetails>
                                            </Accordion>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        :
                        <Grid item xs={12}>
                            <Grid container spacing={3} justifyContent='space-between' alignItems='center' style={{ marginTop: "1px" }}>
                                <Grid item xs={6}>
                                    <Grid container spacing={3} alignItems='center'>
                                        <Grid item xs={6}>
                                            <Typography align='right' className={basicStyles.detailText}> First Name</Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography align='left'>{member !== undefined && member.first_name}</Typography>

                                        </Grid>
                                    </Grid>
                                    <Divider />
                                </Grid>
                                <Grid item xs={6}>
                                    <Grid container spacing={3}>
                                        <Grid item xs={6}>
                                            <Typography align='right' className={basicStyles.detailText}>Email</Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography align='left'>{member !== undefined && member.email}</Typography>
                                        </Grid>
                                    </Grid>
                                    <Divider />
                                </Grid>
                                <Grid item xs={6}>
                                    <Grid container spacing={3}>
                                        <Grid item xs={6}>
                                            <Typography align='right' className={basicStyles.detailText}> Last Name</Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography align='left'>{member !== undefined && member.last_name}</Typography>
                                        </Grid>
                                    </Grid>
                                    <Divider />
                                </Grid>
                                <Grid item xs={6}>
                                    <Grid container spacing={3}>
                                        <Grid item xs={6}>
                                            <Typography align='right' className={basicStyles.detailText}> Phone Number</Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography align='left' >{member !== undefined && member.phone_number}</Typography>
                                        </Grid>
                                    </Grid>
                                    <Divider />
                                </Grid>
                                <Grid item xs={6}>
                                    <Grid container spacing={3}>
                                        <Grid item xs={6}>
                                            <Typography align='right' className={basicStyles.detailText}> Address Line 1</Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography align='left'>{member !== undefined && member.address_line1}</Typography>
                                        </Grid>
                                    </Grid>
                                    <Divider />
                                </Grid>
                                <Grid item xs={6}>
                                    <Grid container spacing={3}>
                                        <Grid item xs={6}>
                                            <Typography align='right' className={basicStyles.detailText}> Date of Birth</Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography align='left'>{moment(member !== undefined && member.date_of_birth).format('MM/DD/YYYY')}</Typography>

                                        </Grid>
                                    </Grid>
                                    <Divider />
                                </Grid>
                                <Grid item xs={6}>
                                    <Grid container spacing={3}>
                                        <Grid item xs={6}>
                                            <Typography align='right' className={basicStyles.detailText}>Address Line 2</Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography align='left'>{member !== undefined && member.address_line2}</Typography>
                                        </Grid>
                                    </Grid>
                                    <Divider />
                                </Grid>
                                <Grid item xs={6}>
                                    <Grid container spacing={3}>
                                        <Grid item xs={6}>
                                            <Typography align='right' className={basicStyles.detailText}>Gender</Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography align='left'>{member !== undefined && member.gender}</Typography>
                                        </Grid>
                                    </Grid>
                                    <Divider />
                                </Grid>
                                <Grid item xs={6}>
                                    <Grid container spacing={3}>
                                        <Grid item xs={6}>
                                            <Typography align='right' className={basicStyles.detailText}>City</Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography align='left'>{member !== undefined && member.city}</Typography>
                                        </Grid>
                                    </Grid>
                                    <Divider />
                                </Grid>
                                <Grid item xs={6}>
                                    <Grid container spacing={3}>
                                        <Grid item xs={6}>
                                            <Typography align='right' className={basicStyles.detailText}>Allergies</Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography style={{ color: "#1368E9", fontSize: '14px' }}>{member !== undefined && member.allergies === "true" ? "Yes" : "No"}</Typography>
                                        </Grid>
                                    </Grid>
                                    <Divider />
                                </Grid>
                                <Grid item xs={6}>
                                    <Grid container spacing={3}>
                                        <Grid item xs={6}>
                                            <Typography align='right' className={basicStyles.detailText}>State</Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography align='left'>{member !== undefined && member.state}</Typography>
                                        </Grid>
                                    </Grid>
                                    <Divider />
                                </Grid>
                                <Grid item xs={6}>
                                    <Grid container spacing={1}>
                                        <Grid item xs={6}>
                                            <Typography align='right' className={basicStyles.detailText}>Medical History</Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Button variant='text' size='small' style={{ textTransform: 'none', fontSize: '14px' }} onClick={() => medicalHistoryView(member.id)}>View</Button>
                                        </Grid>
                                    </Grid>
                                    <Divider />
                                </Grid>
                                <Grid item xs={6}>
                                    <Grid container spacing={3}>
                                        <Grid item xs={6}>
                                            <Typography align='right' className={basicStyles.detailText}>Zip Code</Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography align='left'>{member !== undefined && member.zip_code}</Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={6}>
                                    <Grid container spacing={1}>
                                        <Grid item xs={6}>
                                            <Typography align='right' className={basicStyles.detailText}>Medication</Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Button variant='text' size='small' style={{ float: "left", textAlign: "left", textTransform: 'none', fontSize: '14px' }} onClick={() => medicationView(member !== undefined && member.id)}>View</Button>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    }
                </Grid>
            </Grid>
            <Dialog open={state.isOpen} onClose={() => handleClose()} PaperProps={{ sx: { borderRadius: '14px' } }} maxWidth={"md"} fullWidth>
                <Typography className={basicStyles.DialogHeading}>{state.mode === "ADD" ? "Add Patient" : "Edit Patient"}</Typography>
                <DialogContent>
                    <EditPatient editPatientId={state.patientId} closeEdit={handleClose} />
                </DialogContent>
            </Dialog>

            <Dialog open={state.isViewHistory} onClose={() => closeHistory()} maxWidth={"xs"} fullWidth>
                <Typography className={basicStyles.DialogHeading}>Medical History</Typography>
                {state.history !== undefined && state.history.length > 0 ?
                    state.history.map((item, index) => (
                        <DialogContent key={index.toString()}>
                            <Typography style={{ padding: "10px" }}>{item.description}</Typography>
                        </DialogContent>
                    ))
                    :
                    <DialogContent>
                        <Typography style={{ padding: "10px" }}>There are no medical history</Typography>
                    </DialogContent>
                }
            </Dialog>

            <Dialog open={state.isViewMedication} onClose={() => closeMedication()} maxWidth={"xs"} fullWidth>
                <Typography className={basicStyles.DialogHeading}>Medication</Typography>
                {state.history !== undefined && state.history.length > 0 ?
                    state.history.map((item, index) => (
                        <DialogContent key={index.toString()}>
                            <Typography style={{ padding: "10px" }}>There are no medication</Typography>
                        </DialogContent>
                    ))
                    :
                    <DialogContent>
                        <Typography style={{ padding: "10px" }}>There are no medication</Typography>
                    </DialogContent>
                }
            </Dialog>
        </>
    )
}
ViewPatient.getInitialProps = async (context) => {
    const { patientId } = context.query;
    return { patientId: patientId };
};
export default ViewPatient;