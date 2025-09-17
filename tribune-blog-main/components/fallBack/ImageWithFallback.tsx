import { useState } from "react";
import Image from "next/image";


const ImageWithFallback: React.FC<{
  src?: string;  
  alt: string;
  width: number;
  height: number;
  className?: string;
}> = ({ src, alt, width, height, className }) => {
  const [imgSrc, setImgSrc] = useState(src || "/placeholder-image/0.jpg");

  return (
    <Image
      className={className}
      src={imgSrc}
      width={width}
      height={height}
      alt={alt}
      onError={() => setImgSrc("/placeholder-image/0.jpg")}
    />
  );
};


export default ImageWithFallback;