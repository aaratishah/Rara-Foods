import { useRef, useState } from "react";
import ProductImage from "image/demo/p-001.jpg";
import "./category.css";
import Carousel from "react-elastic-carousel";
import Container from "app/web/components/Container";
import useBreakpoint from "services/Breakpoint";
import clsx from "clsx";
const breakPoints = [
	{ width: 1, itemsToShow: 1, itemsToScroll: 1 }, //
	{ width: 600, itemsToShow: 2, itemsToScroll: 1 }, //md
	{ width: 800, itemsToShow: 2, itemsToScroll: 2 }, //md
	{ width: 1024, itemsToShow: 3, itemsToScroll: 2 }, //lg
];
export default function Category({ title, items, children }) {
	const point = useBreakpoint();
	const incrementFactor = () =>
		point === "md" || point === "sm"
			? breakPoints[1]
			: point === "xl" || point === "lg"
			? breakPoints[2]
			: breakPoints[0];
	const caraouselRef = useRef(null);
	const [currentItem, setCurrentItem] = useState(0);
	const onNext = () => {
		// currentItem < items.length - 1
		if (currentItem < items.length - incrementFactor().itemsToShow) {
			let currentTemp = currentItem;
			setCurrentItem(currentTemp + incrementFactor().itemsToScroll);
			caraouselRef.current.goTo(currentTemp + incrementFactor().itemsToScroll);
		}
	};
	const onPrev = () => {
		if (currentItem > 0) {
			let currentTemp = currentItem;
			setCurrentItem(currentTemp - incrementFactor().itemsToScroll);
			caraouselRef.current.goTo(currentTemp - incrementFactor().itemsToScroll);
		}
	};
	return (
		<section className="product-slide section">
			<div className="container-fluid">
				<div className="">
					<header className="section-header">
						<h2 className="section-title">{title}</h2>
						<div className="swiper-arrows">
							<div
								className={clsx(
									"swiper-button-prev",
									currentItem <= 0 && "swiper-button-disabled"
								)}
								onClick={onPrev}
							/>
							<div
								className={clsx(
									"swiper-button-next",
									currentItem >= items.length - incrementFactor().itemsToShow &&
										"swiper-button-disabled"
								)}
								onClick={onNext}
							/>
						</div>
					</header>
					<Carousel
						ref={caraouselRef}
						itemPadding={[10, 50]}
						// itemsToScroll={2}
						// itemsToShow={2}
						breakPoints={breakPoints}
						renderPagination={() => <></>}
						renderArrow={() => <></>}
					>
						{items.map((each, key) => children(each, key))}
					</Carousel>
				</div>
			</div>
		</section>
	);
}
