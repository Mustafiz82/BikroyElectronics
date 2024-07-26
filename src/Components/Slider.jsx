import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Autoplay, Pagination, Navigation } from "swiper/modules";

import Banner2 from "../assets/banner/banner1.png";
import Banner3 from "../assets/banner/banner2-Photoroom.png";
import Banner1 from "../assets/banner/banner3.jpg";
import Banner4 from "../assets/banner/banner4.jpg";
import Banner5 from "../assets/banner/banner5.jpg";

export default function Slider() {
	return (
		<>
			<Swiper
				spaceBetween={30}
				centeredSlides={true}
				autoplay={{
					delay: 2500,
					disableOnInteraction: false,
				}}
				pagination={{
					clickable: true,
				}}
				// navigation={true}
				modules={[Autoplay, Pagination, Navigation]}
				className="mySwiper"
			>
				<SwiperSlide>
					<img
						src={Banner3}
						className="w-full h-[220px] lg:h-[450px]"
						alt=""
						srcset=""
					/>
				</SwiperSlide>
				<SwiperSlide>
					<img
						src={Banner4}
						className="w-full h-[220px] lg:h-[450px]"
						alt=""
						srcset=""
					/>
				</SwiperSlide>
				<SwiperSlide>
					<img
						src={Banner1}
						className="w-full h-[220px] lg:h-[450px]"
						alt=""
						srcset=""
					/>
				</SwiperSlide>
				<SwiperSlide>
					<img
						src={Banner2}
						className="w-full h-[220px] lg:h-[450px]"
						alt=""
						srcset=""
					/>
				</SwiperSlide>
				<SwiperSlide>
					<img
						src={Banner5}
						className="w-full h-[220px] lg:h-[450px]"
						alt=""
						srcset=""
					/>
				</SwiperSlide>
			</Swiper>
		</>
	);
}
