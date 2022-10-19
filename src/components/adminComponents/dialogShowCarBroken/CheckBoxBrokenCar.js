import { Checkbox, Collapse, FormControlLabel, useTheme } from "@mui/material";
import { Box } from "@mui/system";
import {
    BoxImg,
    FormGroupStyle,
    Img,
    TextInput,
} from "./DialogShowCarBrokenCustomStyles";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import Strings from "../../../constants/Strings";

const CheckBoxBrokenCar = ({
    handleCheckBrokenCarParts,
    handleChangeDescription,
    onOpenChooseImage,
    handleChooseImage,
    checkedCarParts,
    valueInput,
    imagePreview,
    nameCarParts,
    carPartsCode,
    labelCheckBox,
    inputImageRef,
    errorComment,
    errorImage,
}) => {
    const theme = useTheme();
    return (
        <Box>
            <FormGroupStyle
                onChange={(e) => handleCheckBrokenCarParts(e, nameCarParts)}
            >
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={checkedCarParts.includes(carPartsCode)}
                        />
                    }
                    label={labelCheckBox}
                    value={carPartsCode}
                />
            </FormGroupStyle>
            <Collapse in={checkedCarParts.includes(carPartsCode)}>
                <Box mb={1}>
                    <TextInput
                        id={`${nameCarParts}`}
                        onChange={(e) =>
                            handleChangeDescription(e, nameCarParts)
                        }
                        label={Strings.Common.DESCRIPTION}
                        value={valueInput}
                        multiline
                        error={errorComment}
                    />
                </Box>
                <Box>
                    <input
                        ref={inputImageRef}
                        type="file"
                        style={{ display: "none" }}
                        accept="image/*"
                        onChange={(e) => handleChooseImage(e, nameCarParts)}
                    />
                    <BoxImg
                        onClick={() => onOpenChooseImage(inputImageRef)}
                        sx={{
                            borderColor: errorImage && theme.palette.error.main,
                        }}
                    >
                        {imagePreview && <Img src={imagePreview} />}
                        <CameraAltIcon
                            sx={{
                                fontSize: "40px !important",
                                color: errorImage
                                    ? theme.palette.error.main
                                    : theme.palette.text.secondary,
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
