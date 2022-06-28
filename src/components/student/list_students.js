import React from 'react';
import {Link, useNavigate} from "react-router-dom";
import {useEffect, useReducer, useState} from "react";
import axios from "axios";

const initialState = {
    loading: false,
    students: {},
    error: ''
}

const reducer = (state, action) => {
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

function ListStudents(props) {
    const [state, dispatch] = useReducer(reducer, initialState)
    const [token, setToken] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        if (localStorage.getItem("token")){
            setToken(localStorage.getItem("token"))
            axios.get(process.env.REACT_APP_API_LINK +'student/', {
                headers: {
                    Authorization: "Token "+localStorage.getItem("token")
                }
            }).then(response => {
                dispatch({type: 'success', payload: response.data});
            }).catch(error => {
                dispatch({type: 'error'});
                console.log(error);
            })
        } else {
            setToken('')
            navigate('/login')
            alert('Please sign in to see students!')
        }
    }, [token]);

    return (
        <div className={'container'}>
            <h1 className={'display-1'} style={{marginBottom: "30px"}}>Students</h1>
            <table className={'table'}>
                <thead>
                    <tr>
                        <th scope={'col'}>Student ID</th>
                        <th scope={'col'}>First Name</th>
                        <th scope={'col'}>Last Name</th>
                        <th scope={'col'}>Email</th>
                        <th scope={'col'}>Date of Birth</th>
                        <th>
                            <Link to={'create'} className={'btn btn-primary'} style={{float: "right"}}>Create</Link>
                            <Link to={'enrolments'} className={'btn btn-primary'} style={{float: "right", marginRight: "20px"}}>Enrollment</Link>
                        </th>
                    </tr>
                </thead>
                <tbody>
                {
                    state.loading ? state.students.map(student => {
                        return(
                        <tr>
                            <th scope={'row'}>{student.studentID}</th>
                            <td>{student.firstName}</td>
                            <td>{student.lastName}</td>
                            <td>{student.email}</td>
                            <td>{student.dateOfBirth}</td>
                            <td>
                                <Link to={'delete'} state={{ studentID: student.id }} className={'btn btn-danger'} style={{float: "right"}}>Delete</Link>
                                <Link to={'update'} state={{
                                    ID: student.id,
                                    studentId: student.studentID,
                                    studentFirstName: student.firstName,
                                    studentLastName: student.lastName,
                                    studentEmail: student.email,
                                    studentDOB: student.dateOfBirth
                                }} className={'btn btn-success'} style={{float: "right", marginRight: "20px"}}>Update</Link>
                            </td>
                        </tr>
                        )
                    }) : 'Loading...'
                }
                </tbody>
            </table>
        </div>
    );
}

export default ListStudents;