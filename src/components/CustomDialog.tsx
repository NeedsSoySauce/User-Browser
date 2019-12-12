import { Button, Dialog, DialogTitle, IconButton, withWidth } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import React, { useState } from 'react';

interface ICustomDialogProps {
    width: string,
    children?: any,
    title: string,
    buttonText: string,
    icon: JSX.Element,
    onApply?: () => any,
    onReset?: () => any,
    onClose?: () => any,
    setActiveDialogId?: (value: number | null) => any,
    activeDialogId?: number | null,
    dialogId?: number
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

const CustomDialog: React.FC<ICustomDialogProps> = ({ width, children, title, buttonText, icon, onApply, onReset,
                                                      onClose, setActiveDialogId, activeDialogId, dialogId }) => {

    const [open, setOpen] = useState(false);
    const classes = useStyles();

    const handleClose = () => {
        setOpen(false);
    }

    const handleOpen = () => {
        setOpen(true);
        if (setActiveDialogId !== undefined && dialogId !== undefined) {
            setActiveDialogId(dialogId);
        }
    }

    let button;
    if (width !== "xs") {
        button = (
            <Button
                color="inherit"
                startIcon={icon}
                onClick={handleOpen}
            >
                {buttonText}
            </Button>
        )
    } else {
        button = (
            <IconButton
                size="small"
                color="inherit"
                onClick={handleOpen}
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
                open={open && (activeDialogId !== undefined && activeDialogId === dialogId)}
                onClose={() => {
                    handleClose();
                }}
            >
                <IconButton
                    aria-label="close"
                    className={classes.closeButton}
                    size="small"
                    onClick={handleClose}
                >
                    <CloseIcon fontSize="small" />
                </IconButton>

                <DialogTitle className={classes.dialogTitle}>{title}</DialogTitle>

                {children}

                <div className={classes.buttonContainer}>
                    <Button color="inherit" variant="outlined" onClick={onReset}>Reset</Button>
                    <Button color="primary" variant="contained" onClick={onApply}>Apply</Button>
                </div>

            </Dialog>
        </div>

    );
}

export default withWidth()(CustomDialog);