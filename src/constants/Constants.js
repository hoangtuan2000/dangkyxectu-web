const Constants = {
    ApiCode: {
        OK: 200,
        CREATED: 201,
        BAD_REQUEST: 400,
        UNAUTHORIZED: 401,
        FORBIDDEN: 403,
        REQUEST_TIMEOUT: 408,
        INTERNAL_SERVER_ERROR: 500,
        SERVICE_UNAVAILABLE: 503,
    },

    ApiPath: {
        Common: {
            GET_COMMON: "/getCommon",
        },
        Login: {
            LOGIN: "/login",
        },
        Home: {
            GET_CAR_LIST: "/getCarList",
            GET_CAR: "/getCar",
            GET_SCHEDULE_LIST: "/getScheduleList",
        },
        RentalCar: {
            GET_CAR: "/getCar",
            GET_SCHEDULE_DATE_FOR_CAR: "/getScheduledDateForCar",
            CREATE_SCHEDULE: "/createSchedule",
        },
    },

    Styled: {
        DATE_FORMAT: "dd/MM/yyyy",
    },
};

export default Constants;
