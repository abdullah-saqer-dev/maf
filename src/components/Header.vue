<template>
    <header class="header" :class="{'white-header': whiteHeader}">
        <div class="logo">
            MNTN
        </div>
        <nav class="header-navigation tablet-visible--up">
            <ul>
                <li
                    v-for="item in navItems"
                    :key="item.link"
                >
                    <a :href="item.link">{{item.title}}</a>
                </li>
            </ul>
        </nav>
        <div class="header-actions">
            <span class="search-btn icon" v-html="search"></span>
            <span
                class="btn"
            >
                Menu
            </span>
        </div>
    </header>
</template>

<script>
import { search } from '@/utilities/icons';
export default {
    name: 'header-component',
    data:() => ({
        navItems: [
            {
                link: '/equipment',
                title: 'Equipment'
            },
            {
                link: '/about-us',
                title: 'About us'
            },
            {
                link: '/blog',
                title: 'Blog'
            }
        ],
        search,
        whiteHeader: false,
    }),
    mounted() {
        window.addEventListener("scroll", this.onScroll)
    },
    beforeDestroy() {
        window.removeEventListener("scroll", this.onScroll)
    },
    methods: {
        onScroll() {
            this.whiteHeader = window.top.scrollY > window.innerHeight * 0.75;
        }
    }
}
</script>

<style lang="scss">
	@import '@/assets/styles/sass/components/_header.scss'
</style>