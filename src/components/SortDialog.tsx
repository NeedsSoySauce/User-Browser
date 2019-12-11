import React, { useState } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Button, IconButton, Dialog, DialogTitle, FormControl, FormLabel, FormControlLabel, RadioGroup, Radio, withWidth } from '@material-ui/core';
import SortIcon from '@material-ui/icons/Sort';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        dialogRoot: {
            padding: theme.spacing(2, 3)
        },
        dialogTitle: {
            padding: 0,
            paddingBottom: theme.spacing(1)
        },
        formControl: {
            display: "flex",
            flexDirection: "row"
        },
        formLabel: {
            padding: theme.spacing(2, 0, 1, 0)
        },
        buttonContainer: {
            padding: theme.spacing(2, 0, 0, 0),
            display: "flex",
            justifyContent: "space-around"
        }
    })
);

const SortDialog: React.FC<{ onChange?: (value: object) => any, width: string }> = ({ onChange, width }) => {
    const [open, setOpen] = useState(false);
    const [ordering, setOrdering] = useState('First name')
    const [direction, setDirection] = useState('Descending')
    const classes = useStyles();

    const handleClose = () => {
        setOpen(false);
    }

    const applySortingOptions = () => {
        if (onChange !== undefined) {
            onChange({
                ordering,
                direction
            })
        }
    }

    const resetSortingOptions = () => {
        setOrdering("First name");
        setDirection("Descending");
    }

    let button;
    if (width !== "xs") {
        button = (
            <Button
                color="inherit"
                startIcon={<SortIcon />}
                onClick={e => setOpen(true)}
            >
                Sort
            </Button>
        )
    } else {
        button = (
            <IconButton
                size="small"
                color="inherit"
                onClick={e => setOpen(true)}
            >
                <SortIcon />
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
                onClose={e => {
                    handleClose();
                    applySortingOptions();
                }}
            >
                <DialogTitle className={classes.dialogTitle}>Sort</DialogTitle>

                <FormControl component="fieldset" className={classes.formControl}>

                    <div>
                        <FormLabel component="legend" className={classes.formLabel}>Order by...</FormLabel>
                        <RadioGroup
                            row
                            aria-label="ordering"
                            name="ordering"
                            value={ordering}
                            onChange={e => setOrdering(e.target.value)}>
                            <FormControlLabel value="First name" control={<Radio color="primary" />} label="First name" />
                            <FormControlLabel value="Last name" control={<Radio color="primary" />} label="Last name" />
                            <FormControlLabel value="Age" control={<Radio color="primary" />} label="Age" />
                            <FormControlLabel value="Country" control={<Radio color="primary" />} label="Country" />
                        </RadioGroup>
                    </div>

                    <div>
                        <FormLabel component="legend" className={classes.formLabel}>Direction</FormLabel>
                        <RadioGroup
                            row
                            aria-label="direction"
                            name="direction"
                            value={direction}
                            onChange={e => setDirection(e.target.value)}>
                            <FormControlLabel value="Ascending" control={<Radio color="primary" />} label="Ascending" />
                            <FormControlLabel value="Descending" control={<Radio color="primary" />} label="Descending" />
                        </RadioGroup>
                    </div>

                </FormControl>

                <div className={classes.buttonContainer}>
                    <Button color="primary" variant="outlined" onClick={resetSortingOptions}>Reset</Button>
                    <Button color="primary" variant="contained" onClick={applySortingOptions}>Apply</Button>
                </div>

            </Dialog>
        </div>

    );
}

export default withWidth()(SortDialog);