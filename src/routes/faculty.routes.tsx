import FacultyDashboard from "../pages/faculty/FacultyDashboard"
import MyCourses from "../pages/faculty/MyCourses"
import MyStudents from "../pages/faculty/MyStudents"
import FacultyProfile from "../pages/faculty/FacultyProfile"
import EditFacultyProfile from "../pages/faculty/EditFacultyProfile"
import ChangePassword from "../pages/faculty/ChangePassword"

export const facultyPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <FacultyDashboard />,
  },
  {
    name: "My Courses",
    path: "courses",
    element: <MyCourses />,
  },
  {
    path: "courses/:registerSemesterId/:courseId",
    element: <MyStudents />,
  },
  // {
  //   name: "Grade Students",
  //   path: "grading",
  //   element: <MyStudents />,
  // },
  {
    name: "Profile",
    path: "profile",
    element: <FacultyProfile />,
  },
  {
    path: "profile/edit",
    element: <EditFacultyProfile />,
  },
  {
    name: "Change Password",
    path: "change-password",
    element: <ChangePassword />,
  },
]
