import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "@/app/page";

describe("Home Page", () => {
  it("should render the home page content", () => {
    render(<Home />);

    // Check that the main container is rendered
    const mainContainer = screen.getByTestId("home-container");
    expect(mainContainer).toBeInTheDocument();

    // Check that the main heading container is rendered
    const mainHeading = screen.getByTestId("main-heading");
    expect(mainHeading).toBeInTheDocument();

    // Check that HeroSection is rendered correctly
    const heroSection = screen.getByTestId("hero-section");
    expect(heroSection).toBeInTheDocument();

    // Check that PhotoCardsWineTasting is rendered correctly
    const photoCards = screen.getByTestId("photo-cards-wine-tasting");
    expect(photoCards).toBeInTheDocument();

    // Check that Subscribe section is rendered correctly
    const subscribeSection = screen.getByTestId("subscribe-section");
    expect(subscribeSection).toBeInTheDocument();
  });
});
