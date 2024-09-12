const ChangePassword = (props) => {
    // const account = useSelector(state => state.user.account)

    const {setCurrentPass,setNewPass,setConfirmPass} = props;
    return(
        <form className="row g-3">
        <div className="col-md-12">
            <label for="inputPassword3" className="form-label">Current Password</label>
            <input type="password" className="form-control" id="inputPassword3"
                onChange={(event) => { setCurrentPass(event.target.value) }} />
        </div>
        <div className="col-md-12">
            <label for="inputPassword4" className="form-label">New Password</label>
            <input type="password" className="form-control" id="inputPassword4"
                onChange={(event) => { setNewPass(event.target.value) }} />
        </div>
        <div className="col-md-12">
            <label for="inputPassword5" className="form-label">Confirm Password</label>
            <input type="password" className="form-control" id="inputPassword5"
                onChange={(event) => { setConfirmPass(event.target.value) }} />
        </div>
    </form>       
    )
}

export default ChangePassword;