// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
	reducerPath: "api",
	baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5144"  }),
	tagTypes:[ 'user' , 'products' , 'wishlist' , 'cart'],
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
			query: ({
				limit,page, sortBy, sortOrder, category, minPrice, maxPrice, searchText
			  } = {}) => {  // Provide a default empty object here
				const params = new URLSearchParams();
		
			  if (limit) params.append('limit', limit);
			  if (page) params.append('page', page);
			  if (sortBy) params.append('sortBy', sortBy);
			  if (sortOrder) params.append('sortOrder', sortOrder);
			  if (category) params.append('categories', category);
			  if (minPrice) params.append('minPrice', minPrice);
			  if (maxPrice) params.append('maxPrice', maxPrice);
			  if (searchText) params.append('searchText', searchText);
	  
			  return `/products?${params.toString()}`;
			},
			providesTags : ['products']
		  }),
		setProducts: builder.mutation({
			query: (data) => ({
				url: "/products",
				method: "POST",
				body: data,
			}),
			invalidatesTags : ["products"]
		}),
		getSingleProducts: builder.query({
			query: (id) => `/products/${id}`,
		}),
		getProductsCount: builder.query({
			query: () => `/productCount`,
		}),
		updateSingleProduct: builder.mutation({
			query: ({ id, ...data }) => ({
				url: `/products/update/${id}`,
				method: "PUT",
				body: data,
			}),
			invalidatesTags : ["products"]
		}),
		setWishListProduct: builder.mutation({
			query: (data) => ({
				url: `/wishlist`,
				method: "POST",
				body: data,
			}),
		}),
		getWishlistProduct: builder.query({
			query: (email) => `/wishlist?email=${email}`,
			providesTags : ['wishlist']

		}),
		getWishlistedStutus: builder.query({
			query: (email , id) => `/wishlistStatus?email=${email}&id=${id}`,
		}),
		deleteWishlistProduct: builder.mutation({
			query(id) {
				return {
					url: `wishlist/${id}`,
					method: "DELETE",
				};
			},
			invalidatesTags : ["wishlist"]
		}),	
		setCartProduct: builder.mutation({
			query: (data) => ({
				url: `/cart`,
				method: "POST",
				body: data,
			}),
			invalidatesTags : ["cart"]
		}),
		getCartProduct: builder.query({
			query: (email) => `/cart?email=${email}`,
			providesTags : ['cart']

		}),
		updateCart: builder.mutation({
			query: ({ id, data }) => ({
				url: `/cart/${id}`,
				method: "PUT",
				body: data,
			}),
			invalidatesTags : ["cart"]
		}),
		deleteCartProduct: builder.mutation({
			query(id) {
				return {
					url: `cart/${id}`,
					method: "DELETE",
				};
			},
			invalidatesTags : ["cart"]
		}),	
	}),
});

export const {
	useGetCategoryListQuery,
	useSetCategoryListMutation,
	useSetProductsMutation,
	useGetProductsQuery,
	useGetSingleProductsQuery,
	useUpdateSingleProductMutation,
	useSetWishListProductMutation,
	useGetWishlistProductQuery,
	useDeleteWishlistProductMutation,
	useGetProductsCountQuery,
	useGetWishlistedStutusQuery,
	useSetCartProductMutation,
	useGetCartProductQuery,
	useUpdateCartMutation,

	
} = baseApi;
