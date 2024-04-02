'use client';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode, Navigation, Pagination, Thumbs } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

import './slideshow.css';

interface Props {
    images: string[];
    title: string;
    className?: string;
}

export function ProductMobileSlideshow({ images, title, className }: Props) {

    return (
        <div className={className}>
            <Swiper
                style={{
                    widht: '100vw',
                    height: '500px'
                }}
                pagination={true}
                autoplay={{
                    delay: 2500
                }}
                modules={[FreeMode, Autoplay, Pagination]}
                className='mySwiper2'
            >
                {
                    images.map(img => (
                        <SwiperSlide key={img}>
                            <Image
                                width={600}
                                height={500}
                                src={`/products/${img}`}
                                alt={title}
                                className=''
                            />
                        </SwiperSlide>
                    ))
                }
            </Swiper>

        </div>

    )
}
