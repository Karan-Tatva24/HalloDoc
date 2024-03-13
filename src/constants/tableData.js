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

export const newColumns = [
  { id: "name", label: "Name", minWidth: 200 },
  { id: "dateOfBirth", label: "Date Of Birth", minWidth: 100 },
  {
    id: "requestor",
    label: "Requestor",
    align: "right",
    maxWidth: 100,
  },
  {
    id: "requestedDate",
    label: "Requested Date",
    maxWidth: 95,
    align: "right",
  },
  {
    id: "phoneNumber",
    label: "Phone",
    maxWidth: 175,
    align: "right",
  },
  {
    id: "address",
    label: "Address",
    minWidth: 250,
    align: "right",
  },
  {
    id: "notes",
    label: "Notes",
    minWidth: 130,
    align: "right",
  },
  {
    id: "chatWith",
    label: "Chat With",
    minWidth: 100,
    align: "right",
  },
  {
    id: "action",
    label: "Actions",
    minWidth: 100,
    align: "right",
  },
];

export const pendingColumns = [
  { id: "name", label: "Name", minWidth: 200 },
  { id: "dateOfBirth", label: "Date Of Birth", minWidth: 100 },
  {
    id: "requestor",
    label: "Requestor",
    align: "right",
    maxWidth: 100,
  },
  {
    id: "physicianName",
    label: "Physician Name",
    align: "right",
    maxWidth: 100,
  },
  {
    id: "dateOfService",
    label: "Date Of Service",
    maxWidth: 95,
    align: "right",
  },
  {
    id: "phoneNumber",
    label: "Phone",
    maxWidth: 175,
    align: "right",
  },
  {
    id: "address",
    label: "Address",
    minWidth: 250,
    align: "right",
  },
  {
    id: "notes",
    label: "Notes",
    minWidth: 250,
    align: "right",
  },
  {
    id: "chatWith",
    label: "Chat With",
    minWidth: 100,
    align: "right",
  },
  {
    id: "action",
    label: "Actions",
    minWidth: 100,
    align: "right",
  },
];

export const activeColumns = [
  { id: "name", label: "Name", minWidth: 200 },
  { id: "dateOfBirth", label: "Date Of Birth", minWidth: 100 },
  {
    id: "requestor",
    label: "Requestor",
    align: "right",
    maxWidth: 100,
  },
  {
    id: "physicianName",
    label: "Physician Name",
    align: "right",
    maxWidth: 100,
  },
  {
    id: "dateOfService",
    label: "Date Of Service",
    maxWidth: 95,
    align: "right",
  },
  {
    id: "phoneNumber",
    label: "Phone",
    maxWidth: 175,
    align: "right",
  },
  {
    id: "address",
    label: "Address",
    minWidth: 250,
    align: "right",
  },
  {
    id: "notes",
    label: "Notes",
    minWidth: 130,
    align: "right",
  },
  {
    id: "chatWith",
    label: "Chat With",
    minWidth: 100,
    align: "right",
  },
  {
    id: "action",
    label: "Actions",
    minWidth: 100,
    align: "right",
  },
];

export const concludeColumns = [
  { id: "name", label: "Name", minWidth: 200 },
  { id: "dateOfBirth", label: "Date Of Birth", minWidth: 100 },
  {
    id: "physicianName",
    label: "Physician Name",
    align: "right",
    maxWidth: 100,
  },
  {
    id: "dateOfService",
    label: "Date Of Service",
    maxWidth: 95,
    align: "right",
  },
  {
    id: "phoneNumber",
    label: "Phone",
    maxWidth: 175,
    align: "right",
  },
  {
    id: "address",
    label: "Address",
    minWidth: 250,
    align: "right",
  },
  {
    id: "chatWith",
    label: "Chat With",
    minWidth: 100,
    align: "right",
  },
  {
    id: "action",
    label: "Actions",
    minWidth: 100,
    align: "right",
  },
];

export const toCloseColumns = [
  { id: "name", label: "Name", minWidth: 200 },
  { id: "dateOfBirth", label: "Date Of Birth", minWidth: 100 },
  {
    id: "region",
    label: "Region",
    maxWidth: 95,
    align: "right",
  },
  {
    id: "physicanName",
    label: "Physician Name",
    align: "right",
    maxWidth: 100,
  },
  {
    id: "dateOfService",
    label: "Date Of Service",
    maxWidth: 95,
    align: "right",
  },

  {
    id: "address",
    label: "Address",
    minWidth: 250,
    align: "right",
  },
  {
    id: "notes",
    label: "Notes",
    minWidth: 130,
    align: "right",
  },
  {
    id: "chatWith",
    label: "Chat With",
    minWidth: 100,
    align: "right",
  },
  {
    id: "action",
    label: "Actions",
    minWidth: 100,
    align: "right",
  },
];

export const unpaidColumns = [
  { id: "name", label: "Name", minWidth: 200 },
  {
    id: "physicanName",
    label: "Physician Name",
    align: "right",
    maxWidth: 100,
  },
  {
    id: "dateOfService",
    label: "Date Of Service",
    maxWidth: 95,
    align: "right",
  },
  {
    id: "phoneNumber",
    label: "Phone",
    maxWidth: 175,
    align: "right",
  },
  {
    id: "address",
    label: "Address",
    minWidth: 250,
    align: "right",
  },
  {
    id: "chatWith",
    label: "Chat With",
    minWidth: 100,
    align: "right",
  },
  {
    id: "action",
    label: "Actions",
    minWidth: 100,
    align: "right",
  },
];

export const newDropdown = [
  {
    id: "1",
    name: "Assign Case",
    icon: <AssignmentOutlinedIcon />,
  },
  {
    id: "2",
    name: "Cancel Case",
    icon: <HighlightOffOutlinedIcon />,
  },
  {
    id: "3",
    name: "View Case",
    icon: <PageviewOutlinedIcon />,
  },
  {
    id: "4",
    name: "View Notes",
    icon: <DocumentScannerOutlinedIcon />,
  },
  {
    id: "5",
    name: "Block Patient",
    icon: <BlockOutlinedIcon />,
  },
];

export const pendingDropdown = [
  {
    id: "1",
    name: "View Case",
    icon: <PageviewOutlinedIcon />,
  },
  {
    id: "2",
    name: "View Upload",
    icon: <UploadFileOutlinedIcon />,
  },
  {
    id: "3",
    name: "View Notes",
    icon: <DocumentScannerOutlinedIcon />,
  },
  {
    id: "4",
    name: "Transfer",
    icon: <ListAltOutlinedIcon />,
  },
  {
    id: "5",
    name: "Clear Case",
    icon: <CancelOutlinedIcon />,
  },
  {
    id: "6",
    name: "Send Agreement",
    icon: <DescriptionOutlinedIcon />,
  },
];

export const activeDropdown = [
  {
    id: "1",
    name: "View Case",
    icon: <PageviewOutlinedIcon />,
  },
  {
    id: "2",
    name: "View Upload",
    icon: <UploadFileOutlinedIcon />,
  },
  {
    id: "3",
    name: "View Notes",
    icon: <DocumentScannerOutlinedIcon />,
  },
  {
    id: "4",
    name: "Orders",
    icon: <TaskOutlinedIcon />,
  },
  {
    id: "5",
    name: "Doctors Notes",
    icon: <ContactPageOutlinedIcon />,
  },
  {
    id: "6",
    name: "Encounter",
    icon: <ContactPageOutlinedIcon />,
  },
];

export const concludeDropdown = [
  {
    id: "1",
    name: "View Case",
    icon: <PageviewOutlinedIcon />,
  },
  {
    id: "2",
    name: "View Upload",
    icon: <UploadFileOutlinedIcon />,
  },
  {
    id: "3",
    name: "View Notes",
    icon: <DocumentScannerOutlinedIcon />,
  },
  {
    id: "4",
    name: "Orders",
    icon: <TaskOutlinedIcon />,
  },
  {
    id: "5",
    name: "Doctors Notes",
    icon: <ContactPageOutlinedIcon />,
  },
  {
    id: "6",
    name: "Encounter",
    icon: <ContactPageOutlinedIcon />,
  },
];

export const toCloseDropdown = [
  {
    id: "1",
    name: "View Case",
    icon: <PageviewOutlinedIcon />,
  },
  {
    id: "2",
    name: "View Upload",
    icon: <UploadFileOutlinedIcon />,
  },
  {
    id: "3",
    name: "View Notes",
    icon: <DocumentScannerOutlinedIcon />,
  },
  {
    id: "4",
    name: "Orders",
    icon: <TaskOutlinedIcon />,
  },
  {
    id: "5",
    name: "Close Case",
    icon: <CancelOutlinedIcon />,
  },
  {
    id: "6",
    name: "Doctors Notes",
    icon: <ContactPageOutlinedIcon />,
  },
  {
    id: "7",
    name: "Clear Case",
    icon: <CancelOutlinedIcon />,
  },
  {
    id: "8",
    name: "Encounter",
    icon: <ContactPageOutlinedIcon />,
  },
];

export const unpaidDropdown = [
  {
    id: "1",
    name: "View Case",
    icon: <PageviewOutlinedIcon />,
  },
  {
    id: "2",
    name: "View Upload",
    icon: <UploadFileOutlinedIcon />,
  },
  {
    id: "3",
    name: "View Notes",
    icon: <DocumentScannerOutlinedIcon />,
  },
];

export const indicator = [
  { name: "Patient", color: "green" },
  { name: "Family/Friend", color: "orange" },
  { name: "Business", color: "Pink" },
  { name: "Concierge", color: "blue" },
  { name: "VIP", color: "purple" },
];
