"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isProd = process.env.NODE_ENV === 'production';
exports.PRICE_PER_ENTRY = 3995;
exports.CURRENT_YEAR = '2019';
// export const SITE_URL = 'http://www.designpriset.se'
exports.BACKEND_SITE_URL = process.env.DP_BACKEND_SITE_URL;
exports.SITE_URL = exports.isProd ? 'http://www.designpriset.se' : "http://myown.se:8011";
exports.REGISTER_DEADLINE_DATE = '14 Juni';
exports.REGISTER_ROOT_URL = process.env.DP_BACKEND_REGISTER_ROOT_URL;
exports.ADMIN_EMAIL = process.env.NODE_ENV === 'production' ? "designpriset@gmail.com" : "johan@wopii.com";
const ROOT_PATH = exports.isProd ? '/var/www/www.designpriset.se/wwwroot/backend_api' : '.';
exports.TEMP_AVATAR_PATH = `${ROOT_PATH}/upload_assets/temp_avatars`;
exports.TEMP_MEDIA_PATH = `${ROOT_PATH}/upload_assets/temp_media`;
exports.AVATAR_PATH = `${ROOT_PATH}/upload_assets/avatars`;
exports.MEDIA_PATH = `${ROOT_PATH}/upload_assets/media`;
//# sourceMappingURL=temp_contants.js.map