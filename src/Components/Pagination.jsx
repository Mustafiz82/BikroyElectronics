import { useMemo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPage } from "../redux/features/filter/filterSlice";
import { useGetProductsCountQuery } from "../redux/api/baseApi";

export default function Pagination({ filter }) {
	const [pageNumber, setPageNumber] = useState(0);

	const { data: productCount } = useGetProductsCountQuery(filter, {
		refetchOnMountOrArgChange: true,
	});

	const { limit } = useSelector((state) => state.filterSearch);
	const dispatch = useDispatch();

	const totalPages = Math.ceil(productCount?.count / limit) || 0;

	// send page to redux
	useEffect(() => {
		dispatch(setPage({ page: pageNumber }));
	}, [pageNumber, dispatch]);

	// smart pagination window
	const paginationRange = useMemo(() => {
		const delta = 2; // how many pages around current page

		const range = [];
		const left = Math.max(0, pageNumber - delta);
		const right = Math.min(totalPages - 1, pageNumber + delta);

		for (let i = left; i <= right; i++) {
			range.push(i);
		}

		// add first + last + ellipsis logic
		const finalRange = [];

		if (left > 0) {
			finalRange.push(0);
			if (left > 1) finalRange.push("...");
		}

		finalRange.push(...range);

		if (right < totalPages - 1) {
			if (right < totalPages - 2) finalRange.push("...");
			finalRange.push(totalPages - 1);
		}

		return finalRange;
	}, [pageNumber, totalPages]);

	const goToPage = (page) => {
		if (page < 0 || page >= totalPages) return;
		setPageNumber(page);
	};

	return (
		<div className="flex flex-wrap items-center justify-center gap-1 rounded-md border border-primary bg-white p-2">
			{/* Prev */}
			<button
				onClick={() => goToPage(pageNumber - 1)}
				disabled={pageNumber === 0}
				className="px-3 py-1 text-sm disabled:opacity-50"
			>
				Prev
			</button>

			{/* Pages */}
			{paginationRange.map((item, idx) =>
				item === "..." ? (
					<span key={idx} className="px-2 text-gray-500">
						...
					</span>
				) : (
					<button
						key={idx}
						onClick={() => goToPage(item)}
						className={`px-3 py-1 text-sm rounded ${
							pageNumber === item
								? "bg-primary text-white"
								: "hover:bg-gray-200"
						}`}
					>
						{item + 1}
					</button>
				)
			)}

			{/* Next */}
			<button
				onClick={() => goToPage(pageNumber + 1)}
				disabled={pageNumber === totalPages - 1}
				className="px-3 py-1 text-sm disabled:opacity-50"
			>
				Next
			</button>
		</div>
	);
}