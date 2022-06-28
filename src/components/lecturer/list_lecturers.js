import React from 'react';
import {useEffect, useReducer, useState} from "react";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";

const initialState = {
    loading: false,
    lecturers: {},
    error: ''
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'success':
            return {
                loading: true,
                lecturers: action.payload,
                error: ''
            }
        case 'error':
            return {
                loading: true,
                lecturers: [],
                error: "Error when fetching data!"
            }
    }
}

function ListLecturers(props) {
    const [state, dispatch] = useReducer(reducer, initialState)
    const [token, setToken] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        if (localStorage.getItem("token")){
            setToken(localStorage.getItem("token"))
            axios.get(process.env.REACT_APP_API_LINK +'lecturer/', {
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
            alert('Please sign in to see lecturer!')
        }
    }, [token]);
    
    return (
        <div className={'container'}>
            <h1 className={'display-1'} style={{marginBottom: "30px"}}>Lecturers</h1>
            <table className={'table'}>
                <thead>
                    <tr>
                        <th scope={'col'}>Staff ID</th>
                        <th scope={'col'}>First Name</th>
                        <th scope={'col'}>Last Name</th>
                        <th scope={'col'}>Email</th>
                        <th scope={'col'}>Course</th>
                        <th scope={'col'}>Date of Birth</th>
                        <th><Link to={'create'} className={'btn btn-primary'} style={{float: "right", width: "168px"}}>Create</Link></th>
                    </tr>
                </thead>
                <tbody>
                {
                    state.loading ? state.lecturers.map(lecturer => {
                        return(
                        <tr>
                            <th scope={'row'}>{lecturer.staffID}</th>
                            <td>{lecturer.firstName}</td>
                            <td>{lecturer.lastName}</td>
                            <td>{lecturer.email}</td>
                            <td>{lecturer.course}</td>
                            <td>{lecturer.dateOfBirth}</td>
                            <td>
                                <Link to={'delete'} state={{ ID: lecturer.id }} className={'btn btn-danger'} style={{float: "right"}}>Delete</Link>
                                <Link to={'update'} state={{
                                    ID: lecturer.id,
                                    staffId: lecturer.staffID,
                                    lecturerFirstName: lecturer.firstName,
                                    lecturerLastName: lecturer.lastName,
                                    lecturerEmail: lecturer.email,
                                    lecturerDOB: lecturer.dateOfBirth
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

export default ListLecturers;