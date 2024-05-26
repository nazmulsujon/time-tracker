import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import data from "../data.json";
import {
  Box,
  Checkbox,
  FormControlLabel,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";

import Calendar from "react-calendar";
import styled from "@emotion/styled";
import ShowProjects from "./ShowProjects";
import DailyNote, { getStorageData } from "./DailyNote";
import Header from "./Header";
import Projects from "./Projects";
import Overview from "./Overview";

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

const TileContentHolder = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
  justify-content: center;

  color: black;
  padding: 5px;
  border-radius: 5px;
  font-size: 12px;
  font-weight: normal;

  position: relative;
  width: 100%;
`;

const IconHolder = styled.div`
  font-size: 20px;
  font-weight: bold;
  position: absolute;
  top: -20px;
  left: 5px;

  width: 40px;
  height: 50px;

  & > span {
    color: #007bff;
    visibility: hidden;
  }

  &:hover {
    & > span {
      visibility: visible;
    }
  }

  text-align: left;
`;
const HasNoteHolder = styled.div`
  font-size: 14px;
  font-weight: bold;
  position: absolute;
  top: -20px;
  right: 5px;

  text-align: right;
`;

const Badge = styled.span`
  background-color: #007bff;
  border-radius: 50%;
  color: white;
  padding: 2px 6px;
  font-weight: bold;
`;

function TileContent({ date, view, items, addDailyNote }) {
  // Add class to tiles in month view only
  const [hasNote, setHasNote] = useState(false);
  useEffect(() => {
    getStorageData("note_" + date.getTime()).then((note) => {
      setHasNote(!!note);
    });
  }, [date]);

  if (view === "month") {
    const timeInMills = date.getTime();

    const filtered = [];
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      item.urls.some((url) => {
        if (url.dailyTime && url.dailyTime[timeInMills]) {
          filtered.push(item);
          return true;
        }
        return false;
      });
    }

    let totalTime = 0;

    filtered.forEach((item) => {
      item.urls.forEach((url) => {
        if (url.dailyTime && url.dailyTime[timeInMills]) {
          totalTime += url.dailyTime[timeInMills];
        }
      });
    });

    return (
      <TileContentHolder>
        <IconHolder
          style={{
            top: filtered.length ? "-20px" : "-28px",
          }}
        >
          <span
            onClick={(e) => {
              e.stopPropagation();
              addDailyNote(date);
            }}
          >
            +
          </span>
        </IconHolder>

        {hasNote && (
          <HasNoteHolder
            style={{
              top: filtered.length ? "-20px" : "-28px",
            }}
          >
            <span
              onClick={(e) => {
                e.stopPropagation();
                addDailyNote(date);
              }}
            >
              📔
            </span>
          </HasNoteHolder>
        )}

        {filtered.length ? <Badge>{filtered.length}</Badge> : ""}
        {totalTime ? <span>{secondsToHMS(totalTime)}</span> : ""}
      </TileContentHolder>
    );
  }
}

function getStartOfTodayMilliseconds() {
  const now = new Date();
  const startOfToday = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate()
  );
  return startOfToday;
}

function App() {
  const [value, onChange] = useState(getStartOfTodayMilliseconds());
  const [showArchive, setShowArchive] = useState(true);
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [itemsOnDate, setItemsOnDate] = useState([]);
  const [openNote, setOpenNote] = useState(false);
  const [noteDate, setNoteDate] = useState(null);
  const [projects, setProjects] = useState([]);
  const [page, setPage] = useState("overview");

  const handleChange = (event, newAlignment) => {
    setPage(newAlignment);
  };

  useEffect(() => {
    const setData = (data) => {
      const all = [];
      if (data.projects) all.push(...data.projects);

      if (data.archiveprojects)
        data.archiveprojects.forEach((item) => {
          all.push({ ...item, archived: true });
        });
      setItems(all);
    };

    // chrome.storage.sync.get(["projects", "archiveprojects"], (result) => {
    //   setData(result);
    // });

    const interval = setInterval(() => {
      // chrome.storage.sync.get(["projects", "archiveprojects"], (result) => {
      //   setData(result);
      // });

      setData(data);
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (showArchive) {
      setFilteredItems(items);
    } else {
      setFilteredItems(items.filter((item) => !item.archived));
    }
  }, [showArchive, items]);

  useEffect(() => {
    const timeInMills = value.getTime();

    const filtered = [];
    for (let i = 0; i < filteredItems.length; i++) {
      const item = filteredItems[i];
      item.urls.some((url) => {
        if (url.dailyTime && url.dailyTime[timeInMills]) {
          filtered.push(item);
          return true;
        }
        return false;
      });
    }

    setItemsOnDate(filtered);
  }, [value, filteredItems]);

  const openNoteEditor = (date) => {
    setNoteDate(date);
    setOpenNote(true);
  };

  useEffect(() => {
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
    <Stack
      direction={"column"}
      spacing={2}
      margin="5px"
      width="100%"
      alignItems="center"
    >
      <Header />
      <DailyNote open={openNote} setOpen={setOpenNote} date={noteDate} />

      <Calendar
        onChange={onChange}
        value={value}
        tileContent={(d) => {
          return (
            <TileContent
              date={d.date}
              view={d.view}
              addDailyNote={openNoteEditor}
              items={filteredItems}
            />
          );
        }}
      />

      <Stack
        direction={"column"}
        maxWidth="800px"
        width="100%"
        spacing={2}
        margin="5px"
      >
        <FormControlLabel
          control={
            <Checkbox
              name="SomeName"
              value="SomeValue"
              checked={showArchive}
              onChange={(e) => {
                setShowArchive(e.target.checked);
              }}
            />
          }
          label="Show Archived Projects"
        />
        <ShowProjects itemsOnDate={itemsOnDate} time={value.getTime()} />
      </Stack>

      <ToggleButtonGroup
        color="primary"
        value={page}
        exclusive
        onChange={handleChange}
        aria-label="Platform"
      >
        <ToggleButton value="overview" size="small">
          Project Overview
        </ToggleButton>
        <ToggleButton value="details" size="small">
          Project Details
        </ToggleButton>
      </ToggleButtonGroup>

      <Box width="70%">
        {page === "overview" && <Overview projects={projects} />}
        {page === "details" && <Projects projects={projects} />}
        {projects.length === 0 && (
          <Typography
            variant="div"
            sx={{ display: "flex", justifyContent: "center" }}
          >
            No data found
          </Typography>
        )}
      </Box>
    </Stack>
  );
}

export default App;
