import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  Button,
  Box,
} from "@mui/material";
import ProjectDetails from "./ProjectDetails";

export default function Projects() {
  const [projects, setProjects] = React.useState([]);

  React.useEffect(() => {
    fetch("/data.json")
      .then((response) => response.json())
      .then((data) => {
        setProjects(data.projects || []);
      })
      .catch((error) => {
        console.error("Error fetching projects data:", error);
        setProjects([]);
      });
  }, []);

  return (
    <Box>
      {projects.map((project, index) => (
        <Box key={index} mb={4}>
          <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
              <TableHead>
                <TableRow>
                  <TableCell
                    sx={{ textTransform: "capitalize", paddingLeft: "30px" }}
                  >
                    {project.name}
                  </TableCell>
                  <TableCell />
                  <TableCell align="right">
                    <Typography
                      color="black"
                      variant="h6"
                      component="div"
                      sx={{ flexGrow: 1 }}
                    >
                      <Button
                        component="label"
                        sx={{ marginLeft: "12px" }}
                        size="small"
                      >
                        Edit
                      </Button>
                      <Button
                        component="label"
                        sx={{ marginLeft: "12px" }}
                        size="small"
                        color="error"
                      >
                        Archive
                      </Button>
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <ProjectDetails row={project} />
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      ))}
    </Box>
  );
}
