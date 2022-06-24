import { getMousePosition, moveMouseDown, moveMouseLeft, moveMouseRight, moveMouseUp } from "./mouse";
import { drawCircle, drawRectangle, drawSquare } from "./draw";
import { getPrintScreen } from "./screen";

type Commands = {
    [key: string]: Function
}

export const commands: Commands = {
    mouse_up: moveMouseUp,
    mouse_down: moveMouseDown,
    mouse_left: moveMouseLeft,
    mouse_right: moveMouseRight,
    mouse_position: getMousePosition,
    draw_circle: drawCircle,
    draw_rectangle: drawRectangle,
    draw_square: drawSquare,
    prnt_scrn: getPrintScreen,
};
