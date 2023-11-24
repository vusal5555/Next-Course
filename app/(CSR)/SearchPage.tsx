"use client";

import React, { FormEvent } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import { useState } from "react";
import { UnsplashImage } from "@/models/unsplash.image";
import Image from "next/image";

const SearchPage = () => {
  const [searchResults, setSerachResults] = useState<UnsplashImage[] | null>(
    null
  );
  const [searchResultsLoading, setSerachResultsLoading] = useState(false);
  const [searchResultsLoadingIsError, setSerachResultsLoadingIsError] =
    useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formdata = new FormData(e.target as HTMLFormElement);
    const query = formdata.get("query")?.toString().trim();

    if (query) {
      try {
        setSerachResults(null);
        setSerachResultsLoadingIsError(false);
        setSerachResultsLoading(true);

        const response = await fetch("/api/search?query=" + query);

        const images: UnsplashImage[] = await response.json();
        setSerachResults(images);
      } catch (error) {
        console.error(error);
        setSerachResultsLoadingIsError(true);
      } finally {
        setSerachResultsLoading(false);
      }
    } else {
      setSerachResults(null);
    }
  }

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="search-input">
          <Form.Label>Search</Form.Label>
          <Form.Control
            name="query"
            placeholder="e.g cats, hotdogs, ..."
          ></Form.Control>
        </Form.Group>
        <Button type="submit" className="mb-3">
          Search
        </Button>
      </Form>

      <div className="d-flex flex-column align-items-center">
        {searchResultsLoading && <Spinner animation="border"></Spinner>}
        {searchResultsLoadingIsError && <p>Something went wrong</p>}

        {searchResults?.length === 0 && (
          <p>Nothing found. Try a different query</p>
        )}
      </div>

      {searchResults && (
        <>
          {searchResults.map((result) => {
            return (
              <Image
                src={result?.urls.raw}
                width={250}
                height={250}
                alt={result.description}
                className="object-fit-cover m-2 rounded"
              ></Image>
            );
          })}
        </>
      )}
    </div>
  );
};

export default SearchPage;
