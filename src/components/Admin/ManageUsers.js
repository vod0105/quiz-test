import ModalCreateUser from "./ModalCreateUser";
import "./ManageUsers.scss"
import { FcPlus } from "react-icons/fc";
import { useState } from "react";

const ManageUsers = () => {
    const [showModalUser,setShowModalUser] = useState(false)
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
                    Table users
                </div>
                <ModalCreateUser show={showModalUser} setShow ={setShowModalUser} />
            </div>
        </div>
    )
}

export default ManageUsers;