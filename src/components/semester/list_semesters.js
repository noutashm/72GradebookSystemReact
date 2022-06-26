import React, {useEffect, useReducer, useState} from 'react';
import {Link} from "react-router-dom";
import axios from "axios";

const initialState = {
    loading: false,
    semesters: {},
    error: ''
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'success':
            return {
                loading: true,
                semesters: action.payload,
                error: ''
            }
        case 'error':
            return {
                loading: true,
                semesters: [],
                error: "Error when fetch data"
            }
    }
}

function ListSemesters(props) {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        // https://iscg7420gradebookapi.herokuapp.com/semester
        axios.get('http://localhost:8000/semester/').then(response => {
            dispatch({type: 'success', payload: response.data});
            console.log(response);
        }).catch(error => {
            dispatch({type: 'error'});
            console.log(error);
        })
    }, []);

    return (
        <div className={'container'}>
            <h1 className={'display-1'} style={{marginBottom: "30px"}}>Semesters</h1>
            <table className={'table'}>
                <thead>
                <tr>
                    <th scope="col">Year</th>
                    <th scope="col">Semester</th>
                    <th scope="col">Courses</th>
                    <th><Link to={'create'} className={'btn btn-primary'} style={{float: "right", width: "168px"}}>Create</Link></th>
                </tr>
                </thead>
                <tbody>
                {
                    state.loading ? state.semesters.map(semester => {
                        return(
                            <tr>
                                <td key={semester.id}>{semester.year}</td>
                                <td>{semester.semester}</td>
                                <td>
                                    {/*{% for course in semester.courses.all %}*/}
                                    {/*    <a href="{% url "list_courses" %}">{{ course }}</a><br \>*/}
                                    {/*{% endfor %}*/}
                                    {/*{semester.courses.map(course => {*/}
                                    {/*    return(<Link to={'/courses'}>{course.name}</Link>)*/}
                                    {/*})}*/}
                                </td>
                                <td>
                                    <Link to={'delete'} className={'btn btn-danger'} style={{float: "right"}}>Delete</Link>
                                    <Link to={'update'} className={'btn btn-success'} style={{float: "right", marginRight: "20px"}}>Update</Link>
                                </td>
                            </tr>

                        )
                    }):"Loading"
                }
                {/*{% for semester in object_list %}*/}
                {/*    <tr>*/}
                {/*        <td>{{ semester.year }}</td>*/}
                {/*        <td>{{ semester.semester }}</td>*/}
                {/*        <td>*/}
                {/*            {% for course in semester.courses.all %}*/}
                {/*                <a href="{% url "list_courses" %}">{{ course }}</a><br \>*/}
                {/*            {% endfor %}*/}
                {/*        </td>*/}
                {/*        <td>*/}
                {/*            <a href="{% url "delete_semester" semester.id %}" class="btn btn-danger"*/}
                {/*               style="float: right">Delete</a>*/}
                {/*            <a href="{% url "update_semester" semester.id %}" class="btn btn-success"*/}
                {/*               style="float: right; margin-right: 20px">Update</a>*/}
                {/*        </td>*/}
                {/*    </tr>*/}
                {/*{% endfor %}*/}
                </tbody>
            </table>
        </div>
    );
}

export default ListSemesters;