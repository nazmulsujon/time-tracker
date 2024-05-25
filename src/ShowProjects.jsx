import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Divider,
  Stack,
  Typography,
} from "@mui/material";

function secondsToHMS(seconds) {
  var hours = Math.floor(seconds / 3600);
  var minutes = Math.floor((seconds % 3600) / 60);
  var remainingSeconds = seconds % 60;

  // Add leading zeros if necessary
  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  remainingSeconds =
    remainingSeconds < 10 ? "0" + remainingSeconds : remainingSeconds;

  return hours + ":" + minutes + ":" + remainingSeconds;
}

const Item = ({ item, time }) => {
  const cp = JSON.parse(JSON.stringify(item));
  let total = 0;
  for (let i = cp.urls.length - 1; i >= 0; i--) {
    const url = cp.urls[i];
    if (url.dailyTime && url.dailyTime[time]) {
      total += url.dailyTime[time];
    } else cp.urls.splice(i, 1);
  }

  return (
    <Accordion
      sx={{
        "&.MuiAccordion-root": {
          backgroundColor: "#e0e0e0",
          "&.Mui-expanded": {
            margin: "0",
            marginBottom: "1rem",
          },
        },
      }}
    >
      <AccordionSummary>
        <Stack
          spacing={1}
          direction={"row"}
          width={"70%"}
          justifyContent="space-between"
          fontFamily="Roboto"
          fontWeight="bold"
        >
          {" "}
          <Stack
            alignItems="center"
            justifyContent="center"
            direction="row"
            gap="10px"
          >
            {cp.name}{" "}
            {item.archived ? (
              <Typography variant="caption">(archived)</Typography>
            ) : (
              ""
            )}
          </Stack>
          <span>Total time spent {secondsToHMS(total)}</span>
        </Stack>
      </AccordionSummary>
      <AccordionDetails>
        <Divider />
        <br></br>
        <Typography variant="h6">URLs</Typography>
        <Stack spacing={1} direction={"column"} width={"100%"}>
          {cp.urls.map((url, i) => (
            <Stack key={i} spacing={1} direction={"row"} width={"100%"}>
              <a key={i} href={url.url} target="_blank" rel="noreferrer">
                {url.url}
              </a>
              <span>{secondsToHMS(url.dailyTime[time])}</span>
            </Stack>
          ))}
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
};

const ShowProjects = ({ itemsOnDate, time }) => {
  return (
    <Stack
      spacing={1}
      alignContent={"center"}
      alignItems={"center"}
      direction={"column"}
      width={"100%"}
    >
      {itemsOnDate.map((item, i) => (
        <Item key={i} item={item} time={time} />
      ))}
    </Stack>
  );
};

export default ShowProjects;
