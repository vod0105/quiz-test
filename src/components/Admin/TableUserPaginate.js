import 'bootstrap/dist/css/bootstrap.min.css';
import ReactPaginate from "react-paginate";
import { useState } from "react";

const TableUserPaginate = (props) => {
    const {pageCount, listUsers } = props;
    
    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        props.fetchListUsersWithPage(+event.selected+1);
        console.log(`User requested page number ${event.selected}`);
    };

    return (
        <>
        
            <table className="table table-striped" style={{ width: 800 + 'px,',minHeight:500+'px' }}>
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
            <div className='user-pagination d-flex justify-content-center'>
            <ReactPaginate
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                marginPagesDisplayed={2}
                pageCount={pageCount}
                previousLabel="< previous"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakLabel="..."
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active"
                renderOnZeroPageCount={null}
            />
            </div>
        </>
    )
};

export default TableUserPaginate;
