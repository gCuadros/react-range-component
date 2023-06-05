import { useEffect, MouseEvent, Dispatch, SetStateAction } from "react";

import { RangeEventAction } from "components/Range";

import { handleBulletDragEndProps } from "./mouseHandlers";

interface Props {
  dragging: RangeEventAction | null;
  handleBulletDrag: (event: MouseEvent) => void;
  handleBulletDragEnd: ({ setDragging }: handleBulletDragEndProps) => void;
  setDragging: Dispatch<SetStateAction<RangeEventAction | null>>;
}

const useSliderDrag = ({
  dragging,
  handleBulletDrag,
  handleBulletDragEnd,
  setDragging,
}: Props) => {
  useEffect(() => {
    const handleMouseDrag = (event: MouseEvent | any) => {
      if (dragging) {
        handleBulletDrag(event);
      }
    };

    const handleMouseUp = () => {
      handleBulletDragEnd({ setDragging });
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
