import type { TQueryParam, TResponseRedux } from "../../../types"
import { baseApi } from "../../api/baseApi"

const enrollmentManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllEnrollments: builder.query({
      query: (args) => {
        const params = new URLSearchParams()
        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string)
          })
        }
        return {
          url: "/admins/enrollments",
          method: "GET",
          params: params,
        }
      },
      providesTags: ["enrollments"],
      transformResponse: (response: TResponseRedux<any>) => ({
        data: response.data,
        meta: response.meta,
      }),
    }),

    getEnrollmentStats: builder.query({
      query: () => ({
        url: "/admins/enrollment-stats",
        method: "GET",
      }),
      providesTags: ["enrollments"],
      transformResponse: (response: TResponseRedux<any>) => response.data,
    }),

    enrollStudent: builder.mutation({
      query: (data) => ({
        url: "/admins/enroll-student",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["enrollments"],
    }),

    unenrollStudent: builder.mutation({
      query: (enrollmentId) => ({
        url: `/admins/unenroll-student/${enrollmentId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["enrollments"],
    }),
  }),
})

export const {
  useGetAllEnrollmentsQuery,
  useGetEnrollmentStatsQuery,
  useEnrollStudentMutation,
  useUnenrollStudentMutation,
} = enrollmentManagementApi
