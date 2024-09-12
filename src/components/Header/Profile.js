import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import MainInfo from './MainInfo';
import { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import { toast } from 'react-toastify';
import { PostChangePassword, PostUpdateProfile } from '../../services/apiServices';
import { useDispatch } from "react-redux";
import { doUpdateProfile } from '../../redux/actions/useAction';
import ChangePassword from './ChangePassword';


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
        if (account) {
            setEmail(account.email);
            setRole(account.role);
            setUsername(account.username);
            setPassword(account.password)
            if (account.image) {
                setImage(account.image);
                // console.log('pro: ',account.image)
                setImagePreview(`data:image/jpeg;base64,${account.image}`);
            } else {
                setImage("");
                setImagePreview("");
            }
        }
    }, [account])


    const handleSubmit = async () => {
        // lưu ý: 
        // ở csdl lưu theo dạng base64, tuy nhiên file đưa vào có dạng file
        // ở redux lưu theo dạng base64

        if (activeTab === "main_info") {
            // Kiểm tra nếu `image` là một file (người dùng đã tải lên một ảnh mới)
            if (image instanceof File) {
                const reader = new FileReader();

                reader.onloadend = async () => {
                    const base64String = reader.result.split(',')[1]; // Chỉ lấy phần Base64 sau dấu phẩy
                    setImage(base64String);
                    setImagePreview(`data:image/jpeg;base64,${base64String}`);

                    // Sau khi có chuỗi Base64, bạn có thể gửi dữ liệu này đến API
                    const dataStoreUpdate = {
                        username: username,
                        image: base64String,
                    };

                    let data = await PostUpdateProfile(username, image);
                    if (data && data.EC === 0) {
                        dispatch(doUpdateProfile(dataStoreUpdate));
                        toast.success(data.EM);
                    } else {
                        toast.error(data.EM);
                    }
                };

                reader.readAsDataURL(image); // Đọc file để chuyển đổi sang Base64
            } else {
                // Nếu `image` đã là chuỗi Base64 (người dùng không thay đổi ảnh)
                const dataStoreUpdate = {
                    username: username,
                    image: image,
                };

                let data = await PostUpdateProfile(username, image);
                if (data && data.EC === 0) {
                    dispatch(doUpdateProfile(dataStoreUpdate));
                    toast.success(data.EM);
                } else {
                    toast.error(data.EM);
                }
            }
        } else if (activeTab === "password") {
            console.log("pass: ", currentPass, newPass, confirmPass)
            if (newPass && currentPass) {
                if (newPass === confirmPass) {
                    let data = await PostChangePassword(currentPass, newPass);
                    if (data && data.EC === 0) {
                        toast.success(data.EM);
                    } else {
                        toast.error(data.EM)
                    }



                } else {
                    toast.error("Confirm password does not match the new password");
                }
            } else {
                toast.error("Current password incorrect")
            }

        } else if (activeTab === "contact") {
            // Xử lý logic lưu thông tin liên hệ ở đây
            console.log("Saving contact info");
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
                            <ChangePassword
                                setCurrentPass={setCurrentPass}
                                setNewPass={setNewPass}
                                setConfirmPass={setConfirmPass}
                            />
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