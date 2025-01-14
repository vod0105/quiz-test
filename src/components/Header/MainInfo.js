import { FcPlus } from "react-icons/fc";

const MainInfo = (props) => {
    const { email, setEmail, password, setPassword, username, setUsername, role, setRole, image, setImage, imagePreview, setImagePreview } = props;

    const handleImageUpload = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            setImagePreview(URL.createObjectURL(event.target.files[0]));
            setImage(event.target.files[0]);  
            // console.log("image in MainInfo: ", event.target.files[0]);  
        } else {
            setImagePreview("");
        }
    }

    return (
        <form className="row g-3">
            <div className="col-md-6">
                <label htmlFor="inputEmail4" className="form-label">Email</label>
                <input type="email" className="form-control" id="inputEmail4" value={email} disabled
                    onChange={(event) => { setEmail(event.target.value) }}
                />
            </div>
            <div className="col-md-6">
                <label htmlFor="inputPassword4" className="form-label">Password</label>
                <input type="password" className="form-control" id="inputPassword4" value={password} disabled
                    onChange={(event) => { setPassword(event.target.value) }} />
            </div>
            <div className="col-md-6">
                <label htmlFor="inputCity" className="form-label">Username</label>
                <input type="text" className="form-control" id="inputCity" value={username}
                    onChange={(event) => { setUsername(event.target.value) }} />
            </div>
            <div className="col-md-6">
                <label htmlFor="inputState" className="form-label">Role</label>
                <select id="inputState" className="form-select" value={role} disabled
                    onChange={(event) => { setRole(event.target.value) }}>
                    <option value="USER">User</option>
                    <option value="ADMIN">Admin</option>
                </select>
            </div>
            <div className="col-md-12">
                <label className="form-label upload-image" htmlFor='labelUpload'>
                    <FcPlus /> Upload File Image</label>
                <input type="file" className="form-control" id='labelUpload'
                    hidden
                    onChange={handleImageUpload}
                />
            </div>
            <div className="col-md-12 img-preview">
                {imagePreview ?
                    <img src={imagePreview} alt="Image Preview" /> :
                    <span>Preview Image</span>
                }
            </div>
        </form>
    );
}

export default MainInfo;
