import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { styled } from "@mui/material/styles";
import PreviewIcon from "@mui/icons-material/Preview";
import AddCircleIcon from "@mui/icons-material/AddCircle";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function Header() {
  return (
    <Box sx={{ flexGrow: 1, width: "70%" }}>
      <AppBar position="static" sx={{ backgroundColor: "#e0e0e0" }}>
        <Toolbar>
          <Typography
            color="black"
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          >
            Projects
            <Button
              component="label"
              role={undefined}
              variant="outlined"
              sx={{ marginLeft: "12px" }}
              size="small"
            >
              export
            </Button>
            <Button
              component="label"
              role={undefined}
              variant="contained"
              sx={{ marginLeft: "12px" }}
              size="small"
            >
              import
            </Button>
          </Typography>

          <Button
            component="label"
            role={undefined}
            variant="outlined"
            sx={{ marginRight: "12px" }}
            size="small"
          >
            Calender Veiw
          </Button>
          <Button
            component="label"
            role={undefined}
            variant="contained"
            startIcon={<AddCircleIcon />}
            size="small"
          >
            Add Project
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
