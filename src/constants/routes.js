export const AppRoutes = {
  LOGIN: "/login",
  FORGOTPASSWORD: "/forgot-password",
  RESETPASSWORD: "/auth/resetPassword/:token",
  DASHBOARD: "/dashboard",
  VIEW_CASE: "/dashboard/viewCase",
  VIEW_NOTES: "/dashboard/viewNotes",
  VIEW_UPLOAD: "/dashboard/viewUpload",
  SEND_ORDER: "/dashboard/sendOrder",
  CLOSE_CASE: "/dashboard/closeCase",
  MY_PROFILE: "/myProfile",
  INVOICING: "/provider/invoicing",
  MY_SCHEDULE: "/mySchedule",
  PROVIDER: "/provider",
  EDIT_PHYSICIAN: "/provider/editInfo",
  CREATE_PROVIDER_ACCOUNT: "/provider/createProviderAccount",
  ACCOUNT_ACCESS: "/access",
  USER_ACCESS: "/access/userAccess",
  CREATE_ROLE: "/access/createRole",
  SCHEDULING: "/provider/scheduling",
  REQUESTED_SHIFTS: "/provider/scheduling/requestedShifts",
  PROVIDER_ON_CALL: "/provider/scheduling/providerOnCall",
  PROVIDER_LOCATION: "/providerLocation",
  PARTNERS: "/partners",
  ADD_BUSINESS: "/partners/addBusiness",
  RECORDS: "/records",
  SEARCH_RECORDS: "/records/searchRecords",
  EMAIL_LOGS: "/records/emailLog",
  SMS_LOGS: "/records/smsLog",
  PATIENT_HISTORY: "/records/patientHistory",
  PATIENTS_RECORDS: "/records/patientHistory/patientsRecords",
  BLOCKED_HISTORY: "/records/blockedHistory",
  CREATE_REQUEST_ADMIN_PHYSICIAN: "/dashboard/createRequest",
  CONCLUDE_CARE: "/dashboard/concludeCare",
  ENCOUNTER_FORM: "/dashboard/encounterForm",

  /* Patient Routes */
  PATIENT_SITE: "/patient",
  SUBMIT_REQUEST: "/patient/submitRequest",
  PATIENT_CREATE_REQUEST: "/patient/createRequest/patient",
  FAMILY_FRIEND_REQUEST: "/patient/createRequest/family",
  BUSINESS_REQUEST: "/patient/createRequest/business",
  CONCIERGE_REQUEST: "/patient/createRequest/concierge",
  SUBMIT_INFORMATION: "/dashboard/patient/submitInformation",
  AGREEMENT_PAGE: "/patient/agreement/:id",
  USER_PROFILE: "/profile/patient",
};
