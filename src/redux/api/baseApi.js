// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
	reducerPath: "api",
	baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5144" }),
	endpoints: (builder) => ({
		getCategoryList: builder.query({
			query: () => "/categories",
		}),
		setCategoryList: builder.mutation({
			query: (data) => ({
				url: "categories",
				method: "POST",
				body: data,
			}),
		}),
		getProducts: builder.query({
			query: () => "/products",
		}),
		setProducts: builder.mutation({
			query: (data) => ({
				url: "/products",
				method: "POST",
				body: data,
			}),
		}),
        getSingleProducts: builder.query({
			query: (id) => `/products/${id}`,
		}),
        updateSingleProduct: builder.mutation({
			query: ({ id, ...data }) => ({
				url: `/products/update/${id}`,
				method: "PUT",
				body: data,
			}),
		}),
	}),
});

export const {
	useGetCategoryListQuery,
	useSetCategoryListMutation,
	useSetProductsMutation,
    useGetProductsQuery,
    useGetSingleProductsQuery,
    useUpdateSingleProductMutation
} = baseApi;
