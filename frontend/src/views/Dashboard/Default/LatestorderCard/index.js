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
    Modal,
    Box,
    TextField,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
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
import { Field, Form, useForm } from 'react-final-form';
import ConfirmModal from './confirmModal';

const useStyles = makeStyles({
    table: {
        minWidth: 350,
    },
    imgproduct: {
        width: '20px',
        height: 'auto',
    },
});


export default function LatestorderCard() {
    const classes = useStyles();
    const [rows,setRows] = useState([]);
    const authed = useAuthed();
    const productService = ProductService();
    const [open,setOpen] = useState(false);
    const [openConfirmModal,setOpenConfirmModal] = useState(false);
    const [idToDelete,setIdToDelete] = useState(null);
    const [editRow,setEditRow] = useState(null);
    const [formInit,setFormInit] = useState(false);
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '0.5px solid #000',
        boxShadow: 24,
        p: 4,
      };
    useEffect(()=>{
        if(authed){
            productService.listProducts().then(setRows);
        }
    },[authed]);
    const handleClose = ()=>{
        setOpen(false);
    }
    const addProduct = (values)=>{
        console.log("addproudct",values);
        productService.createProduct(values).then((res)=>{
            let actualRows = rows;
            if(!editRow) {
                actualRows.push(res);
            setRows(actualRows);
            }else{
                setRows(actualRows.map((elt)=>{
                    if(elt.id==editRow.id) return res;
                    else return elt;
                }))
                setEditRow(null);
            }
            setOpen(false);
        });
    }
    
    const deleteProduct = (id)=>{

        productService.deleteProduct(id).then((res)=>{
            let actualRows = rows;
            setRows(actualRows.filter((elt)=>elt.id != id));
        }).catch((err)=>{
            console.log("erroor",err);
        })
        console.log("id",id);
    }

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
                                        <IconButton onClick={()=>{setOpen(true)}}>+</IconButton>
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
                                            <TableCell>{row.unité}</TableCell>
                                            {/* <TableCell>
                                                <Chip color={row.statuscolor} label={row.status} size="small" />
                                            </TableCell> */}
                                            <TableCell>
                                                <IconButton color="primary">
                                                    <EditOutlinedIcon onClick={()=>{
                                                        
                                                        setEditRow(row);
                                                        setFormInit(true);
                                                        setOpen(true);
                                                    
                                                        }}/>
                                                </IconButton>
                                                <IconButton color="inherit">
                                                    <DeleteOutlineOutlinedIcon  onClick={()=>{
                                                        
                                                        setIdToDelete(row.id);
                                                        setOpenConfirmModal(true)
                                                        }}/>
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    )})}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </CardContent>
                    <CardActions className="f-right">
                        
                    </CardActions>
                </Card>
            </Grid>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                >
                <Box sx={style}>
                    <Form onSubmit={addProduct}>
                                    {({
                                        handleSubmit,
                                        invalid,
                                        submitErrors,
                                        errors,
                                        touched,
                                        form,
                                        ...otherProps
                                         })=>{
                                             if(editRow && formInit ){
                                                form.change('nom',editRow?editRow.nom:'');
                                             form.change('marque',editRow?editRow.marque:'');
                                             form.change('prix',editRow?editRow.prix:'');
                                             form.change('type',editRow?editRow.type:'');
                                             form.change('unité',editRow?editRow.unité:'');
                                             form.change('id',editRow?editRow.id:''); 
                                             setFormInit(false);
                                             }
                                              
                                             
                                            return (
                                            <form onSubmit={handleSubmit}>
                                                <Field name="nom" >
                                            {({ input, meta }) => {
                                                console.log("input value",input.value);
                                                return (
                                                
                                            <TextField
                                                fullWidth
                                                autoFocus
                                                label="Nom du produit"
                                                margin="normal"
                                                name="nom"
                                                type="text"
                                                variant="outlined"
                                                 {...input} 
                                                
                                            />
                                            )}
                                            }
                                            </Field>
                                            <Field name="marque">
                                            {({ input, meta }) => (
                                                <TextField
                                                fullWidth
                                                label="Marque du produit"
                                                margin="normal"
                                                name="marque"
                                                type="text"
                                                defaultValue=""
                                                variant="outlined"
                                                {...input}
                                                
                                            />
                                            )}
                                            </Field>
                                            <Field name="prix">
                                            {({ input, meta }) => (
                                                <TextField
                                                fullWidth
                                                label="Prix du produit"
                                                margin="normal"
                                                name="prix"
                                                type="number"
                                                defaultValue=""
                                                variant="outlined"
                                                {...input}
                                                
                                            />
                                            )}
                                            </Field>
                                            <Field name="type">
                                            {({ input, meta }) => (
                                                <TextField
                                                fullWidth
                                                label="Type du produit"
                                                margin="normal"
                                                name="type"
                                                type="text"
                                                defaultValue=""
                                                variant="outlined"
                                                {...input}
                                                
                                            />
                                            )}
                                            </Field>
                                             <Field name="unité"> 
                                             {({ input, meta }) => ( 
                                               
                                                
                                               <Box sx={{ minWidth: 120 }}>
                                            <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">Unité</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="unité"
                                                
                                                label="Unité (Kg / L / Piece)"
                                                 {...input} 
                                            >
                                                <MenuItem value={"Kilogramme"}>Kilogramme</MenuItem>
                                                <MenuItem value={"Litre"}>Litre</MenuItem>
                                                <MenuItem value={"Piece"}>Piece</MenuItem>
                                            </Select>
                                            </FormControl>
                                            </Box>
                                            
                                              )}
                                               
                                             </Field>  
                                             
                                            <Divider />
                                            <Button
                                                type="submit"
                                            >
                                                Sauvegarder
                                            </Button>
                                            </form>
                                    )}
                                    }
                                </Form>
                </Box>
            </Modal>
            <ConfirmModal open={openConfirmModal} okCallback={(param)=>{
                if(param && idToDelete != null) {deleteProduct(idToDelete);setOpenConfirmModal(false);}
                else setOpenConfirmModal(false);
            }}></ConfirmModal>
        </Grid>
    );
}
