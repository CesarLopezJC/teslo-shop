'use client';

import Image from "next/image"
import { useState } from "react";

interface Props {
    src?: string;
    alt: string;
    className: React.StyleHTMLAttributes<HTMLImageElement>['className'];
    width: number;
    height: number;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
    style?: React.StyleHTMLAttributes<HTMLImageElement>['style'];
    heightSkeleton: number;
}

export const ProductImageSkeleton = ({ src,
    alt,
    className,
    width,
    height,
    onMouseEnter,
    onMouseLeave,
    style,
    heightSkeleton }: Props) => {

    const [loaded, setloaded] = useState(false);


    const localSrc = (src)
        ? src.startsWith('http') //https://completeUrl
            ? src
            : `/products/${src}`
        : '/imgs/placeholder.jpg';


    return (
        <>
            {
                !loaded &&

                <h1 className={`antialiased font-bold text-lg bg-gray-300 animate-pulse ${className}`}
                    style={{
                        height: `${heightSkeleton}px`,
                    }}
                >
                    &nbsp;
                </h1>
            }

            <Image
                src={localSrc}
                width={loaded ? width : 0}
                height={loaded ? height : 0}
                alt={alt}
                className={loaded ? className : 'd-none'}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                style={style}
                onLoad={() => setloaded(true)}
                loading='lazy'
            />

        </>
    )
}
