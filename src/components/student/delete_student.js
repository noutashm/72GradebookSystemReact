import React from 'react';
import {Link, useLocation, useNavigate} from "react-router-dom";
import axios from "axios";

function DeleteStudent(props) {
    const location = useLocation()
    const navigate = useNavigate()
    const { studentID } = location.state

    const deleteStudent = () => {
        if(localStorage.getItem('token')) {
            axios.delete(process.env.REACT_APP_API_LINK+'student/'+studentID+'/', {
                headers: {
                Authorization: "Token "+localStorage.getItem("token")
                }
            }).then((response) => {
                navigate('/students')
            }).catch((err) => {
                console.log(err)
                alert('Student could not be deleted!')
            })
        } else {
            navigate('/login')
            alert('Please sign in to create student!')
        }
    }

    return (
        <div className={'container'}>
            <h1 className={'display-2'} style={{marginBottom: "30px"}}>Delete Student</h1>
            <p>Are you Sure you want to Delete?</p>
            <Link to={'/students'} className={'btn btn-success'}>No</Link>
            <button onClick={deleteStudent} className={'btn btn-danger'} type="submit">Yes</button>
        </div>
    );
}

export default DeleteStudent;