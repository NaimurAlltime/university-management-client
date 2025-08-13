import AdminDashboard from "../pages/admin/AdminDashboard"
import CreateAdmin from "../pages/admin/userManagement/CreateAdmin"
import CreateFaculty from "../pages/admin/userManagement/CreateFaculty"
import CreateStudent from "../pages/admin/userManagement/CreateStudent"
import AcademicDepartment from "../pages/admin/academicManagement/AcademicDepartment"
import AcademicSemester from "../pages/admin/academicManagement/AcademicSemester"
import CreateAcademicDepartment from "../pages/admin/academicManagement/CreateAcademicDepartment"
import CreateAcademicSemester from "../pages/admin/academicManagement/CreateAcademicSemester"
import AcademicFaculty from "../pages/admin/academicManagement/AcademicFaculty"
import CreateAcademicFaculty from "../pages/admin/academicManagement/CreateAcademicFaculty"
import StudentData from "../pages/admin/userManagement/StudentData"
import StudentDetails from "../pages/admin/userManagement/StudentDetails"
import SemesterRegistration from "../pages/admin/courseManagement/SemesterRegistration"
import RegisteredSemesters from "../pages/admin/courseManagement/RegisteredSemesters"
import CreateCourse from "../pages/admin/courseManagement/CreateCourse"
import OfferCourse from "../pages/admin/courseManagement/OfferCourse"
import OfferedCourses from "../pages/admin/courseManagement/OfferedCourses"
import AdminList from "../pages/admin/userManagement/AdminData"
import FacultyData from "../pages/admin/userManagement/FacultyData"
import AssignFaculties from "../pages/admin/courseManagement/AssignFaculties"
import CourseFaculties from "../pages/admin/courseManagement/CourseFaculties"

export const adminPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <AdminDashboard />,
  },
  {
    name: "Academic Management",
    children: [
      {
        name: "Create A. Semester",
        path: "create-academic-semester",
        element: <CreateAcademicSemester />,
      },
      {
        name: "All Academic Semester",
        path: "academic-semester",
        element: <AcademicSemester />,
      },
      {
        name: "Create A. Faculty",
        path: "create-academic-faculty",
        element: <CreateAcademicFaculty />,
      },
      {
        name: "Academic Faculty",
        path: "academic-faculty",
        element: <AcademicFaculty />,
      },
      {
        name: "Create A. Department",
        path: "create-academic-department",
        element: <CreateAcademicDepartment />,
      },
      {
        name: "All A. Department",
        path: "academic-department",
        element: <AcademicDepartment />,
      },
    ],
  },
  {
    name: "User Management",
    children: [
      {
        name: "Create Student",
        path: "create-student",
        element: <CreateStudent />,
      },
      {
        name: "All Students",
        path: "students-data",
        element: <StudentData />,
      },
      {
        path: "student-data/:studentId",
        element: <StudentDetails />,
      },
      {
        name: "Create Admin",
        path: "create-admin",
        element: <CreateAdmin />,
      },
      {
        name: "All Admins",
        path: "admins-data",
        element: <AdminList />,
      },
      {
        name: "Create Faculty",
        path: "create-faculty",
        element: <CreateFaculty />,
      },
      {
        name: "All Faculties",
        path: "faculties-data",
        element: <FacultyData />,
      },
    ],
  },
  {
    name: "Course Management",
    children: [
      {
        name: "Semester Registration",
        path: "semester-registration",
        element: <SemesterRegistration />,
      },
      {
        name: "Registered Semesters",
        path: "registered-semesters",
        element: <RegisteredSemesters />,
      },
      {
        name: "Create Course",
        path: "create-course",
        element: <CreateCourse />,
      },
      {
        name: "Assign Faculties",
        path: "assign-faculties",
        element: <AssignFaculties />,
      },
      {
        name: "Course Faculties",
        path: "course-faculties",
        element: <CourseFaculties />,
      },
      {
        name: "Offer Course",
        path: "offer-course",
        element: <OfferCourse />,
      },
      {
        name: "Offered Courses",
        path: "offered-courses",
        element: <OfferedCourses />,
      },
    ],
  },
]
