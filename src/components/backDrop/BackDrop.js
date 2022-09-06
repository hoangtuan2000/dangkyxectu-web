import { Backdrop, CircularProgress } from "@mui/material";
import React from "react";

function BackDrop({open, handleClose}) {
    return (
        <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={open && open}
            onClick={handleClose && handleClose}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
    );
}

export default BackDrop;
