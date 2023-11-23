import { UnsplashImage } from "@/models/unsplash.image";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Alert } from "react-bootstrap";

export const metadata = {
  title: "Static Page - NextJS 14 Image Gallery",
};

const Static = async () => {
  const res = await fetch(
    "https://api.unsplash.com/photos/random?client_id=" +
      process.env.UNSPLASH_KEY
  );

  const image: UnsplashImage = await res.json();

  const width = Math.min(500, image.width);
  const height = (width / image.width) * image.height;

  return (
    <div className="d-flex flex-column align-items-center">
      <Alert>
        This page fetches and caches data at build time. Even through Unsplash
        api always returns a new image, we see the same image after refreshing
        the page until we compile the project again
      </Alert>
      <Image
        src={image.urls.raw}
        width={width}
        height={height}
        alt={image.description}
        className="rounded shadow mw-100 h-100"
      ></Image>
      by{" "}
      <Link href={"/users/" + image.user.username}>{image.user.username}</Link>
    </div>
  );
};

export default Static;
