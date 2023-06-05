import { render, fireEvent, screen } from "@testing-library/react";

import "@testing-library/jest-dom/extend-expect";
import Range from "components/Range";

import RangeDynamic from ".";

const values = [1, 100];

describe("RangeDynamic", () => {
  it("allows dragging the bullet", () => {
    const setMinValue = jest.fn();
    const setMaxValue = jest.fn();

    render(
      <RangeDynamic
        minValue={1}
        setMinValue={setMinValue}
        maxValue={100}
        setMaxValue={setMaxValue}
        dragging={"min"}
        rangeWidthRef={{ current: 100 }}
        rangeLeftRef={{ current: 0 }}
        handleBulletMouseDown={jest.fn()}
        handleBulletDragEnd={jest.fn()}
      />
    );

    const minBullet = screen.getByTestId("min-bullet");

    fireEvent.mouseDown(minBullet);
    fireEvent.mouseMove(document, { clientX: 50 });
    fireEvent.mouseUp(document);

    expect(setMinValue).toHaveBeenCalledWith(50);
  });

  it("allows dragging the points along the range line and changing the value of the inputs", async () => {
    render(<Range allowedValues={values} />);

    const minBullet = screen.getByTestId("min-bullet");
    const maxBullet = screen.getByTestId("max-bullet");

    expect(minBullet).toBeInTheDocument();
    expect(maxBullet).toBeInTheDocument();

    const minValueInput: HTMLInputElement = screen.getByTestId("min-value");
    const maxValueInput: HTMLInputElement = screen.getByTestId("max-value");

    fireEvent.change(minValueInput, { target: { value: "50" } });
    fireEvent.blur(minValueInput);

    fireEvent.change(maxValueInput, { target: { value: "200" } });
    fireEvent.blur(maxValueInput);

    const minBulletStyle = window.getComputedStyle(minBullet);
    const maxBulletStyle = window.getComputedStyle(maxBullet);

    expect(minBulletStyle.left).toBe("50%");
    expect(maxBulletStyle.left).toBe("100%");
  });

  it("allows setting a new value by clicking on the currency number labels", () => {
    render(<Range allowedValues={values} />);
    const minValueInput: HTMLInputElement = screen.getByTestId("min-value");
    const maxValueInput: HTMLInputElement = screen.getByTestId("max-value");

    fireEvent.change(minValueInput, { target: { value: "50" } });
    fireEvent.blur(minValueInput);

    fireEvent.change(maxValueInput, { target: { value: "200" } });
    fireEvent.blur(maxValueInput);

    expect(minValueInput.value).toBe("50");
    expect(maxValueInput.value).toBe("100");
  });

  it("ensures that the value is never less than the minimum value or greater than the maximum value", () => {
    render(<Range allowedValues={values} />);
    const minValueInput: HTMLInputElement = screen.getByTestId("min-value");
    const maxValueInput: HTMLInputElement = screen.getByTestId("max-value");

    fireEvent.change(minValueInput, { target: { value: "0" } });
    fireEvent.blur(minValueInput);

    fireEvent.change(maxValueInput, { target: { value: "250" } });
    fireEvent.blur(maxValueInput);

    expect(minValueInput.value).toBe("1");
    expect(maxValueInput.value).toBe("100");
  });

  it("does not allow the minimum value and the maximum value to cross over in the range.", () => {
    render(<Range allowedValues={values} />);
    const minValueInput: HTMLInputElement = screen.getByTestId("min-value");
    const maxValueInput: HTMLInputElement = screen.getByTestId("max-value");

    fireEvent.change(minValueInput, { target: { value: "90" } });
    fireEvent.blur(minValueInput);

    fireEvent.change(maxValueInput, { target: { value: "10" } });
    fireEvent.blur(maxValueInput);

    expect(minValueInput.value).toBe("90");
    expect(maxValueInput.value).toBe("90");
  });
});
