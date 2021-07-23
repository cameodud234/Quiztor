import React from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    }
}));

function PopUpWin() {
    const classes = useStyles();
    return(
        <div>
            <p>Hello</p>
        </div>
    );
}

export default PopUpWin;