import { fireEvent, render } from "@testing-library/react";

import { RANGE_ACTION_TYPE } from "..";

import RangeFixed from ".";

describe("RangeFixed", () => {
  it("Should it render the fixed range correctly", () => {
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

  it("Should move the bullet with the minimun value when dragging it", () => {
    const { getByTestId } = render(
      <RangeFixed
        values={[0, 50, 100]}
        dragging={RANGE_ACTION_TYPE.MIN}
        setDragging={jest.fn()}
        rangeWidthRef={{ current: 1000 }}
        rangeLeftRef={{ current: 0 }}
      />
    );

    fireEvent.mouseDown(getByTestId("min-bullet"));
    fireEvent.mouseMove(getByTestId("min-bullet"), { clientX: 3000 });

    expect(getByTestId("min-bullet")).toHaveClass("dragging");
  });

  it("Should move the bullet with the maximum value when dragging it", () => {
    const { getByTestId } = render(
      <RangeFixed
        values={[0, 50, 100]}
        dragging={RANGE_ACTION_TYPE.MAX}
        setDragging={jest.fn()}
        rangeWidthRef={{ current: 1000 }}
        rangeLeftRef={{ current: 0 }}
      />
    );

    fireEvent.mouseDown(getByTestId("max-bullet"));
    fireEvent.mouseMove(getByTestId("max-bullet"), { clientX: 3000 });

    expect(getByTestId("max-bullet")).toHaveClass("dragging");
  });
});
