const isProd = process.env.NODE_ENV === "production"


export const BASE_URL = isProd? "http://www.designpriset.se:8001" : "http://myown.se:8001"
export const WINNER_URL = `${BASE_URL}/winners`
export const PROFILE_URL = `${BASE_URL}/profiles`
export const ENTRIES_URL = `${BASE_URL}/entries`
export const CATEGORY_URL = `${BASE_URL}/categories`

export const FRONTEND_URL = isProd ? "http://www.designpriset.se" : "http://myown.se:8011"


export const IMAGE_TEST_URL = `${BASE_URL}/`
export const TEMP_AVATAR_URL = `${BASE_URL}/temp_avatar`
export const AVATAR_URL = `${BASE_URL}/avatar`
export const ENTRY_MEDIA_URL = `${BASE_URL}/entry_media`
export const TEMP_ENTRY_MEDIA_URL = `${BASE_URL}/temp_entry_media`

export const TEMP_AVATAR_SYM = isProd ? `${FRONTEND_URL}/admin/temp_avatars` : `${FRONTEND_URL}/clone/admin/temp_avatars`

export const ROOT_URL = isProd ? `${FRONTEND_URL}/register2` : "http://myown.se:3000"
export const OLD_REGISTRATION_URL = "http://designpriset.se"
