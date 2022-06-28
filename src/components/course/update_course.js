import {Link, useLocation, useNavigate} from "react-router-dom";
import {useState} from "react";
import axios from "axios";
import React from "react";

function UpdateCourse(props) {
    const location = useLocation()
    const { courseID, courseName, courseCode } = location.state

    const navigate = useNavigate()
    const [name, setName] = useState(courseName.toString());
    const [code, setCode] = useState(courseCode.toString());

    const nameHandler = e => {
        setName(e.target.value)
    }
    const codeHandler = e => {
        setCode(e.target.value)
    }

    const updateCourse = () => {
        if(localStorage.getItem('token')) {
            const data = {
                'name': name,
                'code': code,
            }
            axios.put(process.env.REACT_APP_API_LINK+'course/'+courseID+'/', data, {
                headers: {
                    Authorization: "Token "+localStorage.getItem("token")
                }
            }).then((response) => {
                navigate('/courses')
            }).catch((err) => {
                console.log(err)
                alert('Course could not be updated!')
            })
        } else {
            navigate('/login')
            alert('Please sign in to create course!')
        }
    }

    return (
        <div className={'container'}>
            <h1 className={'display-2'} style={{marginBottom: "30px"}}>Update Course</h1>
            <div className="mb-3">
                <label htmlFor="code" className="form-label">Code</label>
                <input id={'code'} onChange={codeHandler} type={'text'} className={'form-control'} defaultValue={courseCode}/>
            </div>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input id={'name'} onChange={nameHandler} type={'text'} className={'form-control'} defaultValue={courseName} />
            </div>
            <button onClick={updateCourse} className={'btn btn-primary'} type={'submit'}>Update</button>
            <Link to={'/courses'} className={'btn btn-danger'}>Back</Link>
        </div>
    );
}

export default UpdateCourse;