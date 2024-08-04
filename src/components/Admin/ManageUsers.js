import ModalCreateUser from "./ModalCreateUser";
import "./ManageUsers.scss"
import { FcPlus } from "react-icons/fc";
import { useState } from "react";
import TableUser from "./TableUser";
import { useEffect } from 'react';
import {GetAllUsers} from '../../services/apiServices'
import "./ModalUpdateUser"
import ModalUpdateUser from "./ModalUpdateUser";
import ModalDeleteUser from "./ModalDeleteUser";


const ManageUsers = () => {
    const [showModalUser,setShowModalUser] = useState(false)
    const [listUsers, setListUsers] = useState([]);
    const [showModalUpdateUser,setShowModalUpdateUser] = useState(false)
    const [user , setUser] = useState({})
    const [idUser,setIdUser] = useState("");
    const [showModalDeleteUser,setShowModalDeleteUser] = useState(false);
    useEffect(() => {
        fetchListUsers();
    },[])

    const fetchListUsers = async() =>{
       let res = await GetAllUsers();
        if(res.EC === 0 ){
            setListUsers(res.DT);
        }
    }

    const handleUpdateUser = (item) => {
        setShowModalUpdateUser(true);
        setUser(item);
    }

    const handleDeleteUser = (id) =>{
        setIdUser(id);
        setShowModalDeleteUser(true);
        
    }
    return (
        <div className="manage-user-container">
            <div className="title">
                Manage Users
            </div>
            <div className="user-content">
                <div className="btn-add-new">
                    <button className="btn btn-primary" 
                    onClick={() => setShowModalUser(! showModalUser)}
                    ><FcPlus/>Add New User</button>
                </div>
                <div className="table-users-container">
                    <TableUser listUsers = {listUsers}
                    handleUpdateUser = {handleUpdateUser}
                    handleDeleteUser = {handleDeleteUser}
                    />
                </div>
                <ModalCreateUser show={showModalUser} setShow ={setShowModalUser} fetchListUsers = {fetchListUsers}/>
                <ModalUpdateUser show={showModalUpdateUser} setShow ={setShowModalUpdateUser}
                 user = {user} 
                 setUser = {setUser}
                 fetchListUsers = {fetchListUsers}/>
                 <ModalDeleteUser
                 show={showModalDeleteUser} setShow ={setShowModalDeleteUser}
                 idUser = {idUser}
                 fetchListUsers = {fetchListUsers}
                 />
            </div>
        </div>
    )
}

export default ManageUsers;