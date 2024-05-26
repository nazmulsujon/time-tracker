import React from "react";
import PropTypes from "prop-types";
import {
  Box,
  Button,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

ProjectDetails.propTypes = {
  row: PropTypes.shape({
    name: PropTypes.string.isRequired,
    note: PropTypes.string.isRequired,
    urls: PropTypes.arrayOf(
      PropTypes.shape({
        url: PropTypes.string.isRequired,
        time: PropTypes.number,
        subdomains: PropTypes.arrayOf(
          PropTypes.shape({
            path: PropTypes.string.isRequired,
            time: PropTypes.number.isRequired,
            lastUpdate: PropTypes.number,
          })
        ),
      })
    ).isRequired,
  }).isRequired,
};

function formatDate(unixTime) {
  if (!unixTime) {
    return "N/A";
  }
  const date = new Date(unixTime);
  return `${String(date.getDate()).padStart(2, "0")}/${String(
    date.getMonth() + 1
  ).padStart(2, "0")}/${date.getFullYear()}`;
}

export default function ProjectDetails(props) {
  const { row } = props;
  const [openIndex, setOpenIndex] = React.useState(null);

  const handleClick = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <React.Fragment>
      {row.urls.map((item, index) => (
        <React.Fragment key={index}>
          <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
            <TableCell>
              <IconButton
                aria-label="expand row"
                size="small"
                onClick={() => handleClick(index)}
              >
                {openIndex === index ? (
                  <KeyboardArrowUpIcon />
                ) : (
                  <KeyboardArrowDownIcon />
                )}
              </IconButton>
              {item.url}
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
                  details
                </Button>
                <Button
                  component="label"
                  sx={{ marginLeft: "12px" }}
                  size="small"
                  color="error"
                >
                  remove
                </Button>
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow sx={{ borderBottom: "0" }}>
            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={3}>
              <Collapse in={openIndex === index} timeout="auto" unmountOnExit>
                <Box sx={{ margin: 1 }}>
                  <Table size="small" aria-label="purchases">
                    <TableHead>
                      <TableRow>
                        <TableCell>Path</TableCell>
                        <TableCell align="center">Time (mins)</TableCell>
                        <TableCell align="right">Last Update</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {item.subdomains ? (
                        item.subdomains.map((subdomain, idx) => (
                          <TableRow key={`${index}-sub-${idx}`}>
                            <TableCell component="th" scope="row">
                              {subdomain.path}
                            </TableCell>
                            <TableCell align="center">
                              {subdomain.time}
                            </TableCell>
                            <TableCell align="right">
                              {formatDate(subdomain.lastUpdate)}
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={3} align="center">
                            <Typography>N/A</Typography>
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </Box>
              </Collapse>
            </TableCell>
          </TableRow>
        </React.Fragment>
      ))}
    </React.Fragment>
  );
}
