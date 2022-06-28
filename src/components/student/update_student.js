import React from 'react';
import {Link, useLocation, useNavigate} from "react-router-dom";
import {useState} from "react";
import axios from "axios";

function UpdateStudent(props) {
    const location = useLocation()
    const { ID, studentId, studentFirstName, studentLastName, studentEmail, studentDOB } = location.state

    const navigate = useNavigate()
    const [studentID, setStudentID] = useState(studentId);
    const [firstName, setFirstName] = useState(studentFirstName);
    const [lastName, setLastName] = useState(studentLastName);
    const [email, setEmail] = useState(studentEmail);
    const [dob, setDOB] = useState(studentDOB);
    const studentIDHandler = e => {
        setStudentID(e.target.value)
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

    const updateStudent = () => {
        if(localStorage.getItem('token')) {
            const data = {
                'studentID': studentID,
                'firstName': firstName,
                'lastName': lastName,
                'email': email,
                'dateOfBirth': dob,
            }
            axios.put(process.env.REACT_APP_API_LINK+'student/'+ID+'/', data, {
                headers: {
                    Authorization: "Token "+localStorage.getItem("token")
                }
            }).then((response) => {
                navigate('/students')
            }).catch((err) => {
                console.log(err)
                alert('Student could not be update!')
            })
        } else {
            alert('Please sign in to update student!')
            navigate('/login')
        }
    }

    return (
        <div className={'container'}>
            <h1 className={'display-2'} style={{marginBottom: "30px"}}>Update Student</h1>
            <div className="mb-3">
                <label htmlFor="studentID" className="form-label">Student ID</label>
                <input id={'studentID'} onChange={studentIDHandler} type={'number'} className={'form-control'} defaultValue={studentId} />
            </div>
            <div className="mb-3">
                <label htmlFor="firstName" className="form-label">First Name</label>
                <input id={'firstName'} onChange={firstNameHandler} type={'text'} className={'form-control'} defaultValue={studentFirstName} />
            </div>
            <div className="mb-3">
                <label htmlFor="lastName" className="form-label">Last Name</label>
                <input id={'lastName'} onChange={lastNameHandler} type={'text'} className={'form-control'} defaultValue={studentLastName} />
            </div>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input id={'email'} onChange={emailHandler} type={'email'} className={'form-control'} defaultValue={studentEmail} />
            </div>
            <div className="mb-3">
                <label htmlFor="dob" className="form-label">Date Of Birth</label>
                <input id={'dob'} onChange={dobHandler} type={'date'} className={'form-control'} defaultValue={studentDOB} />
            </div>
            <button onClick={updateStudent} className={'btn btn-primary'} type={'submit'}>Update</button>
            <Link to={'/students'} className={'btn btn-danger'}>Back</Link>
        </div>
    );
}

export default UpdateStudent;