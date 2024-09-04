// Basic Image Validation...
// const validateImage = (url) => {
//     const imageExts = ["jpg", "jpeg", "png", "gif", "bmp", "svg", "webp"];
// }

export const validateImage = (url) => {
    if(url.startsWith("data:image/")) {
        return true;
    }
    const imageExts = ["jpg", "jpeg", "png", "gif", "bmp", "svg", "webp"];
    const cleanUrl = url.split('?')[0].split('#')[0];
    const extension = cleanUrl.split('.').pop().toLowerCase();
    return imageExts.includes(extension);
}