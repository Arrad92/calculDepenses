import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Card, Grid,CardActions, CardContent, CardHeader, Divider, IconButton, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow, TextField, Typography } from '@material-ui/core';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import { useAuthed } from '../../../../hooks/useAuthed';
import { CAService } from '../../../../services/ca.service';
import { useHistory } from 'react-router';
import moment from 'moment';
import { format_date } from '../../../../utils';
import "./style.css";
import logoSuccess from './../../../../assets/images/success.svg';
import logoFailure from './../../../../assets/images/fail.svg';
import rightArrowIcon from './../../../../assets/images/rightArrow.svg';
import leftArrowIcon from './../../../../assets/images/leftArrow.svg';
import { makeStyles } from '@material-ui/styles';
const useStyles = makeStyles({
    table: {
        minWidth: 350,
    },
    imgproduct: {
        width: '20px',
        height: 'auto',
    },
});

const DateTable = memo(({...props}) => {
    const classes = useStyles();
    const [startDateRange,setStartDateRange] = useState(new Date());
    const [rangeDatesRows,setRangeDatesRows] = useState([]);
    const [editRowIndex,setEditRowIndex] = useState(-1);
    const [editAmountValue,setEditAmountValue] = useState(0);
    const [persistedRows,setPersistedRows] = useState([]);
    const authed = useAuthed();
    const caService = CAService();
    const history = useHistory();
    useEffect(()=>{
        let i=0;
        let dateRows = [];

          while(i<7){
              let date = new Date();
              date.setTime(startDateRange.getTime() - (i*24*60*60*1000));
              
              let date_string = date.getDate()+"-"+(date.getMonth()+1)+"-"+(date.getYear()+1900);
            dateRows.push({dateRevenu:date_string,amountRevenu:0});
                i++;
          }
          listCA(startDateRange,dateRows);
    },[authed,startDateRange])
   

    

    const listCA = (startDate,dateRows)=>{
        let date = new Date();
              date.setTime(startDate.getTime() - (7*24*60*60*1000));
        let date1 = date.getDate()+"-"+(date.getMonth()+1)+"-"+(date.getYear()+1900);
        let date2 =  startDate.getDate()+"-"+(startDate.getMonth()+1)+"-"+(startDate.getYear()+1900);
        if(authed){
            caService.listCAInterval(date1,date2).then((res)=>{
                
                let newDateRangeRows = dateRows.map((dateRow,index)=>{
                    
                    let persistedRow = res.find((elt)=>{
                        const persistedDate = format_date(new Date(elt.dateRevenu));
                        const rowDate = dateRow.dateRevenu;
                        
                        return persistedDate == rowDate;
                    }); 
                    if(persistedRow){
                        dateRow.amountRevenu = persistedRow.amountRevenu;
                        dateRow.id = persistedRow.id;
                        dateRow.isPersisted = true;
                    } 
                    return dateRow;
                })
                console.log(newDateRangeRows);
                setRangeDatesRows(newDateRangeRows);
            }).catch((err)=>{
                if(err == 403) history.push("/application/login");
            });
           
        }

    }

    
    const leftArrowClick = ()=>{
            let actualStartDate = startDateRange;
            let newStartDate = new Date();
            newStartDate.setTime(actualStartDate.getTime() - (7*24*60*60*1000));
            setStartDateRange(newStartDate);
            setEditRowIndex(-1);

    }
    const rightArrowClick = ()=>{
        let actualStartDate = startDateRange;
            let newStartDate = new Date();
            newStartDate.setTime(actualStartDate.getTime() + (7*24*60*60*1000));
            setStartDateRange(newStartDate);
            setEditRowIndex(-1);
    }
    const onSave = (index)=>{
        rangeDatesRows[index].amountRevenu = editAmountValue;
        
        let values = {
            amountRevenu :  rangeDatesRows[index].amountRevenu,
            dateRevenu : moment(rangeDatesRows[index].dateRevenu,"DD-MM-YYYY")
        }
        if(rangeDatesRows[index].id) values.id = rangeDatesRows[index].id;
        caService.createCA(values).then((res)=>{
                listCA(startDateRange,rangeDatesRows);
        }).catch((err)=>{
            if(err == 403) history.push("/application/login");
        });
    };
    const filterByDate = (evt)=>{
        console.log(evt.target.value);
        const dateFilter = new Date(evt.target.value);
        setStartDateRange(dateFilter);
    }
    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
            <Card>
                    <CardHeader
                        title={
                            <Typography component="div" className="card-header">
                                Chiffres d'affaires
                            </Typography>
                        }

                    >
                        test
                    </CardHeader>
                    <Divider />
                    <CardContent className="p-0">
                        <div className="filter-label"> Filtrer par date:</div>
                        <div className="filter-date-container"> <input onChange={filterByDate} type="date" className="input-date"></input>  </div>
            <TableContainer>
            <Table className={classes.table} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        
                                        <TableCell>Montant</TableCell>
                                        <TableCell>Date</TableCell>
                                        <TableCell>Etat</TableCell>
                                        <TableCell>Actions</TableCell>
                                        
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        rangeDatesRows.map((dateRow,index)=>(
                                            <TableRow>
                                            
                                            <TableCell>
                                                {
                                                    editRowIndex == index ?(
                                                        <TextField type="number"
                                                        InputProps={{ inputProps: { min: 0 } }}
            
                                                        value={editAmountValue}
                                                        onChange={(e)=>setEditAmountValue(e.target.value)} />
                                                    ):(
                                                        <>{  dateRow.amountRevenu}</>
                                                    )
                                                    
                                                }
                                                
                                                
                                            </TableCell>
                                            <TableCell>{dateRow.dateRevenu}</TableCell>
                                            <TableCell>{(dateRow.isPersisted )?(<img style={{width:'40px'}} src={logoSuccess}/>):(<img style={{width:'40px'}} src={logoFailure}/>)}</TableCell>
                                            <TableCell>
                                                {
                                                    editRowIndex != index ?(
                                                        <>
                                                        <IconButton color="primary">
                                                            <EditOutlinedIcon onClick={()=>{
                                                        
                                                                setEditRowIndex(index);
                                                                setEditAmountValue(dateRow.amountRevenu);
                                                                }}/>
                                                        </IconButton>
                                                        
                                                            </>
                                                    ):(
                                                        <>
                                                       <Button onClick = {()=>{
                                                           onSave(index);
                                                           setEditRowIndex(-1);
                                                       }} type="submit">Save</Button>
                                                       <Button onClick={()=>{
                                                        
                                                        setEditRowIndex(-1);
                                                        }}
                                                        >Cancel</Button>
                                                       </>
                                                    )
                                                }
                                            
                                            </TableCell>
                                            
                                        </TableRow> 
                                        ))
                                    }
                                    
                                </TableBody>
                                   
                            </Table>
                            </TableContainer>
                            </CardContent>
                    <CardActions className="f-right">
                        <IconButton style={{width:'50px'}} color="primary" onClick={leftArrowClick}>
                        <img src={leftArrowIcon}/>
                        </IconButton>
                        <IconButton style={{width:'50px'}} onClick = {rightArrowClick}>
                        <img src={rightArrowIcon}/>
                        </IconButton> 
                    </CardActions>
                </Card>
        </Grid>
        </Grid>
    );
});



export default DateTable;