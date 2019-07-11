export const COOKIES_MAX_AGE = 365 * 24 * 60 * 60;
export const KURRENTTV_BASE_URL = 'https://kurrenttv.nbla.cloud';
export const WS_KURRENTTV_BASE_URL = 'wss://kurrenttv.nbla.cloud/ws/kurrenttv';
export const LOGIN_URL = '/login';
export const ASSETS_URL = '/api/get';
export const SET_ASSETS_URL = '/api/set';
export const JOBS_URL = '/api/jobs';
export const SETTINGS_URL = '/api/settings';
export const API_USERNAME = 'demo';
export const API_PASSWORD = 'demo';
export const API_VERSION = '1'
export const MEDIA_TYPES = {
  0: 'VIRTUAL',
  1: 'FILE',
  2: 'URI',
};
export const CONTENT_TYPES = {
  1: 'AUDIO',
  2: 'VIDEO',
  3: 'IMAGE',
  4: 'TEXT',
  5: 'DATABROADCASTING',
  6: 'INTERSTITIAL',
  7: 'EDUCATION',
  8: 'APPLICATION',
  9: 'GAME',
  10: 'PACKAGE',
};

export const DATA_TYPES = {
  0: "STRING",       // Single-line plain text (default)
  1: "TEXT",         // Multiline text. 'syntax' can be provided in config
  2: "INTEGER",      // Integer only value (for db keys etc)
  3: "NUMERIC",      // Any integer of float number. 'min', 'max' and 'step' values can be provided in config
  4: "BOOLEAN",      // 1/0 checkbox
  5: "DATETIME",     // Date and time information. Stored as timestamp
  6: "TIMECODE",     // Timecode information, stored as float(seconds), presented as HH:MM:SS:FF or HH:MM:SS.CS (centiseconds)
  7: "REGIONS",      // List of regions
  8: "FRACTION",     // 16/9 etc...
  9: "SELECT",       // Select one value from list. stored as string or int value
  10: "LIST",        // Select 0 or more values from list, stored as array
  11: "COLOR",       // stored as integer
};