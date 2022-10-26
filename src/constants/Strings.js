import Constants from "./Constants";

const Strings = {
    App: {
        TITLE: "Hệ Thống Đăng Ký Sử Dụng Xe",
    },

    Common: {
        ERROR: "Có Lỗi Xảy Ra",
        LOGOUT: "Đăng Xuất",
        NO_DATA: "Không Có Dữ Liệu",
        IMAGE: "Ảnh",
        CAR_TYPE: "Loại Xe",
        CAR_CODE: "Mã Xe",
        SCHEDULE_CODE: "Mã Lịch Trình",
        LICENSE_PLATES: "Biển Số",
        CHOOSE_CAR: "Chọn Xe",
        START_LOCATION: "Vị Trí Bắt Đầu",
        END_LOCATION: "Vị Trí Kết Thúc",
        DESTINATION: "Điểm Đến",
        START_DATE: "Ngày Đi",
        END_DATE: "Ngày Về",
        TIME: "Thời Gian",
        STATUS: "Trạng Thái",
        UPDATE: "Cập Nhật",
        CHANGE_CAR: "Đổi Sang Xe Khác",
        DETELE: "Xóa",
        CANCEL: "Hủy",
        CONFIRM: "Xác Nhận",
        REVIEW: "Đánh Giá",
        FULL_NAME: "Họ Tên",
        FACULTY: "Thuộc Khoa",
        REASON: "Lý Do Đăng Ký",
        BRAND: "Thương Hiệu",
        NUMBER_OF_TRIPS: "Số Chuyến Đi",
        NUMBER_OF_MAINTENANCE: "Số Lần Bảo Trì",
        LICENSE: "Giấy Phép",
        PHONE_NUMBER: "Số Điện Thoại",
        AN_ERROR_OCCURRED: "Đã Xảy Ra Lỗi",
        NO_SCHEDULE: "Không Có Lịch Trình",
        CHOOSE_WARD: "-- Chọn xã phường --",
        CHOOSE_DISTRICT: "-- Chọn quận huyện --",
        CHOOSE_PROVINCE: "-- Chọn tỉnh thành phố --",
        NOTE: "Ghi Chú",
        SUCCESS: "Thành Công",
        INVALID_PHONE_NUMBER: "Số Điện Thoại Không Hợp Lệ",
        UPDATING: "Đang Cập Nhật",
        DETAIL: "Chi Tiết",
        EXIT: "Thoát",
        UPDATE_SCHEDULE: "Cập Nhật Lịch Trình",
        INFO_SCHEDULE: "Thông Tin Lịch Trình",
        FILTER: "Bộ Lọc",
        SEARCH: "Tìm Kiếm",
        REFRESH: "Làm Mới",
        OUT_OF_DATE: "Quá Hạn",
        COMPLETE: "Hoàn Thành",
        CONFIRM_COMPLETED: "Xác Nhận Đã Hoàn Thành",
        SCHEDULE_UPDATE_CONFIRMATION: "Xác Nhận Cập Nhật Lịch Trình",
        UPDATE_CONFIRMATION: "Xác Nhận Cập Nhật",
        MOVING_CONFIRMATION: "Xác Nhận Di Chuyển",
        CHANGE_CAR_CONFIRMATION: "Xác Nhận Đổi Xe",
        RECEIVE_CAR_CONFIRMATION: "Xác Nhận Nhận Xe",
        RETURN_CAR_CONFIRMATION: "Xác Nhận Trả Xe",
        DO_YOU_WANT_TO_UPDATE: "Bạn Có Muốn Cập Nhật?",
        DO_YOU_WANT_TO_CONFIRM_MOVING: "Bạn Có Muốn Xác Nhận Di Chuyển?",
        DO_YOU_WANT_TO_CHANGE_CAR: "Bạn Có Muốn Đổi Xe?",
        DO_YOU_WANT_TO_RECEIVE_CAR: "Bạn Có Muốn Nhận Xe?",
        DO_YOU_WANT_TO_RETURN_CAR: "Bạn Có Muốn Trả Xe?",
        DO_YOU_WANT_TO_ADD_CAR: "Bạn Có Muốn Thêm Xe?",
        DO_YOU_WANT_TO_ADD_DRIVER: "Bạn Có Muốn Thêm Tài Xế?",
        DO_YOU_WANT_TO_UPDATE_DRIVER: "Bạn Có Muốn Cập Nhật Tài Xế?",
        ADD_CAR_CONFIRMATION: "Xác Nhận Thêm Xe",
        ADD_DRIVER_CONFIRMATION: "Xác Nhận Thêm Tài Xế",
        UPDATE_DRIVER_CONFIRMATION: "Xác Nhận Cập Nhật Tài Xế",
        SCHEDULE_CANCEL_CONFIRMATION: "Xác Nhận Hủy Lịch Trình",
        DO_YOU_WANT_TO_CANCEL_SCHEDULE: "Bạn Có Muốn Hủy Lịch Trình?",
        DRIVER: "Tài Xế",
        EXPIRED: "Hết Hạn",
        NOT_EXPIRED: "Còn Hạn",
        // CREATE: "Tạo",
        ADD: "Thêm",
        DESCRIPTION: "Mô Tả",
        CAR_STATUS_BEFORE_TRIP: "Tình Trạng Xe Trước Khi Đi",
        INFO_CAR: "Thông Tin Xe",
        CAR_STATUS: "Tình Trạng Xe",
        DATA_IS_UNCHANGED: "Dữ Liệu Không Thay Đổi",
    },

    Login: {
        LOGIN_CODE: "Mã Số Đăng Nhập",
        PASSWORD: "Mật Khẩu",
        REMEMBER_ACCOUNT: "Ghi nhớ tôi",
        LOGIN: "Đăng Nhập",
        PLEASE_ENTER_PASSWORD: "Vui Lòng Nhập Mật Khẩu",
        PLEASE_ENTER_CODE: "Vui Lòng Nhập Mã Số",
    },

    MainLayout: {
        TEXT_HEADER: "Công Cụ Quản Lý",
    },

    Home: {
        CAR_LIST: "Danh Sách Xe",
        LICENSE_PLATES: "Biển Số Xe: ",
        CAR_COLOR: "Màu Xe: ",
        CAR_BRAND: "Thương Hiệu: ",
        VEHICLE_CONDITION: "Tình Trạng: ",
        SCHEDULE: "Lịch Trình: ",
        CAR_INFO: "Thông Tin Xe",
    },

    RentedCar: {
        RENTED_CAR_LIST: "Danh Sách Xe Đã Đăng Ký",
        CAR_LIST: "Danh Sách Xe",
        LICENSE_PLATES: "Biển Số Xe: ",
        CAR_BRAND: "Thương Hiệu: ",
        SCHEDULE: "Lịch Trình: ",
        SUBSCRIBERS: "Người Đăng Ký: ",
        DRIVER: "Tài Xế: ",
        TIME: "Thời Gian: ",
        REVIEW: "Đánh Giá: ",
        COMMENT: "Bình Luận",
        PHONE: "Số Điện Thoại",
        SCHEDULE_STATUS: "Trạng Thái Lịch Trình: ",
        REASON_CANCEL_SCHEDULE: "Lý Do Hủy Lịch Trình?",
    },

    DialogShowScheduleDriver: {
        LICENSE_PLATES: "Biển Số Xe: ",
        CAR_BRAND: "Thương Hiệu: ",
        CAR_STATUS: "Trạng Thái: ",
        SCHEDULE: "Lịch Trình: ",
        INFO_SUBSCRIBERS: "Thông Tin Người Đăng Ký: ",
        DRIVER: "Tài Xế: ",
        SCHEDULE_STATUS: "Trạng Thái Lịch Trình: ",
        TIME: "Thời Gian: ",
        FULL_NAME_USER: "Họ Tên:",
        PHONE_USER: "Số Điện Thoại:",
        EMAIL_USER: "Email:",
        NOTE: "Ghi Chú:",
        CAR_RENTAL_REASON: "Mục Đích Sử Dụng Xe: ",
        START_LOCATION: "Điểm Xuất Phát: ",
        END_LOCATION: "Điểm Đến: ",
        RECEIVE_SCHEDULE: "Nhận Lịch Trình",
        COMPLETE_COMFIRMATION: "Xác Nhận Hoàn Thành",
        MOVING_COMFIRMATION: "Xác Nhận Di Chuyển",
    },

    DialogShowScheduleAdmin: {
        LICENSE_PLATES: "Biển Số Xe: ",
        CAR_BRAND: "Thương Hiệu: ",
        CAR_STATUS: "Trạng Thái: ",
        SCHEDULE: "Lịch Trình: ",
        INFO_SUBSCRIBERS: "Thông Tin Người Đăng Ký: ",
        DRIVER: "Tài Xế: ",
        REVIEW: "Đánh Giá: ",
        SCHEDULE_STATUS: "Trạng Thái Lịch Trình: ",
        TIME: "Thời Gian: ",
        NAME_CODE: "Họ Tên - Mã Cán Bộ:",
        NAME_CODE_FACULTY: "Họ Tên - Mã Cán Bộ - Thuộc Khoa: ",
        PHONE: "Số Điện Thoại:",
        EMAIL: "Email:",
        NOTE: "Ghi Chú:",
        CAR_RENTAL_REASON: "Mục Đích Sử Dụng Xe: ",
        START_LOCATION: "Điểm Xuất Phát: ",
        END_LOCATION: "Điểm Đến: ",
        INFO_ADMIN: "Thông Tin Admin: ",
        CREATED_AT: "Ngày Đăng Ký: ",
        UPDATED_AT: "Ngày Cập Nhật: ",
        RECENT_UPDATE_USER: "Người Cập Nhật Gần Đây: ",
        PLEASE_CHOOSE_STATUS: "Vui Lòng Chọn Trạng Thái",
        PLEASE_CHOOSE_DRIVER: "Vui Lòng Chọn Tài Xế",
        ENTER_REASON_REFUSE: "Nhập Lý Do Từ Chối",
        PLEASE_ENTER_REASON: "Vui Lòng Nhập Lý Do",
        PLEASE_CHOOSE_REASON: "Vui Lòng Chọn Lý Do",
        PLEASE_ENTER_REASON: "Vui Lòng Nhập Lý Do",
        COMMENT: "Bình Luận",
    },

    DialogShowScheduleGlobal: {
        LICENSE_PLATES: "Biển Số Xe: ",
        CAR_BRAND: "Thương Hiệu: ",
        CAR_STATUS: "Trạng Thái: ",
        SCHEDULE: "Lịch Trình: ",
        INFO_SUBSCRIBERS: "Thông Tin Người Đăng Ký: ",
        DRIVER: "Tài Xế: ",
        REVIEW: "Đánh Giá: ",
        SCHEDULE_STATUS: "Trạng Thái Lịch Trình: ",
        TIME: "Thời Gian: ",
        NAME_CODE: "Họ Tên - Mã Cán Bộ:",
        NAME_CODE_FACULTY: "Họ Tên - Mã Cán Bộ - Thuộc Khoa: ",
        PHONE: "Số Điện Thoại:",
        EMAIL: "Email:",
        NOTE: "Ghi Chú:",
        CAR_RENTAL_REASON: "Mục Đích Sử Dụng Xe: ",
        START_LOCATION: "Điểm Xuất Phát: ",
        END_LOCATION: "Điểm Đến: ",
        INFO_ADMIN: "Thông Tin Admin: ",
        CREATED_AT: "Ngày Đăng Ký: ",
        UPDATED_AT: "Ngày Cập Nhật: ",
        RECENT_UPDATE_USER: "Người Cập Nhật Gần Đây: ",
        COMMENT: "Bình Luận",
    },

    CarRegistrationManagement: {
        LIST_OF_VEHICLE_REGISTRATION: "Danh Sách Đăng Ký Xe",
    },

    CarManager: {
        TITLE: "Danh Sách Xe",
        ADD_CAR: "Thêm Xe",
        CAR_CODE: "Mã Xe",
    },

    DriverManagement: {
        TITLE: "Danh Sách Tài Xế",
        ADD_DRIVER: "Thêm Tài Xế",
        DRIVER_CODE: "Mã Tài Xế",
        EMAIL: "Email",
    },

    Statistical: {
        TOTAL_CAR: "Tổng Số Xe",
        TOTAL_DRIVER: "Tống Số Tài Xế",
        TOTAL_TRIPS: "Tống Số Chuyến Đi",
        TOTAL_TRIPS_FROM: "Tống Số Chuyến Đi Từ: ",
        FORM_IS_PENDING_CONFIRMATION: "Đơn Chờ Xác Nhận",
        LICENSE_CAR_EXPIRES: "Giấy Phép Xe Hết Hạn",
    },

    DriverTripManager: {
        TRIP_LIST: "Danh Sách Chuyến Đi",
    },

    RentalCar: {
        RENTAL_CAR: "Đăng Ký Xe",
        CAR_REGISTRATRION_INFOMATION: "Thông Tin Đăng Ký Xe",
        ENTER_START_LOCATION: "-- Địa Điểm Xuất Phát --",
        ENTER_END_LOCATION: "-- Địa Điểm Kết Thúc --",
        ENTER_START_LOCATION: "-- Nhập Địa Điểm Xuất Phát --",
        ENTER_END_LOCATION: "-- Nhập Địa Điểm Kết Thúc --",
        ENTER_CAR_RENTAL_REASON: "-- Mục Đích Sử Dụng Xe --",
        CHOOSE_TIME: "-- Chọn Thời Gian --",
        ENTER_NOTE: "-- Ghi Chú --",
        ENTER_PHONE_NUMBER: "-- Số Điện Thoại --",
        START_END_DAY: "Ngày Đi - Ngày Về: ",
        CAR_RENTAL_REASON: "Mục Đích Sử Dụng Xe: ",
        START_LOCATION: "Địa Điểm Xuất Phát: ",
        END_LOCATION: "Địa Điểm Kết Thúc: ",
        NOTE: "Ghi Chú: ",
        PHONE_NUMBER: "Số Điện Thoại: ",
        REGISTRATION_CONFIRMATION: "Xác Nhận Đăng Ký",
        CAR_LIST: "Danh Sách Xe",
        LICENSE_PLATES: "Biển Số Xe: ",
        CAR_COLOR: "Màu Xe: ",
        CAR_BRAND: "Thương Hiệu: ",
        VEHICLE_CONDITION: "Tình Trạng: ",
        SCHEDULE: "Lịch Trình: ",
        ENTER_REASON_CANCEL_SCHEDULE: "Nhập Lý Do Hủy Lịch Trình",
        PLEASE_ENTER_REASON: "Vui Lòng Nhập Lý Do",
    },

    UpdateSchedulePending: {
        UPDATE_SCHEDULE: "Cập Nhật Lịch Trình",
        ENTER_START_LOCATION: "-- Địa Điểm Xuất Phát --",
        ENTER_END_LOCATION: "-- Địa Điểm Kết Thúc --",
        ENTER_START_LOCATION: "-- Nhập Địa Điểm Xuất Phát --",
        ENTER_END_LOCATION: "-- Nhập Địa Điểm Kết Thúc --",
        ENTER_CAR_RENTAL_REASON: "-- Mục Đích Sử Dụng Xe --",
        CHOOSE_TIME: "-- Chọn Thời Gian --",
        ENTER_NOTE: "-- Ghi Chú --",
        ENTER_PHONE_NUMBER: "-- Số Điện Thoại --",
        START_END_DAY: "Ngày Đi - Ngày Về: ",
        CAR_RENTAL_REASON: "Mục Đích Sử Dụng Xe: ",
        START_LOCATION: "Địa Điểm Xuất Phát: ",
        END_LOCATION: "Địa Điểm Kết Thúc: ",
        NOTE: "Ghi Chú: ",
        PHONE_NUMBER: "Số Điện Thoại: ",
        CAR_LIST: "Danh Sách Xe",
        LICENSE_PLATES: "Biển Số Xe: ",
        CAR_COLOR: "Màu Xe: ",
        CAR_BRAND: "Thương Hiệu: ",
        VEHICLE_CONDITION: "Tình Trạng: ",
        SCHEDULE: "Lịch Trình: ",
    },

    ModalShowAddress: {
        TITLE_START_LOCATION: "Chọn Địa Chỉ Xuất Phát",
        TITLE_END_LOCATION: "Chọn Địa Chỉ Kết Thúc",
        TITLE_LOCATION: "Chọn Địa Chỉ",
    },

    DialogDriverTripManagerFilter: {
        TITLE: "Bộ Lọc Lịch Trình",
        CHOOSE_TIME: "-- Chọn Thời Gian --",
        ENTER_LOCATION: "-- Địa Điểm --",
        STATUS: "Trạng Thái:",
        CAR_TYPE: "Loại Xe:",
        CHOOSE_CAR_TYPE: "-- Chọn Loại Xe --",
        CHOOSE_STATUS: "-- Chọn Trạng Thái --",
        CHOOSE_DRIVER: "-- Chọn Tài Xế --",
        SCHEDULE_CODE: "Mã Lịch Trình:",
        ENTER_SCHEDULE_CODE: "-- Nhập Mã Lịch Trình --",
        TIME: "Thời Gian: ",
        ADDRESS: "Địa Chỉ: ",
    },

    DialogRentedCarFilter: {
        TITLE: "Bộ Lọc Lịch Trình",
        CHOOSE_TIME: "-- Chọn Thời Gian --",
        ENTER_LOCATION: "-- Địa Điểm --",
        STATUS: "Trạng Thái:",
        CAR_TYPE: "Loại Xe:",
        CHOOSE_CAR_TYPE: "-- Chọn Loại Xe --",
        CHOOSE_STATUS: "-- Chọn Trạng Thái --",
        SCHEDULE_CODE: "Mã Lịch Trình:",
        ENTER_SCHEDULE_CODE: "-- Nhập Mã Lịch Trình --",
        TIME: "Thời Gian: ",
        ADDRESS: "Địa Chỉ: ",
    },

    DialogCarRegistrationManagementFilter: {
        TITLE: "Bộ Lọc Lịch Trình",
        CHOOSE_TIME: "-- Chọn Thời Gian --",
        ENTER_LOCATION: "-- Địa Điểm --",
        STATUS: "Trạng Thái:",
        FACULTY: "Khoa:",
        CAR_TYPE: "Loại Xe:",
        CHOOSE_CAR_TYPE: "-- Chọn Loại Xe --",
        CHOOSE_STATUS: "-- Chọn Trạng Thái --",
        CHOOSE_FACULTY: "-- Chọn Khoa --",
        SCHEDULE_CODE: "Mã Lịch Trình:",
        SUBSCRIBERS: "Người Đăng Ký:",
        DRIVER: "Tài Xế:",
        LICENSE_PLATES: "Biển Số Xe:",
        ENTER_SCHEDULE_CODE: "-- Nhập Mã Lịch Trình --",
        ENTER_NAME_CODE_USER: "-- Nhập Tên Hoặc Mã CB Người Đăng Ký --",
        ENTER_NAME_CODE_DRIVER: "-- Nhập Tên Hoặc Mã CB Tài Xế --",
        ENTER_LICENSE_PLATES: "-- Nhập Biển Số Xe --",
        TIME: "Thời Gian: ",
        ADDRESS: "Địa Chỉ: ",
    },
    DialogCarManagerFilter: {
        TITLE: "Bộ Lọc Xe",
        LICENSE_PLATES: "Biển Số Xe:",
        ENTER_LICENSE_PLATES: "-- Nhập Biển Số Xe --",
        CAR_CODE: "Mã Số Xe: ",
        ENTER_CAR_CODE: "-- Nhập Mã Số Xe --",
        BRAND: "Thương Hiệu: ",
        CHOOSE_BRAND: "-- Chọn Thương Hiệu --",
        CAR_STATUS: "Trạng Thái Xe:",
        CAR_TYPE: "Loại Xe:",
        LICENSE: "Giấy Phép: ",
        CHOOSE_CAR_TYPE: "-- Chọn Loại Xe --",
        CHOOSE_CAR_STATUS: "-- Chọn Trạng Thái Xe --",
        EXPIRES: "Hết Hạn",
        NOT_EXPIRES: "Còn Hạn",
        HAVE_TRIP: "Có Chuyến Đi: ",
        HAVE_MAINTENANCE: "Có Bảo Trì: ",
        YES: "Có",
        NO: "Không",
    },
    DialogCreateCar: {
        TITLE: "Thêm Xe",
        LICENSE_PLATES: "Biển Số Xe: ",
        ENTER_LICENSE_PLATES: "-- Nhập Biển Số Xe --",
        CAR_TYPE: "Loại Xe: ",
        CHOOSE_CAR_TYPE: "-- Chọn Loại Xe --",
        CAR_BRAND: "Thương Hiệu: ",
        CHOOSE_CAR_BRAND: "-- Chọn Thương Hiệu --",
        CAR_COLOR: "Màu Xe: ",
        CHOOSE_CAR_COLOR: "-- Chọn Màu Xe --",
        CAR_REGISTRATION_CERTIFICATE: "Giấy Đăng Ký Xe: ",
        CHOOSE_TIME_CAR_REGISTRATION_CERTIFICATE:
            "-- Chọn Thời Gian Giấy Đăng Ký Xe --",
        CHOOSE_TIME_PERIODIC_INSPECTION_CERTIFICATE:
            "-- Chọn Thời Gian Giấy Đăng Kiểm Xe --",
        CHOOSE_TIME_CAR_INSURANCE: "-- Chọn Thời Gian Giấy Bảo Hiểm Xe --",
        PERIODIC_INSPECTION_CERTIFICATE: "Giấy Đăng Kiểm Xe: ",
        CAR_INSURANCE: "Giấy Bảo Hiểm Xe: ",
        CHOOSE_TIME: "-- Chọn Thời Gian -- ",
        CHOOSE_IMAGE_PLEASE: "Vui Lòng Chọn Hình Ảnh",
        ENTER_LICENSE_PLATES_PLEASE: "Vui Lòng Nhập Biển Số Xe",
        CHOOSE_CAR_TYPE_PLEASE: "Vui Lòng Chọn Loại Xe",
        CHOOSE_CAR_BRAND_PLEASE: "Vui Lòng Chọn Thương Hiệu",
        CHOOSE_CAR_COLOR_PLEASE: "Vui Lòng Chọn Màu Xe",
        CHOOSE_TIME_PLEASE: "Vui Lòng Chọn Thời Gian",
        NOTE_REGISTRATION_CERTIFICATE:
            "Chọn Cùng Ngày Nếu Giấy Phép Không Có Thời Hạn",
        SUPPORT_LENGTH_LICENSE_PLATES: `Từ ${Constants.Common.CHARACTERS_MIN_LENGTH_LICENSE_PLATES} - ${Constants.Common.CHARACTERS_MAX_LENGTH_LICENSE_PLATES} Ký Tự`,
    },
    DialogUpdateCar: {
        TITLE: "Cập Nhật Thông Tin Xe",
        CREATED_AT: "Ngày Tạo: ",
        UPDATED_AT: "Ngày Cập Nhật: ",
        PEOPLE_UPDATED: "Người Cập Nhật: ",
        LICENSE_PLATES: "Biển Số Xe: ",
        ENTER_LICENSE_PLATES: "-- Nhập Biển Số Xe --",
        INFO_ADMIN: "Thông Tin Admin: ",
        NAME: "Họ Tên:",
        CODE: "Mã Cán Bộ:",
        EMAIL: "Email:",
        PHONE: "Số Điện Thoại:",
        CAR_TYPE: "Loại Xe: ",
        CAR_STATUS: "Trạng Thái Xe: ",
        CHOOSE_CAR_TYPE: "-- Chọn Loại Xe --",
        CHOOSE_STATUS: "-- Chọn Trạng Thái --",
        CAR_BRAND: "Thương Hiệu: ",
        CHOOSE_CAR_BRAND: "-- Chọn Thương Hiệu --",
        CAR_COLOR: "Màu Xe: ",
        CHOOSE_CAR_COLOR: "-- Chọn Màu Xe --",
        CAR_REGISTRATION_CERTIFICATE: "Giấy Đăng Ký Xe: ",
        CHOOSE_TIME_CAR_REGISTRATION_CERTIFICATE:
            "-- Chọn Thời Gian Giấy Đăng Ký Xe --",
        CHOOSE_TIME_PERIODIC_INSPECTION_CERTIFICATE:
            "-- Chọn Thời Gian Giấy Đăng Kiểm Xe --",
        CHOOSE_TIME_CAR_INSURANCE: "-- Chọn Thời Gian Giấy Bảo Hiểm Xe --",
        PERIODIC_INSPECTION_CERTIFICATE: "Giấy Đăng Kiểm Xe: ",
        CAR_INSURANCE: "Giấy Bảo Hiểm Xe: ",
        CHOOSE_TIME: "-- Chọn Thời Gian -- ",
        CHOOSE_IMAGE_PLEASE: "Vui Lòng Chọn Hình Ảnh",
        ENTER_LICENSE_PLATES_PLEASE: "Vui Lòng Nhập Biển Số Xe",
        CHOOSE_CAR_TYPE_PLEASE: "Vui Lòng Chọn Loại Xe",
        CHOOSE_CAR_STATUS_PLEASE: "Vui Lòng Chọn Trạng Thái",
        CHOOSE_CAR_BRAND_PLEASE: "Vui Lòng Chọn Thương Hiệu",
        CHOOSE_CAR_COLOR_PLEASE: "Vui Lòng Chọn Màu Xe",
        CHOOSE_TIME_PLEASE: "Vui Lòng Chọn Thời Gian",
        NOTE_REGISTRATION_CERTIFICATE:
            "Chọn Cùng Ngày Nếu Giấy Phép Không Có Thời Hạn",
        SUPPORT_LENGTH_LICENSE_PLATES: `Từ ${Constants.Common.CHARACTERS_MIN_LENGTH_LICENSE_PLATES} - ${Constants.Common.CHARACTERS_MAX_LENGTH_LICENSE_PLATES} Ký Tự`,
    },

    DialogCarStatusConfirmation: {
        CAR_STATUS_BEFORE_DEPARTURE: "Tình Trạng Xe Khi Xuất Phát",
        CAR_STATUS_AFTER_DEPARTURE: "Tình Trạng Xe Sau Khi Xuất Phát",
        GOOD: "Tốt",
        HAVE_BROKEN_PARTS: "Có Bộ Phận Bị Hỏng",
        FRONT_OF_CAR: "Đầu Xe",
        BACK_OF_CAR: "Đuôi Xe",
        LEFT_CAR_BODY: "Thân Xe Bên Trái",
        RIGHT_CAR_BODY: "Thân Xe Bên Phải",
        CAR_FRONT_LIGHTS: "Đèn Trước",
        CAR_BACK_LIGHTS: "Đèn Sau",
        OTHER_CAR_PARTS: "Bộ Phận Khác",
        CAR_CONTROL_CENTER: "Trung Tâm Điều Khiển",
        RECEIVE_CAR: "Nhận Xe",
        COMPLETE_SCHEDULE: "Hoàn Thành Lịch Trình",
        PLEASE_CHOOSE_CAR_STATUS: "Vui Lòng Chọn Tình Trạng Xe",
        PLEASE_CHOOSE_BROKEN_CAR_PARTS: "Vui Lòng Chọn Bộ Phận Xe Bị Hỏng",
    },

    DialogConfirmationCancel: {
        PLEASE_CHOOSE_REASON: "Vui Lòng Chọn Lý Do",
        PLEASE_ENTER_REASON: "Vui Lòng Nhập Lý Do",
        ENTER_REASON: "Nhập Lý Do",
    },

    DialogChangeCar: {
        TITLE: "Danh Sách Xe",
        SEARCH: "Tìm Kiếm",
        CAR_CODE: "Mã Xe",
        LICENSE_PLATES: "Biển Số",
        SEAT_NUMBER: "Số Ghế",
        CHANGE_CAR: "Đổi Xe",
    },

    CarStatusOfTrip: {
        TITLE: "Tình Trạng Xe Của Chuyến Đi",
    },

    DialogCarStatusOfTripFilter: {
        TITLE: "Bộ Lọc",
        CAR_STATUS_BEFORE_GOING: "Xe Trước Khi Đi: ",
        CAR_STATUS_AFTER_GOING: "Xe Sau Khi Đi: ",
        HAS_DAMAGE: "Có Hư Hỏng",
        NO_DAMAGE: "Không Hư Hỏng",
        DRIVER: "Tài Xế: ",
        CHOOSE_DRIVER: "-- Chọn Tài Xế --",
        TIME: "Thời Gian: ",
        CAR_CODE: "Mã Số Xe: ",
        ENTER_CAR_CODE: "-- Nhập Mã Số Xe --",
        LICENSE_PLATES: "Biển Số Xe:",
        ENTER_LICENSE_PLATES: "-- Nhập Biển Số Xe --",
        BRAND: "Thương Hiệu: ",
        CHOOSE_BRAND: "-- Chọn Thương Hiệu --",
        CAR_TYPE: "Loại Xe:",
        CHOOSE_CAR_TYPE: "-- Chọn Loại Xe --",
    },

    DialogShowCarBroken: {
        TITLE: "Thông Tin Tình Trạng Xe",
    },

    DialogDriverManagementFilter: {
        TITLE: "Bộ Lọc Tài Xế",
        EXPIRE_LICENSE: "Hạn Giấy Phép: ",
        DRIVER_CODE: "Mã Tài Xế: ",
        ENTER_DRIVER_CODE: "-- Nhập Mã Tài Xế --",
        FULL_NAME: "Họ Tên: ",
        ENTER_FULL_NAME: "-- Nhập Họ Tên --",
        EMAIL: "Email: ",
        ENTER_EMAIL: "-- Nhập Email --",
        PHONE: "Điện Thoại",
        ENTER_PHONE: "-- Nhập Số Điện Thoại --",
        DRIVER_LICENSE: "Giấy Phép: ",
        NUMBER_OF_TRIPS: "Số Chuyến Đi: ",
        ENTER_NUMBER_OF_TRIPS: "-- Nhập Số Chuyến Đi --",
        CHOOSE_DRIVER_LICENSE: "-- Chọn Giấy Phép --",
        STATUS: "Trạng Thái: ",
        CHOOSE_STATUS: "-- Chọn Trạng Thái --",
        REVIEW: "Đánh Giá: ",
        EXPIRES: "Hết Hạn",
        NOT_EXPIRES: "Còn Hạn",
    },

    DialogCreateDriver: {
        TITLE: "Thêm Tài Xế",
        FULL_NAME: "Họ Tên: ",
        ENTER_FULL_NAME: "-- Nhập Họ Tên --",
        CODE_DRIVER: "Mã Tài Xế: ",
        ENTER_CODE_DRIVER: "-- Nhập Mã Tài Xế --",
        EMAIL: "Email: ",
        ENTER_EMAIL: "-- Nhập Email --",
        PASSWORD: "Mật Khẩu: ",
        ENTER_PASSWORD: "-- Nhập Mật Khẩu --",
        PHONE: "Điện Thoại: ",
        ENTER_PHONE: "-- Nhập Điện Thoại --",
        LICENSE_TERM: "Hạn Giấy Phép: ",
        DRIVER_LICENSE: "Bằng Lái Xe: ",
        CHOOSE_DRIVER_LICENSE: "-- Chọn Bằng Lái Xe --",
        ADDRESS: "Địa Chỉ: ",
        ENTER_FULL_NAME_PLEASE: "Vui Lòng Nhập Họ Tên",
        ENTER_EMAIL_PLEASE: "Vui Lòng Nhập Email",
        ENTER_PASSWORD_PLEASE: "Vui Lòng Nhập Mật Khẩu",
        ENTER_PHONE_PLEASE: "Vui Lòng Nhập Số Điện Thoại",
        SUPPORT_FULL_NAME: `Từ ${Constants.Common.MIN_LENGTH_FULL_NAME} - ${Constants.Common.MAX_LENGTH_FULL_NAME} Ký Tự`,
        SUPPORT_PASSWORD: `Từ ${Constants.Common.MIN_LENGTH_PASSWORD} - ${Constants.Common.MAX_LENGTH_PASSWORD} Ký Tự`,
        ENTER_CODE_PLEASE: "Vui Lòng Nhập Mã Tài Xế",
        SUPPORT_CODE: `Gồm ${Constants.Common.MAX_LENGTH_CODE} Ký Tự`,
        SUPPORT_EMAIL: `Email Không Đúng Định Dạng`,
        SUPPORT_PHONE: `Số Điện Thoại Không Đúng Định Dạng`,
        CHOOSE_TIME_PLEASE: "Vui Lòng Chọn Thời Gian",
        CHOOSE_DRIVER_LICENSE_PLEASE: "Vui Lòng Chọn Bằng Lái Xe",
        ENTER_ADDRESS: "-- Nhập Địa Chỉ --",
        CHOOSE_ADDRESS: "-- Chọn Địa Chỉ --",
        TITLE_MODAL_ADDRESS: "Chọn Địa Chỉ",
        ENTER_ADDRESS_PLEASE: "Vui Lòng Nhập Địa Chỉ",
    },
    DialogUpdateDriver: {
        TITLE: "Cập Nhật Thông Tin Tài Xế",
        FULL_NAME: "Họ Tên: ",
        ENTER_FULL_NAME: "-- Nhập Họ Tên --",
        CODE_DRIVER: "Mã Tài Xế: ",
        ENTER_CODE_DRIVER: "-- Nhập Mã Tài Xế --",
        EMAIL: "Email: ",
        ENTER_EMAIL: "-- Nhập Email --",
        PASSWORD: "Mật Khẩu: ",
        ENTER_PASSWORD: "-- Nhập Mật Khẩu --",
        PHONE: "Điện Thoại: ",
        ENTER_PHONE: "-- Nhập Điện Thoại --",
        LICENSE_TERM: "Hạn Giấy Phép: ",
        DRIVER_LICENSE: "Bằng Lái Xe: ",
        CHOOSE_DRIVER_LICENSE: "-- Chọn Bằng Lái Xe --",
        ADDRESS: "Địa Chỉ: ",
        ENTER_FULL_NAME_PLEASE: "Vui Lòng Nhập Họ Tên",
        ENTER_EMAIL_PLEASE: "Vui Lòng Nhập Email",
        ENTER_PASSWORD_PLEASE: "Vui Lòng Nhập Mật Khẩu",
        ENTER_PHONE_PLEASE: "Vui Lòng Nhập Số Điện Thoại",
        SUPPORT_FULL_NAME: `Từ ${Constants.Common.MIN_LENGTH_FULL_NAME} - ${Constants.Common.MAX_LENGTH_FULL_NAME} Ký Tự`,
        SUPPORT_PASSWORD: `Từ ${Constants.Common.MIN_LENGTH_PASSWORD} - ${Constants.Common.MAX_LENGTH_PASSWORD} Ký Tự`,
        ENTER_CODE_PLEASE: "Vui Lòng Nhập Mã Tài Xế",
        SUPPORT_CODE: `Gồm ${Constants.Common.MAX_LENGTH_CODE} Ký Tự`,
        SUPPORT_EMAIL: `Email Không Đúng Định Dạng`,
        SUPPORT_PHONE: `Số Điện Thoại Không Đúng Định Dạng`,
        CHOOSE_TIME_PLEASE: "Vui Lòng Chọn Thời Gian",
        CHOOSE_DRIVER_LICENSE_PLEASE: "Vui Lòng Chọn Bằng Lái Xe",
        ENTER_ADDRESS: "-- Nhập Địa Chỉ --",
        CHOOSE_ADDRESS: "-- Chọn Địa Chỉ --",
        TITLE_MODAL_ADDRESS: "Chọn Địa Chỉ",
        ENTER_ADDRESS_PLEASE: "Vui Lòng Nhập Địa Chỉ",
        STATUS: "Trạng Thái: ",
        CHOOSE_STATUS_LICENSE: "-- Chọn Trạng Thái --",
        CHOOSE_STATUS_PLEASE: "-- Vui Lòng Chọn Trạng Thái --",
    },

    DialogShowAnalysisTotalTrips: {
        TITLE: "Danh Sách Lịch Trình",
        DATE: "Ngày",
        SCHEDULE_CODE: "Mã Lịch Trình",
        TIME: "Thời Gian",
        SUBSCRIBERS: "Người Đăng Ký",
        DRIVER: "Tài Xế",
    },
    DialogShowAnalysisTotalTripsFilter: {
        TITLE: "Bộ Lọc Lịch Trình",
        CHOOSE_TIME: "-- Chọn Thời Gian --",
        ENTER_LOCATION: "-- Địa Điểm --",
        STATUS: "Trạng Thái:",
        FACULTY: "Khoa:",
        CAR_TYPE: "Loại Xe:",
        CHOOSE_CAR_TYPE: "-- Chọn Loại Xe --",
        CHOOSE_STATUS: "-- Chọn Trạng Thái --",
        CHOOSE_FACULTY: "-- Chọn Khoa --",
        SCHEDULE_CODE: "Mã Lịch Trình:",
        SUBSCRIBERS: "Người Đăng Ký:",
        DRIVER: "Tài Xế:",
        LICENSE_PLATES: "Biển Số Xe:",
        ENTER_SCHEDULE_CODE: "-- Nhập Mã Lịch Trình --",
        ENTER_NAME_CODE_USER: "-- Nhập Tên Hoặc Mã CB Người Đăng Ký --",
        ENTER_NAME_CODE_DRIVER: "-- Nhập Tên Hoặc Mã CB Tài Xế --",
        ENTER_LICENSE_PLATES: "-- Nhập Biển Số Xe --",
        TIME: "Thời Gian: ",
        ADDRESS: "Địa Chỉ: ",
        HAVE_SCHEDULE: "Có Lịch Trình: ",
        YES: "Có",
        NO: "Không",
    },
};

export default Strings;
