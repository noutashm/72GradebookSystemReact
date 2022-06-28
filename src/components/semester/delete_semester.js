import React from 'react';
import {Link, useLocation, useNavigate} from "react-router-dom";
import axios from "axios";

function DeleteSemester(props) {
    const location = useLocation()
    const navigate = useNavigate()
    const { semesterID } = location.state

    const deleteSemester = () => {
        if(localStorage.getItem('token')) {
            axios.delete(process.env.REACT_APP_API_LINK+'semester/'+semesterID+'/', {
                headers: {
                Authorization: "Token "+localStorage.getItem("token")
                }
            }).then((response) => {
                console.log(response)
                navigate('/semesters')
            }).catch((err) => {
                console.log(err)
                alert('Semester could not be deleted!')
            })
        } else {
            navigate('/login')
            alert('Please sign in to create semester!')
        }
    }

    return (
        <div className={'container'}>
            <h1 className={'display-2'} style={{marginBottom: "30px"}}>Delete Semester</h1>
            <p>Are you Sure you want to Delete?</p>
            <Link to={'/semesters'} className={'btn btn-success'}>No</Link>
            <button onClick={deleteSemester} className={'btn btn-danger'} type="submit">Yes</button>
        </div>
    );
}

export default DeleteSemester;