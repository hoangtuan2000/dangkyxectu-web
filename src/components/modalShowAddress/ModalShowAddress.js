import {
    Autocomplete,
    Box,
    InputAdornment,
    Modal,
    TextField,
    useTheme,
} from "@mui/material";
import Strings from "../../constants/Strings";
import {
    ButtonFeatures,
    ModalContainer,
    Title,
} from "./ModalShowAddressCustomStyles";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { GlobalService } from "../../services/GlobalServices";
import ModalError from "../modalError/ModalError";
import Constants from "../../constants/Constants";
import { useEffect, useState } from "react";
import helper from "../../common/helper";

export default function ModalShowAddress({
    open,
    handleClose,
    labelInput,
    titleModal,
    onConfirm = () => {},
    defaultAddress,
    defaultProvince,
    defaultDistrict,
    defaultWard,
}) {
    const theme = useTheme();

    const [modalError, setModalError] = useState({
        open: false,
        title: null,
        content: null,
    });

    const [provinceList, setProvinceList] = useState([]);
    const [districtList, setDistrictList] = useState([]);
    const [wardList, setWardList] = useState([]);

    const [errorChooseAddress, setErrorChooseAddress] = useState({
        addressEmpty: false,
        provinceEmpty: false,
        districtEmpty: false,
        wardEmpty: false,
    });

    const [showDistrict, setShowDistrict] = useState([]);
    const [showWard, setShowWard] = useState([]);

    const [selectedAddress, setSelectedAddress] = useState({
        address: defaultAddress ? defaultAddress : null,
        province: defaultProvince ? defaultProvince : null,
        district: defaultDistrict ? defaultDistrict : null,
        ward: defaultWard ? defaultWard : null,
    });

    const getCommon = async () => {
        const res = await GlobalService.getCommon({ group: "ward, district, province" });
        // axios success
        if (res.data) {
            if (res.data.status == Constants.ApiCode.OK) {
                setWardList(res.data.data.ward);
                setDistrictList(res.data.data.district);
                setProvinceList(res.data.data.province);
            } else {
                setModalError({
                    ...modalError,
                    open: true,
                    title: res.data.message,
                });
            }
        }
        // axios fail
        else {
            setModalError({
                ...modalError,
                open: true,
                title: `${Strings.Common.AN_ERROR_OCCURRED} (${res.request.status})`,
                content: res.name,
            });
        }
    };

    const handleChooseProvince = (value) => {
        if (value) {
            setSelectedAddress({
                ...selectedAddress,
                province: value,
                district: null,
                ward: null,
            });
            const districtOfProvince = districtList.filter((item) => {
                if (item.idProvince == value.idProvince) {
                    return item;
                }
            });
            setShowDistrict(districtOfProvince);
        } else {
            setSelectedAddress({
                ...selectedAddress,
                province: value,
                district: null,
                ward: null,
            });
            setShowDistrict([]);
        }
    };

    const handleChooseDistrict = (value) => {
        if (value) {
            setSelectedAddress({
                ...selectedAddress,
                district: value,
                ward: null,
            });
            const wardOfDistrict = wardList.filter((item) => {
                if (item.idDistrict == value.idDistrict) {
                    return item;
                }
            });
            setShowWard(wardOfDistrict);
        } else {
            setSelectedAddress({
                ...selectedAddress,
                district: value,
                ward: null,
            });
            setShowWard([]);
        }
    };

    const handleChooseWard = (value) => {
        setSelectedAddress({
            ...selectedAddress,
            ward: value,
        });
    };

    const handleValidateAddress = () => {
        setErrorChooseAddress({
            addressEmpty: helper.isNullOrEmpty(selectedAddress.address)
                ? true
                : false,
            provinceEmpty: helper.isNullOrEmpty(selectedAddress.province)
                ? true
                : false,
            districtEmpty: helper.isNullOrEmpty(selectedAddress.district)
                ? true
                : false,
            wardEmpty: helper.isNullOrEmpty(selectedAddress.ward)
                ? true
                : false,
        });
    };

    const handleConfirm = () => {
        if (
            helper.isNullOrEmpty(selectedAddress.address) ||
            helper.isNullOrEmpty(selectedAddress.province) ||
            helper.isNullOrEmpty(selectedAddress.district) ||
            helper.isNullOrEmpty(selectedAddress.ward)
        ) {
            handleValidateAddress();
        } else {
            setErrorChooseAddress({
                addressEmpty: false,
                provinceEmpty: false,
                districtEmpty: false,
                wardEmpty: false,
            });
            onConfirm(selectedAddress);
            handleClose();
        }
    };

    useEffect(() => {
        getCommon()

        if(defaultAddress && defaultProvince && defaultDistrict && defaultWard){
            handleConfirm()
        }
    }, []);

    return (
        <Modal open={open} onClose={handleClose}>
            <ModalContainer
                sx={{
                    position: "absolute",
                    top: "30%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    bgcolor: "background.paper",
                    borderRadius: 5,
                    boxShadow: 24,
                    p: 3,
                    paddingTop: 2,
                }}
            >
                <Title>{titleModal}</Title>

                <TextField
                    autoFocus={true}
                    fullWidth
                    label={labelInput && labelInput}
                    variant="outlined"
                    size="small"
                    margin="normal"
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="start">
                                <LocationOnIcon
                                    sx={{
                                        color: theme.palette.primary.main,
                                    }}
                                />
                            </InputAdornment>
                        ),
                    }}
                    onChange={(e) => {
                        setSelectedAddress({
                            ...selectedAddress,
                            address: e.target.value,
                        });
                    }}
                    value={selectedAddress.address || ""}
                    error={errorChooseAddress.addressEmpty}
                />

                <Autocomplete
                    disablePortal
                    size="small"
                    sx={{ marginBottom: 1 }}
                    noOptionsText={Strings.Common.NO_DATA}
                    options={provinceList}
                    getOptionLabel={(option) => option.name}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            error={errorChooseAddress.provinceEmpty}
                            label={Strings.Common.CHOOSE_PROVINCE}
                        />
                    )}
                    onChange={(event, newValue) => {
                        handleChooseProvince(newValue);
                    }}
                    value={selectedAddress.province || null}
                    isOptionEqualToValue={(option, value) =>
                        option.idProvince === value.idProvince
                    }
                />

                <Autocomplete
                    disablePortal
                    size="small"
                    sx={{ marginBottom: 1 }}
                    noOptionsText={Strings.Common.NO_DATA}
                    disabled={showDistrict.length > 0 ? false : true}
                    options={showDistrict}
                    getOptionLabel={(option) => option.name}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            error={errorChooseAddress.districtEmpty}
                            label={Strings.Common.CHOOSE_DISTRICT}
                        />
                    )}
                    onChange={(event, newValue) => {
                        handleChooseDistrict(newValue);
                    }}
                    value={selectedAddress.district || null}
                    isOptionEqualToValue={(option, value) =>
                        option.idDistrict === value.idDistrict
                    }
                />

                <Autocomplete
                    disablePortal
                    size="small"
                    sx={{ marginBottom: 1 }}
                    noOptionsText={Strings.Common.NO_DATA}
                    disabled={showWard.length > 0 ? false : true}
                    options={showWard}
                    getOptionLabel={(option) => option.name}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            error={errorChooseAddress.wardEmpty}
                            label={Strings.Common.CHOOSE_WARD}
                        />
                    )}
                    onChange={(event, newValue) => {
                        handleChooseWard(newValue);
                    }}
                    value={selectedAddress.ward || null}
                    isOptionEqualToValue={(option, value) =>
                        option.idWard === value.idWard
                    }
                />

                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        marginTop: 4,
                    }}
                >
                    <ButtonFeatures
                        size="small"
                        variant="contained"
                        endIcon={<CancelIcon />}
                        color="error"
                        sx={{ marginRight: 1 }}
                        onClick={handleClose}
                    >
                        {Strings.Common.CANCEL}
                    </ButtonFeatures>
                    <ButtonFeatures
                        size="small"
                        variant="contained"
                        endIcon={<CheckCircleIcon />}
                        color="primary"
                        sx={{ marginRight: 1 }}
                        onClick={handleConfirm}
                    >
                        {Strings.Common.CONFIRM}
                    </ButtonFeatures>
                </Box>

                <ModalError
                    open={modalError.open}
                    handleClose={() =>
                        setModalError({ ...modalError, open: false })
                    }
                    content={modalError.content}
                    title={modalError.title}
                />
            </ModalContainer>
        </Modal>
    );
}
