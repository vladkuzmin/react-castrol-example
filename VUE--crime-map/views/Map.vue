<template>
	<div id="results">
		<div id="search">
			<div class="search__head" ref="searchHead">
				<div class="search__titles">
					<h2>{{ heading }}</h2>
					<p>{{ filteredPeriod() }}</p>
				</div>
				<SearchBox></SearchBox>
			</div>
			<Crimes ref="crimes"></Crimes>
			<Map></Map>
		</div>
	</div>
</template>

<script>

import { mapState } from 'vuex'
import Crimes from '../components/Crimes'
import SearchBox from '../components/SearchBox'
import Map from '../components/Map'

export default {
	name: 'Search',
	components: {
		SearchBox,
		Crimes,
		Map
	},
	data() {
		return {
			heading: 'Search for area'
		}
	},
	computed: {
		...mapState([
			'locations',
			'pending',
			'lastPeriod'
		])
	},
	watch: {
		pending() {
			this.getHeading()
		}
	},
	methods: {
		filteredPeriod() {
			const p = this.lastPeriod
			let text = ''

			switch (p) {
				case 1: 
					text = "Last available month"
					break;
				default:
					text = `Last ${p} months`
					break;
			}

			return text
		},
		getHeading(){
			const arr = this.locations
			let str = ''

			switch (arr.length) {
				case 2:
					str = `Crime in ${this.locations[0].searchName} vs. ${this.locations[1].searchName}`
					break;
				case 1:
					str = `Crime in ${this.locations[0].searchName}`
					break;
				default:
					str = `Search for location`
			}
			this.heading = str
		},
		animate() {
			// eslint-disable-next-line no-console
			this.$refs.crimes.$el.classList.add('is-active')
			this.$refs.searchHead.classList.add('is-active')
		}
	},
	mounted() {
		this.getHeading()
		// setTimeout(() => {
			this.animate()
		// }, 1)
	}
}
</script>