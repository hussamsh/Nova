const path = require('path')

const imageTestFolder = path.join(__dirname , "/../../app/assets/images");

export const inputImagePath = path.join(imageTestFolder , "/test_image.png");
export const encryptedImagePath = path.join(imageTestFolder , "/test_image_encrypted.png");
export const decryptedImagePath = path.join(imageTestFolder , "/test_image_decrypted.png");