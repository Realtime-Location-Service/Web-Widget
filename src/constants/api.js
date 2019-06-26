import env from '../../env'

const apiUrl = env.apiUrl

// for dev purpose
const idServiceUrl = `${apiUrl}:${env.idServicePort}`
const locationMetaUrl = `${apiUrl}:${env.locationMetaPort}/metadata`
const rlsDevUrl = `${apiUrl}:${env.rlsDevPort}/ping`
const historyApiUrl = `${apiUrl}:${env.historyApiPort}/history`

// for different type of api versioning
const version = 'v1'
const versionWithPrefix = 'api/v1'

// Id Service APIs
export const COMPANY_SIGNUP = `${idServiceUrl}/${versionWithPrefix}/company/signup`
export const USER_SIGNUP = `${idServiceUrl}/${versionWithPrefix}/user/signup`
export const RESOLVE_USERS_BY_API_KEY = `${idServiceUrl}/${versionWithPrefix}/user/resolve`

// Location MetaData APIs
export const SAVE_USER_META = `${locationMetaUrl}/${versionWithPrefix}/users/meta`
export const GET_USERS_META = `${locationMetaUrl}/${versionWithPrefix}/users`
export const UPDATE_USER_META = (userId) => `${locationMetaUrl}/${versionWithPrefix}/users/${userId}/meta`
export const SEARCH_USER_META = `${locationMetaUrl}/${versionWithPrefix}/users/meta/search`

// Ping APIs
export const SAVE_LOCATION = `${rlsDevUrl}/${version}/locations`
export const SEARCH_USER_BY_RADIUS = `${rlsDevUrl}/${version}/locations/users`
export const GET_USER_LOCATION = `${rlsDevUrl}/${version}/locations`

// history APi
export const GET_USER_LOCATION_HISTORY = `${historyApiUrl}/${versionWithPrefix}/history`
