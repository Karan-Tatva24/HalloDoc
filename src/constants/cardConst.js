import {
  primaryTriangle,
  secondaryTriangle,
  successTriangle,
  warningTriangle,
  errorTriangle,
  infoTriangle,
} from "../assets/Images/index";
import NewReleasesOutlinedIcon from "@mui/icons-material/NewReleasesOutlined";
import PendingOutlinedIcon from "@mui/icons-material/PendingOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import CodeOutlinedIcon from "@mui/icons-material/CodeOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import PaidOutlinedIcon from "@mui/icons-material/PaidOutlined";

export const cards = [
  {
    applicationState: "New",
    figure: "1452",
    icon: <NewReleasesOutlinedIcon />,
    color: "primary",
    toolTip: primaryTriangle,
    accountTypes: ["Admin", "Physician"],
  },
  {
    applicationState: "Pending",
    figure: "266",
    icon: <PendingOutlinedIcon />,
    color: "secondary",
    toolTip: secondaryTriangle,
    accountTypes: ["Admin", "Physician"],
  },
  {
    applicationState: "Active",
    figure: "26",
    icon: <CheckCircleOutlineOutlinedIcon />,
    color: "success",
    toolTip: successTriangle,
    accountTypes: ["Admin", "Physician"],
  },
  {
    applicationState: "Conclude",
    figure: "1078",
    icon: <CodeOutlinedIcon />,
    color: "error",
    toolTip: errorTriangle,
    accountTypes: ["Admin", "Physician"],
  },
  {
    applicationState: "To Close",
    figure: "519",
    icon: <CancelOutlinedIcon />,
    color: "info",
    toolTip: infoTriangle,
    accountTypes: ["Admin"],
  },
  {
    applicationState: "UnPaid",
    figure: "16",
    icon: <PaidOutlinedIcon />,
    color: "warning",
    toolTip: warningTriangle,
    accountTypes: ["Admin"],
  },
];
