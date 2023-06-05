import { useEffect, MouseEvent } from "react";

import { MouseEventAction } from "components/Range";

interface Props {
  dragging: MouseEventAction | null;
  handleBulletDrag: (event: MouseEvent) => void;
  handleBulletDragEnd: () => void;
}

const useSliderDrag = ({
  dragging,
  handleBulletDrag,
  handleBulletDragEnd,
}: Props) => {
  useEffect(() => {
    const handleMouseDrag = (event: MouseEvent | any) => {
      if (dragging) {
        handleBulletDrag(event);
      }
    };

    const handleMouseUp = () => {
      handleBulletDragEnd();
    };

    window.addEventListener("mousemove", handleMouseDrag);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseDrag);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [dragging, handleBulletDrag, handleBulletDragEnd]);
};

export default useSliderDrag;
