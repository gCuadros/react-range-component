import { render, screen } from "@testing-library/react";

import Range from ".";

describe("Range", () => {
  it("should render RangeDynamic when only 2 values are provided", () => {
    const values = [1, 2];
    render(<Range values={values} />);
    const rangeDynamicElement = screen.getByTestId("range-dynamic");
    expect(rangeDynamicElement).toBeInTheDocument();
  });

  it("should render RangeFixed when more than 2 values are provided", () => {
    const values = [1, 2, 3];
    render(<Range values={values} />);
    const rangeFixedElement = screen.getByTestId("range-fixed");
    expect(rangeFixedElement).toBeInTheDocument();
  });

  it("should not render anything when no values are provided", () => {
    render(<Range />);
    const rangeDynamicElement = screen.queryByTestId("range-dynamic");
    const rangeFixedElement = screen.queryByTestId("range-fixed");
    expect(rangeDynamicElement).not.toBeInTheDocument();
    expect(rangeFixedElement).not.toBeInTheDocument();
  });
});
