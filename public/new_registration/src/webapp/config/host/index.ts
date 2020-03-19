const isProd = process.env.NODE_ENV === "production"

//const PROD_DOMAIN = "https://designpriset.se"
const PROD_DOMAIN = "http://185.20.12.59"

export const BASE_URL = isProd? `${PROD_DOMAIN}/api/v1` : "http://myown.se:8001"
export const WINNER_URL = `${BASE_URL}/winners`
export const PROFILE_URL = `${BASE_URL}/profiles`
export const ENTRIES_URL = `${BASE_URL}/entries`
export const CATEGORY_URL = `${BASE_URL}/categories`
export const VOTES_URL = `${BASE_URL}/votes`
export const POLL_URL = `${BASE_URL}/polls`
export const CONTENT_URL = `${BASE_URL}/content`
export const YEAR_CONFIG_URL = `${BASE_URL}/config`
export const CONFIRMED_VOTE_URL = `${BASE_URL}/votes/confirmed_vote`

export const FRONTEND_URL = isProd ? PROD_DOMAIN : "http://myown.se:8011"

const ASSETS_URL = `${BASE_URL}/upload_assets`

export const POST_AVATAR_URL = `${BASE_URL}/avatar`
export const POST_ENTRY_MEDIA_URL = `${BASE_URL}/entry_media`
export const POST_TEMP_ENTRY_MEDIA_URL = `${BASE_URL}/temp_entry_media`
export const POST_TEMP_AVATAR_URL = `${BASE_URL}/temp_avatar`
export const POST_TEMP_ENTRY_IMAGES_URL = `${BASE_URL}/temp_entry_images`

export const MEDIA_URL = `${BASE_URL}/media`
export const ENTRY_MEDIA_URL = MEDIA_URL
export const AVATAR_URL = MEDIA_URL
export const TEMP_AVATAR_URL = `${BASE_URL}/temp_avatars`
export const TEMP_ENTRY_MEDIA_URL = `${BASE_URL}/temp_media`
export const TEMP_ENTRY_IMAGES_URL = TEMP_AVATAR_URL




/*
export const ROOT_URL = isProd ? `${FRONTEND_URL}/register2` : "http://myown.se:3000"
export const OLD_REGISTRATION_URL = "http://www.designpriset.se/anmalan.php"
 */
export const OLD_REGISTRATION_URL = "http://old.designpriset.se/anmalan.php"

//WARNING: FIX URL!
// export const FRONTEND_IMAGE_URL = ''
