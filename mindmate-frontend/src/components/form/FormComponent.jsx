import React, {useState} from "react";
import CustomInput from "../inputField/InputField";
import "./FormComponent.css";
import {styled} from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import CustomButton from "../button/CustomButton";
import Password from "./Password";
import Swal from "sweetalert2"
import {updateParentDetails} from "../../repository/perantRepository";
import {updateParent} from "../../store/slices/parentSlice"
import {selectByIdChild, updateChild} from "../../store/slices/childSlice"
import {useDispatch, useSelector} from "react-redux";
import {updateChildDetails} from "../../repository/childRepository";

const Item = styled(Paper)(({theme}) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#ffffff' : '#ffffff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const FormComponent = (props) => {

    const [formEditable, setFormEditable] = React.useState(false);

    const handleEdit = (event) => {
        setFormEditable(true);
    }

    const handleCancel = (event) => {
        setFormEditable(false);
    }

    const [firstName, setFirstName] = useState(props.firstname);
    const [lastName, setLastName] = useState(props.lastname);
    const [address, setAddress] = useState(props.address);
    const [contactNo, setContactNo] = useState(props.contactNo);
    const [gender, setGender] = React.useState(props.genders);
    const [age, setAge] = useState(props.age);
    const [relationship, setRelationship] = useState(props.relationship);
    const dispatcher = useDispatch()
    const child = useSelector((state) => selectByIdChild(state, 1))


    const handleChange = (event) => {
        setGender(event.target.value);
    };
    const handleFirstNameChange = event => {
        setFirstName(event.target.value);
    }
    const handleLastNameChange = event => {
        setLastName(event.target.value);
    }
    const handleChangeAddress = event => {
        setAddress(event.target.value);
    }
    const handleChangeContactNo = event => {
        setContactNo(event.target.value);
    }
    const handleChangeAge = event => {
        setAge(event.target.value);
    }
    const handleChangeRelationship = event => {
        setRelationship(event.target.value);
    }
    const parentDetails = {
        id: 1,
        firstName: firstName,
        lastName: lastName,
        address: address,
        emergencyContactNumber: contactNo,
        gender: gender,
        age: age,
        relationship: relationship
    }
    const childDetails = {
        id: 1,
        firstName: firstName,
        lastName: lastName,
        address: address,
        emergencyContactNumber: contactNo,
        gender: gender,
        age: age
    }
    const handleUpdate = (event) => {
        Swal.fire({
            title: 'Do you want to save the changes?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Save',
            denyButtonText: `Don't save`,
        }).then((result) => {
            /* Read more about
             isConfirmed, isDenied below */
            if (result.isConfirmed) {
                if (props.type === 'child') {
                    updateChildDetails(childDetails).then((res) => {
                        if (res.status === 200) {
                            console.log("pass");
                            dispatcher(updateChild(childDetails));

                            // window.location.reload(true);
                            console.log(child.firstName)
                        } else {
                            Swal.fire(
                                'Failed',
                                'error'
                            )
                        }
                    })
                    Swal.fire('Update Successful!', 'Updated data', 'success').then((result) => {
                        if (result.isConfirmed) {
                            window.location.reload(true);
                        }
                    })
                } else {
                    updateParentDetails(parentDetails).then(res => {
                        console.log("error")
                        if (res.status === 200) {
                            console.log("pass")
                            dispatcher(updateParent({...res.data}));
                            // window.location.reload(true);
                        } else {
                            Swal.fire(
                                'Failed',
                                'error'
                            )
                        }
                    })
                    Swal.fire('Update Successful!', 'Updated data', 'success').then((result) => {
                        if (result.isConfirmed) {
                            window.location.reload(true);
                        }
                    })
                }
            } else if (result.isDenied) {
                Swal.fire('Changes are not Update', '', 'info')
            }
        })
    };

    return (

        <>
            <p className="title-align">{props.title}</p>

            <Grid container rowSpacing={1} columnSpacing={{xs: 1, sm: 2, md: 3}} sx={{display: props.display}}>
                <Grid item xs={6}>
                    <Item>
                        <label className="label-align">First Name</label>
                        <br/>
                        <CustomInput
                            type="text"
                            value={firstName}
                            size="20"
                            radius="8"
                            fontSize="18.946"
                            width='100%'
                            readOnly={!formEditable}
                            onchange={handleFirstNameChange}
                        />
                    </Item>
                </Grid>
                <Grid item xs={6}>
                    <Item>
                        <label className="label-align">Last Name</label>
                        <br/>
                        <CustomInput
                            type="text"
                            size="20"
                            radius="8"
                            fontSize="18"
                            width='100%'
                            readOnly={!formEditable}
                            value={lastName}
                            className='component-input'
                            onchange={handleLastNameChange}
                        />
                    </Item>
                </Grid>
                <Grid item xs={12}>
                    <Item>
                        <label className="label-align">Address</label>
                        <br/>
                        <CustomInput
                            type="text"
                            value={address}
                            size="20"
                            radius="8"
                            width="100%"
                            fontSize="18"
                            readOnly={!formEditable}
                            onchange={handleChangeAddress}
                        />
                    </Item>
                </Grid>
                <Grid item xs={12}>
                    <Item>
                        <label className="label-align">Emergency Contact Number</label>
                        <br/>
                        <CustomInput
                            type="tel"
                            value={contactNo}
                            size="20"
                            radius="8"
                            width="100%"
                            fontSize='18'
                            readOnly={!formEditable}
                            onchange={handleChangeContactNo}
                        />
                    </Item>
                </Grid>

                <Grid item xs={6}>
                    <Item>
                        <label className="label-align">Gender</label>
                        <br/>
                        <select id="gender" name="gender" value={gender}
                                onChange={handleChange}>
                            <option value="MALE" className='g-gender'>Male</option>
                            <option value="FEMALE" className='g-gender'>Female</option>
                        </select>
                    </Item>
                </Grid>
                <Grid item xs={6}>
                    <Item>
                        <label className="label-align">Age</label>
                        <br/>
                        <CustomInput
                            type="number"
                            value={age}
                            size="20"
                            radius="8"
                            width="100%"
                            fontSize='18'
                            max='20'
                            min='1'
                            readOnly={!formEditable}
                            onchange={handleChangeAge}
                        />
                    </Item>

                </Grid>
                <Grid item xs={12} sx={{display: props.relDis}}>
                    <Item>
                        <label className="label-align">Relationship to Mihasa</label>
                        <br/>
                        <CustomInput
                            type="text"
                            value={relationship}
                            size="20"
                            radius="8"
                            width="100%"
                            fontSize="18"
                            readOnly={!formEditable}
                            onchange={handleChangeRelationship}
                        />
                    </Item>
                </Grid>

            </Grid>

            {props.password ? <Password/> : null}
            <div className={formEditable ? "not-visible" : "visible"}>
                <CustomButton
                    type="button"
                    variant="edit"
                    radius="8"
                    size="sm"
                    className="mt-3 mb-4 button-mobile-response"
                    fontSize="18"
                    width="150"
                    onclick={handleEdit}
                >
                    Edit
                </CustomButton>
            </div>

            <div className={formEditable ? "visible row show-update-btn" : "not-visible"}
                 style={{width: '100%', marginRight: '120px'}}>
                <div className="col">
                    <CustomButton
                        type="button"
                        variant="update"
                        radius="8"
                        size="sm"
                        className="mt-3 mb-4 button-mobile-response"
                        fontSize="18"
                        width="150"
                        onclick={handleUpdate}
                    >
                        Update
                    </CustomButton>
                </div>

                <div className="col">
                    <CustomButton
                        type="button"
                        variant="cancel"
                        radius="8"
                        size="sm"
                        className="mt-3 mb-4 button-mobile-response"
                        fontSize="18"
                        width="150"
                        onclick={handleCancel}
                    >
                        Cancel
                    </CustomButton>
                </div>

            </div>


        </>
    )
        ;
};

export default FormComponent;
