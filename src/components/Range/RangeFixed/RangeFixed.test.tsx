import { render } from "@testing-library/react";

import RangeFixed from ".";

describe("RangeFixed", () => {
  it("debería renderizar correctamente el rango fijo", () => {
    const { getByTestId } = render(
      <RangeFixed
        values={[0, 50, 100]}
        dragging={null}
        setDragging={jest.fn()}
        rangeWidthRef={{ current: 1000 }}
        rangeLeftRef={{ current: 0 }}
      />
    );

    const rangeFixed = getByTestId("range-fixed");
    const minBullet = getByTestId("min-bullet");
    const maxBullet = getByTestId("max-bullet");

    expect(rangeFixed).toBeInTheDocument();
    expect(minBullet).toBeInTheDocument();
    expect(maxBullet).toBeInTheDocument();
  });
});
