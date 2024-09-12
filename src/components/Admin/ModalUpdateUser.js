import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useEffect, useState } from 'react';
import { FcPlus } from "react-icons/fc";
import { toast } from 'react-toastify';
import { PutUpdateUser } from '../../services/apiServices';
import _ from 'lodash';

const ModalUpdateUser = (props) => {
    const { user, setUser, show, setShow } = props;

    const handleClose = () => {
        setShow(false);
        resetForm();
    }

    const resetForm = () => {
        setEmail("");
        setPassword("");
        setImage("");
        setImagePreview("");
        setUsername("");
        setRole("USER");
    }

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [role, setRole] = useState("");
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState("");

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImagePreview(URL.createObjectURL(file));
            setImage(file);
        } else {
            setImagePreview("");
        }
    }

    useEffect(() => {
        if (!_.isEmpty(user)) {
            setEmail(user.email);
            setRole(user.role);
            setUsername(user.username);
            setPassword(user.password || "");
            if (user.image) {
                setImagePreview(`data:image/jpeg;base64,${user.image}`);
            } else {
                setImagePreview("");
            }
            setImage(null);  // Reset image input
        }
    }, [user]);

    const handleSubmitUpdateUser = async () => {
        let data = await PutUpdateUser(user.id, username, role, image);
        if (data && data.EC === 0) {
            toast.success(data.EM);
            handleClose();
            await props.fetchListUsersWithPage(props.currentPage);
        } else {
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
                            <label htmlFor="inputEmail4" className="form-label">Email</label>
                            <input type="email" className="form-control" id="inputEmail4" value={email} disabled />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="inputPassword4" className="form-label">Password</label>
                            <input type="password" className="form-control" id="inputPassword4" value={password} disabled />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="inputCity" className="form-label">Username</label>
                            <input type="text" className="form-control" id="inputCity" value={username}
                                onChange={(event) => setUsername(event.target.value)} />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="inputState" className="form-label">Role</label>
                            <select id="inputState" className="form-select" value={role}
                                onChange={(event) => setRole(event.target.value)}>
                                <option value="USER">User</option>
                                <option value="ADMIN">Admin</option>
                            </select>
                        </div>
                        <div className="col-md-12">
                            <label className="form-label upload-image" htmlFor='labelUpload'>
                                <FcPlus /> Upload File Image
                            </label>
                            <input type="file" className="form-control" id='labelUpload'
                                hidden
                                onChange={handleImageUpload}
                            />
                        </div>
                        <div className="col-md-12 img-preview">
                            {imagePreview ?
                                <img src={imagePreview} alt="preview" /> :
                                <span>Preview Image</span>
                            }
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSubmitUpdateUser}>Save</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalUpdateUser;
