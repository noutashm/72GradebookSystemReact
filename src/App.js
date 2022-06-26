import logo from './logo.svg';
import './App.css';
import {Routes, Route, Link, NavLink} from "react-router-dom";
import Home from "./components/home";
import ListSemesters from "./components/semester/list_semesters";
import CreateSemester from "./components/semester/create_semester";
import UpdateSemester from "./components/semester/update_semester";
import DeleteSemester from "./components/semester/delete_semester";
import Login from "./components/login";

function App() {
  return (
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className={'container-fluid'}>
          <NavLink to={"/"} className={'navbar-brand'}>Home</NavLink>
          <button className={'navbar-toggler'} type="button" data-bs-toggle="collapse"
                  data-bs-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className={'navbar-toggler-icon'}></span>
          </button>
          <div className={'collapse navbar-collapse'} id="navbarSupportedContent">
            <ul className={'navbar-nav me-auto mb-2 mb-lg-0'}>
              <li className={'nav-item'}>
                <a className={'nav-link'} aria-current="page" href="#">GradeBook</a>
              </li>
              <li className={'nav-item'}>
                <NavLink to={'semesters'} className={'nav-link'} aria-current={'page'}>Semesters</NavLink>
                {/*<a className={'nav-link'} aria-current="page" href="#">Semesters</a>*/}
              </li>
              <li className={'nav-item'}>
                <a className={'nav-link'} aria-current="page" href="#">Courses</a>
              </li>
              <li className={'nav-item'}>
                <a className={'nav-link'} aria-current="page" href="#">Lecturers</a>
              </li>
              <li className={'nav-item'}>
                <a className={'nav-link'} aria-current="page" href="#">Students</a>
              </li>
              <li className={'nav-item'}>
                <a className={'nav-link'} aria-current="page" href="#">Classes</a>
              </li>
            </ul>
            <ul className={'navbar-nav ml-auto'}>
              <li className={'nav-item'}>
                <div className={'nav-link'}>username</div>
              </li>
              <li className={'nav-item'}>
                <a className={'nav-link btn btn-danger'} style={{color: "white"}} aria-current="page"
                   href="#">Logout</a>
              </li>
              <ul className={'navbar-nav me-auto mb-2 mb-lg-0'}>
              </ul>
              <li className={'nav-item'}>
                <NavLink to={'login'} className={'nav-link btn btn-success'} style={{color: "white"}} aria-current={'page'}>Login</NavLink>
                {/*<a className={'nav-link btn btn-success'} style={{color: "white"}} aria-current="page" href="#">Login</a>*/}
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Routes>
        <Route path={'/'} element={<Home />}></Route>
        <Route path={'login'} element={<Login />}></Route>

        <Route path={'semesters'} element={<ListSemesters />}></Route>
        <Route path={'semesters/create'} element={<CreateSemester />}></Route>
        <Route path={'semesters/update'} element={<UpdateSemester />}></Route>
        <Route path={'semesters/delete'} element={<DeleteSemester />}></Route>

        <Route path={'courses'} element={<Home />}></Route>
        <Route path={'courses/create'} element={<Home />}></Route>
        <Route path={'courses/update'} element={<Home />}></Route>
        <Route path={'courses/delete'} element={<Home />}></Route>

        <Route path={'lecturers'} element={<Home />}></Route>
        <Route path={'lecturers/create'} element={<Home />}></Route>
        <Route path={'lecturers/update'} element={<Home />}></Route>
        <Route path={'lecturers/delete'} element={<Home />}></Route>

        <Route path={'students'} element={<Home />}></Route>
        <Route path={'students/create'} element={<Home />}></Route>
        <Route path={'students/update'} element={<Home />}></Route>
        <Route path={'students/delete'} element={<Home />}></Route>
        <Route path={'students/upload'} element={<Home />}></Route>
        <Route path={'students/enrolments'} element={<Home />}></Route>
        <Route path={'students/enrolments/enrol'} element={<Home />}></Route>
        <Route path={'students/enrolments/remove'} element={<Home />}></Route>

        <Route path={'classes'} element={<Home />}></Route>
        <Route path={'classes/create'} element={<Home />}></Route>
        <Route path={'classes/update'} element={<Home />}></Route>
        <Route path={'classes/delete'} element={<Home />}></Route>
        <Route path={'classes/assign_lecturer'} element={<Home />}></Route>

        <Route path={'gradebook'} element={<Home />}></Route>
        <Route path={'gradebook/classes'} element={<Home />}></Route>
        <Route path={'gradebook/students'} element={<Home />}></Route>
        <Route path={'gradebook/grade_student'} element={<Home />}></Route>
      </Routes>
    </div>
  );
}

export default App;
