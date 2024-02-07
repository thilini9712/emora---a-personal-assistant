import React, {useState} from "react";
import "./SignInForm.css";
import {Icon} from "react-icons-kit";
import {ic_perm_identity_twotone} from 'react-icons-kit/md/ic_perm_identity_twotone'
import {ic_visibility_off} from 'react-icons-kit/md/ic_visibility_off'
import {ic_visibility} from 'react-icons-kit/md/ic_visibility'
import {MDBInput} from "mdb-react-ui-kit";
import CustomButton from "../button/CustomButton";
import {Link} from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

function SignInFrom(setToken) {

    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
    const [type, setType] = useState("password");
    const [icon, setIcon] = useState(ic_visibility_off);
    const [checkIcon] = useState(ic_perm_identity_twotone);

    const handleChangeUserName = (event) => {
        setUserName(event.target.value);
    }

    const handleSubmit = async e => {
        e.preventDefault();

        let data = new FormData();
        data.append('grant_type', 'password');
        data.append('username', username);
        data.append('password', password);

        const headers = {
            'Authorization': 'Basic cGFyZW50Og=='
        }
        axios.post("http://18.143.151.234:8080/api/oauth/token", data, {headers})  //18.143.151.234
            .then((res) => {
                localStorage.setItem("loggedUserToken", res.data.access_token);
                window.location.replace("/")
            })
            .catch(err => {
                console.error(err)
                Swal.fire(
                    'Failed!',
                    "You have entered an invalid username or password!",
                    'error'
                ).then(r => {
                })
            })
    }


    const handleToggle = () => {
        if (type === "password") {
            setIcon(ic_visibility);
            setType("text");
        } else {
            setIcon(ic_visibility_off);
            setType("password");
        }
    };

    return (
        <div className="sign-in-main">
            <div className="d-flex flex-column ">
                <div className="text-center">
                    <h1
                        className="mt-1 mb-5 pb-1 let-sign-font"
                        style={{color: "#171742"}}
                    >
                        Let’s Sign In
                    </h1>
                </div>

                <label className="sign-in-label">Username</label>
                <div className="input-field">
                      <span className="icon-class" style={{cursor: "cursor"}}>
                        <Icon icon={checkIcon} size={25}/>
                      </span>
                    <MDBInput
                        wrapperClass="mb-4"
                        id="userName"
                        type="text"
                        className="text-line"
                        placeholder="mihiripeiris"
                        value={username}
                        onChange={handleChangeUserName}
                    />
                </div>

                <label className="sign-in-label">Password</label>
                <div className="input-field">
                      <span onClick={handleToggle} className="icon-class">
                        <Icon icon={icon} size={25}/>
                      </span>
                    <MDBInput
                        wrapperClass="mb-4"
                        id="password"
                        type={type}
                        className="text-line"
                        placeholder="................"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>
                <Link className="forget-aline" to="/">
                    Forgot password?
                </Link>

                <div className="text-center pt-1 mb-5 pb-1">
                    <CustomButton
                        variant="primary"
                        width="410"
                        radius="40"
                        fontSize="24"
                        height="sm"
                        className="sign-in-btn"
                        onclick={handleSubmit}
                    >
                        Sign in
                    </CustomButton>
                </div>
            </div>
        </div>
    );
}

export default SignInFrom;