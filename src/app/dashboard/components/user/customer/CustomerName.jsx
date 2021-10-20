import React, {useEffect} from 'react';
import FullScreenDialog from "../FullScreenDialog";
import CustomerDetail from "./CustomerDetail";

const CustomerName = ({customer, children}) => {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClickClose = () => {
        setOpen(false);
    };

    return customer ? (
        <>
            <FullScreenDialog open={open} title={customer?.name} handleClose={handleClickClose}>
                <CustomerDetail customer={customer?._id}  />
            </FullScreenDialog>

            <span onClick={handleClickOpen} style={{
            color: '#2196f3',
            cursor: "pointer"
        }}>
            {children || customer?.name}
        </span>
            </>
    ) : "N/A";
};

export default CustomerName;
