import { render, fireEvent, screen } from "@testing-library/react";

import Range from "components/Range";

describe("RangeFixed", () => {
  const values = [1.99, 5.99, 10.99, 30.99, 50.99, 70.99];

  test("El usuario puede arrastrar dos puntos a lo largo de la línea del rango", () => {
    render(<Range allowedValues={values} />);

    const minBullet = screen.getByTestId("min-bullet");
    const maxBullet = screen.getByTestId("max-bullet");
    const minBulletStyle = window.getComputedStyle(minBullet);
    const maxBulletStyle = window.getComputedStyle(maxBullet);

    expect(minBullet).toBeInTheDocument();
    expect(maxBullet).toBeInTheDocument();

    fireEvent(minBullet, new MouseEvent("mousedown"));
    fireEvent(document, new MouseEvent("mousemove", { clientX: -500 }));
    fireEvent(document, new MouseEvent("mouseup"));

    fireEvent(maxBullet, new MouseEvent("mousedown"));
    fireEvent(document, new MouseEvent("mousemove", { clientX: 200 }));
    fireEvent(document, new MouseEvent("mouseup"));

    // Verificar que los estilos se hayan actualizado correctamente
    expect(minBullet.style.left).toBe("10%");
    expect(maxBullet.style.left).toBe("20%");
  });

  test("El valor mínimo y el valor máximo no pueden cruzarse en el rango", () => {
    const { getByTestId } = render(<Range allowedValues={values} />);
    const minBullet = getByTestId("min-bullet");
    const maxBullet = getByTestId("max-bullet");

    // Simular el arrastre del punto mínimo hacia el máximo
    fireEvent.mouseDown(minBullet);
    fireEvent.mouseMove(document.body, { clientX: 200 });
    fireEvent.mouseUp(minBullet);

    // Verificar que el valor mínimo no haya cruzado el valor máximo
    expect(minBullet.style.left).toBe("10%");
    expect(maxBullet.style.left).toBe("20%");
  });
});
