import Grid from "@mui/material/Grid";
import CustomInput from "../inputField/InputField";
import React, {useState} from "react";
import {styled} from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import "./FormComponent.css";
import CustomButton from "../button/CustomButton";
import Swal from "sweetalert2";
import {updateParentPassword} from "../../repository/perantRepository";
// import {useDispatch} from "react-redux";

const Item = styled(Paper)(({theme}) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#ffffff' : '#ffffff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));


const Password = ({
                      title,
                  }) => {

    const [currentPassword, setCurrentPassword] = useState();
    const [newPassword, setNewPassword] = useState();
    const [reNewPassword, setReNewPassword] = useState();
    // const dispatcher = useDispatch()

    const handleNewPasswordChange = event => {
        setNewPassword(event.target.value);
    };
    const handleReNewPasswordChange = event => {
        setReNewPassword(event.target.value);
    };
    const handleChangePassword = event => {
        setCurrentPassword(event.target.value);
    };

    const passwordDetails = {
        id: 1,
        currentPassword: currentPassword,
        newPassword: newPassword,
    }
    const handleUpdatePassword = (event) => {
        if (newPassword != null) {
            console.log("update password")
        }
        if (newPassword != null || reNewPassword != null || currentPassword != null) {
            console.log(setNewPassword)
            if (newPassword === reNewPassword) {
                Swal.fire({
                    title: 'Do you want to save the changes?',
                    icon: 'question',
                    // showDenyButton: true,
                    showCancelButton: true,
                    confirmButtonText: 'Save',
                    // denyButtonText: `Don't save`,
                }).then((result) => {
                    if (result.isConfirmed) {
                        updateParentPassword(passwordDetails).then((res) => {
                            if (res.status === 200) {
                                console.log(res.data)
                                console.log("pass")
                                // dispatcher(updatePassword({...res.data}));
                                if (res.data.success === true) {
                                    Swal.fire('Success', res.data.message, 'success').then((result) => {
                                        if (result.isConfirmed) {
                                            localStorage.removeItem("loggedUserToken");
                                            window.location.reload(true);
                                        }
                                    })
                                } else {
                                    Swal.fire('Error', res.data.message, 'error').then((result) => {
                                    })
                                }
                            } else {
                                Swal.fire('Error', "Something Went Wrong", 'error').then((result) => {
                                    if (result.isConfirmed) {
                                    }
                                })
                            }
                        })
                    } else if (result.isDenied) {
                        Swal.fire('Changes are not save', '', 'info')
                    }
                })
            } else {
                console.log("re-enter-password")
            }
        }
    };
    return (
        <>
            <p className="title-align">{title}</p>

            <Grid item xs={12} className='Password-section'>
                <Item>
                    <label className="label-align">Current Password</label>
                    <br/>
                    <CustomInput
                        type="password"
                        size="20"
                        radius="10"
                        width="100%"
                        fontSize='18'
                        id="currentPassword"
                        onchange={handleChangePassword}
                        required="required"
                    />
                </Item>
            </Grid>
            <Grid item xs={12}>
                <Item>
                    <label className="label-align">New Password</label>
                    <br/>
                    <CustomInput
                        type="password"
                        size="20"
                        radius="8"
                        width="100%"
                        fontSize='18'
                        value={newPassword}
                        onchange={handleNewPasswordChange}
                        required="required"
                    />
                </Item>
            </Grid>
            <Grid item xs={12}>
                <Item>
                    <label className="label-align">Re-Enter New Password</label>
                    <br/>
                    <CustomInput
                        type="password"
                        size="20"
                        radius="8"
                        width="100%"
                        fontSize='18'
                        value={reNewPassword}
                        onchange={handleReNewPasswordChange}
                        required="required"
                    />
                </Item>
            </Grid>
            <CustomButton
                type="button"
                variant="primary"
                radius="8"
                size="sm"
                className="mt-3 mb-4 change-password-margin"
                fontSize="18"
                width="150"
                onclick={handleUpdatePassword}
            >
                Update
            </CustomButton>

        </>
    );
}

export default Password;