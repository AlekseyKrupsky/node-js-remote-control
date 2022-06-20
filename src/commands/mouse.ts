import * as robot from 'robotjs';

const getMousePosition = (): string => {
    const mousePos = robot.getMousePos();

    return `{${mousePos.x}},{${mousePos.y}}`;
};

const moveMouseUp = (yShift: number): void => {
    const mousePos = robot.getMousePos();

    let newYPos = mousePos.y - yShift;

    if (newYPos < 0) {
        newYPos = 0;
    }

    robot.moveMouseSmooth(mousePos.x, newYPos);
};

const moveMouseDown = (yShift: number): void  => {
    const mousePos = robot.getMousePos();

    let newYPos = mousePos.y + yShift;

    if (newYPos > robot.getScreenSize().height) {
        newYPos = robot.getScreenSize().height;
    }

    robot.moveMouseSmooth(mousePos.x, newYPos);
};

const moveMouseLeft = (xShift: number): void  => {
    const mousePos = robot.getMousePos();

    let newXPos = mousePos.x - xShift;

    if (newXPos < 0) {
        newXPos = 0;
    }

    robot.moveMouseSmooth(newXPos, mousePos.y);
};

const moveMouseRight = (xShift: number): void  => {
    const mousePos = robot.getMousePos();

    let newXPos = mousePos.x + xShift;

    if (newXPos > robot.getScreenSize().width) {
        newXPos = robot.getScreenSize().width;
    }

    robot.moveMouseSmooth(newXPos, mousePos.y);
};

export { getMousePosition, moveMouseUp, moveMouseDown, moveMouseLeft, moveMouseRight };
