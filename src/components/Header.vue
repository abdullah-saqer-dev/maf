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
            <div :class="{'nav-visible': visibleMenu}">
                <div class="nav-overlay" :style="navigationStyle"></div>
                <span 
                    class="nav-toggle icon"
                    v-html="close"
                    @click="closeNavigation"
                ></span>
                <div class="nav-items">
                    <transition-group
                        name="staggered-fade"
                        tag="ul"
                        :css="false"
                        v-on:before-enter="beforeEnter"
                        v-on:enter="enter"
                        v-on:leave="leave"
                    >
                        <template v-for="(item, index) in navItems">
                            <li
                                v-if="visibleMenuItems"
                                :key="item.link"
                                class="nav-item"
                                :data-index="index"
                            >
                                <a :href="item.link">{{item.title}}</a>
                            </li>
                        </template>
                    </transition-group>
                </div>
            </div>
            <span
                class="btn"
                @click="visibleMenu = true"
            >
                Menu
            </span>
        </div>
    </header>
</template>

<script>
import { search, close } from '@/utilities/icons';
import Velocity from 'velocity-animate';

export default {
    name: 'header-component',
    data:() => ({
        navItems: [
            {
                link: 'javascript:;',
                title: 'Equipment'
            },
            {
                link: 'javascript:;',
                title: 'About us'
            },
            {
                link: 'javascript:;',
                title: 'Blog'
            }
        ],
        search,
        close,
        whiteHeader: false,
        animationSpeed: 50,
        visibleMenu: false,
        visibleMenuItems: false,
        leaveTotal: 0,
    }),
    mounted() {
        window.addEventListener("scroll", this.onScroll);
    },
    beforeDestroy() {
        window.removeEventListener("scroll", this.onScroll);
    },
    methods: {
        onScroll() {
            this.whiteHeader = window.top.scrollY > window.innerHeight * 0.75;
        },
        beforeEnter(el) {
            el.style.opacity = 0
            el.style.height = 0
        },
        enter(el, done) {
            const delay = el.dataset.index * this.animationSpeed;
            console.log(this.navItems.length , el.dataset , 1 , this.animationSpeed);
            this.leaveTotal+= (this.navItems.length - el.dataset.index - 1) * this.animationSpeed;
            setTimeout(function () {
                Velocity(
                    el, {
                        opacity: 1,
                        height: '40px'
                    }, {
                        complete: done
                    }
                )
            }, delay)
        },
        leave(el, done) {
            const delay = (this.navItems.length - el.dataset.index - 1) * this.animationSpeed;
            setTimeout(function () {
                Velocity(
                    el, {
                        opacity: 0,
                        height: 0
                    }, {
                        complete: done
                    }
                )
            }, delay);
        },
        closeNavigation() {
            this.visibleMenuItems = false;
            setTimeout(() => {
                this.visibleMenu = false;
            }, this.leaveTotal + 500);
            document.body.style.overflow = 'auto';
        }
    },
    computed: {
        navigationStyle() {
            const radius = Math.sqrt(Math.pow(window.innerHeight, 2) + Math.pow(window.innerWidth, 2));
            const diameter = radius * 2;
            return {'margin-top': `${-radius}px`, "margin-right": `${-radius}px`,'width': `${diameter}px`, 'height': `${diameter}px` };
        },
    },
    watch: {
        visibleMenu(nVal) {
            if(nVal) {
                this.leaveTotal = 0;
                setTimeout(() => {
                    this.visibleMenuItems = true;
                }, 1000);
                document.body.style.overflow = 'hidden';
            }
        }
    }
}
</script>

<style lang="scss">
	@import '@/assets/styles/sass/components/_header.scss'
</style>