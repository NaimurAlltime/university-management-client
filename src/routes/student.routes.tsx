import ChangePassword from "../pages/ChangePassword"
import MySchedule from "../pages/student/MySchedule"
import StudentDashboard from "../pages/student/StudentDashboard"
import StudentProfile from "../pages/student/StudentProfile"

export const studentPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <StudentDashboard />,
  },
  // {
  //   name: "Offered Course",
  //   path: "offered-course",
  //   element: <OfferedCourse />,
  // },
  {
    name: "My Schedule",
    path: "schedule",
    element: <MySchedule />,
  },
  {
    name: "Profile",
    path: "profile",
    element: <StudentProfile />,
  },
  {
    name: "Change Password",
    path: "change-password",
    element: <ChangePassword />,
  },
]
