import axios from 'axios'
import { language } from '../Helpers/Language';

export const FETCH_CONTENT = 'FETCH_CONTENT'
export const SET_VISITED = 'SET_VISITED'
export const SET_MUTED = 'SET_MUTED'
export const SET_PAUSED = 'SET_PAUSED'

const API_BASE_URL = 'https://cdn.contentful.com'
const API_SPACE_ID = process.env.REACT_APP_API_SPACE_ID
const API_TOKEN = process.env.REACT_APP_API_TOKEN
const API_type = 'language'
const API_Language = language()

export function fetchContent() {
  const request = axios.get(`${API_BASE_URL}/spaces/${API_SPACE_ID}/entries?access_token=${API_TOKEN}&content_type=${API_type}&fields.name=${API_Language}`)
  return {
    type: FETCH_CONTENT,
    payload: request
  }
}

export function setVisisted(text) {
  return { type: SET_VISITED, text }
}

export function setMuted(boolean) {
  return { type: SET_MUTED, boolean }
}

export function setPaused(boolean) {
  return { type: SET_PAUSED, boolean }
}
