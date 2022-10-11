import { Checkbox, Collapse, FormControlLabel } from "@mui/material";
import { Box } from "@mui/system";
import {
    BoxImg,
    FormGroupStyle,
    Img,
    TextInput,
} from "./DialogCarStatusConfirmationCustomStyles";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import Strings from "../../../constants/Strings";

const CheckBoxBrokenCar = ({
    handleCheckBrokenCarParts,
    handleChangeDescription,
    onOpenChooseImage,
    handleChooseImage,
    checkedBrokenCarParts,
    valueInput,
    imagePreview,
    nameBrokenCarParts,
    brokenCarPartsCode,
    labelCheckBox,
    inputImageRef,
}) => {
    return (
        <Box>
            <FormGroupStyle
                onChange={(e) =>
                    handleCheckBrokenCarParts(e, nameBrokenCarParts)
                }
            >
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={checkedBrokenCarParts.includes(
                                brokenCarPartsCode
                            )}
                        />
                    }
                    label={labelCheckBox}
                    value={brokenCarPartsCode}
                />
            </FormGroupStyle>
            <Collapse in={checkedBrokenCarParts.includes(brokenCarPartsCode)}>
                <Box mb={1}>
                    <TextInput
                        id={`${nameBrokenCarParts}`}
                        onChange={(e) =>
                            handleChangeDescription(e, nameBrokenCarParts)
                        }
                        label={Strings.Common.DESCRIPTION}
                        value={valueInput}
                        multiline
                    />
                </Box>
                <Box>
                    <input
                        ref={inputImageRef}
                        type="file"
                        style={{ display: "none" }}
                        accept="image/*"
                        onChange={(e) =>
                            handleChooseImage(e, nameBrokenCarParts)
                        }
                    />
                    <BoxImg
                        onClick={() => onOpenChooseImage(inputImageRef)}
                        sx={
                            {
                                // borderColor:
                                //     errorData.errorImage &&
                                //     theme.palette.error.main,
                            }
                        }
                    >
                        {imagePreview && (
                            <Img src={imagePreview} />
                        )}
                        <CameraAltIcon
                            sx={{
                                fontSize: "40px !important",
                                // color: errorData.errorImage
                                //     ? theme.palette.error.main
                                //     : theme.palette.text
                                //           .secondary,
                                opacity: "0.3 !important",
                                zIndex: 999999,
                                position: "absolute",
                                top: "35%",
                            }}
                        />
                    </BoxImg>
                </Box>
            </Collapse>
        </Box>
    );
};

export default CheckBoxBrokenCar;
