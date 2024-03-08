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
  },
  {
    applicationState: "Pending",
    figure: "266",
    icon: <PendingOutlinedIcon />,
    color: "secondary",
    toolTip: secondaryTriangle,
  },
  {
    applicationState: "Active",
    figure: "26",
    icon: <CheckCircleOutlineOutlinedIcon />,
    color: "success",
    toolTip: successTriangle,
  },
  {
    applicationState: "Conclude",
    figure: "1078",
    icon: <CodeOutlinedIcon />,
    color: "error",
    toolTip: errorTriangle,
  },
  {
    applicationState: "To Close",
    figure: "519",
    icon: <CancelOutlinedIcon />,
    color: "info",
    toolTip: infoTriangle,
  },
  {
    applicationState: "Unpaid",
    figure: "16",
    icon: <PaidOutlinedIcon />,
    color: "warning",
    toolTip: warningTriangle,
  },
];
