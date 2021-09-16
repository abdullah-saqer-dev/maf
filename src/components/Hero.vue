<template>
    <div class="hero-section" ref="heroSection">
        <div class="hero-section-content" :style="contentStyle">
            <div class="title-with-line">
                <div class="title-line"></div>
                <h3 class="title-text">{{sectionData.subtitle}}</h3>
            </div>
            <h1 class="h1-title">{{sectionData.title}}</h1>
            <span @click="goTo('#page-content')" class="scroll-down tablet-visible--up">
                scroll down
                <span class="icon" v-html="arrow"></span>
            </span>
        </div>
        <div class="social-media">
            <span class="social-media--title">
                Follow us
            </span>
            <span href="http://" target="_blank" rel="noopener noreferrer">
                <a
                    href="http://instagram.com" 
                    target="_blank"
                    rel="noopener noreferrer"
                    v-html="instagram"
                    class="icon"
                ></a>
            </span>
            <span>
                <a
                    href="http://twitter.com" 
                    target="_blank"
                    rel="noopener noreferrer"
                    v-html="twitter"
                    class="icon"
                ></a>
            </span>
        </div>
        <img 
            class="clouds" 
            :style="cloudStyle"
            alt="Clouds"
            src="/images/HG.w_1920.webp"
            :srcset="`/images/HG.w_768.webp 768w, /images/HG.w_1017.webp 1017w, /images/HG.w_1920.webp 1920w`"
            sizes="(max-width: 1920px) 100vw, 1920px"
        >
        <img 
            class="mountains" 
            :style="mountainsStyle"
            alt="Mountains"
            src="/images/MG.w_1920.webp"
            :srcset="`/images/MG.w_768.webp 768w, /images/MG.w_1017.webp 1017w, /images/MG.w_1920.webp 1920w`"
            sizes="(max-width: 1920px) 100vw, 1920px"
        >
        <img 
            class="landscape" 
            :style="landscapeStyle"
            alt="Landscape"
            src="/images/VG.w_1920.webp"
            srcset="/images/VG.w_768.webp 768w, /images/VG.w_1017.webp 1017w, /images/VG.w_1920.webp 1920w"
            sizes="(max-width: 1920px) 100vw, 1920px"
        >
    </div>
</template>

<script>
import { arrow, instagram, twitter } from '@/utilities/icons';
import { scrollToAnimation } from '@/utilities/functions';
export default {
    name: 'hero-component',
    props: {
        sectionData: {
            type: Object,
            required: true
        },
    },
    data: () => ({
        windowScrollTop: 0,
        stepsTotal: 0,
        animationSettings: {
            clouds: {
                finalPosition: 60,
                step: 0,
            },
            mountains: {
                finalPosition: 30,
                step: 0,
            },
            landscape: {
                finalPosition: 10,
                step: 0,
            },
            content: {
                finalPosition: 60,
                step: 0,
                opacitySteps: 0
            },
        },
        arrow,
        instagram,
        twitter,
    }),
    beforeDestroy() {
        window.removeEventListener("scroll", this.onScroll);
    },
    mounted() {
        window.scrollTo(0, 0);
        this.initAnimation();
    },
    methods: {
        initAnimation() {
            this.stepsTotal = this.$refs.heroSection.offsetHeight * 0.7;
            for(const [key, value] of Object.entries(this.animationSettings)) {
                this.animationSettings[key].step = value.finalPosition / this.stepsTotal;
            }
            const content = this.animationSettings.content;
            content.opacitySteps = 1 / this.stepsTotal;
            window.addEventListener("scroll", this.onScroll);
        },
        onScroll(e) {
            this.windowScrollTop = window.top.scrollY;
        },
        getTransform(type) {
            const clouds = this.animationSettings[type];
            let current = clouds.step * this.windowScrollTop;
            if(current > clouds.finalPosition) {
                current = clouds.finalPosition;
            }
            return current;
        },
        goTo(target) {
            scrollToAnimation(target, 400, true);
        }
    },
    computed: {
        cloudStyle() {
            return `transform: translate3d(0, -${this.getTransform('clouds')}%, 0)`;
        },
        mountainsStyle() {
            return `transform: translate3d(0, -${this.getTransform('mountains')}%, 0)`;
        },
        landscapeStyle() {
            return `transform: translate3d(0, -${this.getTransform('landscape')}%, 0)`;
        },
        contentStyle() {
            const content = this.animationSettings.content;
            let currentOpacity = 1 - (content.opacitySteps * this.windowScrollTop);
            if(currentOpacity < 0) {
                currentOpacity = 0;
            }
            return `transform: translate3d(0, -${this.getTransform('content')}%, 0);opacity: ${currentOpacity}`;
        },
    },
}
</script>

<style lang="scss">
	@import '@/assets/styles/sass/components/_hero.scss';
</style>