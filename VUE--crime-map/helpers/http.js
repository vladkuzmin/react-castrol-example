import axios from 'axios';

export const POLICE = axios.create({
  baseURL: `https://data.police.uk/api/`,
  headers: {}
})

export const CRIMES = axios.create({
  baseURL: `https://data.police.uk/api/crimes-street/`,
  headers: {}
})

export const GEOCODE = axios.create({
	baseURL: `https://maps.googleapis.com/maps/api/geocode/json`,
	headers: {}
})

export const REGION = axios.create({
	baseURL: `https://api.postcodes.io/postcodes`,
	headers: {}
})