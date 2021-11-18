import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import {
    Card,
    CardHeader,
    Divider,
    Grid,
    CardContent,
    CardActions,
    Chip,
    IconButton,
    CardMedia,
    Typography,
    Button,
} from '@material-ui/core';

import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import { gridSpacing } from '../../../../store/constant';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import Phone1 from './../../../../assets/images/widget/PHONE1.jpg';
import Phone2 from './../../../../assets/images/widget/PHONE2.jpg';
import Phone3 from './../../../../assets/images/widget/PHONE3.jpg';
import Phone4 from './../../../../assets/images/widget/PHONE4.jpg';
import { useAuthed } from '../../../../hooks/useAuthed';
import { ProductService } from '../../../../services/product.service';

const useStyles = makeStyles({
    table: {
        minWidth: 350,
    },
    imgproduct: {
        width: '20px',
        height: 'auto',
    },
});

function createData(customer, cid, photo, product, quantity, date, status, statuscolor) {
    return { customer, cid, photo, product, quantity, date, status, statuscolor };
}

const rows = [
    createData('John Deo', '#81412314', Phone1, 'Moto G5', '10', '17-2-2017', 'Pending', 'secondary'),
    createData('Jenny William', '#68457898', Phone2, 'iPhone 8', '16', '20-2-2017', 'Paid', 'primary'),
    createData('Lori Moore', '#45457898', Phone3, 'Redmi 4', '20', '17-2-2017', 'Success', 'secondary'),
    createData('Austin Pena', '#62446232', Phone4, 'Jio', '15', '25-4-2017', 'Failed', 'primary'),
];

export default function LatestorderCard() {
    const classes = useStyles();
    const [rows,setRows] = useState([]);
    const authed = useAuthed();
    const productService = ProductService();
    useEffect(()=>{
        if(authed){
            productService.listProducts().then(setRows);
        }
    },[authed])

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <Card>
                    <CardHeader
                        title={
                            <Typography component="div" className="card-header">
                                Produits
                            </Typography>
                        }
                    />
                    <Divider />
                    <CardContent className="p-0">
                        <TableContainer>
                            <Table className={classes.table} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Id</TableCell>
                                        <TableCell>Nom</TableCell>
                                        <TableCell>Type</TableCell>
                                        <TableCell>Marque</TableCell>
                                        <TableCell>Prix</TableCell>
                                        <TableCell>Unité</TableCell>
                                        <TableCell>Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows.map((row, index) =>{ 
                                        
                                        return (
                                        <TableRow key={index}>
                                            <TableCell>{row.id}</TableCell>
                                            <TableCell>{row.nom}</TableCell>
                                            <TableCell>
                                            {row.type}
                                            </TableCell>
                                            <TableCell>{row.marque}</TableCell>
                                            <TableCell>{row.prix}</TableCell>
                                            <TableCell>{row.unite}</TableCell>
                                            {/* <TableCell>
                                                <Chip color={row.statuscolor} label={row.status} size="small" />
                                            </TableCell> */}
                                            <TableCell>
                                                <IconButton color="primary">
                                                    <EditOutlinedIcon />
                                                </IconButton>
                                                <IconButton color="inherit">
                                                    <DeleteOutlineOutlinedIcon />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    )})}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </CardContent>
                    <CardActions className="f-right">
                        <Button variant="text" size="small" color="primary">
                            View all Orders
                        </Button>
                    </CardActions>
                </Card>
            </Grid>
        </Grid>
    );
}
