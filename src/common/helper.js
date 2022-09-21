const helper = {
    isNullOrEmpty: (value) => {
        return value === undefined || value === null || value === "";
    },

    isValidStringLength: (value, len) => {
        if ((typeof value == "string" || typeof value == "number") && len) {
            value = value.toString();
            if (value.length <= len) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    },

    isValidPhoneNumber: (phoneNumber) => {
        const regExp = new RegExp(/^([0]{1})([1-9]{1})([0-9]{8})$/);
        return regExp.test(phoneNumber);
    },

    formatDateStringFromTimeStamp: (timeStamp) => {
        timeStamp = parseInt(timeStamp);
        return new Date(timeStamp * 1000).toLocaleDateString("en-GB");
    },

    formatDateTimeStringFromTimeStamp: (timeStamp) => {
        timeStamp = parseInt(timeStamp);
        let date = new Date(timeStamp * 1000).toLocaleDateString("en-GB")
        let time = new Date(timeStamp * 1000).toLocaleTimeString('en-US')
        return timeStamp ? `${date} ${time}` : false
    },

    isValidStarNumber: (value) => {
        return parseFloat(value) > 0 && parseFloat(value) <= 5.0 ? true : false;
    },

    formatStarNumber: (value) => {
        return parseFloat(value) > 0 && parseFloat(value) <= 5.0
            ? parseFloat(value).toFixed(1)
            : null;
    },

    isArray: (value) => {
        return Array.isArray(value);
    },

    isDateTimeStampGreaterThanCurrentDate: (timeStamp) => {
        return (
            new Date(new Date(timeStamp * 1000).toDateString()) >
            new Date(new Date().toDateString())
        );
    },
};

export default helper;
