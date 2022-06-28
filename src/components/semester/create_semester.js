import React, {useState} from 'react';
import {Link, useLocation, useNavigate} from "react-router-dom";
import axios from "axios";

function CreateSemester(props) {
    const navigate = useNavigate()
    const [year, setYear] = useState('');
    const [semester, setSemester] = useState('S1');
    const [courses, setCourses] = useState('');

    const location = useLocation()
    const { coursesList } = location.state

    const yearHandler = e => {
        setYear(e.target.value)
    }
    const semesterHandler = e => {
        setSemester(e.target.value)
    }
    const coursesHandler = e => {
        let values = Array.from(e.target.selectedOptions, option => option.value)
        setCourses(values)
    }

    const createSemester = () => {
        if(localStorage.getItem('token')) {
            const data = {
                'year': year,
                'semester': semester,
                'courses': courses
            }
            axios.post(process.env.REACT_APP_API_LINK+'semester/', data, {
                headers: {
                    Authorization: "Token "+localStorage.getItem("token")
                }
            }).then((response) => {
                navigate('/semesters')
            }).catch((err) => {
                console.log(err)
                alert('Semester could not be created!')
            })
        } else {
            navigate('/login')
            alert('Please sign in to create semester!')
        }
    }

    return (
        <div className={'container'}>
            <h1 className={'display-2'} style={{marginBottom: "30px"}}>Create Semester</h1>
            <div className={'mb-3'}>
                <label htmlFor="year" className={'form-label'}>Year</label>
                <input id={'year'} onChange={yearHandler} type={'number'} className={'form-control'} min={2020} max={2200}/>
            </div>
            <div className="mb-3">
                <label htmlFor="semester" className={'form-label'}>Semester</label>
                <select className={'form-select'} name={'semester'} onChange={semesterHandler}>
                    <option value={'S1'} selected>S1</option>
                    <option value={'S2'}>S2</option>
                    <option value={'S3'}>S3</option>
                    <option value={'S4'}>S4</option>
                </select>
            </div>
            <div className="mb-3">
                <label htmlFor="courses" className={'form-label'}>Courses</label>
                <select className={'form-select'} name={'courses'} multiple onChange={coursesHandler}>
                    {
                        coursesList.map(course => {
                            return(<option value={course.id}>{course.name}</option>)
                        })
                    }
                </select>
            </div>
            <button onClick={createSemester} className={'btn btn-primary'} type={'submit'}>Create</button>
            <Link to={'/semesters'} className={'btn btn-danger'}>Back</Link>
        </div>
    );
}

export default CreateSemester;