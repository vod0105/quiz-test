import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from "react";

const TableUser = (props) => {
    const {listUsers} = props;

    return (
        <>
            <table className="table table-striped" style={{width: 800 + 'px'}}>
                <thead>
                    <tr>
                        <th scope="col">Stt</th>
                        <th scope="col">Username</th>
                        <th scope="col">Email</th>
                        <th scope="col">Role</th>
                        <th scope='col'>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {listUsers && listUsers.length > 0 &&
                        listUsers.map((item, index) => {
                            return (
                                <tr>
                                    <th scope="row">{index + 1}</th>
                                    <td>{item.username}</td>
                                    <td>{item.email}</td>
                                    <td>{item.role}</td>
                                    <td>
                                        <button className='btn btn-primary'>View</button>
                                        <button className='btn btn-success' onClick={() => props.handleUpdateUser(item)}>Update</button>
                                        <button className='btn btn-warning' onClick={() => props.handleDeleteUser(item.id)} >Delete</button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                    {listUsers && listUsers.length === 0
                        && <tr>
                            <td colSpan={'4'}>Not found data</td>
                        </tr>}
                </tbody>
            </table>
        </>
    )
};

export default TableUser;
