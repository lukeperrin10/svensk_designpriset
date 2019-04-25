export const isProd = process.env.NODE_ENV === 'production'

export const PRICE_PER_ENTRY = 3995
export const CURRENT_YEAR = '2019'
// export const SITE_URL = 'http://www.designpriset.se'
export const BACKEND_SITE_URL = process.env.DP_BACKEND_SITE_URL
export const SITE_URL = isProd ? 'http://www.designpriset.se' : "http://myown.se:8011"
export const REGISTER_DEADLINE_DATE = '15 Juni'
export const REGISTER_ROOT_URL = process.env.DP_BACKEND_REGISTER_ROOT_URL
export const ADMIN_EMAIL = process.env.NODE_ENV === 'production' ? "designpriset@gmail.com" : "johan@wopii.com"

const ROOT_PATH = isProd ? '/var/www/www.designpriset.se/wwwroot/backend_api' : '.'
export const TEMP_AVATAR_PATH = `${ROOT_PATH}/upload_assets/temp_avatars`
export const TEMP_MEDIA_PATH = `${ROOT_PATH}/upload_assets/temp_media`
export const AVATAR_PATH = `${ROOT_PATH}/upload_assets/avatars`
export const MEDIA_PATH = `${ROOT_PATH}/upload_assets/media`
