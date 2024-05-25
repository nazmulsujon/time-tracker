import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";

import { useState, useEffect } from "react";

const saveData = async (key, value) => {
  if (typeof chrome !== "undefined" && chrome.storage) {
    await chrome.storage.local.set({ [key]: value });
  } else {
    localStorage.setItem(key, value);
  }
};

export const getStorageData = async (key) => {
  if (typeof chrome !== "undefined" && chrome.storage) {
    const data = await chrome.storage.local.get(key);
    return data[key] || "";
  } else {
    return localStorage.getItem(key) || "";
  }
};

const removeData = async (key) => {
  if (typeof chrome !== "undefined" && chrome.storage) {
    await chrome.storage.local.remove(key);
  } else {
    localStorage.removeItem(key);
  }
};

const DailyNote = ({ open, setOpen, date }) => {
  const [note, setNote] = useState("");

  useEffect(() => {
    if (open && date) {
      getStorageData("note_" + date.getTime()).then((note) => {
        setNote(note);
      });
    }
  }, [open, date]);

  const saveNote = () => {
    if (note) {
      saveData("note_" + date.getTime(), note);
    } else {
        removeData("note_" + date.getTime());
    }

    setOpen(false);
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md" fullWidth>
      <DialogTitle>Note for {open && date.toDateString()}</DialogTitle>

      <DialogContent>
        <TextField
          value={note}
          onChange={(e) => {
            setNote(e.target.value);
          }}
          multiline
          rows={6}
          placeholder="Enter your note here"
          fullWidth
        />
      </DialogContent>

      <DialogActions>
        <Button
          onClick={() => {
            setOpen(false);
          }}
        >
          Cancel
        </Button>
        <Button onClick={saveNote} variant="contained">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DailyNote;
