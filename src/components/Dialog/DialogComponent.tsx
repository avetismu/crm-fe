import { Button, Divider, Fade, Grid, Modal, Typography } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { dialogSelector } from '../../store/dialogSlice';

interface DialogComponentProps {
    affirmativeFC : () => void;
    negativeFC : () => void;
    title: string;
    text: string;

}

const DialogComponent: React.FC<DialogComponentProps> = (props) => {

    const DialogSelector = useSelector(dialogSelector)

    return (
        <Modal open={DialogSelector.isVisible}> 
            <Fade in={DialogSelector.isVisible}>
                <Grid container justifyContent="center">
                    <Grid className="dialog-box">
                        <Grid>
                            <Typography variant='h4'>
                                {props.title}
                            </Typography>
                        </Grid>
                        <Grid>
                            <Typography variant='body1' sx={{marginTop:3}}>
                                {props.text}
                            </Typography>
                        </Grid>
                        <Grid container justifyContent="center" sx={{paddingTop:2}}>
                            <Button variant="outlined" sx={{marginRight:1}} onClick={props.affirmativeFC}>Yes</Button>
                            <Button variant="contained" onClick={props.negativeFC}>No</Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Fade>
        </Modal>
    );
};

export default DialogComponent;