import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useEffect, useState } from 'react';
import { FcPlus } from "react-icons/fc";
import { toast } from 'react-toastify';
import {PutUpdateUser} from '../../services/apiServices'
import _ from 'lodash'

const ModalUpdateUser = (props) => {
    const {user,setUser,show, setShow} = props

    const handleClose = () => {
        // console.log("am")
        setShow(false);
        // setEmail("");
        // setPassword("");
        // setImage("");
        // setImagePreview("");
        // setUsername("");
        // setRole("USER");
    }
    const handleShow = () => setShow(true);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [role, setRole] = useState("");
    const [image, setImage] = useState("");
    const [imagePreview, setImagePreview] = useState("");

    const handleImageUpload = (event) => {
        if (event.target && event.target.files && event.target.files[0]){
            setImagePreview(URL.createObjectURL(event.target.files[0]))
            setImage(event.target.value)    
        }
        else{
            setImagePreview("");
        }
        // console.log(event.target.files[0])
    }

    useEffect(() => {
        if(!_.isEmpty(user)){
            setEmail(user.email);
            setRole(user.role);
            setImage("");
            setUsername(user.username);
            setPassword(user.password)
            if(user.image){
                setImagePreview(`data:image/jpeg;base64,${user.image}`);
            }else{
                setImagePreview("");
            }
        }
    },[user])

    // const validateEmail = (email) => {
    //     return String(email)
    //       .toLowerCase()
    //       .match(
    //         /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    //       );
    //   };


    const handSubmitUpdateUser = async () => {
        // const isvalidEmail = validateEmail(email);
        // if (!isvalidEmail){
        //     toast.error('Invalid Email');
        //     return;
        // }

        // if(!password){
        //     toast.error('Invalid Password');
        //     return;            
        // }
            let data = await PutUpdateUser(user.id,username,role,image);
            console.log(">> check res ", data);
            if (data&& data.EC ===0){
                toast.success(data.EM);
                handleClose();
                await props.fetchListUsersWithPage(props.currentPage);
            }else{
                toast.error(data.EM);
            }
            

    }
    return (
        <>
            <Modal
                className='modal-add-user'
                size="xl"
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Update User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-md-6">
                            <label for="inputEmail4" className="form-label">Email</label>
                            <input type="email" className="form-control" id="inputEmail4" value={email} disabled
                                onChange={(event) => { setEmail(event.target.value) }}
                            />
                        </div>
                        <div className="col-md-6">
                            <label for="inputPassword4" className="form-label">Password</label>
                            <input type="password" className="form-control" id="inputPassword4" value={password} disabled
                                onChange={(event) => { setPassword(event.target.value) }} />
                        </div>
                        <div className="col-md-6">
                            <label for="inputCity" className="form-label">Username</label>
                            <input type="text" className="form-control" id="inputCity" value={username}
                                onChange={(event) => { setUsername(event.target.value) }} />
                        </div>
                        <div className="col-md-6">
                            <label for="inputState" className="form-label">Role</label>
                            <select id="inputState" className="form-select" value={role}
                                onChange={(event) => { setRole(event.target.value) }}>
                                <option value="USER">User</option>
                                <option value="ADMIN">Admin</option>
                            </select>
                        </div>
                        <div className="col-md-12" >
                            <label className="form-label upload-image" htmlFor='labelUpload'>
                                <FcPlus />Upload File Image</label>
                            <input type="file" className="form-control" id='labelUpload'
                                hidden
                                onChange={(event) => handleImageUpload(event)}
                            />
                        </div>
                        <div className="col-md-12 img-preview">
                            {imagePreview ?
                            <img src={imagePreview}></img>
                            :
                            <span>Preview Image</span>        
                        }    
                            
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handSubmitUpdateUser}>Save</Button>
                </Modal.Footer>
            </Modal >
        </>
    );
}

export default ModalUpdateUser;