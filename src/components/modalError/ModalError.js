import { Backdrop, Fade, Modal } from "@mui/material";
import {
    BoxContainer,
    Content,
    ErrorOutlineIconCustom,
    Title,
} from "./ModalErrorCustomStyles";

function ModalError({ open, handleClose, title, content }) {
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
                        {title && title}
                    </Title>
                    <Content variant="p" component="p">
                        {content && content}
                    </Content>
                    <ErrorOutlineIconCustom />
                </BoxContainer>
            </Fade>
        </Modal>
    );
}

export default ModalError;
