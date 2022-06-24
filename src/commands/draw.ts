import * as robot from 'robotjs';
import { MousePos } from "./mouse";

const MOUSE_TOGGLE_UP = 'up';
const MOUSE_TOGGLE_DOWN = 'down';
const DRAW_DELAY = 2000;

const drawSquare = (width: number): void => {
    setTimeout(() => {
        robot.mouseToggle(MOUSE_TOGGLE_DOWN);

        let mousePos: MousePos = robot.getMousePos();
        robot.moveMouseSmooth(mousePos.x + width, mousePos.y);

        mousePos = robot.getMousePos();
        robot.moveMouseSmooth(mousePos.x, mousePos.y + width);

        mousePos = robot.getMousePos();
        robot.moveMouseSmooth(mousePos.x - width, mousePos.y);

        mousePos = robot.getMousePos();
        robot.moveMouseSmooth(mousePos.x, mousePos.y - width);

        robot.mouseToggle(MOUSE_TOGGLE_UP);
    }, DRAW_DELAY);
};

const drawRectangle = (width: number, height: number): void => {
    setTimeout(() => {
        robot.mouseToggle(MOUSE_TOGGLE_DOWN);

        let mousePos: MousePos = robot.getMousePos();
        robot.moveMouseSmooth(mousePos.x + width, mousePos.y);

        mousePos = robot.getMousePos();
        robot.moveMouseSmooth(mousePos.x, mousePos.y + height);

        mousePos = robot.getMousePos();
        robot.moveMouseSmooth(mousePos.x - width, mousePos.y);

        mousePos = robot.getMousePos();
        robot.moveMouseSmooth(mousePos.x, mousePos.y - height);

        robot.mouseToggle(MOUSE_TOGGLE_UP);
    }, DRAW_DELAY);
};

const drawCircle = (radius: number): void => {
    setTimeout(() => {
        const initMousePos: MousePos = robot.getMousePos();

        robot.mouseToggle(MOUSE_TOGGLE_DOWN);

        for (let i: number = -radius; i <= radius; i++) {
            const y = Math.sqrt(radius * radius - i * i);
            const shiftedX = i + radius;

            robot.dragMouse(initMousePos.x + shiftedX, initMousePos.y - y);
        }

        for (let i: number = radius; i >= -radius; i--) {
            const y = Math.sqrt(radius * radius - i * i);
            const shiftedX = i + radius;

            robot.dragMouse(initMousePos.x + shiftedX, initMousePos.y + y);
        }

        robot.mouseToggle(MOUSE_TOGGLE_UP);
    }, DRAW_DELAY);
};

export { drawSquare, drawRectangle, drawCircle };
