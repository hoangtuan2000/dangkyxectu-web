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
            GET_SCHEDULE: "/global/getSchedule",
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
            UPDATE_PHONE_NUMBER_USER_SCHEDULE:
                "/user/updatePhoneNumberUserInSchedule",
        },
        DialogShowScheduleDriver: {
            GET_SCHEDULE: "/global/getSchedule",
            CONFIRM_MOVING: "/driver/confirmMoving",
        },
        DialogShowScheduleAdmin: {
            GET_SCHEDULE: "/global/getSchedule",
            GET_DRIVER_LIST_FOR_SCHEDULE: "/admin/getDriverListForSchedule",
            GET_ADMIN_SCHEDULE_STATUS_LIST_TO_UPDATE:
                "/admin/getAdminScheduleStatusListToUpdate",
            UPDATE_SCHEDULE_PENDING: "/admin/updateSchedulePending",
            UPDATE_SCHEDULE_APPROVED: "/admin/updateScheduleApproved",
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
            UPDATE_CAR: "/admin/updateCar",
        },
        DialogCarStatusConfirmation: {
            CONFIRM_RECEIVED_OR_COMPLETE_OF_SCHEDULE:
                "/driver/confirmReceivedOrCompleteOfSchedule",
        },
        DialogChangeCar: {
            GET_CAR_LIST_TO_CHANGE_CAR: "/admin/getCarListToChangeCar",
            CHANGE_CAR_SCHEDULE: "/admin/changeCarSchedule",
        },
        CarStatusOfTrip: {
            GET_CAR_STATUS_LIST_OF_TRIP: "/admin/getCarStatusListOfTrips",
            GET_DRIVER_LIST_FOR_FILTER: "/admin/getDriverListForFilter",
        },
        DialogShowCarBroken: {
            GET_SCHEDULE_BROKEN_CAR_PARTS: "/admin/getScheduleBrokenCarParts",
        },
        DriverManagement: {
            GET_DRIVER_LIST: "/admin/getDriverList",
        },
        DialogCreateDriver: {
            CREATE_DRIVER: "/admin/createDriver",
        },
        DialogUpdateDriver: {
            GET_DRIVER_TO_UPDATE: "/admin/getDriverToUpdate",
            UPDATE_DRIVER: "/admin/updateDriver",
        },
        Statistical: {
            GET_ANALYSIS_TOTAL_COMMON: "/admin/getAnalysisTotalCommon",
        },
        AnalysisTotalTrips: {
            GET_TOTAL_NUMBER_OF_TRIPS_OVER_TIME:
                "/admin/getTotalNumberOfTripsOverTime",
            GET_DATA_TOTAL_NUMBER_OF_TRIPS_OVER_TIME:
                "/admin/getDataTotalNumberOfTripsOverTime",
        },
        AnalysisDriverLicense: {
            GET_ANALYSIS_DRIVER_LICENSE: "/admin/getAnalysisDriverLicense",
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
        RECEIVED: "Đã Nhận",
        MOVING: "Đang Di Chuyển",
    },
    ScheduleStatusCode: {
        PENDING: 1,
        APPROVED: 2,
        COMPLETE: 3,
        CANCELLED: 4,
        REFUSE: 5,
        RECEIVED: 6,
        MOVING: 7,
    },

    ColorOfScheduleStatus: {
        TextNoBackground: {
            PENDING: "#d400ff",
            APPROVED: "green",
            COMPLETE: "Blue",
            CANCELLED: "gray",
            REFUSE: "red",
            RECEIVED: "#03a882",
            MOVING: "#ab8e00",
        },
        Text: {
            PENDING: "black",
            APPROVED: "white",
            COMPLETE: "white",
            CANCELLED: "white",
            REFUSE: "white",
            RECEIVED: "white",
            MOVING: "white",
        },
        Background: {
            PENDING: "#ffcffb",
            APPROVED: "green",
            COMPLETE: "Blue",
            CANCELLED: "gray",
            REFUSE: "red",
            RECEIVED: "#03a882",
            MOVING: "#ab8e00",
        },
    },

    CarLicense: {
        REGISTRATION_CERTIFICATE: "registrationCertificate",
        PERIODIC_INSPECTION_CERTIFICATE: "periodicInspectionCertificate",
        INSURANCE: "insurance",
    },

    UserStatus: {
        WORK: "Hoạt Động",
        STOP_WORK: "Nghỉ Việc",
    },

    ColorOfUserStatus: {
        Text: {
            WORK: "green",
            STOP_WORK: "gray",
        },
        TextHaveBackground: {
            WORK: "white",
            STOP_WORK: "white",
        },
        Background: {
            WORK: "green",
            STOP_WORK: "gray",
        },
    },

    // UserStatusCode: {
    //     WORK: 1,
    //     STOP_WORK: 2,
    // },

    // CarParts: {
    //     FRONT_OF_CAR: "Đầu Xe",
    //     BACK_OF_CAR: "Đuôi Xe",
    //     LEFT_CAR_BODY: "Thân Xe Bên Trái",
    //     RIGHT_CAR_BODY: "Thân Xe Bên Phải",
    //     CAR_FRONT_LIGHTS: "Đèn Trước",
    //     CAR_BACK_LIGHTS: "Đèn Sau",
    //     OTHER_CAR_PARTS: "Bộ Phận Khác",
    //     CAR_CONTROL_CENTER: "Trung Tâm Điều Khiển",
    // },

    CarPartsCode: {
        FRONT_OF_CAR: 1,
        BACK_OF_CAR: 2,
        LEFT_CAR_BODY: 3,
        RIGHT_CAR_BODY: 4,
        CAR_FRONT_LIGHTS: 5,
        CAR_BACK_LIGHTS: 6,
        OTHER_CAR_PARTS: 7,
        CAR_CONTROL_CENTER: 8,
    },

    Common: {
        PAGE: 1,
        LIMIT_ENTRY: 10,
        CHARACTERS_MIN_LENGTH_LICENSE_PLATES: 7,
        CHARACTERS_MAX_LENGTH_LICENSE_PLATES: 10,
        CHARACTERS_MIN_LENGTH_REASON_CANCEL_SCHEDULE: 5,
        CHARACTERS_MAX_LENGTH_REASON_CANCEL_SCHEDULE: 250,
        MIN_LENGTH_FULL_NAME: 5,
        MAX_LENGTH_FULL_NAME: 30,
        MIN_LENGTH_CODE: 8,
        MAX_LENGTH_CODE: 8,
        MIN_LENGTH_PASSWORD: 5,
        MAX_LENGTH_PASSWORD: 15,
    },

    Role: {
        // ALL: "all",
        ADMIN: "admin",
        USER: "user",
        DRIVER: "driver",
        ADMIN_USER: "admin user",
    },

    Colors: [
        "#021bd6",
        "#029dd6",
        "#02d65e",
        "#d6af02",
        "#d63b02",
        "#d602c8",
        "#7302d6",
    ],
};

export default Constants;
