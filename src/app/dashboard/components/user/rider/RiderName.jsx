import React, {useEffect, useState} from "react";
import "./index.css";
import "./style.min.css";
import './plugins.min.css';
import FullScreenDialog from "../FullScreenDialog";
import RiderDetail from "./RiderDetail";

export const getRiderName = (name) => `${(name?.first || "")} ${(name?.last || "")}`;
const RiderName = ({rider, children}) => {

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClickClose = () => {
        setOpen(false);
    };



    return rider ? (
        <>
            <FullScreenDialog
                open={open}
                title={
                    <span
                        style={{
                            color: "#ffffff",
                        }}
                    >
            {`Rider | ${getRiderName(rider?.name)}`}
          </span>
                }
                handleClose={handleClickClose}
            >
                <RiderDetail rider={rider?._id}  />
            </FullScreenDialog>
            <span
                onClick={handleClickOpen}
                style={{
                    color: "#2196f3",
                    cursor: "pointer",
                }}
            >
        {children || getRiderName(rider?.name)}
      </span>
        </>
    ) : (
        "N/A"
    );
};

export default RiderName;
