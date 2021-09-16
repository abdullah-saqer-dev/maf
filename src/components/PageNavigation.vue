<template>
    <div class="sctions-navigation-wrapper tablet-visible--up">
        <div class="sctions-navigation">
            <div
                v-for="item in count"
                :key="item"
                class="navigation-item"
                @click="goTo(`#section-${item - 1}`)"
            >
                {{item == 1 ? 'Start' : `0${item - 1}`}}
            </div>
        </div>
        <div class="sctions-navigation-line" ref="lineWrapper">
            <div 
                class="sctions-navigation-position"
                :style="`transform: translate3d(0,${lineTransform}px,0);`"
            ></div>
        </div>
    </div>
</template>

<script>
import { scrollToAnimation } from '@/utilities/functions';
export default {
    name: 'page-navigation-component',
    props: {
        count: {
            type: Number,
            default: 0
        }
    },
    data: () => ({
        sectionPositions: [],
        lineTransform: 0,
    }),
    mounted() {
        this.calcSectionsPosition();
        const resizeObserver = new ResizeObserver(() => {
            this.calcSectionsPosition();
        });
        resizeObserver.observe(document.getElementById('app'));
        window.addEventListener("scroll", this.onScroll);
    },
    beforeDestroy() {
        window.removeEventListener("scroll", this.onScroll);
    },
    methods: {
        calcSectionsPosition() {
            this.sectionPositions = [];
            document.querySelectorAll('.navigation-section').forEach((element) => {
                const box = element.getBoundingClientRect();
                const body = document.body;
                const docEl = document.documentElement;
                const scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
                const clientTop = docEl.clientTop || body.clientTop || 0;
                const top = box.top + scrollTop - clientTop;
                const height = element.offsetHeight;
                this.sectionPositions.push({start: top * 0.75, end: top + height * 0.75 });
            });
        },
        onScroll(e) {
            if(this.$refs.lineWrapper) {
                const current = window.top.scrollY;
                const index = this.sectionPositions.findIndex((item) => current > item.start && current < item.end);
                if(index > -1) {
                    this.lineTransform = (index * (1 / this.count)) * this.$refs.lineWrapper.offsetHeight;
                }
            }
        },
        goTo(target) {
            scrollToAnimation(target, 400, true);
        },
    }
    
}
</script>

<style lang="scss">
	@import '@/assets/styles/sass/components/_pageNavigation.scss';
</style>