import Image from "next/image"

interface Props {
    src?: string;
    alt: string;
    className: React.StyleHTMLAttributes<HTMLImageElement>['className'];
    width: number;
    height: number;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
    style?: React.StyleHTMLAttributes<HTMLImageElement>['style'];
}

export const ProductImage = ({ src,
    alt,
    className,
    width,
    height,
    onMouseEnter,
    onMouseLeave,
    style }: Props) => {


    const localSrc = (src)
        ? src.startsWith('http') //https://completeUrl
            ? src
            : `/products/${src}`
        : '/imgs/placeholder.jpg';


    return (
        <Image
            src={localSrc}
            width={width}
            height={height}
            alt={alt}
            className={className}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            style={style}
        />
    )
}
