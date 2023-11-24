import React from "react";
import { UnsplashImage } from "@/models/unsplash.image";
import Image from "next/image";
import Link from "next/link";
import { Alert } from "react-bootstrap";

export const metadata = {
  title: "Incremental Static Regeneration - NextJS 14 Image Gallery",
};

export const revalidate = 15;

const Isr = async () => {
  const res = await fetch(
    "https://api.unsplash.com/photos/random?client_id=" +
      process.env.UNSPLASH_KEY,
    {
      // next: { revalidate: 15 },
    }
  );

  const image: UnsplashImage = await res.json();

  const width = Math.min(500, image.width);
  const height = (width / image.width) * image.height;

  return (
    <div className="d-flex flex-column align-items-center">
      <Alert></Alert>
      <Image
        src={image.urls.raw}
        width={width}
        height={height}
        alt={image.description}
      ></Image>
      by{" "}
      <Link href={"/users/" + image.user.username}>{image.user.username}</Link>
    </div>
  );
};

export default Isr;
