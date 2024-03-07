import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {editSelector, hideEdit} from '../../store/editSlice';
import { Button, Fade, Grid, Modal, Typography } from '@mui/material';

interface EditComponentProps {
    // Define your props here
}

const EditComponent: React.FC<EditComponentProps> = (props) => {
    // Define your state and event handlers here
    const dispatch = useDispatch();
    const selector = useSelector(editSelector)

    return (
        <Modal open={selector.isVisible}> 
            <Fade in={selector.isVisible}>
                <Grid container justifyContent="center">
                    <Grid className="modal-box">
                        <Grid>
                            <Typography variant='h4'>
                                {selector.title}
                            </Typography>
                        </Grid>
                        <Grid>

                        </Grid>
                        <Grid container justifyContent="center">
                            <Button variant="contained" sx={{marginRight:"1em"}}>Submit</Button>
                            <Button variant="outlined" onClick={()=>{dispatch(hideEdit())}}>Close</Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Fade>
        </Modal>
    );
};

export default EditComponent;