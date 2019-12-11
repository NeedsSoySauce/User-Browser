import React, { useState, useContext } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Button, IconButton, Dialog, DialogTitle, FormControl, FormLabel, FormControlLabel, RadioGroup, Radio, Slider, TextField, withWidth } from '@material-ui/core';
import FilterListIcon from '@material-ui/icons/FilterList';
import CloseIcon from '@material-ui/icons/Close';
import Autocomplete from '@material-ui/lab/Autocomplete';
import countryListAllIsoData from '../variousCountryListFormats';
import { AppContext } from '../App';

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
        },
        closeButton: {
            position: "absolute",
            right: 0,
            top: 0,
            margin: theme.spacing(1)
        }
    })
);

const FilterDialog: React.FC<{ onChange?: (value: object) => any, width: string }> = ({ onChange, width }) => {
    const [open, setOpen] = useState(false);
    const [gender, setGender] = useState('all')
    const [ageRange, setAgeRange] = useState([0, 100])
    const [countries, setCountries] = useState<object[]>([]);
    const classes = useStyles();
    const { filterOptions } = useContext(AppContext);

    const revertChanges = () => {
        const { gender, ageRange, countries } = filterOptions;
        setGender(gender);
        setAgeRange(ageRange);
        setCountries(countries)
    }

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

    let button;
    if (width !== "xs") {
        button = (
            <Button
                color="inherit"
                startIcon={<FilterListIcon />}
                onClick={e => setOpen(true)}
            >
                Filter
            </Button>
        )
    } else {
        button = (
            <IconButton
                size="small"
                color="inherit"
                onClick={() => setOpen(true)}
            >
                <FilterListIcon />
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
                    revertChanges();
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

                <DialogTitle className={classes.dialogTitle}>Filter</DialogTitle>

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
                    <Button color="primary" variant="contained" onClick={applyFilterOptions}>Apply</Button>
                </div>

            </Dialog>
        </div>

    );
}

export default withWidth()(FilterDialog);