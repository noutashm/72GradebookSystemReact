import React from 'react';
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import {useState} from "react";

function CreateCourse(props) {
    const navigate = useNavigate()
    const [name, setName] = useState('');
    const [code, setCode] = useState('');

    const nameHandler = e => {
        setName(e.target.value)
    }
    const codeHandler = e => {
        setCode(e.target.value)
    }

    const createCourse = () => {
        if(localStorage.getItem('token')) {
            const data = {
                'name': name,
                'code': code,
            }
            axios.post(process.env.REACT_APP_API_LINK+'course/', data, {
                headers: {
                    Authorization: "Token "+localStorage.getItem("token")
                }
            }).then((response) => {
                navigate('/courses')
            }).catch((err) => {
                console.log(err)
                alert('Course could not be created!')
            })
        } else {
            alert('Please sign in to create course!')
            navigate('/login')
        }
    }

    return (
        <div className={'container'}>
            <h1 className={'display-2'} style={{marginBottom: "30px"}}>Create Course</h1>
            <div className="mb-3">
                <label htmlFor="code" className="form-label">Code</label>
                <input id={'code'} onChange={codeHandler} type={'text'} className={'form-control'} />
            </div>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input id={'name'} onChange={nameHandler} type={'text'} className={'form-control'} />
            </div>
            <button onClick={createCourse} className={'btn btn-primary'} type={'submit'}>Create</button>
            <Link to={'/courses'} className={'btn btn-danger'}>Back</Link>
        </div>
    );
}

export default CreateCourse;