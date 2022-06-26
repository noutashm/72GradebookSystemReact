import React from 'react';
import {Link} from "react-router-dom";

function UpdateSemester(props) {
    return (
        <div className={'container'}>
            <h1 className={'display-2'} style={{marginBottom: "30px"}}>Update Semester</h1>
            <form method="post">
                <div className={'mb-3'}>
                    <label htmlFor="year" className={'form-label'}>Year</label>
                    {/*{{form.year}}*/}
                </div>
                <div className={'mb-3'}>
                    <label htmlFor="semester" className={'form-label'}>Semester</label>
                    {/*{{form.semester}}*/}
                </div>
                <div className={'mb-3'}>
                    <label htmlFor="courses" className={'form-label'}>Courses</label>
                    {/*{{form.courses}}*/}
                </div>
                <button className={'btn btn-success'} type="submit">Update</button>
                <Link to={'/semesters'} className={'btn btn-danger'}>Back</Link>
            </form>
        </div>
    );
}

export default UpdateSemester;