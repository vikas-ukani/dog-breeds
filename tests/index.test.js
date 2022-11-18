import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import HomePage from "Components/Pages/HomePage";


describe("Home Page", () => {
  it("renders a home page", () => {
    render(<HomePage />);
    // check if all components are rendered
    expect(screen.getByTestId("home")).toBeInTheDocument();
    expect(screen.getByTestId("breed")).toBeInTheDocument();
    expect(screen.getByTestId("numberOfImages")).toBeInTheDocument();
    expect(screen.getByTestId("view-images")).toBeInTheDocument();
  });
});

describe("Home Page Error", () => {
  it("renders a error for home page", () => {
    render(<HomePage />);
    const viewImagesButton = screen.getByTestId("view-images");
    viewImagesButton.click();
    expect(screen.getByTestId("error")).toBeInTheDocument();
  });
});