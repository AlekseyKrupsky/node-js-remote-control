import * as robot from 'robotjs';
import * as Jimp from 'jimp';

const screenShotSize: number = 1;

export const getPrintScreen = (): string => {
    const mousePos = robot.getMousePos();

    const img = robot.screen.capture(mousePos.x, mousePos.y, screenShotSize, screenShotSize);

    // img.image.setMim
    //
    // new Jimp({ data: img.image, width: 1, height: 1 }, (err: any, image: any) => {
    //     console.log(image);
    // });

    // jimp.read(img.image).then((image) => {
    //     console.log(image);
    // });

        // img.colorAt(1,1);

    // console.log(img.bitsPerPixel = 8);

// btoa()
//     console.log(img.image.toString('base64'));
//
//     const pngSignature = Buffer.from([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]);
//     const ihdrSignature = Buffer.from([0x00, 0x00, 0x00, 0x0D, 0x49, 0x48, 0x44, 0x52]);
//     // const ihdrData = Buffer.from([0x00, 0x00, 0x00, 0x80, 0x00, 0x00, 0x00, 0x7F, 0x08, 0x03, 0x00, 0x00, 0x00]); // 128x127x8 sum
//     const ihdrData = Buffer.from([0x00, 0x00, 0x00, 0xC8, 0x00, 0x00, 0x00, 0xC8, 0x20, 0x03, 0x00, 0x00, 0x00]); // 200x200x32
//     // const crc32Hash = Buffer.from([0x10, 0x24, 0x3A, 0x35]); // 128x127x8 sum
//     const crc32Hash = Buffer.from([0xec, 0x40, 0xef, 0xfa]); // 200x200x32 sum
//
//
//
//     const imEnd = Buffer.from([0x00, 0x00, 0x00, 0x00, 0x49, 0x45, 0x4E, 0x44, 0xAE, 0x42, 0x60, 0x82]);
//
//
//     // console.log(img.image);
//     // console.log(img.image.toString());
//     // console.log(img.image.toString('base64'));
//
//     const iii = Buffer.concat([pngSignature, ihdrSignature, ihdrData, crc32Hash, img.image, imEnd]);
//
//     console.log(iii);


    // const bb = new Buffer(img.image).toString('base64');

    // console.log(bb);

    return 'sdf';
    // return `prnt_scrn ${iii.toString('base64')}`;
}
