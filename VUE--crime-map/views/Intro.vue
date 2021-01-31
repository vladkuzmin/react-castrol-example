<template>
	<div id="intro" ref="intro">
		<div class="app-container intro-container" ref="introContainer">
			<h1>Crime in my area</h1>
			<p>Criminals don’t discriminate against location, which is why it’s so important to protect your property and possessions. See the level of crime recorded by the police in your area – then take a look at the security solutions offered by ADT.</p>
			<h4>Enter your location</h4>
			<SearchBox></SearchBox>

		</div>
		<div class="disclaimer">Statistics provided by <a href="https://www.police.uk/" target="_blank">police.uk</a>. The information and statistics displayed are for information purposes only and may be subject to change</div>
		
	</div>
</template>

<script>

import SearchBox from '../components/SearchBox'
// import Loading from '../components/Loading'

export default {
	name: 'Intro',
	components: {
		SearchBox,
		// Loading
	},
	methods: {
		animate(){
			this.$refs.intro.classList.add('is-active')
			this.$refs.introContainer.classList.add('is-active')
		}
	},
	mounted() {
		setTimeout(()=>{
			this.animate()
		}, 1)
	}
}
</script>