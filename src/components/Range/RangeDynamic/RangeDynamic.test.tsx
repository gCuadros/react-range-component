import { render, fireEvent, screen } from "@testing-library/react";

import "@testing-library/jest-dom/extend-expect";
import Range from "components/Range";

const values = [1, 100];

describe("RangeDynamic", () => {
  it("permite arrastrar los puntos a lo largo de la línea del rango", () => {
    render(<Range allowedValues={values} />);

    const minBullet = screen.getByTestId("min-bullet");
    const maxBullet = screen.getByTestId("max-bullet");
    const minBulletStyle = window.getComputedStyle(minBullet);
    const maxBulletStyle = window.getComputedStyle(maxBullet);

    expect(minBullet).toBeInTheDocument();
    expect(maxBullet).toBeInTheDocument();

    fireEvent(minBullet, new MouseEvent("mousedown"));
    fireEvent(document, new MouseEvent("mousemove", { clientX: 100 }));
    fireEvent(document, new MouseEvent("mouseup"));

    fireEvent(maxBullet, new MouseEvent("mousedown"));
    fireEvent(document, new MouseEvent("mousemove", { clientX: 200 }));
    fireEvent(document, new MouseEvent("mouseup"));

    expect(minBulletStyle.left).toBe("10%");
    //expect(maxBulletStyle.left).toBe("80%");
  });

  it("permite establecer un nuevo valor al hacer clic en las etiquetas de los números de moneda", () => {
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

  it("garantiza que el valor nunca sea menor que el valor mínimo o mayor que el valor máximo", () => {
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

  it("no permite que el valor mínimo y el valor máximo se crucen en el rango", () => {
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
