import { Backdrop, Box, Fade, Modal, Typography } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

function ModalError({open, handleClose, title, content}) {
    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open && open}
            onClose={handleClose && handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={open}>
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        bgcolor: "white",
                        boxShadow: 24,
                        p: 3,
                        paddingLeft: 4,
                        paddingRight: 4,
                        borderRadius: 2,
                        textAlign: "center",
                    }}
                >
                    <Typography
                        id="transition-modal-title"
                        variant="h6"
                        component="h6"
                        sx={{
                            color: "red",
                            fontWeight: "bold",
                            // marginBottom: 2,
                        }}
                    >
                        {title && title}
                    </Typography>
                    <Typography
                        id="transition-modal-title"
                        variant="p"
                        component="p"
                        sx={{
                            color: "red",
                            marginBottom: 2,
                        }}
                    >
                        {content && content}
                    </Typography>
                    <ErrorOutlineIcon sx={{ color: "red", fontSize: 50 }} />
                </Box>
            </Fade>
        </Modal>
    );
}

export default ModalError;
