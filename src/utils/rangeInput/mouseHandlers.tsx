import { Dispatch, MouseEvent, SetStateAction } from "react";

import { MouseEventAction } from "components/Range";

export interface handleBulletMouseDownProps {
  event: MouseEvent<HTMLDivElement>;
  type: MouseEventAction;
  setDragging: Dispatch<SetStateAction<MouseEventAction | null>>;
}

export interface handleBulletDragEndProps {
  setDragging: Dispatch<SetStateAction<MouseEventAction | null>>;
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
