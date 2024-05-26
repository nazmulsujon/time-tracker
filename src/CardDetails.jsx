import React from "react";
import PropTypes from "prop-types";
import {
  Box,
  Card,
  CardContent,
  Typography,
  CardHeader,
  Avatar,
} from "@mui/material";

CardDetails.propTypes = {
  urlData: PropTypes.shape({
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
  }).isRequired,
};

function formatDate(unixTime) {
  if (!unixTime) {
    return "N/A";
  }
  const date = new Date(unixTime);
  return `${String(date.getDate()).padStart(2, "0")}/${String(
    date.getMonth() + 1
  ).padStart(2, "0")}/${String(date.getFullYear()).slice(-2)}`;
}

export default function CardDetails({ urlData }) {
  const faviconUrl = `https://${urlData.url}/favicon.ico`;
  const defaultAvatar = "/static/images/avatar/default.jpg";
  return (
    <Card
      variant="outlined"
      sx={{ height: "300px", display: "flex", flexDirection: "column" }}
    >
      <CardHeader
        avatar={
          <Avatar
            alt="Favicon"
            src={faviconUrl}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = defaultAvatar;
            }}
          />
        }
        title={
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="h6" component="div">
              {urlData.url}
            </Typography>
          </Box>
        }
      />
      <CardContent
        sx={{
          flex: "1 1 auto",
          overflowY: "auto",
          scrollbarWidth: "none",
          paddingBottom: "0 !important",
        }}
      >
        <Typography variant="body2">
          Total spent: {urlData.time ? `${urlData.time} mins` : "N/A"}
        </Typography>
        <Typography variant="body2" mb={2}>
          Last Update: {formatDate(urlData.lastUpdate)}
        </Typography>
        {urlData.subdomains ? (
          urlData.subdomains.map((sub, idx) => (
            <Box key={idx} mb={2}>
              <Typography color="textSecondary" variant="body2">
                Path: {sub.path}
              </Typography>
              <Typography color="textSecondary" variant="body2">
                Time: {sub.time} mins
              </Typography>
              <Typography color="textSecondary" variant="body2">
                Last Update: {formatDate(sub.lastUpdate)}
              </Typography>
            </Box>
          ))
        ) : (
          <Typography variant="body2" color="textSecondary">
            No subdomains available.
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}
