import { useState,useEffect } from "react";
// import { useSelector } from "react-redux";

const ChangePassword = () => {
    // const account = useSelector(state => state.user.account)

    const [currentPass, setCurrentPass] = useState("");
    const [newPass, setNewPass] = useState("");
    const [confirmPass, setConfirmPass] = useState("");

    useEffect(() => {
   
        }
    },[])

    return(
        <form className="row g-3">
        <div className="col-md-12">
            <label for="inputPassword3" className="form-label">Current Password</label>
            <input type="password" className="form-control" id="inputPassword3" value={currentPass}
                onChange={(event) => { setCurrentPass(event.target.value) }} />
        </div>
        <div className="col-md-12">
            <label for="inputPassword4" className="form-label">New Password</label>
            <input type="password" className="form-control" id="inputPassword4" value={newPass}
                onChange={(event) => { setNewPass(event.target.value) }} />
        </div>
        <div className="col-md-12">
            <label for="inputPassword5" className="form-label">Confirm Password</label>
            <input type="password" className="form-control" id="inputPassword5" value={confirmPass}
                onChange={(event) => { setConfirmPass(event.target.value) }} />
        </div>
    </form>       
    )
}

export default ChangePassword;