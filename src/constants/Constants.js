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
        RentalCar: {
            GET_CAR: "/getCar",
            GET_SCHEDULE_DATE_FOR_CAR: "/getScheduledDateForCar",
            CREATE_SCHEDULE: "/createSchedule",
        },
        UpdateSchedulePending: {
            GET_SCHEDULE_DATE_FOR_CAR: "/getScheduledDateForCar",
            GET_SCHEDULE: "/getSchedule",
            UPDATE_SCHEDULE_PENDING: "/updateSchedulePending",
        },
        Home: {
            GET_CAR_LIST: "/getCarList",
            GET_CAR: "/getCar",
            GET_SCHEDULE_LIST: "/getScheduleList",
        },
        RentedCar: {
            GET_USER_REGISTERED_SCHEDULE_LIST: "/getUserRegisteredScheduleList",
            CANCEL_SCHEDULE: "/cancelSchedule",
        },
        CarRegistrationManagement: {
            GET_ADMIN_SCHEDULE_LIST: "/getAdminScheduleList",
        },
        DriverTripManager: {
            GET_DRIVER_SCHEDULE_LIST: "/getDriverScheduleList",
        },
        DialogShowScheduleUser: {
            GET_SCHEDULE: "/getSchedule",
            CREATE_OR_UPDATE_REVIEW: "/createOrUpdateReview",
            UPDATE_SCHEDULE_APPROVED: "/updateScheduleApproved",
        },
        DialogShowScheduleDriver: {
            GET_SCHEDULE: "/getSchedule",
        },
        DialogShowScheduleAdmin: {
            GET_SCHEDULE: "/getSchedule",
            GET_DRIVER_LIST_FOR_SCHEDULE: "/getDriverListForSchedule",
            GET_ADMIN_SCHEDULE_STATUS_LIST_TO_UPDATE: "/getAdminScheduleStatusListToUpdate",
            UPDATE_SCHEDULE: "/updateSchedule",
        },
    },

    Styled: {
        DATE_FORMAT: "dd/MM/yyyy",
    },

    CarStatus: {
        WORK: "Hoạt Động",
        STOP_WORKING: "Ngừng Hoạt Động",
        MAINTENANCE: "Bảo Trì",
    },
    CarStatusCode: {
        WORK: 1,
        STOP_WORKING: 2,
        MAINTENANCE: 3,
    },
    ColorOfCarStatus: {
        WORK: 'green',
        STOP_WORKING: 'red',
        MAINTENANCE: 'orange',
    },

    ScheduleStatus: {
        PENDING: "Chờ Duyệt",
        APPROVED: "Đã Duyệt",
        COMPLETE: "Hoàn Thành",
        CANCELLED: "Đã Hủy",
        REFUSE: "Từ Chối",
    },
    ScheduleStatusCode: {
        PENDING: 1,
        APPROVED: 2,
        COMPLETE: 3,
        CANCELLED: 4,
        REFUSE: 5,
    },

    ColorOfScheduleStatus: {
        Text: {
            PENDING: "black",
            APPROVED: "white",
            COMPLETE: "white",
            CANCELLED: "white",
            REFUSE: "white",
        },
        TextNoBackground: {
            PENDING: "#d400ff",
            APPROVED: "green",
            COMPLETE: "Blue",
            CANCELLED: "gray",
            REFUSE: "red",
        },
        Background: {
            PENDING: "#ffcffb",
            APPROVED: "green",
            COMPLETE: "Blue",
            CANCELLED: "gray",
            REFUSE: "red",
        },
    },

    Common: {
        PAGE: 1,
        LIMIT_ENTRY: 10,
    },

    Role: {
        // ALL: "all",
        ADMIN: "admin",
        USER: "user",
        DRIVER: "driver",
        ADMIN_USER: "admin user",
    },
};

export default Constants;
