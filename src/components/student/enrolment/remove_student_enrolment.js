import React from 'react';
import {Link, useLocation, useNavigate} from "react-router-dom";
import axios from "axios";

function RemoveStudentEnrolment(props) {
    const location = useLocation()
    const navigate = useNavigate()
    const { enrolmentID } = location.state

    const deleteCourse = () => {
        if(localStorage.getItem('token')) {
            axios.delete(process.env.REACT_APP_API_LINK+'student_enrolment/'+enrolmentID+'/', {
                headers: {
                    Authorization: "Token "+localStorage.getItem("token")
                }
            }).then((response) => {
                navigate('/students/enrolments')
            }).catch((err) => {
                console.log(err)
                alert('Enrolment could not be removed!')
            })
        } else {
            navigate('/login')
            alert('Please sign in to remove enrolment!')
        }
    }

    return (
        <div className={'container'}>
            <h1 className={'display-2'} style={{marginBottom: "30px"}}>Remove Enrolment</h1>
            <p>Are you Sure you want to Delete?</p>
            <Link to={'/students/enrolments'} className={'btn btn-success'}>No</Link>
            <button onClick={deleteCourse} className={'btn btn-danger'} type="submit">Yes</button>
        </div>
    );
}

export default RemoveStudentEnrolment;