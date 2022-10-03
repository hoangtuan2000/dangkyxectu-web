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
            GET_COMMON: "/global/getCommon",
        },
        Login: {
            LOGIN: "/global/login",
        },
        RentalCar: {
            GET_CAR: "/global/getCar",
            GET_SCHEDULE_DATE_FOR_CAR: "/global/getScheduledDateForCar",
            CREATE_SCHEDULE: "/global/createSchedule",
        },
        UpdateSchedulePending: {
            GET_SCHEDULE_DATE_FOR_CAR: "/global/getScheduledDateForCar",
            GET_SCHEDULE: "/global/getSchedule",
            UPDATE_SCHEDULE_PENDING: "/user/updateSchedulePending",
        },
        Home: {
            GET_CAR_LIST: "/global/getCarList",
            GET_CAR: "/global/getCar",
            GET_SCHEDULE_LIST: "/global/getScheduleList",
        },
        RentedCar: {
            GET_USER_REGISTERED_SCHEDULE_LIST:
                "/user/getUserRegisteredScheduleList",
            CANCEL_SCHEDULE: "/user/cancelSchedule",
        },
        CarRegistrationManagement: {
            GET_ADMIN_SCHEDULE_LIST: "/admin/getAdminScheduleList",
        },
        DriverTripManager: {
            GET_DRIVER_SCHEDULE_LIST: "/driver/getDriverScheduleList",
        },
        DialogShowScheduleUser: {
            GET_SCHEDULE: "/global/getSchedule",
            CREATE_OR_UPDATE_REVIEW: "/user/createOrUpdateReview",
            UPDATE_SCHEDULE_APPROVED: "/user/updateScheduleApproved",
        },
        DialogShowScheduleDriver: {
            GET_SCHEDULE: "/global/getSchedule",
        },
        DialogShowScheduleAdmin: {
            GET_SCHEDULE: "/global/getSchedule",
            GET_DRIVER_LIST_FOR_SCHEDULE: "/admin/getDriverListForSchedule",
            GET_ADMIN_SCHEDULE_STATUS_LIST_TO_UPDATE:
                "/admin/getAdminScheduleStatusListToUpdate",
            UPDATE_SCHEDULE: "/admin/updateSchedule",
        },
        CarManager: {
            GET_CAR_LIST_FOR_ADMIN: "/admin/getCarListForAdmin",
        },
        DialogCreateCar: {
            CREATE_CAR: "/admin/createCar",
        },
        DialogUpdateCar: {
            GET_CAR_TO_UPDATE: "/admin/getCarToUpdate",
            GET_CAR_LICENSE: "/admin/getCarLicense",
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
        Text: {
            WORK: "green",
            STOP_WORKING: "red",
            MAINTENANCE: "orange",
        },
        TextHaveBackground: {},
        Background: {
            WORK: "green",
            STOP_WORKING: "red",
            MAINTENANCE: "orange",
        },
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

    CarLicense: {
        REGISTRATION_CERTIFICATE: "registrationCertificate",
        PERIODIC_INSPECTION_CERTIFICATE: "periodicInspectionCertificate",
        INSURANCE: "insurance",
    },

    Common: {
        PAGE: 1,
        LIMIT_ENTRY: 10,
        CHARACTERS_MIN_LENGTH_LICENSE_PLATES: 7,
        CHARACTERS_MAX_LENGTH_LICENSE_PLATES: 10,
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
