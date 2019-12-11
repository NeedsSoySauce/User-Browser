import React, { useState } from 'react';

const CustomDialogGroup: React.FC<{ children: any, key?: any}> = ({ children, key }) => {
    const [activeDialogId, setActiveDialogId] = useState(null);

    return (
        <div>
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