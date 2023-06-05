import { Dispatch, MouseEvent, SetStateAction } from "react";

import { RangeEventAction } from "components/Range";

export interface handleBulletMouseDownProps {
  event: MouseEvent<HTMLDivElement>;
  type: RangeEventAction;
  setDragging: Dispatch<SetStateAction<RangeEventAction | null>>;
}

export interface handleBulletDragEndProps {
  setDragging: Dispatch<SetStateAction<RangeEventAction | null>>;
}

export const handleBulletMouseDown = ({
  event,
  type,
  setDragging,
}: handleBulletMouseDownProps) => {
  event.preventDefault();
  setDragging(type);
};

export const handleBulletDragEnd = ({
  setDragging,
}: handleBulletDragEndProps) => {
  setDragging(null);
};
