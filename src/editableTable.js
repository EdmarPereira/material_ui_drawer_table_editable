import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";

import IconButton from "@material-ui/core/IconButton";
import { Delete, Edit, Save, Cancel } from "@material-ui/icons/";
import { Tooltip } from "@material-ui/core";

const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
});

let rows = [
  {
    customerId: 1,
    customerNumber: "122-44",
    customerName: "Mark One",
    customerLocation: "Brazil",
    customerSerial: "9989980"
  },
  {
    customerId: 2,
    customerNumber: "544-66",
    customerName: "Brazilian Corp",
    customerLocation: "Brazil",
    customerSerial: "98998988"
  }
];

const dataEditable = [
  {
    customerNumber: "",
    customerName: "",
    customerLocation: "",
    customerSerial: ""
  }
];

const header = [
  {
    id: "customerNumber",
    label: "Customer Number"
  },
  {
    id: "customerName",
    label: "Customer Name"
  },
  {
    id: "customerLocation",
    label: "Customer Location"
  },
  {
    id: "customerSerial",
    label: "Machine Serial"
  },
  {
    id: "actions",
    label: ""
  }
];

// const handleBlur = () => {
//   let arrSerial = [];
//   if (valueChanged !== '') {
//     arrSerial = swoList.filter(function filterMe(e) {
//       return e.serial === valueChanged;
//     });

//     if (arrSerial.length > 1) {
//       swoList[swIndex].serial = '';

//     }
//   }
// };

export default function EditableTable() {
  const classes = useStyles();


  const [enableEdition, setEnableEdition] = useState(false);

  // const [customerNumber, setCustomerNumber] = useState("");
  // const [customerName, setCustomerName] = useState("");
  // const [customerLocation, setCustomerLocation] = useState("");
  // const [customerSerial, setCustomerSerial] = useState("");

  const [buttonDisable, setButtonDisable] = useState(false);

  const handlerOnChange = (e, i) => {
    dataEditable[0][header[i].id] = e.target.value;
    // console.log(dataEditable[0])

    // const regex = /^[^*|":<>[\]{}`\\()';@&$%!#ˆ,.˜`?+=_]+$/g;

    // if (
    //   e.target.value === "" ||
    //   (regex.test(e.target.value) && e.target.value.length <= 7)
    // ) {
    // rows[dataIndex].serial = e.target.value;

    // switch (e.target.id) {
    //   case "customerNumber":

    //      setCustomerNumber(e.target.value);
    //     break;
    //   case "customerName":
    //     setCustomerName(e.target.value);
    //     break;
    //   case "customerLocation":
    //     setCustomerLocation(e.target.value);
    //     break;
    //   case "customerSerial":
    //     setCustomerSerial(e.target.value);
    //     break;
    //   default:
    // }
    // }

    // console.log(dataEditable[0])
  };

  function getMaxId() {
    let maxId = 0;
    if (rows.length > 0) {
      rows.map((e) => {
        // console.log(e.customerId)
        if (e.customerId > maxId) {
          maxId = e.customerId;
        }
        return maxId;
      });
    }
    return maxId +1 ;
  }

  const handleBlur = () => {
    // need to validatoption to be inserted
  };

  const handleAddCustomer = () => {
    setEnableEdition(true);
    setButtonDisable(true);
  };

  const handleSave = () => {
    const id = getMaxId();
    // save the current customer configuration
    rows.push({
      cusotmerId: id,
      customerNumber: dataEditable[0].customerNumber,
      customerName: dataEditable[0].customerName,
      customerLocation: dataEditable[0].customerLocation,
      customerSerial: dataEditable[0].customerSerial
    });

    setEnableEdition(false);
    setButtonDisable(false);
  };

  const handleCancel = () => {
    // setCustomerNumber("");
    // setCustomerName("");
    // setCustomerLocation("");
    // setCustomerSerial("");
    setEnableEdition(false);
    setButtonDisable(false);
  };

  const handleDelete = (e) => {
    let selectedRow = e.selectedRow.customerId;

    let filteredRows = rows.filter((e) => e.customerId !== selectedRow);

    // console.log(filteredRows);
  };

  const SaveCancelComponent = () => {
    return (
      <div>
        <Tooltip title="Save">
          <IconButton
            color="primary"
            aria-label="save"
            onClick={() => handleSave()}
          >
            <Save />
          </IconButton>
        </Tooltip>

        <Tooltip title="Cancel">
          <IconButton
            color="primary"
            aria-label="cancel"
            onClick={() => handleCancel()}
          >
            <Cancel />
          </IconButton>
        </Tooltip>
      </div>
    );
  };

  const EditDeleteComponent = (selectedRow) => {
    // console.log("dentro do componente ---> " + JSON.stringify(selectedRow));
    return (
      <div>
        <Tooltip title="Edit">
          <IconButton color="primary" aria-label="edit">
            <Edit />
          </IconButton>
        </Tooltip>

        <Tooltip title="Delete">
          <IconButton
            color="primary"
            aria-label="delete"
            onClick={() => handleDelete(selectedRow)}
          >
            <Delete />
          </IconButton>
        </Tooltip>
      </div>
    );
  };

  const TableFields = () => {
    return (
      <div>
        <Table>
          <TableBody>
            <TableRow key={1}>
              {header.map((headItem, i) => {
                return (
                  <TableCell key={`${i}item`}>
                    <Input
                      onChange={(e) => handlerOnChange(e, i)}
                      // value={dataEditable[0]['']}
                      onBlur={handleBlur()} // check if serial is unique
                    />
                  </TableCell>
                );
              })}
              <SaveCancelComponent />
            </TableRow>
          </TableBody>
        </Table>
      </div>
    );
  };

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            {header.map((headItem) => (
              <TableCell key={headItem.id}>{headItem.label}</TableCell>
            ))}
            <TableCell key={Math.random()}></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, i) => {
            // console.log(row)
            return (
              <TableRow>
                {header.map((column, columnIndex) => {
                  const value = row[column.id];

                  const columnId = header[columnIndex].id;

                  // console.log(header[columnIndex].id)

                  return (
                    <TableCell>
                      {(() => {
                        switch (columnId) {
                          case "actions": {
                            return <EditDeleteComponent selectedRow={row} />;
                          }
                          default:
                            return value;
                        }
                      })()}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      {enableEdition ? <TableFields /> : null}
      <Paper>
        <Button
          variant="contained"
          color="primary"
          style={{ margin: 10 }}
          onClick={() => handleAddCustomer()}
          disabled={buttonDisable}
        >
          Add Customer
        </Button>
      </Paper>
    </TableContainer>
  );
}
