import React from "react";
import { toast } from 'react-toastify';
import { PostSignUp } from "../../services/apiServices";
import { useNavigate } from "react-router-dom";


function SignUpForm() {
    const navigate = useNavigate();
    const [state, setState] = React.useState({
        name: "",
        email: "",
        password: ""
    });
    const handleChange = evt => {
        const value = evt.target.value;
        setState({
            ...state,
            [evt.target.name]: value
        });
    };

    const handleOnSubmit = async(evt) => {
        evt.preventDefault();

        const { name, email, password } = state;
                // Check if email and password are provided
                if (!email || !password) {
                    toast.error("Email and password are required!");
                    return;
                }
                
                let data = await PostSignUp(name,email,password);
                console.log(">> check res ", data);
                if (data&& data.EC ===0){
                    toast.success(data.EM);
                    navigate('/login');
        
                }else{
                    toast.error(data.EM);
                }
        for (const key in state) {
            setState({
                ...state,
                [key]: ""
            });
        }
    };

    return (
        <div className="form-container sign-up-container">
            <form onSubmit={handleOnSubmit}>
                <h1>Create Account</h1>
                {/* <div className="social-container">
                    <a href="#" className="social">
                        <i className="fab fa-facebook-f" />
                    </a>
                    <a href="#" className="social">
                        <i className="fab fa-google-plus-g" />
                    </a>
                    <a href="#" className="social">
                        <i className="fab fa-linkedin-in" />
                    </a>
                </div>
                <span>or use your email for registration</span> */}
                <input
                    type="text"
                    name="name"
                    value={state.name}
                    onChange={handleChange}
                    placeholder="Name"
                />
                <input
                    type="email"
                    name="email"
                    value={state.email}
                    onChange={handleChange}
                    placeholder="Email"
                />
                <input
                    type="password"
                    name="password"
                    value={state.password}
                    onChange={handleChange}
                    placeholder="Password"
                />
                <button>Sign Up</button>
            </form>
        </div>
    );
}

export default SignUpForm;