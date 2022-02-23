import React, { useEffect } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { useDispatch, useSelector } from "react-redux";
import { loadUsers, deleteUsers } from "../redux/actions";
import { useHistory } from "react-router-dom";
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 500,
  },
});

export default function Home() {
    let history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.users);

  console.log("user", users);
  useEffect(() => {
    dispatch(loadUsers());
  }, []);
  const handleDelete = (id) => {
    if (window.confirm("Are you sure wanted to delete the user ?")) {
      dispatch(deleteUsers(id));
    }
  };
  return (
    <TableContainer
      align="right"
      component={Paper}
      style={{ padding: "20px 0" }}
    >
      <Button  style={{ margin: "10px" }} align="right" onClick={() => history.push("/adduser")} variant="contained" color="primary">
        AddUser
      </Button>{" "}
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>S no</StyledTableCell>
            <StyledTableCell align="right">Name</StyledTableCell>
            <StyledTableCell align="right">Address</StyledTableCell>
            <StyledTableCell align="right">Email</StyledTableCell>
            <StyledTableCell align="right">Contact</StyledTableCell>
            <StyledTableCell align="right">Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users &&
            users.map((user, i) => (
              <StyledTableRow key={i}>
                <StyledTableCell component="th">{i+1}</StyledTableCell>
                <StyledTableCell component="th">{user.name}</StyledTableCell>
                <StyledTableCell align="right">{user.address}</StyledTableCell>
                <StyledTableCell align="right">{user.email}</StyledTableCell>
                <StyledTableCell align="right">{user.contact}</StyledTableCell>
                <StyledTableCell align="right">
                  <Button  onClick={() => history.push(`/editUser/${user.id}`)} variant="contained" color="primary">
                    Edit
                  </Button>{" "}
                  <Button
                    onClick={() => handleDelete(user.id)}
                    variant="contained"
                    color="primary"
                  >
                    Delete
                  </Button>{" "}
                </StyledTableCell>
              </StyledTableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
