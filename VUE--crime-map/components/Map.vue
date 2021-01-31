<template>
	<div class="map" ref="mapWrap">
		<GmapMap 
			ref="map" 
			id="map"
			:zooom="6"
			:center="previousCoords"
			:options="{
				maxZoom: maxZoom
			}"
		>
			<GmapCluster 
				ref="cluster"
				:zoom-on-click="zoomOnClick"
				:styles="styles"
				:text="'hello'"
				@click="showClusterInfo()"
			>
				<div v-for="(crime, index) in markers" :key="`crimes_${index}`">
					<GmapMarker 
						v-for="(x, i) in crime" 
						:key="`${x.url}_${i}`"
						:position="getMarkerLatLng(x)"
						:clickable="true"
						:icon="markerStyles"
						@click="showMarkerInfo(x)"
						@change="showMarkerInfo(x)"
					/>
				</div>

				<GmapInfoWindow
					:options="{maxWidth: 300}"
					:position="infoWindow.position"
					:opened="infoWindow.open"
					@closeclick="infoWindow.open = false">
					<div v-html="infoWindow.template"></div>
				</GmapInfoWindow>


			</GmapCluster>
		</GmapMap>
		<div class="resume" @click="fitBounds()">Resume</div>
	</div>
</template>

<script>

import { mapState } from 'vuex'
import { clusterStyles, markerStyles } from '../helpers/clusters'

export default {
	name: 'Map',
	computed: {
		...mapState([
			'activeCategories',
			'crimes',
			'locations',
			'pending',
			'categories',
			'isCategoryLoading'
		])
	},
	data() {
		return {
			originalMarkers: [],
			markers: [],
			mapBounds: null,
			map: null,
			cluster: null,
			zoomOnClick: true,
			zoom: 0,
			maxZoom: 20,
			bounds: null,
			previousCoords: {
				lat: 52.502847,
				lng: -1.263427
			},
			infoWindow: {
				position: {lat: 0, lng: 0},
				open: false,
				template: ''
			},
			isClusterClicked: false,
			clusterMarkers: {},
			styles: clusterStyles,
			markerStyles: markerStyles
		}
	},
	watch: {
		pending(newValue) {

			if(!newValue) {
				this.reload()
			} else {
				this.markers = []
			}

		},
		isCategoryLoading(newValue) {
			if (!newValue) {
				this.getMarkers()
			}
		}
	},
	methods: {
		reload() {
			this.bounds = new window.google.maps.LatLngBounds()
			if(this.crimes.length) {
				this.getAllBounds(this.crimes)
				this.getMarkers()
			} else {
				this.map.setZoom(8)
				this.map.setCenter(
					new window.google.maps.LatLng(
						this.previousCoords.lat,
						this.previousCoords.lng
					)
				)
			}
		},
		getMarkers() {
			let filteredCrimes = []
			this.crimes.forEach((arr) => {
				filteredCrimes.push(
					arr.filter(x => 
						this.activeCategories.indexOf(x.category) > -1
					)
				)
			})
			this.originalMarkers = filteredCrimes
			this.calculateMarkers() 
		},

		
		calculateMarkers() {
			let markers = []

			this.originalMarkers.forEach((arr) => {
				
				let filtered = arr.filter(x => 
					this.mapBounds.contains(this.getMarkerLatLng(x))
				)
				if (filtered.length >= 1501) { 
					filtered = filtered.sort(() => {Math.random() - 0.5})
					filtered = filtered.slice(0, 1501)
				}
				markers.push(filtered)
			})

			this.markers = markers
			this.setClusterCalculations()
		},

		initMap() {
			this.$refs.map.$mapPromise.then((map) => {
				
				this.map = map;
				this.bounds = new window.google.maps.LatLngBounds()
				this.getAllBounds(this.crimes)
				this.map.addListener('idle', () => {
					this.mapBounds = this.map.getBounds()
					this.getMarkers()
					this.updateMap()
				})
			})
			
			this.$refs.cluster.$clusterPromise.then((cluster) => {
				this.cluster = cluster
				// this.setClusterCalculations()

			})
		},

		setClusterCalculations() {
			this.cluster.setCalculator((markers, numStyles) => {
				var index = 0,
					count = markers.length,
					total = count;
					
				while (total !== 0) {
					total = parseInt(total / 5, 10)
					index++
				}

				index = Math.min(index, numStyles)

				return {
					text: count >= 1500 ? `> 1.5k` : count,
					index: index
				}
			})
		},
		updateMap() {
			this.zoom = this.map.getZoom()
			this.zoomOnClick = this.zoom === this.maxZoom ? false : true
			this.infoWindow.open = false
			this.clusterMarkers = {}
		},
		getMarkerLatLng(m) {
			return {
				lat: parseFloat(m.location.latitude),
				lng: parseFloat(m.location.longitude)
			}
		},
		getAllBounds(array) {
			array.forEach((arr, index) => {
				if(arr.length !== 0) {
					arr.forEach(x => {
						this.bounds.extend({
							lat: parseFloat(x.location.latitude),
							lng: parseFloat(x.location.longitude)
						})
					})
				} else {
					this.bounds.extend({
						lat: parseFloat(this.locations[index].geometry.location.lat),
						lng: parseFloat(this.locations[index].geometry.location.lng)
					})
				}
			})
			this.map.fitBounds(this.bounds)
		},
		fitBounds() {
			this.map.fitBounds(this.bounds)	
		},
		showMarkerInfo(x) {

			if(this.isClusterClicked) {

				let prop = this.clusterMarkers[x.category]

				if (prop) {
					this.clusterMarkers[x.category] += 1
				} else { 
					this.clusterMarkers[x.category] = 1
				}
				return
			} else {
				const p = this.getMarkerLatLng(x)
				this.infoWindow.position = {
					lat: p.lat,
					lng: p.lng
				}
				this.infoWindow.template = `<div class="info">${this.getCategoryName(x.category)}</div>`
				this.infoWindow.open = true
			}
		},
		showClusterInfo(){
			window.google.maps.event.addListener(this.cluster, 'clusterclick', (cluster) => {

				if (!this.zoomOnClick) {

					this.clusterMarkers = {}
					this.isClusterClicked = true

					const markers = cluster.getMarkers()
					const promise = new Promise(resolve => resolve(cluster.getCenter()))

					markers.forEach(m => {
						new window.google.maps.event.trigger(m, 'click')
					})
					
					promise.then((value) => {

						this.infoWindow.position = {
							lat: value.lat(),
							lng: value.lng()
						}
						this.infoWindow.template = `<div class="info">${Object.keys(this.clusterMarkers).map((x) => `<div><span>${this.clusterMarkers[x]}</span> - ${this.getCategoryName(x)}</div>`)}</div>`
						this.infoWindow.open = true
					})

					this.isClusterClicked = false
				}
			})
		},
		getCategoryName(category) {
			const name = this.categories.filter(x => x.url === category)[0].name
			return name
		}
	},
	mounted(){
		this.initMap()
	}
}
</script>