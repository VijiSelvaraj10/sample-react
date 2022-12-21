import React, { Component } from 'react';
import { Grid, Typography, TextField, Button, MenuItem, Checkbox, styled, Table, TableHead, tableCellClasses, Paper, tableRowClasses, TableRow, TableCell, TableBody, Dialog, DialogContent, DialogTitle, TableContainer, CircularProgress, Pagination, Autocomplete } from '@mui/material';
import { connect } from "react-redux";
import { withRouter } from 'next/router';
import { compose } from "redux";
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { fetchClientsAction } from "../../store/actions/clientAction";
import basicStyle from '../../styles/scss/basic.module.scss';
import { fetchInvoiceAction, fetchReportingAction,updateReportingAction } from '../../store/actions/invoiceAction';
import _ from 'underscore';
import moment from "moment";
import { decrypt } from '../../helpers/cryptionUtils';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
import { fetchHcpcsAction } from '../../store/actions/hcpcsAction';
import { fetchInsuranceAction } from '../../store/actions/insuranceAction';
import { fetchFittersAction } from "../../store/actions/fitterAction";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        color: "#000",
        backgroundColor: "#fff",
        fontFamily: "Montserrat-Bold",
        height: 1
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: "12px",
        color: "#313233",
        border: "none",
        fontFamily: "Montserrat-Regular",
        height: 1,
        padding: "5px"
    }
}));
const StyledTableRow = styled(TableRow)(({ theme }) => ({
    [`&.${tableRowClasses.root}`]: {
        height: "14px",
    }
}));

class Reporting extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dateofServiceFromDate: null,
            dateofServiceToDate: null,
            billedDateFromDate: null,
            billedDateToDate: null,
            deletedDateFromDate: null,
            deletedDateToDate: null,
            selectedLocation: [],
            selectedInsuranceValues: null,
            selectedCreator: null,
            selectedFitter: null,
            selectedHCPCS: null,
            selectedSKU: null,
            selectedStatus: null,
            chunksize: null,
            loadingMode: null,
            dateofServiceFromDateError: false,
            dateofServiceToDateError: false,
            billedDateFromDateError: false,
            billedDateToDateError: false,
            deletedDateFromDateError: false,
            deletedDateToDateError: false,
            selectedLocationError: false,
            selectedInsuranceValuesErro: false,
            selectedCreatorErro: false,
            selectedFitterErro: false,
            selectedHCPCSErro: false,
            selectedSKUErro: false,
            selectedStatusErro: false,
            chunksizeErro: false,
            loadingModeErro: false,


            createdFromDate: null,
            createdToDate: null,
            status: "",
            //invoiced: "Yes",
            invoice_number: "",
            updateReportOpen: false,
            name: "",
            selectedAll: [],
            selectedReport: [],
            selected_All_Error: false,
            isSearchButtonClick: false,
            loading: false,
            clientId: '',
            createdFromDateError: false,
            createdToDateError: false,
            invalidCreatedToDateError: false,
            isPageCount: false,
            isProgress: false,
            date_of_service: "",
            select_all_key: false
        }
    }

    toInitialState = () => {
        this.setState({
            createdFromDate: null,
            createdToDate: null,
            status: "",
            updateReportOpen: false,
            name: "",
            clientId: '',
            selectedAll: [],
            selected_All_Error: false,
            createdFromDateError: false,
            createdToDateError: false,
            invalidCreatedToDateError: false
        })
    }
    componentDidMount() {
        this.props.dispatch(fetchClientsAction(this));
        this.props.dispatch(fetchHcpcsAction(this));
        this.props.dispatch(fetchInsuranceAction(this));
        this.props.dispatch(fetchFittersAction(this))
    }

    selectedClientLocation(data) {
        this.setState({ selectedLocation: [...data] })
    }

    handleClosed = () => {
        this.setState({ updateReportOpen: false, select_all_key: false })
        this.toInitialState();
    }
    selectCheckBox = (item, event) => {
        let currentSelectedIds = [];
        if (event.target.checked === true) {
            currentSelectedIds = [...this.state.selectedAll, item.id];
        } else {
            currentSelectedIds = [...this.state.selectedAll.filter(currentId => currentId !== item.id)];
        }
        this.setState({ selectedAll: currentSelectedIds, selected_All_Error: false, invoice_number: item.invoice_number, select_all_key: false });
    }

    selectAllCheckBox = () => {
        if (this.state.select_all_key === false) {
            this.setState({ select_all_key: !this.state.select_all_key, selectedAll: _.pluck(this.props.reporting, 'id') })
        }
        else {
            this.setState({ select_all_key: !this.state.select_all_key, selectedAll: [] })
        }
    }

    billDataAction = () =>{
 

    }

   claimAction =() =>{


    }


    updateReportOpen = () => {
        const { selectedAll, selectedReport } = this.state;
        let isError = false;
        if (selectedAll.length === 0) {
            this.setState({ selected_All_Error: true })
            isError = true;
        }
        if (isError === false) {
            let selectedReport = []
            for (let i = 0; i < this.props.reporting.length; i++) {
                if (this.state.selectedAll.includes(this.props.reporting[i].id)) {
                    selectedReport.push(this.props.reporting[i])
                }
            }
            this.setState({ updateReportOpen: true, selectedReport: selectedReport, invoice_number: "", date_of_service: "" })
            console.log("********selectedReport*****" + JSON.stringify(selectedReport))
        }
    }
    updateAction = () => {         
     let array =[]       
       this.state.selectedReport.map((item,index) =>{
            let claimobject = {}
             claimobject.orderItemId=  item.id
             claimobject.claimNumber = this.state[item.id.toString()+"claim"]
             claimobject.billedDate  = moment(this.state[item.id.toString()+"date"]).format("MM-DD-YYYY")
             array.push(claimobject)

          })
         let data ={"claims":array}
         this.props.dispatch(updateReportingAction(this, data));
        this.toInitialState();
    }
    handleSearch = () => {
        let { dateofServiceFromDate, dateofServiceToDate, billedDateFromDate, billedDateToDate, deletedDateFromDate, deletedDateToDate, selectedLocation, selectedInsuranceValues, selectedCreator, selectedFitter, selectedHCPCS, selectedSKU, selectedStatus, chunkSize, loadingMode, status } = this.state
        let data = {
            "fromDateService": dateofServiceFromDate !== null ? moment(dateofServiceFromDate).format("YYYY-MM-DD") : null,
            "toDateService": dateofServiceToDate !== null ? moment(dateofServiceToDate).format("YYYY-MM-DD") : null,
            "fromDeletedDate": billedDateFromDate !== null ? moment(billedDateFromDate).format("YYYY-MM-DD") : null,
            "toDeletedDate": billedDateToDate !== null ? moment(billedDateToDate).format("YYYY-MM-DD") : null,
            "fromBilledDate": deletedDateFromDate !== null ? moment(deletedDateFromDate).format("YYYY-MM-DD") : null,
            "toBilledDate": deletedDateFromDate !== null ? moment(deletedDateFromDate).format("YYYY-MM-DD") : null,
            "insuranceId": selectedInsuranceValues,
            "fitterId": selectedFitter,
            "orderStatus": status,
            "limit": chunkSize,
            "offset": 0,
            "clientLocationIds": _.pluck(selectedLocation, 'id'),
            "hcpcsId": selectedHCPCS,
            "skuNumber": selectedSKU
        }

        // console.log("*****************************" + JSON.stringify(data))
        this.props.dispatch(fetchReportingAction(data))

    }

    handleClear = () => {
        this.toInitialState();
    }
    exportFile = () => {
        var data = [];
        var csvs = [];
        var rows = document.querySelectorAll("table tr");
        for (var i = 0; i < rows.length; i++) {
            var row = [], cols = rows[i].querySelectorAll('td, th');
            for (var j = 1; j < cols.length; j++) {
                var data = cols[j].innerText.replace(/(\r\n|\n|\r)/gm, '').replace(/(\s\s)/gm, ' ')
                data = data.replace(/"/g, '""');
                row.push('"' + data + '"');
            }
            csvs.push(row.join(","));
        }
        let csv = csvs.join("\n");
        var csv_file, download_link;
        csv_file = new Blob([csv], { type: "text/csv" });
        download_link = document.createElement("a");
        download_link.download = "reporting.csv";
        download_link.href = window.URL.createObjectURL(csv_file);
        download_link.style.display = "none";
        document.body.appendChild(download_link);
        download_link.click();
    }

    handleChange = (event, newPage) => {
        let pageCount = null
        if (this.props.pageCount.filter((x) => x.page === newPage).length > 0) {
            this.setState({ isPageCount: true })
            pageCount = this.props.pageCount.filter((x) => x.page === newPage)[0].offset
        } else {
            pageCount = this.props.pageCount.length === 0 ? 0 : this.props.pageCount.length * 50;
        }
        this.props.dispatch(fetchInvoiceAction(this, pageCount, newPage));
    };

    displayIcdCode = (param) => {
        let result = [];
        let icdCodes = _.pluck(param, 'icdCode');
        if (icdCodes.length > 0) {
            result = _.pluck(icdCodes, 'code');
        }
        return result.toString()
    }

    displayModifier = (param) => {
        let result = [];
        let modifiers = _.pluck(param, 'modifier');
        if (modifiers.length > 0) {
            result = _.pluck(modifiers, 'name');
        }
        return result.toString()
    }

    render() {
        const { totalRecords } = this.props;

        //console.log("*************reporting******" + JSON.stringify(this.props.reporting))

        // console.log("*************ini***i***"+JSON.stringify(this.props.insurance))
        //console.log("*************ini******"+ JSON.stringify(this.props.hcpcs))
       console.log("*****2*****"+this.state["3claim"])
       console.log("******date****"+this.state["3date"])

        return (
            <Grid container >
                <Grid item xs={12} >
                    <Typography className={basicStyle.title} >Reports</Typography>
                </Grid>
                <Grid item xs={12} style={{ marginTop: "20px" }}>
                    <Grid container spacing={2} style={{ display: "flex", flexDirection: "row" }}>
                        <Grid item xs={12} sm={8} md={8} lg={8} xl={6} >
                            <Typography style={{ fontSize: "16px", fontFamily: "Montserrat-Bold", }} >Date of Service: </Typography>
                            <Grid container spacing={2} style={{ display: "flex", flexDirection: "row", marginTop: "5px" }}>
                                <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                                    <LocalizationProvider dateAdapter={AdapterMoment}>
                                        <DatePicker
                                            views={['year', 'month', 'day']}
                                            disableFuture
                                            value={this.state.dateofServiceFromDate}
                                            selected={this.state.dateofServiceFromDate}
                                            onChange={(date) => this.setState({ dateofServiceFromDate: date, isSearchButtonClick: false, dateofServiceFromDateError: false })}
                                            renderInput={(params) =>
                                                <TextField {...params}
                                                    size='small'
                                                    fullWidth
                                                    InputLabelProps={{
                                                        sx: { fontFamily: "Montserrat-Regular", color: "#848991", }
                                                    }}
                                                    error={this.state.dateofServiceFromDateError ? true : false}
                                                    helperText={this.state.dateofServiceFromDateError ? "Please enter valid created From Date" : false}
                                                />
                                            }
                                        />
                                    </LocalizationProvider>
                                </Grid>
                                <Grid item xs={12} sm={6} md={6} lg={6} xl={6} >
                                    <LocalizationProvider dateAdapter={AdapterMoment}>
                                        <DatePicker
                                            views={['year', 'month', 'day']}
                                            disableFuture
                                            minDate={this.state.dateofServiceFromDate}
                                            value={this.state.dateofServiceToDate}
                                            selected={this.state.dateofServiceToDate}
                                            onChange={(date) => this.setState({ dateofServiceToDate: date, isSearchButtonClick: false, dateofServiceToDateError: false, invalidCreatedToDateError: false })}
                                            renderInput={(params) =>
                                                <TextField {...params}
                                                    size='small'
                                                    fullWidth
                                                    InputLabelProps={{
                                                        sx: { fontFamily: "Montserrat-Regular", color: "#848991" }
                                                    }}
                                                    error={this.state.dateofServiceToDateError ? true : this.state.invalidCreatedToDateError ? true : false}
                                                    helperText={this.state.dateofServiceToDateError ? "Please enter valid created To Date" : this.state.invalidCreatedToDateError ? "Please enter created to date should be less than created from date " : false}
                                                />
                                            }
                                        />
                                    </LocalizationProvider>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} style={{ marginTop: "20px" }}>
                    <Grid container spacing={2} style={{ display: "flex", flexDirection: "row" }}>
                        <Grid item xs={12} sm={8} md={8} lg={8} xl={6} >
                            <Typography style={{ fontSize: "16px", fontFamily: "Montserrat-Bold", }}> Billed Date Rang :</Typography>
                            <Grid container spacing={2} style={{ display: "flex", flexDirection: "row", marginTop: "5px" }}>
                                <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                                    <LocalizationProvider dateAdapter={AdapterMoment}>
                                        <DatePicker
                                            views={['year', 'month', 'day']}
                                            disableFuture
                                            value={this.state.billedDateFromDate}
                                            selected={this.state.billedDateFromDate}
                                            onChange={(date) => this.setState({ billedDateFromDate: date, isSearchButtonClick: false, billedDateFromDateError: false })}
                                            renderInput={(params) =>
                                                <TextField {...params}
                                                    size='small'
                                                    fullWidth
                                                    InputLabelProps={{
                                                        sx: { fontFamily: "Montserrat-Regular", color: "#848991", }
                                                    }}
                                                    error={this.state.billedDateFromDateError ? true : false}
                                                    helperText={this.state.billedDateFromDateError ? "Please enter valid created From Date" : false}
                                                />
                                            }
                                        />
                                    </LocalizationProvider>
                                </Grid>
                                <Grid item xs={12} sm={6} md={6} lg={6} xl={6} >
                                    <LocalizationProvider dateAdapter={AdapterMoment}>
                                        <DatePicker
                                            views={['year', 'month', 'day']}
                                            disableFuture
                                            minDate={this.state.billedDateFromDate}
                                            value={this.state.billedDateToDate}
                                            selected={this.state.billedDateToDate}
                                            onChange={(date) => this.setState({ billedDateToDate: date, isSearchButtonClick: false, billedDateToDateError: false, invalidCreatedToDateError: false })}
                                            renderInput={(params) =>
                                                <TextField {...params}
                                                    size='small'
                                                    fullWidth
                                                    InputLabelProps={{
                                                        sx: { fontFamily: "Montserrat-Regular", color: "#848991" }
                                                    }}
                                                    error={this.state.billedDateToDateError ? true : this.state.invalidCreatedToDateError ? true : false}
                                                    helperText={this.state.billedDateToDateError ? "Please enter valid created To Date" : this.state.invalidCreatedToDateError ? "Please enter created to date should be less than created from date " : false}
                                                />
                                            }
                                        />
                                    </LocalizationProvider>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} style={{ marginTop: "20px" }}>
                    <Grid container spacing={2} style={{ display: "flex", flexDirection: "row" }}>
                        <Grid item xs={12} sm={8} md={8} lg={8} xl={6} >
                            <Typography style={{ fontSize: "16px", fontFamily: "Montserrat-Bold", }} >Deleted Date Rang :</Typography>
                            <Grid container spacing={2} style={{ display: "flex", flexDirection: "row", marginTop: 1 }}>
                                <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                                    <LocalizationProvider dateAdapter={AdapterMoment}>
                                        <DatePicker
                                            views={['year', 'month', 'day']}
                                            disableFuture
                                            value={this.state.deletedDateFromDate}
                                            selected={this.state.deletedDateFromDate}
                                            onChange={(date) => this.setState({ deletedDateFromDate: date, isSearchButtonClick: false, deletedDateFromDateError: false })}
                                            renderInput={(params) =>
                                                <TextField {...params}
                                                    size='small'
                                                    fullWidth
                                                    InputLabelProps={{
                                                        sx: { fontFamily: "Montserrat-Regular", color: "#848991", }
                                                    }}
                                                    error={this.state.deletedDateFromDateError ? true : false}
                                                    helperText={this.state.deletedDateFromDateError ? "Please enter valid created From Date" : false}
                                                />
                                            }
                                        />
                                    </LocalizationProvider>
                                </Grid>
                                <Grid item xs={12} sm={6} md={6} lg={6} xl={6} >
                                    <LocalizationProvider dateAdapter={AdapterMoment}>
                                        <DatePicker
                                            views={['year', 'month', 'day']}
                                            disableFuture
                                            minDate={this.state.deletedDateFromDate}
                                            value={this.state.deletedDateToDate}
                                            selected={this.state.deletedDateToDate}
                                            onChange={(date) => this.setState({ deletedDateToDate: date, isSearchButtonClick: false, deletedDateToDateError: false, invalidCreatedToDateError: false })}
                                            renderInput={(params) =>
                                                <TextField {...params}
                                                    size='small'
                                                    fullWidth
                                                    InputLabelProps={{
                                                        sx: { fontFamily: "Montserrat-Regular", color: "#848991" }
                                                    }}
                                                    error={this.state.deletedDateToDateError ? true : this.state.invalidCreatedToDateError ? true : false}
                                                    helperText={this.state.deletedDateToDateError ? "Please enter valid created To Date" : this.state.invalidCreatedToDateError ? "Please enter created to date should be less than created from date " : false}
                                                />
                                            }
                                        />
                                    </LocalizationProvider>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} style={{ marginTop: "30px" }}>
                    <Grid container >
                        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                            <Typography style={{ fontSize: "16px", fontFamily: "Montserrat-Bold", }} >Location List: :</Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} style={{ marginTop: "20px" }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6} md={4} lg={4} xl={3} >
                            <Typography style={{ fontSize: "16px", fontFamily: "Montserrat-Bold", }}>Locations :</Typography>
                            <Autocomplete
                                multiple
                                size={"small"}
                                options={this.props.clientLocation}
                                disableCloseOnSelect
                                onChange={(event, value) => this.selectedClientLocation(value)}
                                getOptionLabel={(option) => option.name}
                                renderOption={(props, option, { selected }) => (
                                    <li {...props}>
                                        <Checkbox
                                            icon={icon}
                                            checkedIcon={checkedIcon}
                                            style={{ marginRight: 8 }}
                                            checked={selected}
                                        />
                                        <Typography >{option.name}</Typography>
                                    </li>
                                )}
                                renderInput={(params) => (
                                    <TextField {...params} placeholder="Select One or Multiple Client Locations" />
                                )}
                            />
                        </Grid>
                        <Grid item xs={4} xl={3}>
                            <Typography style={{ fontSize: "16px", fontFamily: "Montserrat-Bold", }} >Insurance :</Typography>
                            <TextField
                                select
                                size={"small"}
                                fullWidth
                                value={this.state.selectedInsuranceValues}
                                onChange={(event) => this.setState({ selectedInsuranceValues: event.target.value })}>
                                {this.props.insurance.map((item, index) =>
                                    <MenuItem key={index} value={item.id}>{item.name}</MenuItem>)
                                }
                            </TextField>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} style={{ marginTop: "10px" }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6} md={4} lg={4} xl={3} >
                            <Typography style={{ fontSize: "16px", fontFamily: "Montserrat-Bold", }} >Creator :</Typography>
                            <TextField
                                select
                                size={"small"}
                                fullWidth
                                value={this.state.selectedCreator}
                                onChange={(event) => this.setState({ selectedCreator: event.target.value, isSearchButtonClick: false })}
                                style={{ fontFamily: 'Montserrat-Regular', }}
                            >
                                <MenuItem value={"ALL"} style={{ fontFamily: 'Montserrat-Regular', }}>ALL</MenuItem>
                                <MenuItem value={"DISPATCHED"} style={{ fontFamily: 'Montserrat-Regular', }}>DISPATCHED</MenuItem>
                                <MenuItem value={"BILLED"} style={{ fontFamily: 'Montserrat-Regular', }}>BILLED</MenuItem>
                                <MenuItem value={"CANCELLED"} style={{ fontFamily: 'Montserrat-Regular', }}>CANCELLED</MenuItem>
                            </TextField>
                        </Grid>
                        <Grid item xs={4} xl={3}>
                            <Typography style={{ fontSize: "16px", fontFamily: "Montserrat-Bold", }} >Fitter :</Typography>
                            <TextField
                                select
                                size={"small"}
                                fullWidth
                                value={this.state.selectedFitter}
                                onChange={(event) => this.setState({ selectedFitter: event.target.value })}>
                                {this.props.fitters.map((item, index) =>
                                    <MenuItem key={index} value={item.id}>{item.name}</MenuItem>)
                                }
                            </TextField>
                        </Grid>

                    </Grid>
                </Grid>
                <Grid item xs={12} style={{ marginTop: "10px" }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6} md={4} lg={4} xl={3} >
                            <Typography style={{ fontSize: "16px", fontFamily: "Montserrat-Bold", }} >HCPCS : </Typography>
                            <TextField
                                select
                                size={"small"}
                                fullWidth
                                value={this.state.selectedHCPCS}
                                onChange={(event) => this.setState({ selectedHCPCS: event.target.value, isSearchButtonClick: false })}
                                style={{ fontFamily: 'Montserrat-Regular', }}
                            >
                                {this.props.hcpcs.map((item, index) =>
                                    <MenuItem key={index} value={item.id}>{item.code}</MenuItem>)
                                }
                            </TextField>
                        </Grid>
                        <Grid item xs={4} xl={3}>
                            <Typography style={{ fontSize: "16px", fontFamily: "Montserrat-Bold", }} >SKU :</Typography>
                            <TextField
                                size={"small"}
                                fullWidth
                                value={this.state.selectedSKU}
                                onChange={(event) => this.setState({ selectedSKU: event.target.value })}>
                            </TextField>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} style={{ marginTop: "10px" }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6} md={4} lg={4} xl={3} >
                            <Typography style={{ fontSize: "16px", fontFamily: "Montserrat-Bold", }} > Status :</Typography>
                            <TextField
                                select
                                size={"small"}
                                fullWidth
                                value={this.state.status}
                                onChange={(event) => this.setState({ status: event.target.value, isSearchButtonClick: false })}
                                style={{ fontFamily: 'Montserrat-Regular', }}
                            >
                                <MenuItem value={"ALL"} style={{ fontFamily: 'Montserrat-Regular', }}>ALL</MenuItem>
                                <MenuItem value={"DISPATCHED"} style={{ fontFamily: 'Montserrat-Regular', }}>DISPATCHED</MenuItem>
                                <MenuItem value={"BILLED"} style={{ fontFamily: 'Montserrat-Regular', }}>BILLED</MenuItem>
                                <MenuItem value={"CANCELLED"} style={{ fontFamily: 'Montserrat-Regular', }}>CANCELLED</MenuItem>
                            </TextField>
                        </Grid>

                    </Grid>
                </Grid>

                <Grid item xs={12} style={{ marginTop: "10px" }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6} md={4} lg={4} xl={3} >
                            <Typography style={{ fontSize: "16px", fontFamily: "Montserrat-Bold", }} >Chunk Size </Typography>
                            <TextField
                                size={"small"}
                                fullWidth
                                value={this.state.chunkSize}
                                onChange={(event) => this.setState({ chunkSize: event.target.value, isSearchButtonClick: false })}
                                style={{ fontFamily: 'Montserrat-Regular', }}>
                            </TextField>
                        </Grid>
                        <Grid item xs={4} xl={3}>
                            <Typography style={{ fontSize: "16px", fontFamily: "Montserrat-Bold", }} > Loading Mode:</Typography>
                            <TextField
                                select
                                size={"small"}
                                fullWidth
                                value={this.state.loadingMode}
                                onChange={(event) => this.setState({ loadingMode: event.target.value })}>
                                <MenuItem value={"Serial"}>Serial</MenuItem>
                                <MenuItem value={"Parallel"}>Parallel</MenuItem>
                            </TextField>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} style={{ margin: "40px 0px 0px 0px" }}>
                    <Button style={{ fontFamily: "Montserrat-Bold", backgroundColor: "#2293D7", borderRadius: "20px", color: "#fff", padding: "8px 25px 8px 25px", marginLeft: "10px", fontSize: "14px" }} onClick={() => this.handleSearch()} >SEARCH</Button>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} style={{ margin: "40px 0px 0px 0px" }}>
                    <Button style={{ fontFamily: "Montserrat-Bold", backgroundColor: "#2293D7", borderRadius: "20px", color: "#fff", padding: "8px 25px 8px 25px", marginLeft: "10px", fontSize: "14px" }} onClick={() => this.updateReportOpen()} > Bulk Update </Button>
                </Grid>
                <Grid item xs={12} sm={11} md={12} lg={12} xl={10} style={{ margin: "20px 0px 10px 0px", display: "flex", justifyContent: "flex-end" }}>
                    <Button style={{ fontFamily: "Montserrat-Bold", backgroundColor: "#2293D7", borderRadius: "20px", color: "#fff", padding: "8px 25px 8px 25px", marginLeft: "10px", fontSize: "14px" }} onClick={() => this.exportFile()} >EXPORT</Button>
                </Grid>
                <Grid item xs={12} style={{ overflowX: "auto", width: "75vw", marginBottom: "20px" }} >
                    {
                        this.state.isProgress === false ?
                            <TableContainer item xs={12} style={{ backgroundColor: "transparent", borderRadius: 0, boxShadow: "0px 0px 0px 0px rgba(0,0,0,0)" }} component={Paper}>
                                <Table>
                                    <TableHead style={{ border: "1px solid #CBCBCB", borderLeftColor: "#fff", borderRightColor: "#fff" }}>
                                        <TableRow >
                                            {this.props.reporting.length > 0 && <StyledTableCell style={{ textAlign: "center" }}>
                                                <Checkbox size="small" checked={this.state.select_all_key}
                                                    onChange={(event) => this.selectAllCheckBox()} />
                                            </StyledTableCell>}

                                            <StyledTableCell >Order</StyledTableCell>
                                            {/* <StyledTableCell style={{ minWidth: "113px" }}>System Date</StyledTableCell> */}
                                            <StyledTableCell style={{ minWidth: "141px" }}>Date of Service</StyledTableCell>
                                            <StyledTableCell>Status</StyledTableCell>
                                            <StyledTableCell style={{ minWidth: "112px" }}>Billed Date</StyledTableCell>
                                            <StyledTableCell style={{ minWidth: "94px" }}>Claim ID</StyledTableCell>
                                            <StyledTableCell style={{ minWidth: "124px" }}>Patient MRN</StyledTableCell>
                                            <StyledTableCell style={{ minWidth: "132px" }}>Patient Name</StyledTableCell>
                                            <StyledTableCell style={{ minWidth: "132px" }}>Order Creator</StyledTableCell>
                                            <StyledTableCell style={{ minWidth: "120px" }}>Fitter Name</StyledTableCell>
                                            <StyledTableCell >HCPCS</StyledTableCell>
                                            <StyledTableCell style={{ minWidth: "113px" }}>Item Name</StyledTableCell>
                                            <StyledTableCell style={{ minWidth: "131px" }}>Product Code</StyledTableCell>
                                            <StyledTableCell>Quantity</StyledTableCell>
                                            <StyledTableCell>Size</StyledTableCell>
                                            {/* <StyledTableCell>Vendor</StyledTableCell> */}
                                            <StyledTableCell style={{ minWidth: "163px" }}>Ordering Provider</StyledTableCell>
                                            <StyledTableCell style={{ minWidth: "185px" }}>Supervising Provider</StyledTableCell>
                                            <StyledTableCell>Location</StyledTableCell>
                                            <StyledTableCell style={{ minWidth: "166px" }}>Primary Insurance</StyledTableCell>
                                            <StyledTableCell style={{ minWidth: "184px" }}>Primary Insurance ID</StyledTableCell>
                                            <StyledTableCell style={{ minWidth: "185px" }}>Secondary Insurance</StyledTableCell>
                                            <StyledTableCell style={{ minWidth: "203px" }}>Secondary Insurance ID</StyledTableCell>
                                            <StyledTableCell style={{ minWidth: "115px" }}>Charge Out</StyledTableCell>
                                            <StyledTableCell>Allowable</StyledTableCell>
                                            <StyledTableCell style={{ minWidth: "138px" }}>Self Pay Cost</StyledTableCell>
                                            <StyledTableCell style={{ minWidth: "100px" }}>Sales Tax</StyledTableCell>
                                            <StyledTableCell>Modifiers</StyledTableCell>
                                            {/* <StyledTableCell>Warnings</StyledTableCell> */}
                                            <StyledTableCell style={{ minWidth: "127px" }}>ICD-10 Codes</StyledTableCell>
                                            <StyledTableCell>orderId</StyledTableCell>
                                            {/* <StyledTableCell>itemId</StyledTableCell> */}
                                            <StyledTableCell >Invoiced</StyledTableCell>
                                            <StyledTableCell style={{ minWidth: "148px" }}>Invoice Number</StyledTableCell>
                                            <StyledTableCell>lastModified</StyledTableCell>
                                        </TableRow>
                                    </TableHead>
                                    {this.props.reporting.length > 0 ? this.props.reporting.map((item, index) =>
                                        <TableBody key={index.toString()} style={{ backgroundColor: (index % 2) ? "#fff" : "#E6E7FF" }}>
                                            <StyledTableRow >
                                                <StyledTableCell style={{ textAlign: "center" }}>
                                                    <Checkbox size="small" checked={this.state.select_all_key === true ? true : this.state.selectedAll !== undefined && this.state.selectedAll.length > 0 && this.state.selectedAll.includes(item.id)}
                                                        onChange={(event) => this.selectCheckBox(item, event)} />
                                                </StyledTableCell>
                                                <StyledTableCell style={{ textAlign: "center" }}>{!!item.order.order_number && item.order.order_number}</StyledTableCell>
                                                {/* <StyledTableCell style={{ minWidth: "113px", textAlign: "center" }}>{item.system_date}</StyledTableCell> */}
                                                <StyledTableCell style={{ minWidth: "130px", textAlign: "center" }}>{moment(!!item.order && item.order.date_of_service, "YYYY-MM-DD").format("MM-DD-YYYY")}</StyledTableCell>
                                                <StyledTableCell style={{ textAlign: "center" }}>{item.status.length > 0 && item.status}</StyledTableCell>
                                                <StyledTableCell style={{ minWidth: "101px", textAlign: "center" }}>{item.billed_date !== null ? item.billed_date : "-"}</StyledTableCell>
                                                <StyledTableCell style={{ minWidth: "87px", textAlign: "center" }}>{item.claim_number !== null ? item.claim_number : "-"}</StyledTableCell>
                                                <StyledTableCell style={{ minWidth: "113px", textAlign: "center" }}>{!!item.order.patient && decrypt(item.order.patient.mrn)}</StyledTableCell>
                                                <StyledTableCell style={{ minWidth: "120px", textAlign: "center" }}>{!!item.order.patient && `${decrypt(item.order.patient.first_name)} ${decrypt(item.order.patient.last_name)}`}</StyledTableCell>
                                                <StyledTableCell style={{ minWidth: "119px", textAlign: "center" }}>{!!item.order.fitter && item.order.fitter.name}</StyledTableCell>
                                                <StyledTableCell style={{ minWidth: "108px", textAlign: "center" }}>{!!item.order.fitter && item.order.fitter.name}</StyledTableCell>
                                                <StyledTableCell style={{ textAlign: "center" }}>{!!item.product && item.product.hcpcs_code}</StyledTableCell>
                                                <StyledTableCell style={{ minWidth: "103px", textAlign: "center" }}>{!!item.product && item.product.product_name}</StyledTableCell>
                                                <StyledTableCell style={{ minWidth: "120px", textAlign: "center" }}>{!!item.product && item.product.sku_number !== null ? item.product.sku_number : "-"}</StyledTableCell>
                                                <StyledTableCell style={{ textAlign: "center" }}>{item.quantity}</StyledTableCell>
                                                <StyledTableCell style={{ textAlign: "center" }}>{item.product_Option.length > 0 && item.product_Option}</StyledTableCell>
                                                {/* <StyledTableCell style={{ textAlign: "center" }}>{item.vendor.length>0 && item.vendor}</StyledTableCell> */}
                                                <StyledTableCell style={{ minWidth: "145px", textAlign: "center" }}>{!!item.order.orderingProvider && item.order.orderingProvider.first_name}</StyledTableCell>
                                                <StyledTableCell style={{ minWidth: "165px", textAlign: "center" }}>{!!item.order.supervisingProvider ? item.order.supervisingProvider.first_name : "-"}</StyledTableCell>
                                                <StyledTableCell style={{ textAlign: "center" }}>{!!item.order.clientLocation && item.order.clientLocation.name}</StyledTableCell>
                                                <StyledTableCell style={{ minWidth: "149px", textAlign: "center" }}>{!!item.order.primaryInsurance && item.order.primaryInsurance.name}</StyledTableCell>
                                                <StyledTableCell style={{ minWidth: "166px", textAlign: "center" }}>{!!item.order.primaryInsurance && item.order.primary_insurance_number}</StyledTableCell>
                                                <StyledTableCell style={{ minWidth: "167px", textAlign: "center" }}>{!!item.order.secondaryInsurance ? item.order.secondaryInsurance.name : "-"}</StyledTableCell>
                                                <StyledTableCell style={{ minWidth: "184px", textAlign: "center" }}>{!!item.order.secondaryInsurance ? item.order.secondary_insurance_number : "-"}</StyledTableCell>
                                                <StyledTableCell style={{ minWidth: "104px", textAlign: "center" }}>{item.charge_out}</StyledTableCell>
                                                <StyledTableCell style={{ textAlign: "center" }}>{item.allowable}</StyledTableCell>
                                                <StyledTableCell style={{ minWidth: "138px", textAlign: "center" }}>{item.patient_payment}</StyledTableCell>
                                                <StyledTableCell style={{ minWidth: "91px", textAlign: "center" }}>{item.sales_tax}</StyledTableCell>
                                                <StyledTableCell style={{ textAlign: "center" }}>{item.orderItemModifiers.length > 0 ? this.displayModifier(item.orderItemModifiers) : "-"}</StyledTableCell>
                                                {/* <StyledTableCell style={{ textAlign: "center" }}>{item.warnings}</StyledTableCell> */}
                                                <StyledTableCell style={{ textAlign: "center" }}>{item.orderItemIcdCodes.length > 0 ? this.displayIcdCode(item.orderItemIcdCodes) : "-"} </StyledTableCell>
                                                <StyledTableCell style={{ textAlign: "center" }}>{!!item.order && item.order.order_number}</StyledTableCell>
                                                {/* <StyledTableCell style={{ textAlign: "center" }}>{item.item_id}</StyledTableCell> */}
                                                <StyledTableCell style={{ textAlign: "center" }}>{item.is_invoiced.length > 0 && item.is_invoiced ? 'true' : 'false'}</StyledTableCell>
                                                <StyledTableCell style={{ minWidth: "133px", textAlign: "center" }}>{item.invoice_number.length > 0 ? item.invoice_number : "-"}</StyledTableCell>
                                                <StyledTableCell style={{ textAlign: "center" }}>{moment(item.updatedAt, "YYYY-MM-DD").format("MM-DD-YYYY")}</StyledTableCell>
                                            </StyledTableRow>
                                        </TableBody>) :
                                        <TableBody >
                                            <StyledTableRow >
                                                <StyledTableCell style={{ fontSize: "14px", color: "#000", textAlign: "center", minWidth: "350px", fontFamily: 'Montserrat-Regular' }}>There is no reporting</StyledTableCell>
                                            </StyledTableRow>
                                        </TableBody>}
                                </Table>
                            </TableContainer>
                            :
                            <Grid item xs={12} style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
                                <CircularProgress />
                            </Grid>
                    }

                </Grid>
                {this.state.loading === true &&
                    <Grid item xs={12} style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
                        <CircularProgress />
                    </Grid>
                }
                {this.state.selected_All_Error === true &&
                    <Grid item xs={12}>
                        <Typography style={{ color: "red", fontSize: "14px", textAlign: "start", fontFamily: 'Montserrat-Regular' }}> Please select the checkbox</Typography>
                    </Grid>}
                <Dialog maxWidth={"sm"} open={this.state.updateReportOpen} onClose={() => this.handleClosed()}>
                    <DialogTitle sx={{ color: "#313233", fontSize: "18px", fontFamily: 'Montserrat-Bold', textAlign: "center" }} className={basicStyle.title}>
                        Update Orders
                    </DialogTitle>
                    <DialogContent >
                        <Grid item xs={12} style={{ overflowX: "scroll" }}>
                            <Table>
                                <TableHead style={{ border: "1px solid #CBCBCB", borderLeftColor: "#fff", borderRightColor: "#fff" }}>
                                    <TableRow >
                                        <StyledTableCell >Checked</StyledTableCell>
                                        <StyledTableCell >Order</StyledTableCell>
                                        {/* <StyledTableCell style={{ minWidth: "113px" }}>System Date</StyledTableCell> */}
                                        <StyledTableCell style={{ minWidth: "141px" }}>Date of Service</StyledTableCell>
                                        <StyledTableCell>Status</StyledTableCell>
                                        <StyledTableCell style={{ minWidth: "112px" }}>Billed Date</StyledTableCell>
                                        <StyledTableCell style={{ minWidth: "94px" }}>Claim ID</StyledTableCell>
                                        <StyledTableCell style={{ minWidth: "124px" }}>Patient MRN</StyledTableCell>
                                        <StyledTableCell style={{ minWidth: "132px" }}>Patient Name</StyledTableCell>
                                        <StyledTableCell style={{ minWidth: "132px" }}>Order Creator</StyledTableCell>
                                        <StyledTableCell style={{ minWidth: "120px" }}>Fitter Name</StyledTableCell>
                                        <StyledTableCell >HCPCS</StyledTableCell>
                                        <StyledTableCell style={{ minWidth: "113px" }}>Item Name</StyledTableCell>
                                        <StyledTableCell style={{ minWidth: "131px" }}>Product Code</StyledTableCell>
                                        <StyledTableCell>Quantity</StyledTableCell>
                                        <StyledTableCell>Size</StyledTableCell>
                                        {/* <StyledTableCell>Vendor</StyledTableCell> */}
                                        <StyledTableCell style={{ minWidth: "163px" }}>Ordering Provider</StyledTableCell>
                                        <StyledTableCell style={{ minWidth: "185px" }}>Supervising Provider</StyledTableCell>
                                        <StyledTableCell>Location</StyledTableCell>
                                        <StyledTableCell style={{ minWidth: "166px" }}>Primary Insurance</StyledTableCell>
                                        <StyledTableCell style={{ minWidth: "184px" }}>Primary Insurance ID</StyledTableCell>
                                        <StyledTableCell style={{ minWidth: "185px" }}>Secondary Insurance</StyledTableCell>
                                        <StyledTableCell style={{ minWidth: "203px" }}>Secondary Insurance ID</StyledTableCell>
                                        <StyledTableCell style={{ minWidth: "115px" }}>Charge Out</StyledTableCell>
                                        <StyledTableCell>Allowable</StyledTableCell>
                                        <StyledTableCell style={{ minWidth: "138px" }}>Self Pay Cost</StyledTableCell>
                                        <StyledTableCell style={{ minWidth: "100px" }}>Sales Tax</StyledTableCell>
                                        <StyledTableCell>Modifiers</StyledTableCell>
                                        {/* <StyledTableCell>Warnings</StyledTableCell> */}
                                        <StyledTableCell style={{ minWidth: "127px" }}>ICD-10 Codes</StyledTableCell>
                                        <StyledTableCell>orderId</StyledTableCell>
                                        {/* <StyledTableCell>itemId</StyledTableCell> */}
                                        <StyledTableCell >Invoiced</StyledTableCell>
                                        <StyledTableCell style={{ minWidth: "148px" }}>Invoice Number</StyledTableCell>
                                        <StyledTableCell>lastModified</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                {this.state.selectedReport.map((item, index) =>
                                    <TableBody key={index.toString()} style={{ backgroundColor: (index % 2) ? "#fff" : "#E6E7FF" }}>
                                        <StyledTableRow >
                                            <StyledTableCell style={{ textAlign: "center" }}>
                                                <Checkbox size="small" disabled checked={this.state.selectedAll !== undefined && this.state.selectedAll.length > 0 && this.state.selectedAll.includes(item.id)}
                                                    onChange={(event) => this.selectCheckBox(item, event)} />
                                            </StyledTableCell>
                                            <StyledTableCell style={{ textAlign: "center" }}>{!!item.order.order_number && item.order.order_number}</StyledTableCell>
                                            {/* <StyledTableCell style={{ minWidth: "113px", textAlign: "center" }}>{item.system_date}</StyledTableCell> */}
                                            <StyledTableCell style={{ minWidth: "130px", textAlign: "center" }}>{!!item.order && item.order.date_of_service}</StyledTableCell>
                                            <StyledTableCell style={{ textAlign: "center" }}>{item.status.length > 0 && item.id}</StyledTableCell>
                                            <StyledTableCell style={{ minWidth: "160px", textAlign: "center" }}>
                                                {/* {item.billed_date !== null ? item.billed_date : "-"} */}
                                                <LocalizationProvider dateAdapter={AdapterMoment}>
                                                    <DatePicker
                                                        views={['year', 'month', 'day']}
                                                        disableFuture
                                                        value={this.state[item.id.toString()+"date"]}
                                                        selected={this.state[item.id.toString()+"date"]}
                                                        onChange={(date) => this.setState({[item.id.toString()+"date"]:date })}
                                                        renderInput={(params) =>
                                                            <TextField {...params}
                                                                size='small'
                                                                fullWidth
                                                                InputLabelProps={{
                                                                    sx: { fontFamily: "Montserrat-Regular", color: "#848991", alignSelf: "center" }
                                                                }}
                                                                error={false} />
                                                        }
                                                    />
                                                </LocalizationProvider>
                                            </StyledTableCell>
                                            <StyledTableCell style={{ minWidth: "155px", textAlign: "center" }}>
                                                {/* {item.claim_number !== null ? item.claim_number : "-"} */}
                                                <TextField
                                                    style={{ fontFamily: 'Montserrat-Regular' }}
                                                    size={"small"}
                                                    placeholder='Enter Claim Id'
                                                    value={this.state[item.id.toString()+"claim"]}
                                                    onChange={(event) => this.setState({ [item.id.toString()+"claim"]: event.target.value })} />
                                            </StyledTableCell>
                                            <StyledTableCell style={{ minWidth: "113px", textAlign: "center" }}>{!!item.order.patient && decrypt(item.order.patient.mrn)}</StyledTableCell>
                                            <StyledTableCell style={{ minWidth: "120px", textAlign: "center" }}>{!!item.order.patient && `${decrypt(item.order.patient.first_name)} ${decrypt(item.order.patient.last_name)}`}</StyledTableCell>
                                            <StyledTableCell style={{ minWidth: "119px", textAlign: "center" }}>{!!item.order.fitter && item.order.fitter.name}</StyledTableCell>
                                            <StyledTableCell style={{ minWidth: "108px", textAlign: "center" }}>{!!item.order.fitter && item.order.fitter.name}</StyledTableCell>
                                            <StyledTableCell style={{ textAlign: "center" }}>{!!item.product && item.product.hcpcs_code}</StyledTableCell>
                                            <StyledTableCell style={{ minWidth: "103px", textAlign: "center" }}>{!!item.product && item.product.product_name}</StyledTableCell>
                                            <StyledTableCell style={{ minWidth: "120px", textAlign: "center" }}>{!!item.product && item.product.sku_number !== null ? item.product.sku_number : "-"}</StyledTableCell>
                                            <StyledTableCell style={{ textAlign: "center" }}>{item.quantity}</StyledTableCell>
                                            <StyledTableCell style={{ textAlign: "center" }}>{item.product_Option.length > 0 && item.product_Option}</StyledTableCell>
                                            {/* <StyledTableCell style={{ textAlign: "center" }}>{item.vendor.length>0 && item.vendor}</StyledTableCell> */}
                                            <StyledTableCell style={{ minWidth: "145px", textAlign: "center" }}>{!!item.order.orderingProvider && item.order.orderingProvider.first_name}</StyledTableCell>
                                            <StyledTableCell style={{ minWidth: "165px", textAlign: "center" }}>{!!item.order.supervisingProvider ? item.order.supervisingProvider.first_name : "-"}</StyledTableCell>
                                            <StyledTableCell style={{ textAlign: "center" }}>{!!item.order.clientLocation && item.order.clientLocation.name}</StyledTableCell>
                                            <StyledTableCell style={{ minWidth: "149px", textAlign: "center" }}>{!!item.order.primaryInsurance && item.order.primaryInsurance.name}</StyledTableCell>
                                            <StyledTableCell style={{ minWidth: "166px", textAlign: "center" }}>{!!item.order.primaryInsurance && item.order.primary_insurance_number}</StyledTableCell>
                                            <StyledTableCell style={{ minWidth: "167px", textAlign: "center" }}>{!!item.order.secondaryInsurance ? item.order.secondaryInsurance.name : "-"}</StyledTableCell>
                                            <StyledTableCell style={{ minWidth: "184px", textAlign: "center" }}>{!!item.order.secondaryInsurance ? item.order.secondary_insurance_number : "-"}</StyledTableCell>
                                            <StyledTableCell style={{ minWidth: "104px", textAlign: "center" }}>{item.charge_out}</StyledTableCell>
                                            <StyledTableCell style={{ textAlign: "center" }}>{item.allowable}</StyledTableCell>
                                            <StyledTableCell style={{ minWidth: "138px", textAlign: "center" }}>{item.patient_payment}</StyledTableCell>
                                            <StyledTableCell style={{ minWidth: "91px", textAlign: "center" }}>{item.sales_tax}</StyledTableCell>
                                            <StyledTableCell style={{ textAlign: "center" }}>{item.orderItemModifiers.length > 0 ? this.displayModifier(item.orderItemModifiers) : "-"}</StyledTableCell>
                                            {/* <StyledTableCell style={{ textAlign: "center" }}>{item.warnings}</StyledTableCell> */}
                                            <StyledTableCell style={{ textAlign: "center" }}>{item.orderItemIcdCodes.length > 0 ? this.displayIcdCode(item.orderItemIcdCodes) : "-"} </StyledTableCell>
                                            <StyledTableCell style={{ textAlign: "center" }}>{!!item.order && item.order.order_number}</StyledTableCell>
                                            {/* <StyledTableCell style={{ textAlign: "center" }}>{item.item_id}</StyledTableCell> */}
                                            <StyledTableCell style={{ textAlign: "center" }}>{item.is_invoiced.length > 0 && item.is_invoiced ? 'true' : 'false'}</StyledTableCell>
                                            <StyledTableCell style={{ minWidth: "133px", textAlign: "center" }}>{item.invoice_number.length > 0 ? item.invoice_number : "-"}</StyledTableCell>
                                            <StyledTableCell style={{ textAlign: "center" }}>{moment(item.updatedAt, "YYYY-MM-DD").format("MM-DD-YYYY")}</StyledTableCell>
                                        </StyledTableRow>
                                    </TableBody>)}
                            </Table>
                        </Grid>
                        <Grid item xs={12} style={{ marginTop: "15px", display: "flex", justifyContent: "center" }}>
                            <Button style={{ fontFamily: "Montserrat-Bold", backgroundColor: "#2293D7", borderRadius: "20px", color: "#fff", padding: "5px 20px 5px 20px", marginLeft: "50px", fontSize: "14px" }} onClick={() => this.handleClosed()}>CANCEL</Button>
                            <Button style={{ fontFamily: "Montserrat-Bold", backgroundColor: "#2293D7", borderRadius: "20px", color: "#fff", padding: "5px 20px 5px 20px", marginLeft: "10px", fontSize: "14px" }} onClick={() => this.updateAction()} >UPDATE</Button>
                        </Grid>
                    </DialogContent>
                </Dialog>
                {this.state.isSearchButtonClick === true && this.props.reporting.length > 0 &&
                    <Grid item xs={12} style={{ display: "flex", justifyContent: "center" }}>
                        <Pagination count={Math.ceil(totalRecords / 50)} onChange={this.handleChange} />
                    </Grid>
                }
            </Grid>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        clients: state.clientReducer.clients,
        pageCount: state.invoiceReducer.pageCount,
        totalRecords: state.invoiceReducer.totalRecords,
        insurance: state.insuranceReducer.insurance,
        fitters: state.fitterReducer.fitters,
        clientLocation: state.clientReducer.clientLocation,
        hcpcs: state.hcpcsReducer.hcpcs,
        reporting: state.invoiceReducer.reporting,
    }
}
export default compose(withRouter, connect(mapStateToProps))(Reporting);