import { baseApi } from "../../api/baseApi";

const courseApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCourse: builder.query({
      query: () => ({
        url: "/courses",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAllCourseQuery } = courseApi;
