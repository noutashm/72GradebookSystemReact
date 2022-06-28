import React from 'react';
import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";
import axios from "axios";

function CreateLecturer(props) {
    const navigate = useNavigate()
    const [staffID, setStaffID] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [dob, setDOB] = useState('');

    const staffIDHandler = e => {
        setStaffID(e.target.value)
    }
    const firstNameHandler = e => {
        setFirstName(e.target.value)
    }
    const lastNameHandler = e => {
        setLastName(e.target.value)
    }
    const emailHandler = e => {
        setEmail(e.target.value)
    }
    const dobHandler = e => {
        setDOB(e.target.value)
    }

    const createLecturer = () => {
        if(localStorage.getItem('token')) {
            const data = {
                'staffID': staffID,
                'firstName': firstName,
                'lastName': lastName,
                'email': email,
                'dateOfBirth': dob,
            }
            axios.post(process.env.REACT_APP_API_LINK+'lecturer/', data, {
                headers: {
                    Authorization: "Token "+localStorage.getItem("token")
                }
            }).then((response) => {
                navigate('/lecturers')
            }).catch((err) => {
                console.log(err)
                alert('Lecturer could not be created!')
            })
        } else {
            alert('Please sign in to create lecturer!')
            navigate('/login')
        }
    }

    return (
        <div className={'container'}>
            <h1 className={'display-2'} style={{marginBottom: "30px"}}>Create Lecturer</h1>
            <div className="mb-3">
                <label htmlFor="staffID" className="form-label">Staff ID</label>
                <input id={'staffID'} onChange={staffIDHandler} type={'number'} className={'form-control'} />
            </div>
            <div className="mb-3">
                <label htmlFor="firstName" className="form-label">First Name</label>
                <input id={'firstName'} onChange={firstNameHandler} type={'text'} className={'form-control'} />
            </div>
            <div className="mb-3">
                <label htmlFor="lastName" className="form-label">Last Name</label>
                <input id={'lastName'} onChange={lastNameHandler} type={'text'} className={'form-control'} />
            </div>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input id={'email'} onChange={emailHandler} type={'email'} className={'form-control'} />
            </div>
            <div className="mb-3">
                <label htmlFor="dob" className="form-label">Date Of Birth</label>
                <input id={'dob'} onChange={dobHandler} type={'date'} className={'form-control'} />
            </div>
            <button onClick={createLecturer} className={'btn btn-primary'} type={'submit'}>Create</button>
            <Link to={'/students'} className={'btn btn-danger'}>Back</Link>
        </div>
    );
}

export default CreateLecturer;