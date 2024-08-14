// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
	reducerPath: "api",
	baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5144"  }),
	tagTypes:[ 'user' , 'products', 'singleProduct' , 'wishlist' , 'cart' , 'orders' , 'flashSale' , 'coupon'],
	endpoints: (builder) => ({


		getusers: builder.query({
			query: () => "/users",
			providesTags : ['user']
		}),
		setUsers: builder.mutation({
			query: (data) => ({
				url: "users",
				method: "POST",
				body: data,
			}),
			invalidatesTags: ["user"]
		}),
		updateUser: builder.mutation({
			query: (data) => ({
				url: `/users/update`,
				method: "PUT",
				body: data,
			}),
			invalidatesTags : ["user"]
		}),
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
			providesTags : ['singleProduct']
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
			invalidatesTags : ["products" , "singleProduct"]
		}),
		setWishListProduct: builder.mutation({
			query: (data) => ({
				url: `/wishlist`,
				method: "POST",
				body: data,
			}),
			invalidatesTags : ['wishlist']
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
		deleteAllCartProduct: builder.mutation({
			query() {
				return {
					url: `allCartItem`,
					method: "DELETE",
				};
			},
			invalidatesTags : ["cart"]
		}),	
		setAllCartProduct: builder.mutation({
			query: (data) => ({
				url: `/moveToCart`,
				method: "POST",
				body: data,
			}),
			invalidatesTags : ["cart" , "wishlist"]
		}),
		setOrders: builder.mutation({
			query: (data) => ({
				url: `/orders`,
				method: "POST",
				body: data,
			}),
			invalidatesTags : ['order']
		}),
		getOrders: builder.query({
			query: (email) => `/orders?email=${email}`,
			providesTags : ['order']

		}),
		getAllOrders: builder.query({
			query: () => '/allOrders',
			providesTags : ['order']

		}),
		getSingleOrders : builder.query({
			query: (id) => `/singleOrders/${id}`,

		}),
		
		getCancelledOrders: builder.query({
			query: (email) => `/cancelledOrder?email=${email}`,
			providesTags : ['order']

		}),
		updateOrderStatus: builder.mutation({
			query: ({ id, ...data }) => ({
				url: `/order/update/${id}`,
				method: "PUT",
				body: data,
			}),
			invalidatesTags : ["order"]
		}),
		completeOrderStatus: builder.mutation({
			query: ({ id, ...data }) => ({
				url: `/completeOrder/update/${id}`,
				method: "PUT",
				body: data,
			}),
			invalidatesTags : ["order"]
		}),
		setFlashSale: builder.mutation({
			query: (data) => ({
				url: `/flashSale`,
				method: "POST",
				body: data,
			}),
			invalidatesTags : ['flashSale']
		}),
		getFlashSale: builder.query({
			query: () => `/flashSale`,
		}),
		setCoupon: builder.mutation({
			query: (data) => ({
				url: `/coupon`,
				method: "POST",
				body: data,
			}),
			invalidatesTags : ['coupon']
		}),
		getCoupons: builder.query({
			query: () => `/coupon`,
			providesTags : ['coupon']
		}),
		deleteCoupons: builder.mutation({
			query(id) {
				return {
					url: `coupon/${id}`,
					method: "DELETE",
				};
			},
			invalidatesTags : ["coupon"]
		}),
		setSingleCoupon: builder.mutation({
			query: (data) => ({
				url: `/singleCoupon`,
				method: "POST",
				body: data,
			}),
		}),
	}),
});

export const {
	useGetusersQuery,
	useSetUsersMutation,
	useUpdateUserMutation,
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
	useDeleteCartProductMutation,
	useDeleteAllCartProductMutation,
	useSetAllCartProductMutation,
	useSetOrdersMutation,
	useGetOrdersQuery,
	useGetCancelledOrdersQuery,
	useUpdateOrderStatusMutation,
	useCompleteOrderStatusMutation,
	useSetFlashSaleMutation,
	useGetFlashSaleQuery,
	useSetCouponMutation,
	useGetCouponsQuery,
	useDeleteCouponsMutation,
	useSetSingleCouponMutation,
	useGetAllOrdersQuery,
	useGetSingleOrdersQuery
	
	
	


	
} = baseApi;
