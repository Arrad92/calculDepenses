import { Box, Button, Modal, Typography } from '@material-ui/core';
import React, { memo, useEffect } from 'react';

const ConfirmModal = memo(({okCallback,open=false}) => {
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
        //console.log("test",open,okCallback)
      },[open])
    return (
        <Modal open={open}>
            <Box sx={style}>
            <div>
            <Typography variant="h6">Etes vous sur de supprimer cette ligne?</Typography>
            </div>
            <div style={{display:'inline-block',marginRight:'16px'}}>
            <Button onClick={()=>okCallback(true)}> Oui </Button>
            </div>
            <div style={{display:'inline-block'}}>
            <Button onClick={()=>{okCallback(false)}}> Non </Button>
            </div>
            </Box>
        </Modal>
        
    );
});

export default ConfirmModal;