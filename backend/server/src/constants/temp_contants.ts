export const isProd = process.env.NODE_ENV === 'production'

export const PRICE_PER_ENTRY = 3995
export const CURRENT_YEAR = '2019'
export const BACKEND_SITE_URL = process.env.DP_BACKEND_SITE_URL
export const SITE_URL = process.env.DP_FRONTEND_ROOT
export const REGISTER_DEADLINE_DATE = '14 Juni'
export const REGISTER_ROOT_URL = `${process.env.DP_FRONTEND_ROOT}${'/anmalan'}`
export const ADMIN_EMAIL = process.env.NODE_ENV === 'production' ? "designpriset@gmail.com" : "johan@wopii.com"

//Not sure of what this should be in prd yet
//const ROOT_PATH = isProd ? '/var/www/www.designpriset.se/wwwroot/backend_api' : '.'
const ROOT_PATH = isProd ? '.' : '.'

export const AVATAR_DIR = 'avatars'
export const SOURCE_DIR = 'sources'

export const TEMP_AVATAR_PATH = `${ROOT_PATH}/upload_assets/temp_avatars`
export const TEMP_MEDIA_PATH = `${ROOT_PATH}/upload_assets/temp_media`
export const AVATAR_PATH = `${ROOT_PATH}/upload_assets/media/${AVATAR_DIR}`
export const MEDIA_PATH = `${ROOT_PATH}/upload_assets/media/${SOURCE_DIR}`
