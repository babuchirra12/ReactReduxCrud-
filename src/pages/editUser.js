import React, { useState,useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSingleUser, updateUser } from "../redux/actions";
export default function EditUser() {
  let history = useHistory();
  const {id}= useParams();
  const { user } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  
  const [state, setState] = useState({
    name: "",
    address: "",
    email: "",
    contact: "",
  });
  const [error, setError] = useState("HII");
  const { name, address, email, contact } = state;
  const handleInputChange = (e) => {
    let { name, value } = e.target;
    setState({ ...state, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !address || !email || !contact) {
        setError("Please input all input field");
    } else {
      dispatch(updateUser(state, id));
      alert("bye");
      history.push("/");
      setError("");
    }
  };
  useEffect(() =>{
dispatch(getSingleUser(id))
  },[]);
  useEffect(() =>{
   if(user){
       setState({...user})
   }
      },[user]);
  return (
    <>
      <Button
        style={{ margin: "10px" }}
        align="right"
        onClick={() => history.push("/")}
        variant="contained"
        color="primary"
      >
        Go back
      </Button>{" "}
      <div>Edit User</div>
      {error && <h3 style={{color:'red'}}>{error}</h3> } 
      <form
        className={""}
        onSubmit={handleSubmit}
        noValidate
        autoComplete="off"
      >
        <TextField
          type="text"
          id="standard-basic"
          value={name || ""}
          name="name"
          label="Name"
          onChange={handleInputChange}
        />
        <br />{" "}
        <TextField
          type="text"
          id="standard-basic"
          value={address || ""}
          name="address"
          label="Address"
          onChange={handleInputChange}
        />
        <br />{" "}
        <TextField
          type="email"
          id="standard-basic"
          value={email || ""}
          name="email"
          label="Email"
          onChange={handleInputChange}
        />
        <br />{" "}
        <TextField
          type="number"
          id="standard-basic"
          value={contact || ""}
          name="contact"
          label="Contact"
          onChange={handleInputChange}
        />
        <br /> <br />{" "}
        <Button type="submit" variant="contained" color="primary">
          Update Use
        </Button>{" "}
      </form>
    </>
  );
}
