import React from 'react';
import {useNavigate} from "react-router-dom";
import {useReducer, useState} from "react";
import {useEffect} from "react";
import axios from "axios";

const initialState = {
    loading: false,
    semesters: {},
    error: ''
}
const reducer = (state, action) => {
    switch (action.type) {
        case 'success':
            return {
                loading: true,
                semesters: action.payload,
                error: ''
            }
        case 'error':
            return {
                loading: true,
                semesters: [],
                error: "Error when fetching data!"
            }
    }
}

function SemestersGradebook(props) {
    const [state, dispatch] = useReducer(reducer, initialState)
    const [token, setToken] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        if (localStorage.getItem("token")){
            setToken(localStorage.getItem("token"))
            axios.get(process.env.REACT_APP_API_LINK +'semester/', {
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
            alert('Please sign in to see gradebook!')
        }
    }, [token]);

    return (
        <div className={'container'}>
            <h1 className={'display-1'} style={{marginBottom: "30px"}}>GradeBook - Semesters</h1>
            <table className={'table table-primary table-hover'}>
                <thead>
                    <tr>
                        <th scope={'col'}>Year</th>
                        <th scope={'col'}>Semester</th>
                    </tr>
                </thead>
                <tbody>
                {
                    state.loading ? state.semesters.map(semester => {
                        const navigateToClasses = () => {
                            navigate('classes', { state:{ semesterID: semester.id }})
                        }
                        return(
                            <tr className={'clickable'} onClick={navigateToClasses} style={{cursor: "pointer"}}>
                                <td>{semester.year}</td>
                                <td>{semester.semester}</td>
                            </tr>
                        )
                    }): 'Loading...'
                }
                </tbody>
            </table>
        </div>
    );
}

export default SemestersGradebook;