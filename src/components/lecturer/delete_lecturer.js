import React from 'react';
import {Link, useLocation, useNavigate} from "react-router-dom";
import axios from "axios";

function DeleteLecturer(props) {
    const location = useLocation()
    const navigate = useNavigate()
    const { ID } = location.state

    const deleteLecturer = () => {
        if(localStorage.getItem('token')) {
            axios.delete(process.env.REACT_APP_API_LINK+'lecturer/'+ID+'/', {
                headers: {
                Authorization: "Token "+localStorage.getItem("token")
                }
            }).then((response) => {
                navigate('/lecturers')
            }).catch((err) => {
                console.log(err)
                alert('Lecturer could not be deleted!')
            })
        } else {
            navigate('/login')
            alert('Please sign in to create lecturer!')
        }
    }

    return (
        <div className={'container'}>
            <h1 className={'display-2'} style={{marginBottom: "30px"}}>Delete Lecturer</h1>
            <p>Are you Sure you want to Delete?</p>
            <Link to={'/lecturers'} className={'btn btn-success'}>No</Link>
            <button onClick={deleteLecturer} className={'btn btn-danger'} type="submit">Yes</button>
        </div>
    );
}

export default DeleteLecturer;