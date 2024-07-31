import ModalCreateUser from "./ModalCreateUser";
import "./ManageUsers.scss"

const ManageUsers = () => {
    return (
        <div classNameName="manage-user-container">
            <div classNameName="title">

            </div>
            <div classNameName="user-content">
                <div>
                    <button>Add New User</button>
                </div>
                <div>
                    Table users
                </div>
                <ModalCreateUser />
            </div>
        </div>
    )
}

export default ManageUsers;