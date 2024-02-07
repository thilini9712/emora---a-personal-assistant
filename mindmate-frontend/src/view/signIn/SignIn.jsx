import logo from "../../assets/logo/EmoraNew.png";
import SignInFrom from "../../components/signInForm/SignInForm";
import "./SignIn.css";

const SignIn = ({setToken}) => {

    return (
        <div>
            <div className="row row-signIn">
                <div
                    className="col-sm-5 col-md-4 col-lg-4"
                    style={{
                        backgroundColor: "#1E5D88",
                        textAlign: "center",
                        height: "100vh",
                    }}
                >
                    <img
                        src={logo}
                        className="signIn-logo"
                        alt="MindMate"
                        style={{width: "60%"}}
                    />
                </div>
                <div className="col-sm-5 offset-sm-2 col-md-8 offset-md-0 col-lg-8 left-color-div">
                    <div className="right-side">
                        <div className="sign-in-form-align ">
                            <SignInFrom setToken={setToken}/>
                        </div>
                    </div>
                </div>
            </div>
            {/*mobile view*/}
            <div className="mobile-view">
                <div className="row-3 top-side">
                    <img
                        src={logo}
                        className="m-log-align"
                        alt="MindMate"
                        style={{width: "40%"}}
                    />
                </div>

                <div className="row-9 bottom-side ">
                    <div className="login-form--m">
                        <SignInFrom setToken={setToken}/>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default SignIn;
