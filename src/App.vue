<template>
	<div id="app">
		<landing-page/>
	</div>
</template>

<script>
import LandingPage from '@/views/LandingPage.vue'
export default {
	name: 'App',
	components: {
		LandingPage,
	}
}
</script>

<style lang="scss">
	@import '@/assets/styles/sass/main.scss';
</style>
