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
    MenuList,
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
import { Field, Form } from 'react-final-form';
import { DepenseService } from '../../../../services/depense.service';
import ConfirmModal from '../LatestorderCard/confirmModal';
import { useHistory } from 'react-router';
import CustomAutocomplete from './autocomplete';

 
const useStyles = makeStyles({
    table: {
        minWidth: 350,
    },
    imgproduct: {
        width: '20px',
        height: 'auto',
    },
});


export default function DepensesTable() {
    const classes = useStyles();
    const [rows,setRows] = useState([]);
    const [products,setProducts] = useState([]);
    const authed = useAuthed();
    const productService = ProductService();
    const depenseService = DepenseService();
    const [open,setOpen] = useState(false);
    const [openConfirmModal,setOpenConfirmModal] = useState(false);
    const [idToDelete,setIdToDelete] = useState(null);
    const [editRow,setEditRow] = useState(null);
    const [formInit,setFormInit] = useState(false);
    const [productValue,setProductValue] = useState();
    const [selectedProduct,setSelectedProduct] = useState();
    const [selectedProductId,setSelectedProductId] = useState();
    const [suggestionList,setSuggestionList] = useState([]);
    const [showAutoCompleteList,setShowAutoCompleteList] = useState(false);
    const history = useHistory();
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
            productService.listProducts().then(setProducts).catch((err)=>{
                if(err == 403) history.push("/application/login");
            });
            depenseService.listDepenses().then(setRows).catch((err)=>{
                if(err == 403) history.push("/application/login");
            });
        }
    },[authed]);
    
    const handleClose = ()=>{
        setOpen(false);
    }
    const addDepense= (values)=>{
        
        let produitId = values.produit;
        values.produit = {};
        values.produit.id = produitId;
       

        depenseService.createDepense(values).then((res)=>{
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
        }).catch((err)=>{
            if(err == 403) history.push("/application/login");
        });
    }
    const deleteDepense = (id)=>{

        depenseService.deleteDepense(id).then((res)=>{
            let actualRows = rows;
            setRows(actualRows.filter((elt)=>elt.id != id));
        }).catch((err)=>{
            if(err == 403) history.push("/application/login");
        });
        console.log("id",id);
    }
    const productOnChange = (evt)=>{
            console.log("onChange");
            
    }
    const productOnFocus = ()=>{
        console.log("onFocus")
            setShowAutoCompleteList(true);
    }
    const productOnBlur = (evt)=>{
        console.log("onBlur")
        if(!products.find((elt)=>elt.nom == selectedProduct))setSelectedProduct('');
        setShowAutoCompleteList(false);
        evt.preventDefault();

    }
    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <Card>
                    <CardHeader
                        title={
                            <Typography component="div" className="card-header">
                                Depenses
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
                                        <TableCell>Produit</TableCell>
                                        <TableCell>Quantit??</TableCell>
                                        <TableCell>Prix Total</TableCell>
                                        <TableCell>Date</TableCell>
                                        <TableCell>Unit??</TableCell>
                                        <TableCell>Actions</TableCell>
                                        <IconButton onClick={()=>{setOpen(true)}}>+</IconButton>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows?.map((row, index) =>{ 
                                        
                                        return (
                                        <TableRow key={index}>
                                            <TableCell>{row.id}</TableCell>
                                            <TableCell>{row.produit.nom}</TableCell>
                                            <TableCell>
                                            {row.quantity}
                                            </TableCell>
                                            <TableCell>{row.totalPrice}</TableCell>
                                            <TableCell>{''+new Date(row.dateDepense).getDate() +'/'+(new Date(row.dateDepense).getMonth()+1) +'/'+ new Date(row.dateDepense).getFullYear() }</TableCell>
                                            <TableCell>{row.produit.unit??}</TableCell>
                                            {/* <TableCell>
                                                <Chip color={row.statuscolor} label={row.status} size="small" />
                                            </TableCell> */}
                                            <TableCell>
                                            <IconButton color="primary">
                                                    <EditOutlinedIcon onClick={()=>{
                                                        setOpen(true);
                                                        setEditRow(row);
                                                        setFormInit(true);
                                                        
                                                    
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
                    <Form onSubmit={addDepense}>
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
                                                form.change('produit',editRow?editRow.produit.id:'');
                                                
                                            setSelectedProduct(editRow.produit.nom);
                                            setSelectedProductId(editRow.produit.id);
                                             form.change('quantity',editRow?editRow.quantity:'');
                                             form.change('totalPrice',editRow?editRow.totalPrice:'');
                                             
                                             form.change('dateDepense',
                                             editRow ?
                                             new Date(editRow.dateDepense).getFullYear() +'-'+(new Date(editRow.dateDepense).getMonth()+1) +'-'+ new Date(editRow.dateDepense).getDate():'');
                                             form.change('unit??',editRow?editRow.produit.unit??:'');
                                             form.change('id',editRow?editRow.id:''); 
                                             setFormInit(false);
                                             }
                                             return(
                                            <form onSubmit={handleSubmit}>
                                                <Field name="produit">
                                            {({ input, meta }) => (
                                            <Box sx={{ minWidth: 120 }}>

                                            <FormControl fullWidth>
                                            {/* <InputLabel id="demo-simple-select-label">Produit</InputLabel> */}
                                            {  (<CustomAutocomplete initialValue = {editRow?editRow.produit?editRow.produit.id:'':''} initialInputValue={editRow?editRow.produit?editRow.produit.nom:'':''} form={form} products={products}></CustomAutocomplete>)}
                                            {/* <TextField 
                                            id="produit_nom"
                                            margin="normal"
                                                name="quantity"
                                                type="text"
                                                defaultValue=""
                                                variant="outlined"
                                                   
                                            label="Produit"
                                            onFocus = {productOnFocus}
                                            onBlur={productOnBlur}
                                            onChange={(evt)=>setSelectedProduct(evt.target.value)}
                                            value={selectedProduct}
                                            autoComplete="off"
                                            >
                                                
                                            </TextField> */}
                                            <input
                                            id="produit"
                                            
                                            {...input}
                                            
                                            type="hidden"
                                            />
                                            <div>

                                            </div>

                                            
                                            {/* {showAutoCompleteList && (
                                            <MenuList
                                            
                                            >
                                            { products.filter((elt)=> elt.nom.toLowerCase().startsWith(selectedProduct?.toLowerCase()) || !selectedProduct || selectedProduct =="" ).map((product)=>(
                                                <MenuItem
                                                onMouseDown={(evt)=>{
                                                    
                                                    console.log(evt.target.innerText);
                                                    form.change("produit",evt.target.value);
                                                    setSelectedProduct(evt.target.innerText);
                                            } }
                                                value={product.id}
                                                name={product.nom}>{product.nom}</MenuItem>
                                            ))}
                                            </MenuList>
                                            
                                            )} */}
                                            
                                             
                                            {/* <Select
                                                labelId="demo-simple-select-label"
                                                id="produit"
                                                
                                                label="Produit"
                                                 
                                            > 
                                           { products.map((product)=>(
                                                <MenuItem value={product.id}>{product.nom}</MenuItem>
                                            ))}
                                                
                                            </Select> */}
                                            </FormControl>
                                            </Box>
                                            )}
                                            </Field>
                                            <Field name="quantity">
                                            {({ input, meta }) => (
                                                <TextField
                                                fullWidth
                                                label="Quantit??"
                                                margin="normal"
                                                name="quantity"
                                                type="text"
                                                defaultValue=""
                                                variant="outlined"
                                                {...input}
                                                
                                            />
                                            )}
                                            </Field>
                                            <Field name="totalPrice">
                                            {({ input, meta }) => (
                                                <TextField
                                                fullWidth
                                                label="Prix Total"
                                                margin="normal"
                                                name="totalPrice"
                                                type="number"
                                                defaultValue=""
                                                variant="outlined"
                                                {...input}
                                                
                                            />
                                            )}
                                            </Field>
                                            <Field name="dateDepense">
                                            {({ input, meta }) => (
                                                <TextField
                                                fullWidth
                                                label="Date"
                                                margin="normal"
                                                name="dateDepense"
                                                type="date"
                                                defaultValue=""
                                                variant="outlined"
                                                {...input}
                                                
                                            />
                                            )}
                                            </Field>
                                             {/* <Field name="unit??"> 
                                             {({ input, meta }) => ( 
                                               
                                                
                                               <Box sx={{ minWidth: 120 }}>
                                            <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">Unit??</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="unit??"
                                                
                                                label="Unit?? (Kg / L / Piece)"
                                                 {...input} 
                                            >
                                                <MenuItem value={"Kilogramme"}>Kilogramme</MenuItem>
                                                <MenuItem value={"Litre"}>Litre</MenuItem>
                                                <MenuItem value={"Piece"}>Piece</MenuItem>
                                            </Select>
                                            </FormControl>
                                            </Box>
                                            
                                              )} 
                                             </Field>  */} 
                                             
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
                if(param && idToDelete != null) {deleteDepense(idToDelete);setOpenConfirmModal(false);}
                else setOpenConfirmModal(false);
            }}></ConfirmModal>
        </Grid>
    );
}
