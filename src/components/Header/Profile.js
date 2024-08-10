import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import MainInfo from './MainInfo';
import { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import { toast } from 'react-toastify';
import { PostUpdateProfile } from '../../services/apiServices';
import { useDispatch } from "react-redux";
import { doUpdateProfile } from '../../redux/actions/useAction';


const ModalProfile = (props) => {
    const account = useSelector(state => state.user.account)
    const dispatch = useDispatch();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [role, setRole] = useState("");
    const [image, setImage] = useState("");
    const [imagePreview, setImagePreview] = useState("");

    const [currentPass, setCurrentPass] = useState("");
    const [newPass, setNewPass] = useState("");
    const [confirmPass, setConfirmPass] = useState("");

    const [activeTab, setActiveTab] = useState("main_info");
    const { show, setShow } = props
    const handleClose = () => {
        setShow(false);
    }

    useEffect(() => {
        if(account){
            setEmail(account.email);
            setRole(account.role);
            setImage("");
            setUsername(account.username);
            setPassword(account.password)
            if(account.image){
                setImagePreview(`data:image/jpeg;base64,${account.image}`);
            }else{
                setImagePreview("");
            }
        }
    },[account])


    const handleSubmit = async() => {
        if (activeTab === "main_info") {
            const dataStoreUpdate = {
                username:username,
                image:image
            }
            // Save main info
            let data = await PostUpdateProfile(username,image);
            console.log(">> check res ", data);
            if (data&& data.EC ===0){
                dispatch(doUpdateProfile(dataStoreUpdate))
                setEmail('');setPassword('');setUsername('');setImage('');setImagePreview('');setRole('');
                toast.success(data.EM);
            }else{
                toast.error(data.EM);
            } 
            // Add your save logic for main info here
        } else if (activeTab === "password") {
            if(newPass && currentPass && newPass === confirmPass){
                
            }
            console.log("Saving password");
            // Add your save logic for password here
        } else if (activeTab === "contact") {
            // Save contact info (if needed)
            console.log("Saving contact info");
            // Add your save logic for contact info here
        }
    };

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
                    <Modal.Title>Thông tin người dùng</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Tabs
                        activeKey={activeTab}
                        onSelect={(key) => setActiveTab(key)}
                        defaultActiveKey="profile"
                        id="uncontrolled-tab-example"
                        className="mb-3"
                    >
                        <Tab eventKey="main_info" title="Main info">
                            <MainInfo
                                email={email}
                                setEmail={setEmail}
                                username={username}
                                setUsername={setUsername}
                                role={role}
                                setRole={setRole}
                                image={image}
                                setImage={setImage}
                                imagePreview={imagePreview}
                                setImagePreview={setImagePreview}
                            />
                        </Tab>
                        <Tab eventKey="password" title="Change Password">
                            Tab content for Profile
                        </Tab>
                        <Tab eventKey="contact" title="Contact" disabled>
                            Tab content for Contact
                        </Tab>
                    </Tabs>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>Save</Button>
                </Modal.Footer>
            </Modal >
        </>
    )
}

export default ModalProfile;