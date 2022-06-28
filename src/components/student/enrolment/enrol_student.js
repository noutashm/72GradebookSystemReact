import React from 'react';
import {useReducer, useState} from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";
import axios from "axios";

function EnrolStudent(props) {
    const location = useLocation()
    const { studentList, classList } = location.state

    const navigate = useNavigate()
    const [student, setStudent] = useState('');
    const [class1, setClass] = useState('');

    const studentHandler = e => {
        setStudent(e.target.value)
    }
    const classHandler = e => {
        setClass(e.target.value)
    }

    const enrolStudent = () => {
        if(localStorage.getItem('token')) {
            const data = {
                'student': student,
                'class1': class1,
            }
            axios.post(process.env.REACT_APP_API_LINK+'student_enrolment/', data, {
                headers: {
                    Authorization: "Token "+localStorage.getItem("token")
                }
            }).then((response) => {
                navigate('/students/enrolments')
            }).catch((err) => {
                console.log(err)
                alert('Student could not be enrolled!')
            })
        } else {
            navigate('/login')
            alert('Please sign in to enrol student!')
        }
    }

    return (
        <div className={'container'}>
            <h1 className={'display-2'} style={{marginBottom: "30px"}}>Create Class</h1>
            <div className="mb-3">
                <label htmlFor="student" className={'form-label'}>Student</label>
                <select className={'form-select'} name={'student'} onChange={studentHandler}>
                    <option disabled={true} selected={true}></option>
                    {
                        studentList.map(student => {
                            return(<option value={student.id}>{student.firstName} {student.lastName}</option>)
                        })
                    }
                </select>
            </div>
            <div className="mb-3">
                <label htmlFor="class" className={'form-label'}>Class</label>
                <select className={'form-select'} name={'class'} onChange={classHandler}>
                    <option disabled={true} selected={true}></option>
                    {
                        classList.map(class1 => {
                            return(<option value={class1.id}>{class1.number}</option>)
                        })
                    }
                </select>
            </div>
            <button onClick={enrolStudent} className={'btn btn-primary'} type={'submit'}>Enrol</button>
            <Link to={'/students/enrolments'} className={'btn btn-danger'}>Back</Link>
        </div>
    );
}

export default EnrolStudent;