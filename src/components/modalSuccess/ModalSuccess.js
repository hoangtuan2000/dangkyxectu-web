import { Backdrop, Fade, Modal } from "@mui/material";
import Strings from "../../constants/Strings";
import {
    BoxContainer,
    CheckCircleIconCustom,
    Title,
} from "./ModalSuccessCustomStyles";

function ModalSuccess({ open, handleClose }) {
    return (
        <Modal
            open={open && open}
            onClose={handleClose && handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={open}>
                <BoxContainer>
                    <Title variant="p" component="p">
                        {Strings.Common.SUCCESS}
                    </Title>
                    <CheckCircleIconCustom />
                </BoxContainer>
            </Fade>
        </Modal>
    );
}

export default ModalSuccess;
