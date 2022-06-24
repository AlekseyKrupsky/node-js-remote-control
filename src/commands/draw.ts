import * as robot from 'robotjs';
import { MousePos } from "./mouse";

const drawSquare = (width: number): void => {
    setTimeout(() => {
        robot.mouseToggle('down');

        let mousePos: MousePos = robot.getMousePos();
        robot.moveMouseSmooth(mousePos.x + width, mousePos.y);

        mousePos = robot.getMousePos();
        robot.moveMouseSmooth(mousePos.x, mousePos.y + width);

        mousePos = robot.getMousePos();
        robot.moveMouseSmooth(mousePos.x - width, mousePos.y);

        mousePos = robot.getMousePos();
        robot.moveMouseSmooth(mousePos.x, mousePos.y - width);

        robot.mouseToggle('up');
    }, 2000);
};

const drawRectangle = (width: number, height: number): void => {
    setTimeout(() => {
        robot.mouseToggle('down');

        let mousePos: MousePos = robot.getMousePos();
        robot.moveMouseSmooth(mousePos.x + width, mousePos.y);

        mousePos = robot.getMousePos();
        robot.moveMouseSmooth(mousePos.x, mousePos.y + height);

        mousePos = robot.getMousePos();
        robot.moveMouseSmooth(mousePos.x - width, mousePos.y);

        mousePos = robot.getMousePos();
        robot.moveMouseSmooth(mousePos.x, mousePos.y - height);

        robot.mouseToggle('up');
    }, 2000);
};

const drawCircle = (radius: number): void => {
    setTimeout(() => {
        const initMousePos: MousePos = robot.getMousePos();

        robot.mouseToggle('down');

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

        robot.mouseToggle('up');
    }, 2000);
};

export { drawSquare, drawRectangle, drawCircle };
