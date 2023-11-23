"use client";
import React from "react";
import { Button } from "react-bootstrap";

interface ErrorProps {
  error: Error;
  reset: () => void;
}

const Error = ({ error, reset }: ErrorProps) => {
  return (
    <div>
      Error
      <Button onClick={reset}>Save</Button>
    </div>
  );
};

export default Error;
