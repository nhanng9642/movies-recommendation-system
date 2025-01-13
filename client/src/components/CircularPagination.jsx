import { Button,IconButton } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

// eslint-disable-next-line react/prop-types
export const CircularPagination = ({currentPage, totalPage, setCurrentPage}) => {
		const getItemProps = (index) =>
	({
		variant: currentPage === index ? "filled" : "text",
		color: "gray",
		onClick: () => setCurrentPage(index),
		className: "rounded-full",
	});
  
	const next = () => {
		if (currentPage === totalPage) return;
		setCurrentPage(currentPage + 1);
	};
	
	const prev = () => {
		if (currentPage === 1) return;
		setCurrentPage(currentPage - 1);
	};
	
	const showPageBtn = () => {
		let lside = false;
		let rside = false;
		return Array.from({ length: totalPage }, (_, index) => {
			let page = index + 1; 
			if(page === 1 || page === totalPage || Math.abs(currentPage - page) <= 2){
				return (
					<IconButton key={page} {...getItemProps(page)}>
						{page}
					</IconButton>
				)
			}
			else {
				if(currentPage > page && !lside){
					lside = true;
					return (
						<IconButton key={-100} disabled={true} {...getItemProps(page)}>
							...
						</IconButton>
					)
				}
				else if(currentPage < page && !rside){
					rside = true;
					return (
						<IconButton key={-11} disabled={true} {...getItemProps(page)}>
							...
						</IconButton>
					)
				}
			}
		})
	}
	
	return (
		totalPage > 1 && <div className="flex items-center gap-4 my-4 mx-auto mb-6">
			<Button
				variant="text"
				className="flex items-center gap-2 rounded-full"
				onClick={prev}
				disabled={currentPage === 1}
			>
				<ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Previous
			</Button>
			<div className="flex items-center gap-2">
				{showPageBtn()}
			</div>
			<Button
				variant="text"
				className="flex items-center gap-2 rounded-full"
				onClick={next}
				disabled={currentPage === totalPage}
			>
				Next
				<ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
			</Button>
		</div>
	);
}