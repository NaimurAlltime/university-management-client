import { baseApi } from "../../api/baseApi"

const facultyApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Faculty Dashboard
    getFacultyDashboard: builder.query({
      query: () => ({
        url: "/faculties/dashboard",
        method: "GET",
      }),
      providesTags: ["Faculty"],
    }),

    // My Courses
    getMyCourses: builder.query({
      query: (args) => ({
        url: "/faculties/my-courses",
        method: "GET",
        params: args,
      }),
      providesTags: ["Faculty", "Course"],
    }),

    // My Students
    getMyStudents: builder.query({
      query: ({ semesterRegistrationId, courseId, ...args }) => ({
        url: `/faculties/my-students/${semesterRegistrationId}/${courseId}`,
        method: "GET",
        params: args,
      }),
      providesTags: ["Faculty", "Student"],
    }),

    // Faculty Profile
    getFacultyProfile: builder.query({
      query: () => ({
        url: "/users/me",
        method: "GET",
      }),
      providesTags: ["Faculty"],
    }),

    // Update Faculty Profile
    updateFacultyProfile: builder.mutation({
      query: (data) => ({
        url: `/faculties/${data.id}`,
        method: "PATCH",
        body: data.data,
      }),
      invalidatesTags: ["Faculty"],
    }),

    // Update Student Marks
    updateEnrolledCourseMarks: builder.mutation({
      query: (data) => ({
        url: "/enrolled-courses/update-enrolled-course-marks",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Faculty", "Student", "EnrolledCourse"],
    }),
  }),
})

export const {
  useGetFacultyDashboardQuery,
  useGetMyCoursesQuery,
  useGetMyStudentsQuery,
  useGetFacultyProfileQuery,
  useUpdateFacultyProfileMutation,
  useUpdateEnrolledCourseMarksMutation,
} = facultyApi
