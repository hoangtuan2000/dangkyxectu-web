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
            CREATE_MULTIPLE_DRIVER: "/admin/createMultipleDriver",
        },
        UserManagement: {
            GET_USER_LIST: "/admin/getUserList",
            CREATE_MULTIPLE_USER: "/admin/createMultipleUser",
        },
        DialogCreateDriver: {
            CREATE_DRIVER: "/admin/createDriver",
        },
        DialogCreateUser: {
            CREATE_USER: "/admin/createUser",
        },
        DialogUpdateDriver: {
            GET_DRIVER_TO_UPDATE: "/admin/getDriverToUpdate",
            UPDATE_DRIVER: "/admin/updateDriver",
        },
        DialogUpdateUser: {
            GET_USER_TO_UPDATE: "/admin/getUserToUpdate",
            UPDATE_USER: "/admin/updateUser",
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
        AnalysisTotalTripsOfFaculties: {
            GET_ANALYSIS_TOTAL_TRIPS_OF_FACULTIES:
                "/admin/getAnalysisTotalTripsOfFaculties",
            GET_DATA_ANALYSIS_TOTAL_TRIPS_OF_FACULTIES:
                "/admin/getDataAnalysisTotalTripsOfFaculties",
        },
        AnalysisTotalTripsOfDriver: {
            GET_ANALYSIS_TOTAL_TRIPS_OF_DRIVER:
                "/admin/getAnalysisTotalTripsOfDriver",
            GET_DATA_ANALYSIS_TOTAL_TRIPS_OF_DRIVER:
                "/admin/getDataAnalysisTotalTripsOfDriver",
        },
        AnalysisDriverLicense: {
            GET_ANALYSIS_DRIVER_LICENSE: "/admin/getAnalysisDriverLicense",
            GET_DATA_ANALYSIS_DRIVER_LICENSE:
                "/admin/getDataAnalysisDriverLicense",
        },
        DialogShowInfoDriver: {
            GET_INFO_DRIVER: "/admin/getInfoDriver",
            GET_SCHEDULE_LIST_OF_DRIVER: "/admin/getScheduleListOfDriver",
        },
        DialogCreateMaintenance: {
            CREATE_CAR_MAINTENANCE: "/admin/createCarMaintenance",
        },
        DialogUpdateMaintenance: {
            GET_CAR_MAINTENANCE: "/admin/getCarMaintenance",
            UPDATE_CAR_MAINTENANCE: "/admin/updateCarMaintenance",
        },
        MaintenanceManager: {
            GET_CAR_MAINTENANCE_LIST: "/admin/getCarMaintenanceList",
        },
    },

    Styled: {
        DATE_FORMAT: "dd/MM/yyyy",
    },

    CarStatus: {
        WORK: "Ho???t ?????ng",
        STOP_WORKING: "Ng???ng Ho???t ?????ng",
        MAINTENANCE: "B???o Tr??",
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
        PENDING: "Ch??? Duy???t",
        APPROVED: "???? Duy???t",
        COMPLETE: "Ho??n Th??nh",
        CANCELLED: "???? H???y",
        REFUSE: "T??? Ch???i",
        RECEIVED: "???? Nh???n",
        MOVING: "??ang Di Chuy???n",
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
            COMPLETE: "blue",
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
        WORK: "Ho???t ?????ng",
        STOP_WORK: "Ngh??? Vi???c",
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

    UserStatusCode: {
        WORK: 1,
        STOP_WORK: 2,
    },

    // CarParts: {
    //     FRONT_OF_CAR: "?????u Xe",
    //     BACK_OF_CAR: "??u??i Xe",
    //     LEFT_CAR_BODY: "Th??n Xe B??n Tr??i",
    //     RIGHT_CAR_BODY: "Th??n Xe B??n Ph???i",
    //     CAR_FRONT_LIGHTS: "????n Tr?????c",
    //     CAR_BACK_LIGHTS: "????n Sau",
    //     OTHER_CAR_PARTS: "B??? Ph???n Kh??c",
    //     CAR_CONTROL_CENTER: "Trung T??m ??i???u Khi???n",
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
        MAX_LENGTH_MAINTENANCE_DESCRIPTION: 500,
    },

    Role: {
        // ALL: "all",
        ADMIN: "admin",
        USER: "user",
        DRIVER: "driver",
        ADMIN_SYSTEM: "adminSystem",
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
