import React from 'react';
import {useEffect, useReducer, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";

const initialEnrolmentState = {
    loading: false,
    enrolments: {},
    error: ''
}
const initialStudentState = {
    loading: false,
    students: {},
    error: ''
}
const initialClassState = {
    loading: false,
    classes: {},
    error: ''
}

const enrolmentReducer = (state, action) => {
    switch (action.type) {
        case 'success':
            return {
                loading: true,
                enrolments: action.payload,
                error: ''
            }
        case 'error':
            return {
                loading: true,
                enrolments: [],
                error: "Error when fetching data!"
            }
    }
}
const studentReducer = (state, action) => {
    switch (action.type) {
        case 'success':
            return {
                loading: true,
                students: action.payload,
                error: ''
            }
        case 'error':
            return {
                loading: true,
                students: [],
                error: "Error when fetching data!"
            }
    }
}
const classReducer = (state, action) => {
    switch (action.type) {
        case 'success':
            return {
                loading: true,
                classes: action.payload,
                error: ''
            }
        case 'error':
            return {
                loading: true,
                classes: [],
                error: "Error when fetching data!"
            }
    }
}

function ListStudentEnrolment(props) {
    const [ enrolmentState, enrolmentDispatch] = useReducer(enrolmentReducer, initialEnrolmentState)
    const [studentState, studentDispatch] = useReducer(studentReducer, initialStudentState)
    const [classState, classDispatch] = useReducer(classReducer, initialClassState)
    const [token, setToken] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        if (localStorage.getItem("token")){
            setToken(localStorage.getItem("token"))
            axios.get(process.env.REACT_APP_API_LINK +'student_enrolment/', {
                headers: {
                    Authorization: "Token "+localStorage.getItem("token")
                }
            }).then(response => {
                enrolmentDispatch({type: 'success', payload: response.data});
            }).catch(error => {
                enrolmentDispatch({type: 'error'});
                console.log(error);
            })

            axios.get(process.env.REACT_APP_API_LINK +'student/', {
                headers: {
                    Authorization: "Token "+localStorage.getItem("token")
                }
            }).then(response => {
                studentDispatch({type: 'success', payload: response.data});
            }).catch(error => {
                studentDispatch({type: 'error'});
                console.log(error);
            })

            axios.get(process.env.REACT_APP_API_LINK +'class/', {
                headers: {
                    Authorization: "Token "+localStorage.getItem("token")
                }
            }).then(response => {
                classDispatch({type: 'success', payload: response.data});
            }).catch(error => {
                classDispatch({type: 'error'});
                console.log(error);
            })
        } else {
            setToken('')
            navigate('/login')
            alert('Please sign in to see enrolments!')
        }
    }, [token]);

    return (
        <div className={'container'}>
            <h1 className={'display-1'} style={{marginBottom: "30px"}}>Enrolments</h1>
            <table className={'table'}>
                <thead>
                <tr>
                    <th scope="col">Student</th>
                    <th scope="col">Class</th>
                    <th>
                        <Link to={'enrol'} state={{ studentList: studentState.students, classList: classState.classes }} className={'btn btn-primary'} style={{float: "right", width: "82px"}}>Enrol</Link>
                        <Link to={'/students'} className={'btn btn-secondary'} style={{float: "right", marginRight: "20px"}}>Back To Students</Link>
                    </th>
                </tr>
                </thead>
                <tbody>
                {
                    enrolmentState.loading ? enrolmentState.enrolments.map(enrolment => {
                        return(
                            <tr>
                                {
                                    studentState.loading ? studentState.students.map(student => {
                                        return (enrolment.student === student.id ? <td>{student.firstName} {student.lastName}</td> : '')
                                    }): 'Loading...'
                                }
                                {
                                    classState.loading ? classState.classes.map(class1 => {
                                        return (enrolment.class1 === class1.id ? <td>{class1.number}</td> : '')
                                    }): 'Loading...'
                                }
                                <td>
                                    <Link to={'remove'} state={{ enrolmentID: enrolment.id,  }} className={'btn btn-danger'} style={{float: "right"}}>Remove</Link>
                                </td>
                            </tr>
                        )
                    }): 'Loading...'
                }
                </tbody>
            </table>
        </div>
    );
}

export default ListStudentEnrolment;