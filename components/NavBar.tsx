"use client";
import React from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavBar = () => {
  const pathName = usePathname();
  return (
    <Navbar
      bg="primary"
      variant="dark"
      sticky="top"
      expand="sm"
      collapseOnSelect
    >
      <Container>
        <Navbar.Brand as={Link} href="/">
          NextJs 14 Image Gallery
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="main-navbar"></Navbar.Toggle>
        <Navbar.Collapse id="main-navbar">
          <Nav className="ms-auto">
            <Nav.Link as={Link} href="/static" active={pathName === "/static"}>
              Static
            </Nav.Link>
            <Nav.Link
              as={Link}
              href="/dynamic"
              active={pathName === "/dynamic"}
            >
              Dynamic
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
