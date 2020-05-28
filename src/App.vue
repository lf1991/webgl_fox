<template>
    <div id="app">
        <Header/>
        <router-view/>
    </div>
</template>

<script>
    import Header from "./components/navigation/Header";
    import LeftNavigation from "./components/demo/Navigation";

    export default {
        components: {Header, LeftNavigation},
        data() {
            return {}
        },
        mounted() {

        },
        watchs: {},
        methods: {},
    }
</script>

<style lang="scss">
    #app {
        width: 100%;
        height: 100%;
        padding: 0;
        margin: 0;
        background: #464A55;
        text-align: center;
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }
</style>