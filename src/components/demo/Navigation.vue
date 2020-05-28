<template>
    <div class="_nav_left">
        <div class="_left_inner">
            <div class="_left_every" v-for="(moudle,index) in moudles" @click="stepToMoudle(moudle)">
                <div class="_every_inner" :class="{_active:ins==moudle.id}">
                    <div class="_every_lable">{{moudle.lable}}</div>
                    <div class="_every_desc">{{moudle.subDesc}}</div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'NavLeft',
        props: {},
        data() {
            return {
                ins: 1001,
                moudles: [{
                    id: 1001,
                    lable: "Draw Triangle",
                    subDesc: "绘制三角形",
                }, {
                    id: 1002,
                    lable: "Lesson1",
                    subDesc: "fuxk",
                }, {
                    id: 1003,
                    lable: "Lesson1",
                    subDesc: "fuxk",
                }, {
                    id: 1004,
                    lable: "Lesson1",
                    subDesc: "fuxk",
                }, {
                    id: 1005,
                    lable: "Lesson1",
                    subDesc: "fuxk",
                }]
            }
        },
        mounted() {
            let _this = this;
        },
        methods: {
            stepToMoudle(moudle) {
                let _this = this;
                _this.ins = moudle["id"] || -1;
            }
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

    ._nav_left {
        width: 15vw;
        height: 88vh;
        position: fixed;
        background: #0a1121;
        top: 10vh;
        left: .5vw;
        border-radius: .2vw;
        @include flex();

        ._left_inner {
            width: 95%;
            height: 98%;
            @include flex(column, flex-start);

            ._left_every {
                width: 100%;
                height: 6vh;
                margin-top: 2vh;
                background: #8598a9;
                color: #ffffff;
                cursor: pointer;
                @include flex(column, flex-start);

                &:hover {
                    background: #a9513e;
                }

                ._every_inner {
                    width: 100%;
                    height: 100%;

                    div {
                        width: 100%;
                        height: 50%;
                        @include flex(row);
                    }

                    ._every_lable {
                        font-size: 1vw;
                    }

                    ._every_desc {
                        font-size: .6vw;
                    }
                }
            }
        }
    }

    ._active {
        background: #a9513e;
    }
</style>
