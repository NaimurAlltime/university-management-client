import { baseApi } from "../../api/baseApi";

const categoyManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCategoy: builder.query({
      query: () => ({
        url: "/categories",
        method: "GET",
      }),
    }),
    addCategoy: builder.mutation({
      query: (data) => ({
        url: "/categories",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useGetAllCategoyQuery, useAddCategoyMutation } =
  categoyManagementApi;
