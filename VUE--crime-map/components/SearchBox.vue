<template>
	<div :class="['app-container', {'-md': isIntro }]">

		<div v-if="!isIntro" :class="['months', {'is-full': !isGeolocation}]">
			<div>Data period (months):</div>
			<ul>
				<li v-for="(p, index) in periods" v-bind:key="`${p}-${index}`" @click="togglePeriod(p)" :class="{'is-active': (p === period)}">{{ p === 1 ? 'Latest' : p }}
				</li>
			</ul>
		</div>

		<div class="search">
			<div v-for="(search, index) in searches" v-bind:key="index" class="input-box">

				<div class="input-line">
					<!-- INPUT -->
					<div :class="['input', {'-intro': isIntro}]">
						<input 
							type="text" 
							placeholder="Postcode, city or street" 
							v-model="search.value"
							@keyup.enter="submit()"
							@input="setSearchValue(index, 'isError', false)"
						>	
						<button @click="submit()" class="button--search"></button>
						<div v-if="pending" :class="`search-loading search-loading-${index}`"></div>
					</div>
					<!-- CURRENT LOCATION -->
					<div v-if="isGeolocation && !isIntro" :class="['icon icon--location', {'-white': isIntro} ]" @click="currentLocation(index)">
						<span></span>
					</div>
					<!-- DELETE LINE -->
					<div v-if="searches.length > 1" @click="removeSearch(index)" class="icon icon--delete">&times;</div>
				</div>
				<!-- ERRORS -->
				<div v-if="search.isError" :class="['input-error', {'-yellow': isIntro }]">{{ search.error }}</div>
			</div>
		</div>

		<div v-if="isIntro && isGeolocation" class="use-my-location" @click="currentLocation(0)">
			<div :class="['icon icon--location', {'-white': isIntro} ]">
						<span></span>
					</div>
			<div>Use my location</div>
		</div>
		<div v-if="searches.length <= 1 && !isIntro" class="add-location"><strong @click="addSearch()">+ Add another location</strong> to compare</div>

		<div v-if="isGeolocationMessage !== ''" :class="['input-error', {'-yellow': isIntro }]">
			{{ isGeolocationMessage }}
		</div>

	</div>
</template>

<script>
	import { mapState } from 'vuex'
	import mixins from '../mixins/index.js'

export default {
	name: 'SearchBox',
	mixins: [mixins],
	computed: {
		...mapState([
			'pending',
			'isIntro',
			'searches',
			'isErrors',
			'isGeolocation',
			'latestSearch',
			'locations',
			'crimes',
			'period',
			'lastPeriod',
			'isGeolocationMessage'
		])
	},
	methods: {
		togglePeriod(val) {
			this.$store.dispatch('setPeriod', val)
			this.setMonths()
			if (!this.isIntro) {
				this.submit()
			}
		}
	},
	mounted(){
		this.setMonths()
		if (this.searches.length === 0) this.addSearch()
	}
}

</script>