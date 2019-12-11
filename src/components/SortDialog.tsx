import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import SortIcon from '@material-ui/icons/Sort';
import React, { useContext, useState } from 'react';
import { AppContext } from '../App';
import CustomDialog from "./CustomDialog";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        formControl: {
            display: "flex",
            flexDirection: "row"
        },
        formLabel: {
            padding: theme.spacing(2, 0, 1, 0)
        }
    })
);

const SortDialog: React.FC<{ onChange?: (value: object) => any }> = ({ onChange }) => {
    const [ordering, setOrdering] = useState('First name')
    const [direction, setDirection] = useState('Descending')
    const classes = useStyles();
    const { sortingOptions } = useContext(AppContext);

    const revertChanges = () => {
        const { ordering, direction } = sortingOptions;
        setOrdering(ordering);
        setDirection(direction);
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

    return (
        <CustomDialog
            title="Sort"
            buttonText="Sort"
            icon={<SortIcon />}
            onApply={applySortingOptions}
            onReset={resetSortingOptions}
            onClose={revertChanges}
        >
            <FormControl component="fieldset" className={classes.formControl}>

                <div>
                    <FormLabel component="legend" className={classes.formLabel}>Ordering</FormLabel>
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
        </CustomDialog>
    )
}

export default SortDialog;