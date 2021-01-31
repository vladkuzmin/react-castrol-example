import { GEOCODE, CRIMES } from '../helpers/http'
import { ERRORS } from '../helpers/errors'
import Modifier from '../helpers/modifier'

export default {
	data() {
		return {
			periods: [3, 6, 12],
			months: [],
			timeClicked: 0,
			modifier: new Modifier()
		}
	},
	methods: {
		setMonths() {

			this.months = []

			let year = new Date().getFullYear()
			let month = new Date().getMonth() + 1

			for(let i = 0; i < this.period; i++) {

				year = month === 0 ? year - 1 : year
				month = month === 0 ? 12 : month

				let m = month.toString()
				m = m.length === 1 ? '0' + m : m
				
				month = month === 0 ? 12 : month - 1
				this.months.push(`${year}-${m}`)
			}

			this.searches.forEach((x, index) => {
				this.setSearchValue(index, 'isError', false)
			})

		},

		addSearch() {
			this.$store.dispatch('setGeolocationMessage', "")
			
			this.$store.dispatch('addSearch', {
				value: '',
				error: 'This cannot be empty',
				isError: false,
				loading: false,
			})
		},
		
		removeSearch(index) {
			this.$store.dispatch('setGeolocationMessage', "")
			this.setPending(true)
			this.$store.dispatch('removeSearch', index)
			this.setLatestSearch()
			setTimeout(() => {

				// DOM changes outside the VUE instance
				this.modifier.render({
					locations: this.locations,
					period: this.period
				})

				this.removePending() 
			})
		},

		setSearchValue(index, property, value) {
			this.$store.dispatch('setSearchValue', [index, property, value])
		},

		setPending(value) {
			this.$store.dispatch('setPending', value)
		},

		async currentLocation(index){
			this.timeClicked = new Date().getTime()
			this.setPending(true)
			navigator.geolocation.getCurrentPosition(async x => {
				const address = 
					await GEOCODE.get('', {
						params: {
							latlng: `${x.coords.latitude},${x.coords.longitude}`,
							key: process.env.VUE_APP_GOOGLEMAP_API_KEY,
							region: 'GB',
							sensor: true
						}
					}).then(res => {
						const data = res.data.results
						return data.length !== 0 ? res.data.results[0].formatted_address : false
					})

				if(address) {
					this.setSearchValue(index, 'value', address)
					this.setSearchValue(index, 'isError', false)
					this.submit()
				} else {
					this.setSearchValue(index, 'value', '')
					this.setSearchValue(index, 'error', ERRORS.undefined)
					this.setSearchValue(index, 'isError', true)
					this.removePending()
				}

			}, (error) => this.cancelCurrentLocation(error))
		},

		cancelCurrentLocation() {
			this.$store.dispatch('isGeolocation', false)
			this.$store.dispatch('setGeolocationMessage', "Geolocation cannot be recognised.")
			this.removePending()
		},
		
		async submit() {

			this.$store.dispatch('setGeolocationMessage', "")

			const indeces = this.checkLatestSearch()
			if (indeces.length === 0) return

			this.timeClicked = new Date().getTime()
			this.setPending(true)
			const isEmpty = this.isEmpty()

			if(!isEmpty) {

				let searches = []
				
				indeces.forEach(x => {
					searches.push(this.searches[x])
				})

				const addresses = searches.map(async search => {
					const address = 
						await GEOCODE.get('', {
								params: {
									address: search.value,
									key: process.env.VUE_APP_GOOGLEMAP_API_KEY,
									region: 'GB',
									restrictions: {
										country: 'UK'
									}
								}
							}).then((response) => {
								const data = response.data.results
								return data.length !== 0 ? data[0] : null
							}).catch(() => {})
					
					return address
				})

				let locations = await Promise.all(addresses)
				locations = this.updateData('locations', locations, indeces)

				// TODO
				locations = this.polygonCoords(locations)
				const isInvalid = this.isInvalid(locations)


				if (!isInvalid) {

					const isEqual = this.isEqual(locations)
					if (!isEqual) {
						const isNoCountry = this.isNoCountry(locations)
						
						if (!isNoCountry) {
							locations = this.getNames(locations)
							this.$store.dispatch('setLocations', locations)
							this.getCrimes(locations)
						} else {
							this.removePending()
						}

					} else {
						this.removePending()
					}
				} else {
					this.removePending()
				}
			} else {
				this.removePending()
			}

		},

		getNames(locs) {
			locs.forEach(item => {
				item.address_components.forEach(x => {
					if ((x.types[0] === 'postal_code' || x.types[0] === 'locality' || x.types[0] === 'postal_town') && !item.searchName) {
						item.searchName = x.short_name
					} else if ((x.types[0] === 'administrative_area_level_2') && !item.region) {
						item.region = x.short_name
					}
				})
			})
			return locs
		},

		polygonCoords(locations) {

			locations.forEach((x, i)=>{

				if(locations[i]) {

					const loc = locations[i].geometry.location
					const lat = loc.lat
					const lng = loc.lng
					let radius = 1

					switch(this.period) {
						case 3:
							radius = 0.5
							break;
						case 6:
							radius = 0.25
							break;
						case 12:
							radius = 0.2
							break;
					}

					const df = radius/69

					const dl = df/Math.cos(Math.round(lat)*Math.PI/180)

					const sl = lat - dl
					const nl = lat + dl
					const wl = lng - dl
					const el = lng + dl

					// eslint-disable-next-line no-console
					locations[i].polygons = (`${sl},${wl}:${nl},${wl}:${nl},${el}:${sl},${el}`)
				}
			})

			return locations
		},

		checkLatestSearch() {		
			let inx = []
			this.searches.forEach((l, i) => {
				if( (l.value.toLowerCase() !== this.latestSearch[i]) || this.period !== this.lastPeriod) {
					inx.push(i)
				}
			})
			return inx
		},
		
		isEmpty(){
			let errs = []
			this.searches.forEach((x, i) => {
				errs.push('')
				if(x.value === '') {
					errs[i] = true
					this.setSearchValue(i, 'error', ERRORS.empty)
					this.setSearchValue(i, 'isError', true)
				} else {
					errs[i] = false
				}
			})
			this.$store.dispatch('setIsErrors', errs.indexOf(true) > -1)
			return errs.indexOf(true) > -1
		},

		isInvalid(arr) {
			let errs = []
			arr.forEach((x, i) => {
				if (x === null || x === undefined) {
					errs[i] = true
					this.setSearchValue(i, 'error', ERRORS.undefined)
					this.setSearchValue(i, 'isError', true)
				} else {
					errs[i] = false
				}
			})

			this.$store.dispatch('setIsErrors', errs.indexOf(true) > -1)
			return errs.indexOf(true) > -1
		},

		isNoCountry(arr) {
			let errs = []
			arr.forEach((x, i) => {
				if (x.formatted_address.indexOf(' UK') === -1) {
					errs[i] = true
					this.setSearchValue(i, 'error', ERRORS.nocountry)
					this.setSearchValue(i, 'isError', true)
				} else {
					errs[i] = false
				}
			})
			this.$store.dispatch('setIsErrors', errs.indexOf(true) > -1)
			return errs.indexOf(true) > -1
		},

		isNoData(arr) {
			let errs = []
			arr.forEach((x, i) => {
				if (x.length === 0) {
					errs[i] = true
					this.setSearchValue(i, 'error', ERRORS.nodata)
					this.setSearchValue(i, 'isError', true)
				} else {
					errs[i] = false
				}
			})
			this.$store.dispatch('setIsErrors', errs.indexOf(true) > -1)
			return errs.indexOf(true) > -1
		},

		isEqual(arr) {
			if (arr.length === 2) {
				if (arr[0].formatted_address === arr[1].formatted_address) {
					this.setSearchValue(1, 'error', ERRORS.similar)
					this.setSearchValue(1, 'isError', true)
					this.$store.dispatch('setIsErrors', true)
					return true
				}
			}
		},

		async getCrimes(locations, category = null) {

			const indeces = this.checkLatestSearch()
			if (indeces.length === 0) return


			if (category === null) category = 'all-crime'
			let locs = []

			indeces.forEach(x => {
				locs.push(this.locations[x])
			})

			const places = locs.map(async loc => {

				const period = this.months.map(async m => {

					let params = {}

					// Change pediod to apply radius
					if (this.period > 12) {
						params.poly = loc.polygons
					} else {
						params.lat = loc.geometry.location.lat
						params.lng = loc.geometry.location.lng
					}

					if (this.months.length > 1) {
						params.date = m
					}

					const place = 
						await CRIMES.get(`${category}`, {params: params }).then((res) => {
							const data = res.data
							return data.length !== 0 ? data : []
						}).catch(() => {
							return []
						})

					return place

				})

				let periods = await Promise.all(period)
				periods = periods.reduce((a,b) => a.concat(b), [])
				
				// eslint-disable-next-line no-console
				return periods
			})
			
			let crimes = await Promise.all(places)
			
			crimes = this.updateData('crimes', crimes, indeces)

			const isInvalid = this.isNoData(crimes)

			if (!isInvalid) {
				this.$store.dispatch('setCrimes', crimes)
				this.setLatestSearch()
				this.$store.dispatch('setLastPeriod', this.period)
				this.$store.dispatch('setIntro', false)
				
				// DOM changes outside the VUE instance
				this.modifier.render({
					locations: locations,
					period: this.period
				})

				this.removePending()
			}  else {
				this.removePending()
			}
		},

		setLatestSearch() {
			let latestSearch = []
			this.searches.forEach(s => {
				latestSearch.push(s.value.toLowerCase())
			})
			this.$store.dispatch('setLatestSearch', latestSearch)
		},

		updateData(property, arr, inx) {
			let newArr = this[property]
			inx.forEach((x, i) => {
				newArr[x] = arr[i]
			})
			return newArr
		},

		removePending() {
			if ((new Date().getTime() - this.timeClicked) > 1500) {
				this.setPending(false)
			} else {
				setTimeout(() => {
					this.setPending(false)
				}, 1000)
			}

			this.timeClicked = 0
			
		}
	}
}