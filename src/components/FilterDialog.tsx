import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Slider, TextField } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import FilterListIcon from '@material-ui/icons/FilterList';
import Autocomplete from '@material-ui/lab/Autocomplete';
import React, { useContext, useState } from 'react';
import { AppContext } from '../App';
import countryListAllIsoData from '../variousCountryListFormats';
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

const FilterDialog: React.FC<{ onChange?: (value: object) => any }> = ({ onChange }) => {
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
        <CustomDialog
            title="Filter"
            buttonText="Filter"
            icon={<FilterListIcon />}
            onApply={applyFilterOptions}
            onReset={resetFilterOptions}
            onClose={revertChanges}
        >
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
        </CustomDialog>
    )
}

export default FilterDialog;