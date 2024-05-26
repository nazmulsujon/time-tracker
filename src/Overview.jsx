import React from "react";
import PropTypes from "prop-types";
import { Grid, Box, Typography, Alert, AlertTitle } from "@mui/material";
import CardDetails from "./CardDetails";

Overview.propTypes = {
  projects: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      urls: PropTypes.arrayOf(
        PropTypes.shape({
          url: PropTypes.string.isRequired,
          time: PropTypes.number,
          lastUpdate: PropTypes.number,
          subdomains: PropTypes.arrayOf(
            PropTypes.shape({
              path: PropTypes.string.isRequired,
              time: PropTypes.number.isRequired,
              lastUpdate: PropTypes.number,
            })
          ),
        })
      ).isRequired,
    })
  ).isRequired,
};

export default function Overview({ projects }) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      {projects.map((project, index) => (
        <React.Fragment>
          <Alert severity="success" sx={{ mb: 2, textTransform: "capitalize" }}>
            <AlertTitle>{project.name}</AlertTitle>
            This is a success Alert with an encouraging title.
          </Alert>
          <Grid key={index} container spacing={2} mb={2}>
            {project.urls.map((urlData, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <CardDetails urlData={urlData} />
              </Grid>
            ))}
          </Grid>
        </React.Fragment>
      ))}
    </Box>
  );
}
