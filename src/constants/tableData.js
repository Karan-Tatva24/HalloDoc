import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import PageviewOutlinedIcon from "@mui/icons-material/PageviewOutlined";
import DocumentScannerOutlinedIcon from "@mui/icons-material/DocumentScannerOutlined";
import BlockOutlinedIcon from "@mui/icons-material/BlockOutlined";
import UploadFileOutlinedIcon from "@mui/icons-material/UploadFileOutlined";
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import TaskOutlinedIcon from "@mui/icons-material/TaskOutlined";
import ContactPageOutlinedIcon from "@mui/icons-material/ContactPageOutlined";
import MonitorHeartOutlinedIcon from "@mui/icons-material/MonitorHeartOutlined";

export const newColumns = [
  {
    id: "name",
    label: "Name",
    maxWidth: "200px",
    accountTypes: ["Admin", "Physician"],
  },
  {
    id: "mail",
    label: "",
    maxWidth: "60px",
    accountTypes: ["Admin", "Physician"],
  },
  {
    id: "dateOfBirth",
    label: "Date Of Birth",
    maxWidth: "120px",
    accountTypes: ["Admin"],
  },
  {
    id: "requestor",
    label: "Requestor",
    align: "center",
    maxWidth: "130PX",
    accountTypes: ["Admin"],
  },
  {
    id: "requestedDate",
    label: "Requested Date",
    maxWidth: "120px",
    align: "center",
    accountTypes: ["Admin"],
  },
  {
    id: "phoneNumber",
    label: "Phone",
    maxWidth: "180px",
    align: "center",
    accountTypes: ["Admin", "Physician"],
  },
  {
    id: "address",
    label: "Address",
    maxWidth: "280px",
    align: "center",
    accountTypes: ["Admin", "Physician"],
  },
  {
    id: "notes",
    label: "Notes",
    maxWidth: "200px",
    align: "center",
    accountTypes: ["Admin"],
  },
  {
    id: "action",
    label: "Actions",
    maxWidth: "120px",
    align: "center",
    accountTypes: ["Admin", "Physician"],
  },
];

export const pendingColumns = [
  {
    id: "name",
    label: "Name",
    maxWidth: "200px",
    accountTypes: ["Admin", "Physician"],
  },
  {
    id: "mail",
    label: "",
    maxWidth: "60px",
    accountTypes: ["Admin", "Physician"],
  },
  {
    id: "dateOfBirth",
    label: "Date Of Birth",
    maxWidth: "120px",
    accountTypes: ["Admin"],
  },
  {
    id: "requestor",
    label: "Requestor",
    align: "center",
    maxWidth: "130px",
    accountTypes: ["Admin"],
  },
  {
    id: "physicianName",
    label: "Physician Name",
    align: "center",
    maxWidth: "130px",
    accountTypes: ["Admin"],
  },
  {
    id: "dateOfService",
    label: "Date Of Service",
    maxWidth: "120px",
    align: "center",
    accountTypes: ["Admin"],
  },
  {
    id: "phoneNumber",
    label: "Phone",
    maxWidth: "180px",
    align: "center",
    accountTypes: ["Admin", "Physician"],
  },
  {
    id: "address",
    label: "Address",
    maxWidth: "280px",
    align: "center",
    accountTypes: ["Admin", "Physician"],
  },
  {
    id: "notes",
    label: "Notes",
    maxWidth: "200px",
    align: "center",
    accountTypes: ["Admin"],
  },
  {
    id: "action",
    label: "Actions",
    maxWidth: "120px",
    align: "center",
    accountTypes: ["Admin", "Physician"],
  },
];

export const activeColumns = [
  {
    id: "name",
    label: "Name",
    maxWidth: "200px",
    accountTypes: ["Admin", "Physician"],
  },
  {
    id: "mail",
    label: "",
    maxWidth: "60px",
    accountTypes: ["Admin", "Physician"],
  },
  {
    id: "dateOfBirth",
    label: "Date Of Birth",
    maxWidth: "120px",
    accountTypes: ["Admin"],
  },
  {
    id: "requestor",
    label: "Requestor",
    align: "center",
    maxWidth: "130px",
    accountTypes: ["Admin"],
  },
  {
    id: "physicianName",
    label: "Physician Name",
    align: "center",
    maxWidth: "130px",
    accountTypes: ["Admin"],
  },
  {
    id: "dateOfService",
    label: "Date Of Service",
    maxWidth: "120px",
    align: "center",
    accountTypes: ["Admin"],
  },
  {
    id: "phoneNumber",
    label: "Phone",
    maxWidth: "180px",
    align: "center",
    accountTypes: ["Admin", "Physician"],
  },
  {
    id: "address",
    label: "Address",
    maxWidth: "280px",
    align: "center",
    accountTypes: ["Admin", "Physician"],
  },
  {
    id: "callType",
    label: "Status",
    maxWidth: "120px",
    align: "center",
    accountTypes: ["Physician"],
  },
  {
    id: "notes",
    label: "Notes",
    maxWidth: "200px",
    align: "center",
    accountTypes: ["Admin"],
  },
  {
    id: "action",
    label: "Actions",
    maxWidth: "120px",
    align: "center",
    accountTypes: ["Admin", "Physician"],
  },
];

export const concludeColumns = [
  {
    id: "name",
    label: "Name",
    maxWidth: "200px",
    accountTypes: ["Admin", "Physician"],
  },
  {
    id: "mail",
    label: "",
    maxWidth: "60px",
    accountTypes: ["Admin", "Physician"],
  },
  {
    id: "dateOfBirth",
    label: "Date Of Birth",
    maxWidth: "130px",
    accountTypes: ["Admin"],
  },
  {
    id: "physicianName",
    label: "Physician Name",
    align: "center",
    maxWidth: "150px",
    accountTypes: ["Admin"],
  },
  {
    id: "dateOfService",
    label: "Date Of Service",
    maxWidth: "130px",
    align: "center",
    accountTypes: ["Admin"],
  },
  {
    id: "phoneNumber",
    label: "Phone",
    maxWidth: "200px",
    align: "center",
    accountTypes: ["Admin", "Physician"],
  },
  {
    id: "address",
    label: "Address",
    maxWidth: "300px",
    align: "center",
    accountTypes: ["Admin", "Physician"],
  },
  {
    id: "action",
    label: "Actions",
    maxWidth: "120px",
    align: "center",
    accountTypes: ["Admin", "Physician"],
  },
];

export const toCloseColumns = [
  {
    id: "name",
    label: "Name",
    maxWidth: "200px",
    accountTypes: ["Admin"],
  },
  {
    id: "mail",
    label: "",
    maxWidth: "60px",
    accountTypes: ["Admin"],
  },
  {
    id: "dateOfBirth",
    label: "Date Of Birth",
    maxWidth: "120px",
    accountTypes: ["Admin"],
  },
  {
    id: "region",
    label: "Region",
    maxWidth: "100px",
    align: "center",
    accountTypes: ["Admin"],
  },
  {
    id: "physicianName",
    label: "Physician Name",
    align: "center",
    maxWidth: "130px",
    accountTypes: ["Admin"],
  },
  {
    id: "dateOfService",
    label: "Date Of Service",
    maxWidth: "120px",
    align: "center",
    accountTypes: ["Admin"],
  },

  {
    id: "address",
    label: "Address",
    maxWidth: "280px",
    align: "center",
    accountTypes: ["Admin"],
  },
  {
    id: "notes",
    label: "Notes",
    maxWidth: "200px",
    align: "center",
    accountTypes: ["Admin"],
  },
  {
    id: "action",
    label: "Actions",
    maxWidth: "100px",
    align: "center",
    accountTypes: ["Admin"],
  },
];

export const unpaidColumns = [
  {
    id: "name",
    label: "Name",
    maxWidth: "200px",
    accountTypes: ["Admin"],
  },
  {
    id: "mail",
    label: "",
    maxWidth: "60px",
    accountTypes: ["Admin"],
  },
  {
    id: "physicianName",
    label: "Physician Name",
    align: "center",
    maxWidth: "140px",
    accountTypes: ["Admin"],
  },
  {
    id: "dateOfService",
    label: "Date Of Service",
    maxWidth: "120px",
    align: "center",
    accountTypes: ["Admin"],
  },
  {
    id: "phoneNumber",
    label: "Phone",
    maxWidth: "180px",
    align: "center",
    accountTypes: ["Admin"],
  },
  {
    id: "address",
    label: "Address",
    maxWidth: "280px",
    align: "center",
    accountTypes: ["Admin"],
  },
  {
    id: "action",
    label: "Actions",
    maxWidth: "120px",
    align: "center",
    accountTypes: ["Admin"],
  },
];

export const newDropdown = [
  {
    id: "0",
    name: "Accept",
    icon: <AssignmentOutlinedIcon />,
    accountTypes: ["Physician"],
  },
  {
    id: "1",
    name: "Assign Case",
    icon: <AssignmentOutlinedIcon />,
    accountTypes: ["Admin"],
  },
  {
    id: "2",
    name: "Cancel Case",
    icon: <HighlightOffOutlinedIcon />,
    accountTypes: ["Admin"],
  },
  {
    id: "3",
    name: "View Case",
    icon: <PageviewOutlinedIcon />,
    accountTypes: ["Admin", "Physician"],
  },
  {
    id: "4",
    name: "View Notes",
    icon: <DocumentScannerOutlinedIcon />,
    accountTypes: ["Admin", "Physician"],
  },
  {
    id: "5",
    name: "Block Patient",
    icon: <BlockOutlinedIcon />,
    accountTypes: ["Admin"],
  },
];

export const pendingDropdown = [
  {
    id: "1",
    name: "View Case",
    icon: <PageviewOutlinedIcon />,
    accountTypes: ["Admin", "Physician"],
  },
  {
    id: "2",
    name: "View Upload",
    icon: <UploadFileOutlinedIcon />,
    accountTypes: ["Admin", "Physician"],
  },
  {
    id: "3",
    name: "View Notes",
    icon: <DocumentScannerOutlinedIcon />,
    accountTypes: ["Admin", "Physician"],
  },
  {
    id: "4",
    name: "Transfer",
    icon: <ListAltOutlinedIcon />,
    accountTypes: ["Admin", "Physician"],
  },
  {
    id: "5",
    name: "Clear Case",
    icon: <CancelOutlinedIcon />,
    accountTypes: ["Admin"],
  },
  {
    id: "6",
    name: "Send Agreement",
    icon: <DescriptionOutlinedIcon />,
    accountTypes: ["Admin", "Physician"],
  },
];

export const activeDropdown = [
  {
    id: "1",
    name: "View Case",
    icon: <PageviewOutlinedIcon />,
    accountTypes: ["Admin", "Physician"],
  },
  {
    id: "2",
    name: "View Upload",
    icon: <UploadFileOutlinedIcon />,
    accountTypes: ["Admin", "Physician"],
  },
  {
    id: "3",
    name: "View Notes",
    icon: <DocumentScannerOutlinedIcon />,
    accountTypes: ["Admin", "Physician"],
  },
  {
    id: "4",
    name: "Orders",
    icon: <TaskOutlinedIcon />,
    accountTypes: ["Admin", "Physician"],
  },
  {
    id: "5",
    name: "Doctors Notes",
    icon: <ContactPageOutlinedIcon />,
    accountTypes: ["Admin"],
  },
  {
    id: "6",
    name: "Encounter",
    icon: <ContactPageOutlinedIcon />,
    accountTypes: ["Admin", "Physician"],
  },
];

export const concludeDropdown = [
  {
    id: "0",
    name: "Conclude Care",
    icon: <MonitorHeartOutlinedIcon />,
    accountTypes: ["Physician"],
  },
  {
    id: "1",
    name: "View Case",
    icon: <PageviewOutlinedIcon />,
    accountTypes: ["Admin", "Physician"],
  },
  {
    id: "2",
    name: "View Upload",
    icon: <UploadFileOutlinedIcon />,
    accountTypes: ["Admin", "Physician"],
  },
  {
    id: "3",
    name: "View Notes",
    icon: <DocumentScannerOutlinedIcon />,
    accountTypes: ["Admin", "Physician"],
  },
  {
    id: "4",
    name: "Orders",
    icon: <TaskOutlinedIcon />,
    accountTypes: ["Admin"],
  },
  {
    id: "5",
    name: "Doctors Notes",
    icon: <ContactPageOutlinedIcon />,
    accountTypes: ["Admin"],
  },
  {
    id: "6",
    name: "Encounter",
    icon: <ContactPageOutlinedIcon />,
    accountTypes: ["Admin", "Physician"],
  },
];

export const toCloseDropdown = [
  {
    id: "1",
    name: "View Case",
    icon: <PageviewOutlinedIcon />,
    accountTypes: ["Admin"],
  },
  {
    id: "2",
    name: "View Upload",
    icon: <UploadFileOutlinedIcon />,
    accountTypes: ["Admin"],
  },
  {
    id: "3",
    name: "View Notes",
    icon: <DocumentScannerOutlinedIcon />,
    accountTypes: ["Admin"],
  },
  {
    id: "4",
    name: "Orders",
    icon: <TaskOutlinedIcon />,
    accountTypes: ["Admin"],
  },
  {
    id: "5",
    name: "Close Case",
    icon: <CancelOutlinedIcon />,
    accountTypes: ["Admin"],
  },
  {
    id: "6",
    name: "Doctors Notes",
    icon: <ContactPageOutlinedIcon />,
    accountTypes: ["Admin"],
  },
  {
    id: "7",
    name: "Clear Case",
    icon: <CancelOutlinedIcon />,
    accountTypes: ["Admin"],
  },
  {
    id: "8",
    name: "Encounter",
    icon: <ContactPageOutlinedIcon />,
    accountTypes: ["Admin"],
  },
];

export const unpaidDropdown = [
  {
    id: "1",
    name: "View Case",
    icon: <PageviewOutlinedIcon />,
    accountTypes: ["Admin"],
  },
  {
    id: "2",
    name: "View Upload",
    icon: <UploadFileOutlinedIcon />,
    accountTypes: ["Admin"],
  },
  {
    id: "3",
    name: "View Notes",
    icon: <DocumentScannerOutlinedIcon />,
    accountTypes: ["Admin"],
  },
];

export const indicator = [
  { name: "Patient", color: "green" },
  { name: "Family/Friend", color: "orange" },
  { name: "Business", color: "Pink" },
  { name: "Concierge", color: "blue" },
];
