<template>
    <div class="_nav_header">
        <div class="_header_logo">super case</div>
        <div class="_header_router">
            <div>
                <router-link to="/Mountain">Mountain</router-link>
            </div>
            <div>
                <router-link to="/Wind">Wind</router-link>
            </div>
            <div>
                <router-link to="/Plotting">Plotting</router-link>
            </div>
            <div>
                <router-link to="/WebGL">WebGL</router-link>
            </div>
            <div>
                <router-link to="/Demo">Demo</router-link>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Header',
        props: {
            msg: String
        }
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

    ._nav_header {
        width: $width;
        height: 8%;
        background: #0a1121;
        color: #fff;
        @include flex(row);


        ._header_logo {
            width: $width/2;
            height: 100%;
            font-size: 2vw;
            @include flex(row);

        }

        ._header_router {
            width: $width/2;
            height: 100%;
            @include flex(row, flex-start);


            div {
                width: 15%;
                height: 100%;
                cursor: pointer;


                a {
                    color: #fff;
                    width: 100%;
                    height: 100%;
                    text-decoration: none;
                    @include flex(row);

                    &:hover {
                        color: #8d8d90;
                    }
                }
            }
        }
    }
</style>
