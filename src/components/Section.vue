<template>
    <section class="row section-wrapper" :class="{'reverse': reverseRow}">
        <div class="section-text">
            <div class="section-number">0{{sectionData.index}}</div>
            <div class="title-with-line">
                <div class="title-line"></div>
                <h3 class="title-text">{{sectionData.subtitle}}</h3>
            </div>
            <h2 class="section-heading">{{sectionData.title}}</h2>
            <p>{{sectionData.content}}</p>
            <a :href="sectionData.link" class="read-more" title="read more">
                read more <span class="icon" v-html="arrow"></span>
            </a>
        </div>
        <div class="section-img">
            <img :src="sectionData.image" :alt="sectionData.title">
        </div>
    </section>
</template>

<script>
import { arrow } from '@/utilities/icons';
export default {
    name: 'section-component',
    props: {
        sectionData: {
            type: Object,
            required: true
        },
        reverseRow: {
            type: Boolean,
            default: false
        }
    },
    data: () => ({
        arrow,
    }),
}
</script>

<style lang="scss">
	@import '@/assets/styles/sass/components/_section.scss';
</style>