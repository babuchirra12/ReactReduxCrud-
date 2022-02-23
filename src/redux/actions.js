import axios from "axios";
import * as types from "./actionType";
const getUsers= (users) =>({
    type:types.GET_USERS,
    payload:users,
});

const usersDeleted= (users) =>({
    type:types.DELETE_USERS,
    
});
const userAdded= (user) =>({
    type:types.ADD_USER,
    
});
const userUpdated= (user) =>({
    type:types.UPDATE_USER,
    
});
const getUser= (user) =>({
    type:types.GET_SINGLE_USER,
    payload:user,
    
});

export const loadUsers = () =>{
    return function (dispatch){
        axios.get(`${process.env.REACT_APP_API}`).then((res) =>{
            console.log("respAction", res);
            dispatch(getUsers(res.data));
        }).catch(error => console.log(error))
    }
}
export const deleteUsers = (id) =>{
    return function (dispatch){
        axios.delete(`${process.env.REACT_APP_API}/${id}`).then((res) =>{
            console.log("respAction", res);
            dispatch(usersDeleted(res.data));
            dispatch(loadUsers())
        }).catch(error => console.log(error))
    }
}
export const addUser = (user) =>{
    return function (dispatch){
        axios.post(`${process.env.REACT_APP_API}`, user)
        .then((res) =>{
            console.log("respAction", res);
            dispatch(userAdded());
           // dispatch(loadUsers())
        }).catch(error => console.log(error))
    }
}
export const getSingleUser = (id) =>{
    return function (dispatch){
        axios.get(`${process.env.REACT_APP_API}/${id}`).then((res) =>{
            console.log("getUser", id);
            dispatch(getUser(res.data));
           // dispatch(loadUsers())
        }).catch(error => console.log(error))
    }
}
export const updateUser = (user, id) =>{
    return function (dispatch){
        axios.put(`${process.env.REACT_APP_API}/${id}`, user).then((res) =>{
            console.log("getUser", id);
            dispatch(userUpdated(res.data));
           // dispatch(loadUsers())
        }).catch(error => console.log(error))
    }
}