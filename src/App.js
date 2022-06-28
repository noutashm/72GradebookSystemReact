import './App.css';
import {Routes, Route, useNavigate, NavLink} from "react-router-dom";
import {useState} from "react";
import Home from "./components/home";
import ListSemesters from "./components/semester/list_semesters";
import CreateSemester from "./components/semester/create_semester";
import UpdateSemester from "./components/semester/update_semester";
import DeleteSemester from "./components/semester/delete_semester";
import Login from "./components/login";
import ListClasses from "./components/class/list_classes";
import CreateClass from "./components/class/create_class";
import UpdateClass from "./components/class/update_class";
import DeleteClass from "./components/class/delete_class";
import AssignLecturer from "./components/class/assign_lecturer";
import ListCourses from "./components/course/list_courses";
import CreateCourse from "./components/course/create_course";
import UpdateCourse from "./components/course/update_course";
import DeleteCourse from "./components/course/delete_course";
import ListLecturers from "./components/lecturer/list_lecturers";
import CreateLecturer from "./components/lecturer/create_lecturer";
import UpdateLecturer from "./components/lecturer/update_lecturer";
import DeleteLecturer from "./components/lecturer/delete_lecturer";
import ListStudents from "./components/student/list_students";
import CreateStudent from "./components/student/create_student";
import UpdateStudent from "./components/student/update_student";
import DeleteStudent from "./components/student/delete_student";
import UploadStudent from "./components/student/upload_student";
import SemestersGradebook from "./components/gradebook/semesters_gradebook";
import ClassesGradebook from "./components/gradebook/classes_gradebook";
import StudentListGradebook from "./components/gradebook/student_list_gradebook";
import GradeStudent from "./components/gradebook/grade_student";
import ListStudentEnrolment from "./components/student/enrolment/list_student_enrolment";
import EnrolStudent from "./components/student/enrolment/enrol_student";
import RemoveStudentEnrolment from "./components/student/enrolment/remove_student_enrolment";

function App() {
  const username = localStorage.getItem("username")
  const navigate = useNavigate()
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("username")
    localStorage.removeItem("userGroup")
    setIsLoggedIn(false)
    navigate('/')
  }

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
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {
              (() => {
                if(localStorage.getItem("token") && username === 'admin') {
                  return(<div style={{display: "flex"}}>
                      <li className={'nav-item'}>
                        <NavLink to={'gradebook'} className={'nav-link'} aria-current={'page'}>GradeBook</NavLink>
                      </li>
                      <li className={'nav-item'}>
                        <NavLink to={'semesters'} className={'nav-link'} aria-current={'page'}>Semesters</NavLink>
                      </li>
                      <li className={'nav-item'}>
                        <NavLink to={'courses'} className={'nav-link'} aria-current={'page'}>Courses</NavLink>
                      </li>
                      <li className={'nav-item'}>
                        <NavLink to={'lecturers'} className={'nav-link'} aria-current={'page'}>Lecturers</NavLink>
                      </li>
                      <li className={'nav-item'}>
                        <NavLink to={'students'} className={'nav-link'} aria-current={'page'}>Students</NavLink>
                      </li>
                      <li className={'nav-item'}>
                        <NavLink to={'classes'} className={'nav-link'} aria-current={'page'}>Classes</NavLink>
                      </li></div>
                  )
                } else if (localStorage.getItem("token") && username !== 'admin') {
                  return (
                      <li className={'nav-item'}>
                        <NavLink to={'gradebook'} className={'nav-link'} aria-current={'page'}>GradeBook</NavLink>
                      </li>
                  )
                } else if (!localStorage.getItem("token")) {

                }
              })()
            }
            </ul>
            <ul className={'navbar-nav ml-auto'}>
              {
                localStorage.getItem("token") ? <div style={{display: "flex"}}><li className="nav-item">
                      <div className={'nav-link'}>{username} -</div>
                    </li>
                    <li className={'nav-item'}>
                      <button className={'nav-link btn btn-danger'} style={{color: "white"}} aria-current={"page"} onClick={logout}>Logout</button>
                    </li></div> : <li className={'nav-item'}>
                <NavLink to={'login'} className={'nav-link btn btn-success'} style={{color: "white"}} aria-current={'page'}>Login</NavLink>
              </li>
              }
            </ul>
          </div>
        </div>
      </nav>
      <Routes>
        <Route path={'/'} element={<Home />}></Route>
        <Route path={'login'} element={<Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />}></Route>

        <Route path={'semesters'} element={<ListSemesters />}></Route>
        <Route path={'semesters/create'} element={<CreateSemester />}></Route>
        <Route path={'semesters/update'} element={<UpdateSemester />}></Route>
        <Route path={'semesters/delete'} element={<DeleteSemester />}></Route>

        <Route path={'courses'} element={<ListCourses />}></Route>
        <Route path={'courses/create'} element={<CreateCourse />}></Route>
        <Route path={'courses/update'} element={<UpdateCourse />}></Route>
        <Route path={'courses/delete'} element={<DeleteCourse />}></Route>

        <Route path={'lecturers'} element={<ListLecturers />}></Route>
        <Route path={'lecturers/create'} element={<CreateLecturer />}></Route>
        <Route path={'lecturers/update'} element={<UpdateLecturer />}></Route>
        <Route path={'lecturers/delete'} element={<DeleteLecturer />}></Route>

        <Route path={'students'} element={<ListStudents />}></Route>
        <Route path={'students/create'} element={<CreateStudent />}></Route>
        <Route path={'students/update'} element={<UpdateStudent />}></Route>
        <Route path={'students/delete'} element={<DeleteStudent />}></Route>
        <Route path={'students/upload'} element={<UploadStudent />}></Route>
        <Route path={'students/enrolments'} element={<ListStudentEnrolment />}></Route>
        <Route path={'students/enrolments/enrol'} element={<EnrolStudent />}></Route>
        <Route path={'students/enrolments/remove'} element={<RemoveStudentEnrolment />}></Route>

        <Route path={'classes'} element={<ListClasses />}></Route>
        <Route path={'classes/create'} element={<CreateClass />}></Route>
        <Route path={'classes/update'} element={<UpdateClass />}></Route>
        <Route path={'classes/delete'} element={<DeleteClass />}></Route>
        <Route path={'classes/assign_lecturer'} element={<AssignLecturer />}></Route>

        <Route path={'gradebook'} element={<SemestersGradebook />}></Route>
        <Route path={'gradebook/classes'} element={<ClassesGradebook />}></Route>
        <Route path={'gradebook/students'} element={<StudentListGradebook />}></Route>
        <Route path={'gradebook/grade_student'} element={<GradeStudent />}></Route>
      </Routes>
    </div>
  );
}

export default App;
