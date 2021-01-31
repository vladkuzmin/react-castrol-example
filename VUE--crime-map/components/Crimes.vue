<template>
	<div id="crimes" class="table" v-if="crimes.length">
		
		<div class="thead">
			<div class="trow">
				<div class="tcell -lg -lg-text">Crime</div>
				<div v-for="(search, index) in crimes" :key="index" class="tcell">
					{{ getAddress(locations[index].searchName) }}
				</div>
				<div :class="['tcell', {'-m-hidden': crimes.length === 2 }]">
					National avg. 
					<i>
						<div @click="showHint()" class="hint-open" ref="hintIcon"></div>
						<div class="hint" ref="hint">
							<div>National average data by Police Constabulary, January - December 2019.. Source: <a href="https://www.ukcrimestats.com/Police_Forces/" target="_blank">www.ukcrimestats.com</a></div>
						</div>
					</i>
				</div>
				<div v-if="crimes.length > 1" class="tcell -m-hidden">Difference %</div>
			</div>
		</div>
		
		<div :class="['tbody__wrap', {'is-scroll': isAll }]">
			<div class="tbody">
				<div v-for="(category, index) in getCategories()"
					:key="index" 
					:class="['trow', category.active ? '' : 'is-hidden' ]">
					<div class="tcell -lg">{{ category.name }}</div>
					<div v-for="(search, index) in crimes" v-bind:key="index" class="tcell">
						<div v-if="search.length">
							{{ getCategoryTotal( category.url, index )}}
						</div>
						<div v-else>No data</div>
						<!-- 0 -->
					</div>
					<div :class="['tcell', {'-m-hidden': crimes.length === 2 }]">{{ nationalAverage[category.url] }}</div>
					<div v-if="crimes.length === 2" class="tcell -m-hidden" v-html="getDifferenceInPerc(getCategoryTotal(category.url,0), getCategoryTotal(category.url,1))">
					</div>
					<div :class="['close', {'is-loading': category.loading}]" @click="getCategoryStatus(category, index)">{{category.active ? '&times;' : '+' }}</div>
				</div>
			</div>
		</div>

		<div class="tfoot">
			<div class="trow">
				<div class="tcell -lg">Total</div>
				<div v-for="(search, index) in crimes" v-bind:key="index" class="tcell">
					{{ crimes[index].length }}
				</div>
				<div :class="['tcell', {'-m-hidden': crimes.length === 2 }]">10394</div>
				<div v-if="crimes.length > 1" class="tcell -m-hidden"></div>
			</div>
		</div>

		<div v-if="!isAll" @click="isAll = true" class="view-all"><span>View all crimes</span></div>

	</div>
</template>


<script>

import { mapState } from 'vuex'

export default {
	name: 'Crimes',
	computed: {
		...mapState([
			'searches',
			'categories',
			'crimes',
			'locations',
			'activeCategories',
			'isCategoryLoading'

		])
	},
	data() {
		return {
			nationalAverage: {
				'all-crime': 10394,
				'anti-social-behaviour': 29813,
				'bicycle-theft': 1838,
				'burglary': 8699,
				'criminal-damage-arson': 12223,
				'drugs': 3923,
				'other-theft': 11512,
				'possession-of-weapons': 1045,
				'public-order': 9622,
				'robbery': 1950,
				'shoplifting': 8059,
				'theft-from-the-person': 2265,
				'vehicle-crime': 10075,
				'violent-crime': 42169,
				'other-crime': 2318
			},
			isAll: false
		}
	},
	methods: {
		getCategories() {
			if (this.isAll) {
				return this.categories
			} else {
				return this.categories.filter(x => this.activeCategories.indexOf(x.url) > -1)
			}
		},
		getCategoryTotal(category, index) {
			return this.crimes[index].filter(x => x.category === category).length
		},
		getDifferenceInPerc(x, y) {
			let value = Math.round(100 - (x < y ? x/y : y/x)*100)

			let params = {}
			
				if (x < y) {
					params = {
						class: 'is-negative',
						text: "-"
					}
				} else if (x > y)  {
					params = {
						class: 'is-positive',
						text: "+"
					}
				} else {
					params = {
						class: '',
						text: ""
					}
				}

			if (isNaN(value)) value = 0

			return `<span class="${params.class}">${params.text}${value}%</span>`
		},
		getAddress(value) {
			return value.split(',')[0]
		},
		getCategoryStatus(category, index) {

			this.$store.dispatch('isCategoryLoading', true)
			
			this.$store.dispatch('setCategoryLoading', {
				index: index, 
				loading: true
			})
			
			this.$store.dispatch(category.active ? 'removeActiveCategory' : 'addActiveCategory', category.url)
			
			this.$store.dispatch(
				'setCategoryStatus',
				{
					index: index,
					active: !category.active
				}
			)

			setTimeout(() => {
				this.$store.dispatch('setCategoryLoading', {
					index: index, 
					loading: false
				})
				this.$store.dispatch('isCategoryLoading', false)
			}, 100)

		},
		showHint(){
			this.$refs.hintIcon.classList.toggle('is-active')
			this.$refs.hint.classList.toggle('is-active')
		}
	}
}
</script>