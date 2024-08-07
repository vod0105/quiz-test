import React from "react";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { PostSignIn } from "../../services/apiServices";
import { useDispatch } from "react-redux";
import { doLogin } from "../../redux/actions/useAction";

function SignInForm() {
const navigate = useNavigate();
const dispatch = useDispatch();
    const [state, setState] = React.useState({
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

        const { email, password } = state;
        // alert(`You are login with email: ${email} and password: ${password}`);
        let data = await PostSignIn(email,password);
        console.log(">> check res ", data);
        if (data&& data.EC ===0){
            dispatch(doLogin(data))
            toast.success(data.EM);
            navigate('/');

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
        <div className="form-container sign-in-container">
            <form onSubmit={handleOnSubmit}>
                <h1>Sign in</h1>
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
                <span>or use your account</span> */}
                <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={state.email}
                    onChange={handleChange}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={state.password}
                    onChange={handleChange}
                />
                <a href="#">Forgot your password?</a>
                <button >Sign In</button>
            </form>
        </div>
    );
}

export default SignInForm;