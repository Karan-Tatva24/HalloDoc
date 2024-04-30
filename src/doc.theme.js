import { createTheme } from "@mui/material";

const primary = "#01bce9";
// const primaryContrast = "#F6F6F6";
// const secondary = "#4B4B4B";
// const secondaryMain = "#424242";
// const secondaryLight = "#9C9C9C";
// const secondaryContrast = "#6D6D6D";
// const grey = "#E9E9E9";
// const greyLight = "#FAFAFA";
// const greyDark = "#A5A5A5";
// const white = "#FFFFFF";
// const whiteLight = "#EAEAEA";
// const black = "#000000";
// const blue = "#E6F4FF";
// const purple = "#F6EFFF";
// const peach = "#FFF0E9";
// const orange = "#FFE4E4";
// const danger = "#FFFAFA";
// const primaryHover = "#59b9972e";
// const primaryHoverDark = "#338e6fe6";
// const primaryLight = "#3EAE86";

export const halloDocTheme = (toggleDarkMode) => {
  return createTheme({
    palette: {
      mode: toggleDarkMode ? "dark" : "light",
      primary: {
        main: primary,
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          contained: {
            color: "white",
          },
        },
      },
      MuiTableCell: {
        styleOverrides: {
          head: {
            height: "5rem",
            fontWeight: "bold",
          },
          body: {
            height: "4.5rem",
          },
        },
      },
      MuiFormControl: {
        styleOverrides: {
          root: {
            "&.search-text .MuiInputBase-root": {
              height: "2.5rem",
            },
            "&.drop-list .MuiInputBase-root": {
              width: "15rem",
            },
            "&.large-drop-list .MuiInputBase-root": {
              width: "18rem",
              height: "2.7rem",
            },
          },
        },
      },
      MuiButtonBase: {
        styleOverrides: {
          root: {
            "&.icon-btn": {
              minWidth: "55px",
              minHeight: "3.438rem",
              width: "100%",
              padding: 0,
            },
            "&.log-out-btn": {
              width: "100px",
            },
          },
        },
      },
      MuiDrawer: {
        styleOverrides: {
          paper: {
            minWidth: "250px",
          },
          root: {
            "&.sidebar .MuiBackdrop-root": {
              marginTop: "7rem",
            },
            "&.sidebar .MuiPaper-root": {
              marginTop: "7rem",
            },
          },
        },
      },
      MuiFormControlLabel: {
        styleOverrides: {
          root: {
            "&.checkbox-padding .MuiCheckbox-root": {
              padding: "0.34rem 0.5rem",
            },
          },
        },
      },
    },
  });
};
