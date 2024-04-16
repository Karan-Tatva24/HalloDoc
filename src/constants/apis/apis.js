/* ***************************************** Auth API ***************************************** */

export const LOGIN_API = "/auth/login";
export const FORGOT_PASS = "/auth/forgotPassword";
export const RESET_PASS = "/auth/resetPassword";
export const CHANGE_PASSWORD = "/auth/changePassword";

/* ***************************************** Admin API ***************************************** */

/* ************************************* Partner API ************************************* */

export const ADD_BUSINESS = "/admin/partner/addBusiness";
export const GET_PROFESSIONS = "/admin/partner/professions";
export const GET_BUSINESS = "/admin/partner/businessByProfession";
export const VIEW_ORDER = "/admin//partner/viewSendOrder";
export const SEND_ORDER = "/admin/partner/sendOrder";
export const VIEW_BUSINESS = "/admin/partner/viewBusiness";
export const GET_VENDOR = "/admin/partner/viewVendor";
export const UPDATE_BUSINESS = "/admin/partner/updateBusiness";
export const DELETE_BUSINESS = "/admin/partner/deleteBusiness";

/* ************************************* Records API ************************************* */

export const PATIENT_RECORD = "/admin/records/patientRecord";
export const SEARCH_RECORD = "/admin/records/searchRecord";
export const PATIENT_HISTORY = "/admin/records/patientHistory";
export const BLOCK_HISTORY = "/admin/records/blockHistory";
export const UNBLOCK_PATIENT = "/admin/records/unBlockPatient";
export const DELETE_RECORD = "/admin/records/deleteRecord";
export const EXPORT_RECORD = "/admin/records/exportToExcel";
export const EMAIL_LOGS = "/admin/records/emailLog";
export const SMS_LOGS = "/admin/records/smsLog";

/* ************************************* Dashboard API *********************************** */

export const NEW_STATE = "/admin/dashboard";
export const VIEW_CASE = "/admin/dashboard/viewCase";
export const VIEW_NOTES = "/admin/dashboard/viewNotes";
export const UPDATE_NOTES = "/admin/dashboard/updateNotes";
export const GET_REGION = "/admin/dashboard/regions";
export const GET_PHYSICIAN = "/admin/dashboard/physicianByRegion";
export const ASSIGN_CASE = "/admin/dashboard/assignCase";
export const PATIENT_NAME = "/admin/dashboard/patientName";
export const CANCEL_CASE = "/admin/dashboard/cancelCase";
export const BLOCK_CASE = "/admin/dashboard/blockCase";
export const DASHBOARD_COUNT = "/admin/dashboard/dashboard";
export const CLEAR_CASE = "/admin/dashboard/clearCase";
export const TRANSFER_REQUEST = "/admin/dashboard/transferRequest";
export const VIEW_UPLOAD = "/admin/dashboard/viewUploads";
export const UPLOAD_FILE = "/admin/dashboard/uploadFile";
export const GET_SEND_AGREEMENT = "/admin/dashboard/viewSendAgreement";
export const SEND_AGREEMENT = "/admin/dashboard/sendAgreement";
export const SEND_LINK = "/admin/dashboard/sendPatientRequest";
export const REQUEST_SUPPORT = "/admin/dashboard/requestSupport";
export const CLOSE_CASE_VIEW = "/admin/dashboard/closeCaseView";
export const CLOSE_CASE = "/admin/dashboard/closeCase";
export const CLOSE_CASE_EDIT = "/admin/dashboard/updateCloseCase";
export const SEND_MAIL = "/admin/dashboard/sendFilesByEmail";

/* ************************************* Profile API ************************************* */

export const ADMIN_PROFILE = "/admin/profile/adminProfile";
export const EDIT_ADMIN_PROFILE = "/admin/profile/editAdminProfile";

/* ************************************* Provider API ************************************ */

export const PROVIDER_INFO = "/admin/provider/providerInformation";
export const PHYSICIAN_PROFILE = "/admin/provider/physicianProfile";
export const PROVIDER_ON_CALL = "/admin/provider/providerOnCall";
export const CONTACT_PROVIDER = "/admin/provider/contactProvider";
export const EDIT_PROVIDER_PROFILE = "/admin/provider/providerProfile";
export const UNAPPROVED_SHIFT = "/admin/provider/unApprovedShift";
export const APPROVE_SHIFT = "/admin/provider/approveShift";
export const DELETE_SHIFT = "/admin/provider/deleteShift";
export const UPDATE_NOTIFICATION = "/admin/provider/updateNotification";
export const DELETE_PROVIDER_ACCOUNT = "/admin/provider/deleteProvider";
export const ADD_NEW_SHIFT = "/admin/provider/addNewShift";
export const VIEW_SHIFT_BY_DATE = "/admin/provider/viewShiftFilter";
export const VIEW_SHIFT = "/admin/provider/viewShift";
export const EDIT_SHIFT = "/admin/provider/editShift";
export const TOGGLE_APPROVED = "/admin/provider/toggleApproval";

/* ************************************* Access API ************************************** */

export const ACCOUNT_ACCESS = "/admin/access/accountAccess";
export const GET_ROLE_BY_ACCOUNT_TYPE =
  "/admin/access/accountAccessByAccountType";
export const CREATE_ACCESS = "/admin/access/createRole";
export const USER_ACCESS = "/admin/access/userAccess";
export const VIEW_ROLE = "/admin/access/viewRole";
export const UPDATE_ROLE = "/admin/access/updateRole";
export const DELETE_ROLE = "/admin/access/deleteRole";

/* ************************************* Common API ************************************** */

export const COMMON_API = "/admin/common/getLoggedUser";
export const DOWNLOAD_FILE = "/admin/common/download";
export const DELETE_FILE = "/admin/common/deleteFile";
export const EXPORT = "/admin/common/export";
export const EXPORT_ALL = "/admin/common/exportAll";
export const VERIFY_STATE = "/admin/common/verifyRegion";
export const GET_ROLE = "/admin/common/getRoles";

/* ****************************************** User API ******************************************* */

export const CREATE_PROVIDER_ACCOUNT = "/user/createUser";
export const CREATE_ADMIN_REQUEST = "/user/createAdminRequest";

/* ***************************************** Provider API ***************************************** */

/* ************************************* Dashboard API *********************************** */

export const PROVIDER_DASHBOARD_BY_STATE = "/provider/dashboard";
export const PROVIDER_DASHBOARD_COUNT = "/provider/dashboard/dashboardCount";
export const ACCEPT_REQUEST = "/provider/dashboard/acceptRequest";
export const PROVIDER_TRANSFER_REQUEST = "/provider/dashboard/transferRequest";
export const TYPE_OF_CARE = "/provider/dashboard/typeOfCare";

/* ***************************************** Patient API ***************************************** */
