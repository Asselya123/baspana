import { Carousel } from "antd";
import React from "react";
import Preview from "@/assets/preview.webp";

export interface ApartmentCarouselProps {
  images: string[];
}

export const ApartmentCarousel: React.FC<ApartmentCarouselProps> = ({
  images,
}) => {
  return (
    <Carousel className="max-w-[800px] bg-gray-500" autoplay draggable>
      {[...images, Preview].map((image, index) => (
        <div key={`${image}-${index}`}>
          <img
            src={image}
            alt=""
            className="h-full w-full object-contain object-center"
          />
        </div>
      ))}
    </Carousel>
  );
};
