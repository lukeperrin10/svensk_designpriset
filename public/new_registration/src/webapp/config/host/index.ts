const isProd = process.env.NODE_ENV === "production"

export const ROUTER_BAS_NAME = isProd ? "/register2" : undefined
export const BASE_URL = isProd? "http://www.designpriset.se/wopii_dev_backend" : "http://myown.se:8001"
export const WINNER_URL = `${BASE_URL}/winners`
export const PROFILE_URL = `${BASE_URL}/profiles`
export const ENTRIES_URL = `${BASE_URL}/entries`
export const CATEGORY_URL = `${BASE_URL}/categories`
export const VOTES_URL = `${BASE_URL}/votes`
export const POLL_URL = `${BASE_URL}/polls`
export const CONTENT_URL = `${BASE_URL}/content`
export const CONFIRMED_VOTE_URL = `${BASE_URL}/votes/confirmed_vote`

export const FRONTEND_URL = isProd ? "http://www.designpriset.se" : "http://myown.se:8011"


export const IMAGE_TEST_URL = `${BASE_URL}/`
export const TEMP_AVATAR_URL = `${BASE_URL}/temp_avatar`
export const AVATAR_URL = `${BASE_URL}/avatar`
export const ENTRY_MEDIA_URL = `${BASE_URL}/entry_media`
export const TEMP_ENTRY_MEDIA_URL = `${BASE_URL}/temp_entry_media`

export const TEMP_AVATAR_SYM = isProd ? `${FRONTEND_URL}/admin/temp_avatars` : `${FRONTEND_URL}/clone/admin/temp_avatars`

export const AVATAR_SYM = isProd ? `${FRONTEND_URL}/admin/avatars` : `${FRONTEND_URL}/clone/admin/avatars`
export const TEMP_MEDIA_SYM = isProd ? `${FRONTEND_URL}/admin/temp_media` : `${FRONTEND_URL}/clone/admin/temp_media`
export const MEDIA_SYM = isProd ? `${FRONTEND_URL}/admin/media` : `${FRONTEND_URL}/clone/admin/media`

export const ROOT_URL = isProd ? `${FRONTEND_URL}/register2` : "http://myown.se:3000"
export const OLD_REGISTRATION_URL = "http://www.designpriset.se/anmalan.php"

//WARNING: FIX URL!
// export const FRONTEND_IMAGE_URL = ''
