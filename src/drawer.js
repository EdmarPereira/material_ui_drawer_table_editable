import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";

import EditableTable from "./editableTable";

const useStyles = makeStyles(() => ({
  list: {
    width: 250
  },
  fullList: {
    width: "auto"
  },
  button: {
    color: "#343a40",
    "& span": {
      padding: "6px",
      color: "#343a40"
    }
  }
}));

export default function CustomerInfoBar() {
  const classes = useStyles();

  const [open, setOpen] = useState(true);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <div>
      <Button
        fullWidth
        className="CustomerButton"
        onClick={() => toggleDrawer()}
      >
        Customer Information
      </Button>
      <Drawer anchor="top" open={open} onClose={() => toggleDrawer()}>
        <div>
          <EditableTable />
        </div>
      </Drawer>
    </div>
  );
}
