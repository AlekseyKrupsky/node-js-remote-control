import * as robot from 'robotjs';
import * as Jimp from 'jimp';
import { MousePos } from "./mouse";
import { Bitmap } from "robotjs";

const screenShotSize: number = 200;
const alphaByteValue: number = 0xff;

const getCaptureCoordinates = (): {
    x: number,
    y: number
} => {
    const mousePos: MousePos = robot.getMousePos();

    const halfScreenShotSize: number = screenShotSize / 2;

    let xPosition: number = mousePos.x - halfScreenShotSize;
    let yPosition: number = mousePos.y - halfScreenShotSize;

    if (xPosition < 0) {
        xPosition = 0;
    } else if (xPosition + screenShotSize > robot.getScreenSize().width) {
        xPosition = robot.getScreenSize().width - screenShotSize;
    }

    if (yPosition < 0) {
        yPosition = 0;
    } else if (yPosition + screenShotSize > robot.getScreenSize().height) {
        yPosition = robot.getScreenSize().height - screenShotSize;
    }

    return { x: xPosition, y: yPosition };
};

const updateImageBufferBytes = (image: Buffer): void => {
    const imageSize: number = image.length;

    for (let i = 0; i <= imageSize; i++) {
        if ((i + 1) % 4 === 0) {
            const redByte: number = image[i - 3];

            image[i - 3] = image[i - 1];
            image[i - 1] = redByte;

            image[i] = alphaByteValue;
        }
    }
};

export const getPrintScreen = (): Promise<string> => {
    const captureCoordinates = getCaptureCoordinates();

    const img: Bitmap = robot.screen.capture(captureCoordinates.x, captureCoordinates.y, screenShotSize, screenShotSize);

    updateImageBufferBytes(img.image);

    return new Promise((resolve, reject) => {
        const emptyImage: Promise<Jimp> = Jimp.create(screenShotSize, screenShotSize);

        emptyImage.then((image: Jimp) => {
            image.bitmap.data = img.image;

            image.getBase64('image/png', (err: Error | null, encodedImage: string) => {
                if (err !== null) {
                    reject(err);
                } else {
                    resolve(encodedImage.replace('data:image/png;base64,', ''));
                }
            });
        });
    });
}
