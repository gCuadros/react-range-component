// import { render, fireEvent, screen } from "@testing-library/react";

// import Range from ".";

// describe("Range", () => {
//   it("allows dragging the min bullet", () => {
//     const values = [1, 100];
//     render(<Range allowedValues={values} />);
//     const minBullet = screen.getByTestId("min-bullet");

//     fireEvent.mouseDown(minBullet);
//     fireEvent.mouseMove(minBullet);
//     fireEvent.mouseUp(minBullet);
//   });

//   it("allows dragging the max bullet", () => {
//     const values = [1, 100];
//     const { getByTestId } = render(<Range allowedValues={values} />);
//     const maxBullet = getByTestId("max-bullet");

//     fireEvent.mouseDown(maxBullet);
//     fireEvent.mouseMove(maxBullet);
//     fireEvent.mouseUp(maxBullet);
//   });

//   it("updates min value when input changes", () => {
//     const values = [1, 100];
//     render(<Range allowedValues={values} />);
//     const minInput: HTMLInputElement = screen.getByTestId("minValue");

//     fireEvent.change(minInput, { target: { value: "10" } });

//     expect(minInput.value).toBe("10");
//   });

//   it("updates max value when input changes", () => {
//     const values = [1, 100];
//     render(<Range allowedValues={values} />);
//     const maxInput: HTMLInputElement = screen.getByTestId("maxValue");

//     fireEvent.change(maxInput, { target: { value: "50" } });

//     expect(maxInput.value).toBe("50");
//   });

//   it("prevents min value from being lower than the input min value", () => {
//     const values = [1, 100];
//     render(<Range allowedValues={values} />);
//     const minInput: HTMLInputElement = screen.getByTestId("minValue");

//     fireEvent.change(minInput, { target: { value: "1" } });

//     expect(minInput.value).toBe("1");
//   });

//   it("prevents max value from being higher than the input max value", () => {
//     const values = [1, 100];
//     render(<Range allowedValues={values} />);
//     const maxInput: HTMLInputElement = screen.getByTestId("maxValue");

//     fireEvent.change(maxInput, { target: { value: "300" } });

//     expect(maxInput.value).toBe("100");
//   });

//   it("displays range values correctly for dynamic range", () => {
//     const values = [1, 100];
//     render(<Range allowedValues={values} />);

//     const maxInput: HTMLInputElement = screen.getByTestId("maxValue");
//     const minInput: HTMLInputElement = screen.getByTestId("minValue");

//     expect(minInput.value).toBe("1");
//     expect(maxInput.value).toBe("100");

//     fireEvent.change(minInput, { target: { value: "50" } });
//     fireEvent.change(maxInput, { target: { value: "80" } });

//     expect(minInput.value).toBe("50");
//     expect(maxInput.value).toBe("80");

//     fireEvent.change(minInput, { target: { value: "120" } });

//     expect(minInput.value).toBe("80");
//   });

//   it("updates the range when dragging the min and max bullets", () => {
//     const values = [1, 100];
//     render(<Range allowedValues={values} />);
//     const minBullet = screen.getByTestId("min-bullet");
//     const maxBullet = screen.getByTestId("max-bullet");

//     fireEvent.mouseDown(minBullet);
//     fireEvent.mouseMove(minBullet);
//     fireEvent.mouseUp(minBullet);

//     fireEvent.mouseDown(maxBullet);
//     fireEvent.mouseMove(maxBullet);
//     fireEvent.mouseUp(maxBullet);
//   });

//   it("should update min and max values on bullet drag", () => {
//     const allowedValues = [1.99, 5.99, 10.99, 30.99, 50.99, 70.99];
//     render(<Range allowedValues={allowedValues} isLoading={false} />);

//     const minBullet = screen.getByTestId("min-bullet");
//     const maxBullet = screen.getByTestId("max-bullet");

//     fireEvent.mouseDown(minBullet, { clientX: 0 });
//     fireEvent.mouseMove(minBullet, { clientX: 10 });
//     fireEvent.mouseUp(minBullet);

//     fireEvent.mouseDown(maxBullet, { clientX: 20 });
//     fireEvent.mouseMove(maxBullet, { clientX: 10 });
//     fireEvent.mouseUp(maxBullet);
//   });
// });
