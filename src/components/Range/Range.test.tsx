import { render, screen } from "@testing-library/react";

import Range from "components/Range";

describe("Range", () => {
  test("Debería mostrar el componente SkeletonLine cuando isLoading es verdadero", () => {
    const { container } = render(<Range isLoading={true} />);
    expect(container.querySelector(".skeleton-line")).toBeInTheDocument();
  });

  test("Debería mostrar el componente RangeDynamic cuando hay 2 valores permitidos", () => {
    const values = [1, 100];
    render(<Range allowedValues={values} />);

    const RangeDynamic = screen.getByTestId("range-dynamic");
    expect(RangeDynamic).toBeInTheDocument();
  });

  test("Debería mostrar el componente RangeFixed cuando hay más de 2 valores permitidos", () => {
    const values = [1, 10, 20, 30];
    render(<Range allowedValues={values} />);

    const RangeFixed = screen.getByTestId("range-fixed");
    expect(RangeFixed).toBeInTheDocument();
  });
});
