"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isProd = process.env.NODE_ENV === 'production';
exports.PRICE_PER_ENTRY = 3995;
exports.CURRENT_YEAR = '2019';
exports.BACKEND_SITE_URL = process.env.DP_BACKEND_SITE_URL;
exports.SITE_URL = process.env.DP_FRONTEND_ROOT;
exports.REGISTER_DEADLINE_DATE = '14 Juni';
exports.REGISTER_ROOT_URL = `${process.env.DP_FRONTEND_ROOT}${'/anmalan'}`;
exports.ADMIN_EMAIL = process.env.NODE_ENV === 'production' ? "designpriset@gmail.com" : "johan@wopii.com";
exports.STATIC_MEDIA_URL = `${process.env.DP_API_URL}/media`;
//Not sure of what this should be in prd yet
//const ROOT_PATH = isProd ? '/var/www/www.designpriset.se/wwwroot/backend_api' : '.'
const ROOT_PATH = exports.isProd ? '.' : '.';
exports.AVATAR_DIR = 'avatars';
exports.SOURCE_DIR = 'sources';
exports.TEMP_AVATAR_PATH = `${ROOT_PATH}/upload_assets/temp_avatars`;
exports.TEMP_MEDIA_PATH = `${ROOT_PATH}/upload_assets/temp_media`;
exports.AVATAR_PATH = `${ROOT_PATH}/upload_assets/media/${exports.AVATAR_DIR}`;
exports.MEDIA_PATH = `${ROOT_PATH}/upload_assets/media/${exports.SOURCE_DIR}`;
//# sourceMappingURL=temp_contants.js.map