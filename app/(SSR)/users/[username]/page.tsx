import { UnsplashUser } from "@/models/unsplash-user";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import React from "react";

interface PageProps {
  params: {
    username: string;
  };
}

export async function getUser(username: string): Promise<UnsplashUser> {
  const res = await fetch(
    `https://api.unsplash.com/users/${username}?client_id=${process.env.UNSPLASH_KEY}`
  );

  if (res.status === 404) {
    notFound();
  }

  return await res.json();
}

export async function generateMetadata({
  params: { username },
}: PageProps): Promise<Metadata> {
  const user = await getUser(username);
  return {
    title: user.username,
  };
}

const User = async ({ params: { username } }: PageProps) => {
  const user = await getUser(username);

  return (
    <div>
      <h1>{user.username}</h1>
      <p>first name: {user.first_name}</p>
      <p>last name: {user.last_name}</p>

      <a href={"https://unsplash.com/" + user.username}>User Profile</a>
    </div>
  );
};

export default User;
