import React from 'react';
import {Link} from "react-router-dom";

function DeleteSemester(props) {
    return (
        <div className={'container'}>
            <h1 className={'display-2'} style={{marginBottom: "30px"}}>Delete Semester</h1>
            <form method="post">
                {/*{{form.as_p}}*/}
                <p>Are you Sure you want to Delete?</p>
                <Link to={'/semesters'} className={'btn btn-success'}>No</Link>
                <button className={'btn btn-danger'} type="submit">Yes</button>
            </form>
        </div>
    );
}

export default DeleteSemester;