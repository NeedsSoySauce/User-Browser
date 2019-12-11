import React, { useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

interface ICustomDialogGroupProps {
    children: any, 
    direction?: "row" | "row-reverse" | "column" | "column-reverse"
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        div: {
            display: "flex"
        }
    })
);

const CustomDialogGroup: React.FC<ICustomDialogGroupProps> = ({ children, direction }) => {
    const [activeDialogId, setActiveDialogId] = useState(null);
    const classes = useStyles();

    return (
        <div className={classes.div} style={direction !== undefined ? {flexDirection: direction} : undefined}>
            {children.map((child: any, index: number) => {
                return React.cloneElement(child, { 
                    setActiveDialogId: setActiveDialogId, 
                    activeDialogId: activeDialogId, 
                    dialogId: index,
                    key: index
                })
            })}
        </div>
    );
}

export default CustomDialogGroup;