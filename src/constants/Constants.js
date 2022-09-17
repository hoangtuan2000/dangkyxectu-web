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
            GET_SCHEDULE: '/getSchedule',
        },
        Home: {
            GET_CAR_LIST: "/getCarList",
            GET_CAR: "/getCar",
            GET_SCHEDULE_LIST: "/getScheduleList",
        },
        RentedCar: {
            GET_USER_REGISTERED_SCHEDULE_LIST: '/getUserRegisteredScheduleList',
            CANCEL_SCHEDULE: '/cancelSchedule',
        },
        DialogShowSchedule: {
            GET_SCHEDULE: '/getSchedule',
            CREATE_OR_UPDATE_REVIEW: '/createOrUpdateReview',
            UPDATE_SCHEDULE_APPROVED: '/updateScheduleApproved',
        },
    },

    Styled: {
        DATE_FORMAT: "dd/MM/yyyy",
    },

    ScheduleStatus: {
        PENDING: "Chờ Duyệt",
        APPROVED: "Đã Duyệt",
        COMPLETE: "Hoàn Thành",
        CANCELLED: "Đã Hủy",
        REFUSE: "Từ Chối",
    },

    Common: {
        PAGE: 1,
        LIMIT_ENTRY: 10,
    },
};

export default Constants;
