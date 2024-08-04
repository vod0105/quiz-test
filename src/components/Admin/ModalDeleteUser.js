import { toast } from 'react-toastify';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { DeleteUser } from '../../services/apiServices';

function ModalDeleteUser(props) {
  const {idUser,show, setShow} = props;

  const handleClose = () => setShow(false);

  const handleSubmitDeleteUser = async() => {
    console.log("id: ",idUser)
    let data = await DeleteUser(idUser);
    console.log(">> check res ", data);
    if (data&& data.EC ===0){
        toast.success(data.EM);
        handleClose();
        await props.fetchListUsers();
    }else{
        toast.error(data.EM);
    }
  }

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete The User?</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure to this user.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmitDeleteUser}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalDeleteUser;