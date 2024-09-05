require("dotenv").config();

exports.MONGO_URI = process.env.MONGO_URI;
exports.JWT_SECRET = process.env.JWT_SECRET;

const isValidUrl = (url) => {
    const splitted = url.split(" ");
    const check1 = splitted.length===1;
    const check2 = url.startsWith("data:image/");
    const check3 = url.startsWith("https://") || url.startsWith("http://");
    return check1 && (check2 || check3);
}

exports.validateImage = (url) => {
    if(!isValidUrl(url)) {
        return false;
    }
    const imageExts = ["jpg", "jpeg", "png", "gif", "bmp", "svg", "webp"];
    const cleanUrl = url.split('?')[0].split('#')[0];
    const extension = cleanUrl.split('.').pop().toLowerCase();
    return imageExts.includes(extension);
}

const isValidYouTubeUrl = (url) => {
    const regex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/(watch\?v=|embed\/|v\/|.+\?v=)?([^&]{11})/;
    return regex.test(url);
}

exports.getYtVideoId = (url) => {
    if(!isValidYouTubeUrl(url)) {
        return false;
    }
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = url.match(regExp);
    return (match&&match[7].length===11) ? match[7] : false;
}