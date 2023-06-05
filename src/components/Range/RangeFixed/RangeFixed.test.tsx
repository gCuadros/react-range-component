import { render, fireEvent } from "@testing-library/react";
import React from "react";

import RangeFixed from "components/Range/RangeFixed";

describe("RangeFixed", () => {
  const values = [1, 100];
  const minValue = 10;
  const setMinValue = jest.fn();
  const maxValue = 90;
  const setMaxValue = jest.fn();
  const dragging = "min";
  const rangeWidthRef = { current: 100 };
  const rangeLeftRef = { current: 0 };
  const handleBulletMouseDown = jest.fn();
  const handleBulletDragEnd = jest.fn();

  it("should call handleBulletMouseDown on min bullet mousedown event", () => {
    const { getByTestId } = render(
      <RangeFixed
        values={values}
        minValue={minValue}
        setMinValue={setMinValue}
        maxValue={maxValue}
        setMaxValue={setMaxValue}
        dragging={dragging}
        rangeWidthRef={rangeWidthRef}
        rangeLeftRef={rangeLeftRef}
        handleBulletMouseDown={handleBulletMouseDown}
        handleBulletDragEnd={handleBulletDragEnd}
      />
    );

    const minBullet = getByTestId("min-bullet");
    fireEvent.mouseDown(minBullet);
    expect(handleBulletMouseDown).toHaveBeenCalledWith(
      expect.any(Object),
      "min"
    );
  });

  it("should call handleBulletMouseDown on max bullet mousedown event", () => {
    const { getByTestId } = render(
      <RangeFixed
        values={values}
        minValue={minValue}
        setMinValue={setMinValue}
        maxValue={maxValue}
        setMaxValue={setMaxValue}
        dragging={dragging}
        rangeWidthRef={rangeWidthRef}
        rangeLeftRef={rangeLeftRef}
        handleBulletMouseDown={handleBulletMouseDown}
        handleBulletDragEnd={handleBulletDragEnd}
      />
    );

    const maxBullet = getByTestId("max-bullet");
    fireEvent.mouseDown(maxBullet);
    expect(handleBulletMouseDown).toHaveBeenCalledWith(
      expect.any(Object),
      "max"
    );
  });
});
