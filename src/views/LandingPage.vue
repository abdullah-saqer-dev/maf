<template>
    <div>
        <header-component/>
		<page-navigation
			v-if="pageData.length"
			:count="pageData.length"
		/>
		<main>
			<hero-component 
				v-if="pageData.length"
				:section-data="pageData[0]"
				id="section-0"
				class="navigation-section"
			/>
			<div id="page-content" class="sections-wrapper">
				<div class="container">
					<template
						v-for="(item, index) in pageData"
					>
						<section-component
							v-if="index > 0"
							:key="index"
							:section-data="{index,...item}"
							:reverseRow="index % 2 == 0" 
							:id="`section-${index}`"
							class="navigation-section"
						/>
					</template>
				</div>
			</div>
		</main>
    </div>
</template>

<script>
import Header from '@/components/Header.vue';
import Hero from '@/components/Hero.vue';
const Section = () => ({
    component: import('@/components/Section.vue'),
    delay: 2000,
    timeout: 10000
});
const PageNavigation = () => ({
    component: import('@/components/PageNavigation.vue'),
    delay: 3000,
    timeout: 10000
});
export default {
    name: 'langing-page',
    data: () => ({
		pageData: [],
	}),
	async created() {
		const response = await fetch('/json/landing_page_data.json');
		const data = await (response.status == 200 ? response.json() : {});
		if(Object.keys(data).length) {
			this.pageData = data.data;
		}
	},
	components: {
		'header-component': Header,
		'hero-component': Hero,
		'section-component': Section,
		PageNavigation,
	}
}
</script>

<style lang="scss">
	@import '@/assets/styles/sass/views/landingPage.scss';
</style>