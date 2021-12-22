import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";

//Smoke test
it("renders without crashing", function() {
  render(<Carousel />);
});

//snapshot test
it("matches the snapshot", function () {
  const { asFragment } = render(<Carousel />);
  expect(asFragment()).toMatchSnapshot();
});

//Bug! Left arrow
it("works when you click the left arrow", function() {
  const { queryByTestId, queryByAltText} = render(<Carousel />);
  const leftArrow = queryByTestId("left-arrow");
  const rightArrow = queryByTestId("right-arrow");

  //move right then left
  fireEvent.click(rightArrow);
  fireEvent.click(leftArrow);

  //Should show first image
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();
});

it("works when you click on the right arrow", function() {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

  // expect the first image to show, but not the second
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).not.toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).toBeInTheDocument();
});

it("hides incorrect pagination arrows", function () {
  const { getByTestId  } = render(<Carousel />);
  const leftArrow = queryByTestId("left-arrow");
  const rightArrow = queryByTestId("right-arrow");

  //first should have left arrow hidden and right arrow showing
  expect(leftarrow).toHaveClass("hidden");
  expect(rightArrow).not.toHaveClass("hidden");

  //move to middle slide, both arrows should be showing
  fireEvent.click(getByTestId("right-arrow"));
  expect(leftarrow).not.toHaveClass("hidden");
  expect(rightArrow).not.toHaveClass("hidden");

  //move to last slide and check if right arrow is hidden and left is showing
  fireEvent(rightArrow);
  expect(leftarrow).not.toHaveClass("hidden");
  expect(rightArrow).toHaveClass("hidden");
});