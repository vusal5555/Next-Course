import React from "react";
import Image from "next/image";
import { UnsplashImage } from "@/models/unsplash.image";
import { Metadata } from "next";

interface PageProps {
  params: {
    topic: string;
  };
}

export function generateMetadata({ params: { topic } }: PageProps): Metadata {
  return {
    title: topic.toString(),
  };
}

export function getStaticParams() {
  return ["health", "fitness", "coding"].map((topic) => ({ topic }));
}

const Topic = async ({ params: { topic } }: PageProps) => {
  const res = await fetch(
    `https://api.unsplash.com/photos/random?query=${topic}&count=10&client_id=${process.env.UNSPLASH_KEY}`
  );

  const images: UnsplashImage[] = await res.json();

  return (
    <div>
      {images.map((image) => {
        return (
          <Image
            src={image.urls.raw}
            width={250}
            height={250}
            alt={image.description}
            key={image.urls.raw}
            className="object-fit-cover m-2 rounded"
          ></Image>
        );
      })}
    </div>
  );
};

export default Topic;
