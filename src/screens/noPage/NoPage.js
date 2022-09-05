import { Container } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import logoCTU from "../../assets/logoCTU.png";

function NoPage() {
    return (
        <Container>
            <Box
                sx={{
                    height: "100vh",
                    width: "100%",
                    alignItems: "center",
                    textAlign: "center",
                    marginTop: "10%",
                }}
            >
                <img
                    src={logoCTU}
                    alt="Logo CTU"
                    style={{ width: "150px", height: "150px" }}
                />

                <h2>Không Tìm Thấy Trang Yêu Cầu</h2>
            </Box>
        </Container>
    );
}

export default NoPage;
