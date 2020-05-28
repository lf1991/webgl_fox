<template>
    <div>
        <Navigation/>
    </div>
</template>

<script>
    import Navigation from "../components/demo/Navigation";

    export default {
        name: 'Main',
        props: {},
        components:{Navigation},
        data() {
            return {}
        },
        mounted() {
            let _this = this;
        },
        methods: {}
    }
</script>

<style scoped lang="scss">
    $width: 100%;
    $height: 100%;

    @mixin flex($direction:row, $justify:center, $align:center) {
        display: flex;
        flex-direction: $direction;
        justify-content: $justify;
        align-items: $align;
    }
</style>
