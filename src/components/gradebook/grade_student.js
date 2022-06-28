import React from 'react';
import {Link, useLocation, useNavigate} from "react-router-dom";
import {useState} from "react";
import axios from "axios";

function GradeStudent(props) {
    const location = useLocation()
    const { enrolmentID, enrolmentStudent, enrolmentClass, enrolmentGrade } = location.state

    const navigate = useNavigate()
    const [grade, setGrade] = useState(enrolmentGrade);

    const gradeHandler = e => {
        setGrade(e.target.value)
    }

    const gradeStudent = () => {
        if(localStorage.getItem('token')) {
            const data = {
                'student': enrolmentStudent,
                'class1': enrolmentClass,
                'grade': grade,
                'gradeTime': new Date().toISOString(),
            }
            axios.put(process.env.REACT_APP_API_LINK+'student_enrolment/'+enrolmentID+'/', data, {
                headers: {
                    Authorization: "Token "+localStorage.getItem("token")
                }
            }).then((response) => {
                console.log(response)
                navigate(-1)
            }).catch((err) => {
                console.log(err)
                alert('Student could not be graded!')
            })
        } else {
            navigate('/login')
            alert('Please sign in to grade student!')
        }
    }

    return (
        <div className={'container'}>
            <h1 className={'display-1'} style={{marginBottom: "30px"}}>Grade Student</h1>
            <div className="mb-3">
                <label htmlFor="grade" className={'form-label'}>Grade</label>
                <input id={'grade'} onChange={gradeHandler} type={'number'} min={'0'} max={'100'} className={'form-control'} defaultValue={enrolmentGrade} />
            </div>
            <button onClick={gradeStudent} className={'btn btn-primary'} type={'submit'}>Grade</button>
            <Link to={-1} className={'btn btn-danger'}>Back</Link>
        </div>
    );
}

export default GradeStudent;