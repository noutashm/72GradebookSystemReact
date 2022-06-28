import React from 'react';
import {Link, useLocation, useNavigate} from "react-router-dom";
import axios from "axios";

function DeleteCourse(props) {
    const location = useLocation()
    const navigate = useNavigate()
    const { courseID } = location.state

    const deleteCourse = () => {
        if(localStorage.getItem('token')) {
            axios.delete(process.env.REACT_APP_API_LINK+'course/'+courseID+'/', {
                headers: {
                Authorization: "Token "+localStorage.getItem("token")
                }
            }).then((response) => {
                navigate('/courses')
            }).catch((err) => {
                console.log(err)
                alert('Course could not be deleted!')
            })
        } else {
            navigate('/login')
            alert('Please sign in to create course!')
        }
    }

    return (
        <div className={'container'}>
            <h1 className={'display-2'} style={{marginBottom: "30px"}}>Delete Course</h1>
            <p>Are you Sure you want to Delete?</p>
            <Link to={'/courses'} className={'btn btn-success'}>No</Link>
            <button onClick={deleteCourse} className={'btn btn-danger'} type="submit">Yes</button>
        </div>
    );
}

export default DeleteCourse;