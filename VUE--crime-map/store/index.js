import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({

	state: {
		isIntro: true,
		latestSearch: [],
		searches: [],
		categories: [],
		activeCategories: [],
		results: [],
		locations: [],
		crimes: [],
		pending: false,
		isErrors: false,
		isGeolocation: false,
		isGeolocationMessage: '',
		isCategoryLoading: false,
		period: 12,
		lastPeriod: 12
	},

	mutations: {
		isCategoryLoading(state, payload) {
			state.isCategoryLoading = payload
		},
		isGeolocation(state, payload) {
			state.isGeolocation = payload
		},
		setGeolocationMessage(state, payload) {
			state.isGeolocationMessage = payload
		},
		setPeriod(state, payload) {
			state.period = payload
		},
		setLastPeriod(state, payload) {
			state.lastPeriod = payload
		},
		setPending(state, payload) {
			state.pending = payload
		},
		setIntro(state, payload) {
			state.isIntro = payload
		},
		setLatestSearch(state, payload){
			state.latestSearch = payload
		},
		addSearch(state, payload){
			state.searches.push(payload)
		},
		removeSearch(state, payload) {
			state.searches.splice(payload, 1)
			state.crimes.splice(payload, 1)
			state.locations.splice(payload, 1)
		},
		setSearchValue(state, payload) {
			state.searches[payload[0]][payload[1]] = payload[2]
			state.searches = Object.assign([], state.searches)
		},
		addActiveCategory(state, payload){
			state.activeCategories.push(payload)
		},
		removeActiveCategory(state, payload){
			state.activeCategories = state.activeCategories.filter(x => x !== payload)
		},
		setCategories(state, payload){
			state.categories = payload
		},
		setCategoryStatus(state, payload){
			state.categories[payload.index].active = payload.active
		},
		setCategoryLoading(state, payload){
			state.categories[payload.index].loading = payload.loading
		},
		setLocations(state, payload)  {
			state.locations = Object.assign([], payload)
		},
		addLocation(state, payload)  {
			state.locations[payload.index] = payload.data
		},
		addResult(state, payload){
			state.results.push(payload)
		},
		removeResult(state, payload){
			state.results.splice(payload, 1)
		},
		setCrimes(state, payload)  {
			state.crimes = Object.assign([], payload)
		},
		setIsErrors(state, payload)  {
			state.isErrors = payload
		}
	},

	actions: {
		isCategoryLoading({commit}, payload) {
			commit('isCategoryLoading', payload)
		},
		isGeolocation({commit}, payload) {
			commit('isGeolocation', payload)
		},
		setGeolocationMessage({commit}, payload) {
			commit('setGeolocationMessage', payload)
		},
		setPeriod({commit}, payload) {
			commit('setPeriod', payload)
		},
		setLastPeriod({commit}, payload) {
			commit('setLastPeriod', payload)
		},
		setPending({commit}, payload) {
			commit('setPending', payload)
		},
		setIntro({commit}, payload) {
			commit('setIntro', payload)
		},
		setLatestSearch({commit}, payload) {
			commit('setLatestSearch', payload)
		},
		addSearch({commit}, payload) {
			commit('addSearch', payload)
		},
		removeSearch({commit}, payload) {
			commit('removeSearch', payload)
		},
		setSearchValue({commit}, payload) {
			commit('setSearchValue', payload)
		},
		addActiveCategory({commit}, payload) {
			commit('addActiveCategory', payload)
		},
		removeActiveCategory({commit}, payload) {
			commit('removeActiveCategory', payload)
		},
		setCategories({commit}, payload) {
			commit('setCategories', payload)
		},
		setCategoryStatus({commit}, payload) {
			commit('setCategoryStatus', payload)
		},
		setCategoryLoading({commit}, payload) {
			commit('setCategoryLoading', payload)
		},
		setLocations({commit}, payload) {
			commit('setLocations', payload)
		},
		addLocation({commit}, payload) {
			commit('addLocation', payload)
		},
		addResult({commit}, payload) {
			commit('addResult', payload)
		},
		removeResult({commit}, payload) {
			commit('removeResult', payload)
		},
		setCrimes({commit}, payload) {
			commit('setCrimes', payload)
		},
		setIsErrors({commit}, payload) {
			commit('setIsErrors', payload)
		}
	},

	getters: {
		pending(state) {
			return state.pending
		},
		getPeriod(state) {
			return state.period
		},
		getLastPeriod(state) {
			return state.lastPeriod
		},
		isIntro(state) {
			return state.isIntro
		},
		latestSearch(state) {
			return state.latestSearch
		},
		searches(state) {
			return state.searches
		},
		categories(state) {
			return state.categories
		},
		results(state) {
			return state.results
		},
		locations(state) {
			return state.locations
		},
		crimes(state) {
			return state.crimes
		},
		activeCategories(state) {
			return state.activeCategories
		},
		isErrors(state) {
			return state.isErrors
		},
		isGeolocation(state){
			return state.isGeolocation	
		}
	}
})