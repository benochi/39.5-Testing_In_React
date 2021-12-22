import React from "react";
import { render } from "@testing-library/react";
import Card from "./Card";

//Smoke test. 
it("renders without crashing", function() {
  render(<Card />);
});

//snapshot test
it("matches the snapshot", function () {
  const { asFragment } = render(<Card />);
  expect(asFragment()).toMatchSnapshot();
});