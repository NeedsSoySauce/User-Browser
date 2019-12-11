import React, { useState } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Button, IconButton, Dialog, DialogTitle, withWidth } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

interface ICustomDialogProps {
    width: string, 
    children?: any,
    title: string,
    buttonText: string,
    icon: JSX.Element,
    onApply?: () => any,
    onReset?: () => any,
    onClose?: () => any
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        dialogRoot: {
            padding: theme.spacing(2, 3)
        },
        dialogTitle: {
            padding: 0,
            paddingBottom: theme.spacing(1)
        },
        buttonContainer: {
            padding: theme.spacing(2, 0, 0, 0),
            display: "flex",
            justifyContent: "space-around"
        },
        closeButton: {
            position: "absolute",
            right: 0,
            top: 0,
            margin: theme.spacing(1)
        }
    })
);

const CustomDialog: React.FC<ICustomDialogProps> = ({ width, children, title, buttonText, icon, onApply, onReset, onClose }) => {
    const [open, setOpen] = useState(false);
    const classes = useStyles();

    const handleClose = () => {
        setOpen(false);
    }

    let button;
    if (width !== "xs") {
        button = (
            <Button
                color="inherit"
                startIcon={icon}
                onClick={e => setOpen(true)}
            >
                {buttonText}
            </Button>
        )
    } else {
        button = (
            <IconButton
                size="small"
                color="inherit"
                onClick={() => setOpen(true)}
            >
                {icon}
            </IconButton>
        )
    }

    return (
        <div>
            {button}
            <Dialog
                classes={{
                    paper: classes.dialogRoot
                }}
                open={open}
                onClose={() => {
                    handleClose();
                }}
            >
                <IconButton
                    aria-label="close"
                    className={classes.closeButton}
                    size="small"
                    onClick={() => setOpen(false)}
                >
                    <CloseIcon fontSize="small" />
                </IconButton>

                <DialogTitle className={classes.dialogTitle}>{title}</DialogTitle>

                    {children}

                <div className={classes.buttonContainer}>
                    <Button color="primary" variant="outlined" onClick={onReset}>Reset</Button>
                    <Button color="primary" variant="contained" onClick={onApply}>Apply</Button>
                </div>

            </Dialog>
        </div>

    );
}

export default withWidth()(CustomDialog);