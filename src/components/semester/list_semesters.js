import React, {useEffect, useReducer, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";

const initialSemesterState = {
    loading: false,
    semesters: {},
    error: ''
}

const initialCourseState = {
    loading: false,
    courses: {},
    error: ''
}

const semesterReducer = (state, action) => {
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
const courseReducer = (state, action) => {
    switch (action.type) {
        case 'success':
            return {
                loading: true,
                courses: action.payload,
                error: ''
            }
        case 'error':
            return {
                loading: true,
                courses: [],
                error: "Error when fetching data!"
            }
    }
}

function ListSemesters(props) {
    const [semesterState, semesterDispatch] = useReducer(semesterReducer, initialSemesterState)
    const [courseState, courseDispatch] = useReducer(courseReducer, initialCourseState)
    const [token, setToken] = useState('')
    const navigate = useNavigate()
    let semesterCourseIDs = []

    useEffect(() => {
        if (localStorage.getItem("token")){
            setToken(localStorage.getItem("token"))
            axios.get(process.env.REACT_APP_API_LINK +'semester/', {
                headers: {
                    Authorization: "Token "+localStorage.getItem("token")
                }
            }).then(response => {
                semesterDispatch({type: 'success', payload: response.data});
            }).catch(error => {
                semesterDispatch({type: 'error'});
                console.log(error);
            })

            axios.get(process.env.REACT_APP_API_LINK +'course/', {
                headers: {
                    Authorization: "Token "+localStorage.getItem("token")
                }
            }).then(response => {
                courseDispatch({type: 'success', payload: response.data});
            }).catch(error => {
                courseDispatch({type: 'error'});
                console.log(error);
            })
        } else {
            setToken('')
            navigate('/login')
            alert('Please sign in to see semesters!')
        }
    }, [token]);

    return (
        <div className={'container'}>
            <h1 className={'display-1'} style={{marginBottom: "30px"}}>Semesters</h1>
            <table className={'table'}>
                <thead>
                <tr>
                    <th scope="col">Year</th>
                    <th scope="col">Semester</th>
                    <th scope="col">Courses</th>
                    <th><Link to={'create'} state={{ coursesList: courseState.courses }} className={'btn btn-primary'} style={{float: "right", width: "168px"}}>Create</Link></th>
                </tr>
                </thead>
                <tbody>
                {
                    semesterState.loading ? semesterState.semesters.map(semester => {
                        return(
                            <tr>
                                <td key={semester.id}>{semester.year}</td>
                                <td>{semester.semester}</td>
                                <td>
                                    {
                                        courseState.loading ? courseState.courses.map(course => {
                                            return (
                                                semester.courses.map(semesterCourse => {
                                                    if(semesterCourse === course.id) {
                                                        semesterCourseIDs.push(course.id)
                                                        return(<div><Link to={'/courses'}>{course.name}</Link></div>)
                                                    }
                                                })
                                            )
                                        }): 'Loading...'
                                    }
                                </td>
                                <td>
                                    <Link to={'delete'} state={{ semesterID: semester.id }} className={'btn btn-danger'} style={{float: "right"}}>Delete</Link>
                                    <Link to={'update'} state={{
                                        semesterID: semester.id,
                                        semesterYear: semester.year,
                                        semesterSemester: semester.semester,
                                        semesterCoursesIDs: semesterCourseIDs,
                                        coursesList: courseState.courses
                                    }} className={'btn btn-success'} style={{float: "right", marginRight: "20px"}}>Update</Link>
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

export default ListSemesters;