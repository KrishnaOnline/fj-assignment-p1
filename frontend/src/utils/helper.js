// Basic Image Validation...
// const validateImage = (url) => {
//     const imageExts = ["jpg", "jpeg", "png", "gif", "bmp", "svg", "webp"];
// }

const isValidUrl = (url) => {
    const splitted = url.split(" ");
    const check1 = splitted.length===1;
    const check2 = url.startsWith("data:image/");
    const check3 = url.startsWith("https://") || url.startsWith("http://");
    return check1 && (check2 || check3);
}

export const validateImage = (url) => {
    if(!isValidUrl(url)) {
        return false;
    }
    const imageExts = ["jpg", "jpeg", "png", "gif", "bmp", "svg", "webp"];
    const cleanUrl = url.split('?')[0].split('#')[0];
    const extension = cleanUrl.split('.').pop().toLowerCase();
    return imageExts.includes(extension);
}

console.log(validateImage("https://xrvefbhjfv.png"));