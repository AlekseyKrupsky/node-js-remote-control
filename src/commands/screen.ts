import * as robot from 'robotjs';
import Jimp from 'jimp';
import { MousePos } from "./mouse";
import { Bitmap } from "robotjs";

const SCREENSHOT_SIZE: number = 200;
const ALPHA_BYTE_VALUE: number = 0xff;
const ONE_PIXEL_BYTES_COUNT: number = 4;
const BASE64_PNG_SIGNATURE = 'data:image/png;base64,';

const getCaptureCoordinates = (): {
    x: number,
    y: number
} => {
    const mousePos: MousePos = robot.getMousePos();

    const halfScreenShotSize: number = SCREENSHOT_SIZE / 2;

    let xPosition: number = mousePos.x - halfScreenShotSize;
    let yPosition: number = mousePos.y - halfScreenShotSize;

    if (xPosition < 0) {
        xPosition = 0;
    } else if (xPosition + SCREENSHOT_SIZE > robot.getScreenSize().width) {
        xPosition = robot.getScreenSize().width - SCREENSHOT_SIZE;
    }

    if (yPosition < 0) {
        yPosition = 0;
    } else if (yPosition + SCREENSHOT_SIZE > robot.getScreenSize().height) {
        yPosition = robot.getScreenSize().height - SCREENSHOT_SIZE;
    }

    return { x: xPosition, y: yPosition };
};

const updateImageBufferBytes = (image: Buffer): void => {
    const imageSize: number = image.length;

    for (let i = 0; i <= imageSize; i++) {
        if ((i + 1) % ONE_PIXEL_BYTES_COUNT === 0) {
            const redByte: number = image[i - 3];

            image[i - 3] = image[i - 1]; // replace with blue byte
            image[i - 1] = redByte;

            image[i] = ALPHA_BYTE_VALUE;
        }
    }
};

export const getPrintScreen = (): Promise<string> => {
    const captureCoordinates = getCaptureCoordinates();

    const img: Bitmap = robot.screen.capture(captureCoordinates.x, captureCoordinates.y, SCREENSHOT_SIZE, SCREENSHOT_SIZE);

    updateImageBufferBytes(img.image);

    return new Promise((resolve, reject) => {
        const emptyImage: Promise<Jimp> = Jimp.create(SCREENSHOT_SIZE, SCREENSHOT_SIZE);

        emptyImage.then((image: Jimp) => {
            image.bitmap.data = img.image;

            image.getBase64(Jimp.MIME_PNG, (err: Error | null, encodedImage: string) => {
                if (err !== null) {
                    reject(err);
                } else {
                    resolve(encodedImage.replace(BASE64_PNG_SIGNATURE, ''));
                }
            });
        }).catch((error) => {
            reject(error);
        });
    });
}
