import React, { useState } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Button, Dialog, DialogTitle, FormControl, FormLabel, FormControlLabel, RadioGroup, Radio, Slider, TextField } from '@material-ui/core';
import FilterListIcon from '@material-ui/icons/FilterList';
import Autocomplete from '@material-ui/lab/Autocomplete';
import countryListAllIsoData from '../variousCountryListFormats';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        dialogRoot: {
            width: "33vw",
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

const FilterDialog: React.FC<{ onChange?: (value: object) => any }> = ({ onChange }) => {
    const [open, setOpen] = useState(false);
    const [gender, setGender] = useState('all')
    const [ageRange, setAgeRange] = useState([0, 100])
    const [countries, setCountries] = useState([]);
    const classes = useStyles();

    const handleClose = () => {
        setOpen(false);
    }

    const applyFilterOptions = () => {
        if (onChange !== undefined) {
            onChange({
                gender,
                ageRange,
                countries
            })
        }
    }

    const resetFilterOptions = () => {
        setGender('all');
        setAgeRange([0, 100]);
        setCountries([]);
    }

    return (
        <div>
            <Button
                color="inherit"
                startIcon={<FilterListIcon />}
                onClick={e => setOpen(true)}
            >
                Filter
            </Button>
            <Dialog
                classes={{
                    paper: classes.dialogRoot
                }}
                open={open}
                onClose={e => {
                    handleClose();
                    applyFilterOptions();
                }}
            >
                <DialogTitle className={classes.dialogTitle}>Filters</DialogTitle>

                <FormControl component="fieldset" className={classes.formControl}>

                    <div>
                        <FormLabel component="legend" className={classes.formLabel}>Gender</FormLabel>
                        <RadioGroup
                            row
                            aria-label="gender"
                            name="gender"
                            value={gender}
                            onChange={e => setGender(e.target.value)}>
                            <FormControlLabel value="all" control={<Radio color="primary"/>} label="All" />
                            <FormControlLabel value="male" control={<Radio color="primary"/>} label="Male" />
                            <FormControlLabel value="female" control={<Radio color="primary"/>} label="Female" />
                        </RadioGroup>
                    </div>

                    <div>
                        <FormLabel component="legend" className={classes.formLabel}>Age</FormLabel>
                        <Slider
                            value={ageRange}
                            onChange={(e, newValue: any) => setAgeRange(newValue)}
                            valueLabelDisplay="auto"
                            aria-labelledby="range-slider"
                            getAriaValueText={value => `${value}`}
                        />
                    </div>

                    <div>
                        <FormLabel component="legend" className={classes.formLabel}>Country</FormLabel>
                        <Autocomplete
                            multiple
                            autoHighlight
                            disableCloseOnSelect
                            options={countryListAllIsoData}
                            getOptionLabel={option => option.name}
                            renderOption={option => (
                                <React.Fragment>
                                    {`${option.name}`}
                                </React.Fragment>
                            )}
                            value={countries}
                            onChange={(e, newValue) => setCountries(newValue)}
                            renderInput={params => (
                                <TextField
                                    {...params}
                                    placeholder={countries.length === 0 ? "All" : ""}
                                    fullWidth
                                />
                            )}
                        />
                    </div>
                </FormControl>

                <div className={classes.buttonContainer}>
                    <Button color="primary" variant="outlined" onClick={resetFilterOptions}>Reset</Button>
                    {/* <Button color="primary" variant="contained" onClick={applyFilterOptions}>Apply</Button> */}
                </div>

            </Dialog>
        </div>

    );
}

export default FilterDialog;