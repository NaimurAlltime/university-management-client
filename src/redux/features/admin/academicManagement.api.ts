import type {
  TAcademicDepartment,
  TAcademicFaculty,
  TAcademicSemester,
  TQueryParam,
  TResponseRedux,
} from "../../../types"

import { baseApi } from "../../api/baseApi"

const academicManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllSemesters: builder.query({
      query: (args) => {
        const params = new URLSearchParams()

        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string)
          })
        }

        return {
          url: "/academic-semesters",
          method: "GET",
          params: params,
        }
      },
      transformResponse: (response: TResponseRedux<TAcademicSemester[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        }
      },
      providesTags: (result: any) =>
        result
          ? [
              ...result.data.map(({ _id }: any) => ({ type: 'academic-semester' as const, id: _id })),
              { type: 'academic-semester', id: 'LIST' },
            ]
          : [{ type: 'academic-semester', id: 'LIST' }],
    }),
    addAcademicSemester: builder.mutation({
      query: (data) => ({
        url: "/academic-semesters/create-academic-semester",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: 'academic-semester', id: 'LIST' }],
    }),
    getAcademicFaculties: builder.query({
      query: () => {
        return { url: "/academic-faculties", method: "GET" }
      },
      transformResponse: (response: TResponseRedux<TAcademicFaculty[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        }
      },
      providesTags: (result: any) =>
        result
          ? [
              ...result.data.map(({ _id }: any) => ({ type: 'academic-faculty' as const, id: _id })),
              { type: 'academic-faculty', id: 'LIST' },
            ]
          : [{ type: 'academic-faculty', id: 'LIST' }],
    }),
    addAcademicFaculty: builder.mutation({
      query: (data) => ({
        url: "/academic-faculties/create-academic-faculty",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: 'academic-faculty', id: 'LIST' }],
    }),
    getAcademicDepartments: builder.query({
      query: () => {
        return { url: "/academic-departments", method: "GET" }
      },
      transformResponse: (response: TResponseRedux<TAcademicDepartment[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        }
      },
      providesTags: (result: any) =>
        result
          ? [
              ...result.data.map(({ _id }: any) => ({ type: 'academic-department' as const, id: _id })),
              { type: 'academic-department', id: 'LIST' },
            ]
          : [{ type: 'academic-department', id: 'LIST' }],
    }),
    addAcademicDepartment: builder.mutation({
      query: (data) => ({
        url: "/academic-departments/create-academic-department",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: 'academic-department', id: 'LIST' }],
    }),
  }),
})

export const {
  useGetAllSemestersQuery,
  useAddAcademicSemesterMutation,
  useGetAcademicDepartmentsQuery,
  useGetAcademicFacultiesQuery,
  useAddAcademicDepartmentMutation,
  useAddAcademicFacultyMutation,
} = academicManagementApi
