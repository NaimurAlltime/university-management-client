import AdminDashboard from "../pages/admin/AdminDashboard";
import CreateCategory from "../pages/admin/CategoryManagement/CreateCategory";
import GetAllCategory from "../pages/admin/CategoryManagement/GetAllCategory";
import CreateCourse from "../pages/admin/CourseManagement/CreateCourse";
import GetAllCourse from "../pages/admin/CourseManagement/GetAllCourse";
import UpdateCourse from "../pages/admin/CourseManagement/UpdateCourse";
import CreateAdmin from "../pages/admin/CreateAdmin";
import CreateFaculty from "../pages/admin/CreateFaculty";
import CreateStudent from "../pages/admin/CreateStudent";

export const adminPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <AdminDashboard />,
  },
  {
    name: "User Management",
    children: [
      {
        name: "Create Admin",
        path: "create-admin",
        element: <CreateAdmin />,
      },
      {
        name: "Create Faculty",
        path: "create-faculty",
        element: <CreateFaculty />,
      },
      {
        name: "Create Student",
        path: "create-student",
        element: <CreateStudent />,
      },
    ],
  },
  {
    name: "Category Management",
    children: [
      {
        name: "Create Category",
        path: "create-category",
        element: <CreateCategory />,
      },
      {
        name: "Get All Category",
        path: "get-all-category",
        element: <GetAllCategory />,
      },
    ],
  },
  {
    name: "Course Management",
    children: [
      {
        name: "Create Course",
        path: "create-course",
        element: <CreateCourse />,
      },
      {
        name: "Get All Course",
        path: "get-all-course",
        element: <GetAllCourse />,
      },
      {
        name: "Update Course",
        path: "update-course",
        element: <UpdateCourse />,
      },
    ],
  },
];
