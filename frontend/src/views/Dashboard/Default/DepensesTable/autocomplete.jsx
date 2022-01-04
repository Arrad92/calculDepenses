import { Autocomplete } from '@mui/material';
import React, { memo, useState } from 'react';
import TextFieldMui from '@mui/material/TextField';

const CustomAutocomplete = memo(({initialValue,initialInputValue,form,products,...props}) => {
    const [selectedProduct,setSelectedProduct] = useState(initialInputValue);
    const [selectedProductId,setSelectedProductId] = useState(initialValue);
    console.log("products",products);
    console.log("initialInputValue",initialInputValue);
    console.log("initialValue",initialValue);
    return (
        <Autocomplete
                                                    disablePortal
                                                    id="combo-box-demo"
                                                    options={products.map((prod)=>{return {id:prod.id,nom:prod.nom};})}
                                                    getOptionLabel={(option) => option.nom}
                                                    sx={{ width: 300 }}
                                                    renderInput={(params) => <TextFieldMui  {...params} label="Produit" />}
                                                    onChange={(event, option) => {
                                                        console.log("onchange",option); 
                                                         //input.onChange(option.id);
                                                         if(option){
                                                            setSelectedProductId(option.id);
                                                            form.change("produit",option.id)
                                                         }
                                                         
                                                    }}
                                                    value={selectedProductId}
                                                    inputValue={selectedProduct}
                                                    onInputChange={(event, newInputValue) => {
                                                        if(newInputValue != "undefined"){
                                                            console.log("oninputchange",newInputValue,event);
                                                        setSelectedProduct(newInputValue);
                                                        }
                                                        
                                                      }}
                                                    
                                                    />
    );
});

export default CustomAutocomplete;