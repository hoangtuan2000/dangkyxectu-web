import {
    Box,
    DialogActions,
    DialogContent,
    Typography,
    useTheme,
} from "@mui/material";
import Strings from "../../constants/Strings";
import {
    ButtonFeatures,
    DialogContainer,
    Title,
} from "./DialogConfirmationCustomStyles";

function DialogConfirmation({
    open,
    handleClose,
    title,
    colorTitle,
    content,
    colorButtonSubmit,
    handleSubmit,
}) {
    const theme = useTheme();

    const handleCancel = () => {
        handleClose();
    };

    const handleConfirm = () => {
        handleSubmit();
        handleClose();
    };

    return (
        <DialogContainer
            open={open}
            onClose={handleClose}
            scroll="body"
            fullWidth={true}
        >
            <DialogContent>
                <Box>
                    {/* TITLE */}
                    <Title
                        sx={{ color: colorTitle || theme.palette.text.primary }}
                    >
                        {title}
                    </Title>
                    <Typography variant="p" component="div">
                        {content}
                    </Typography>
                </Box>
            </DialogContent>

            {/* BUTTON */}
            <DialogActions>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                    }}
                >
                    <ButtonFeatures
                        size="small"
                        sx={{
                            marginRight: 1,
                            color: theme.palette.text.secondary,
                        }}
                        onClick={handleCancel}
                    >
                        {Strings.Common.CANCEL}
                    </ButtonFeatures>

                    <ButtonFeatures
                        size="small"
                        sx={{
                            marginRight: 1,
                            color: colorButtonSubmit
                                ? colorButtonSubmit
                                : theme.palette.primary.main,
                        }}
                        onClick={handleConfirm}
                    >
                        {Strings.Common.CONFIRM}
                    </ButtonFeatures>
                </Box>
            </DialogActions>
        </DialogContainer>
    );
}

export default DialogConfirmation;
