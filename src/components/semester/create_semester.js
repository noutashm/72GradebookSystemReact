import React from 'react';
import {Link} from "react-router-dom";

function CreateSemester(props) {
    return (
        <div className={'container'}>
            <h1 className={'display-2'} style={{marginBottom: "30px"}}>Create Semester</h1>
            <form method="post">
                <div className={'mb-3'}>
                    <label htmlFor="year" className={'form-label'}>Year</label>
                    {/*input for year*/}
                </div>
                <div className="mb-3">
                    <label htmlFor="semester" className={'form-label'}>Semester</label>
                    {/*input for semester*/}
                </div>
                <div className="mb-3">
                    <label htmlFor="courses" className={'form-label'}>Courses</label>
                    {/*input for courses*/}
                </div>
                <button className={'btn btn-primary'} type="submit">Create</button>
                <Link to={'/semesters'} className={'btn btn-danger'}>Back</Link>
            </form>
        </div>
    );
}

export default CreateSemester;