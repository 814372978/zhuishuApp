<template>
    <div class="star" :class="'star-'+size">
        <span v-for="(star,index) in starArr" :key="index" class="star-item" :class="star"></span>
        <span style="font-size: 12px;vertical-align: center" v-show="isshows">{{score}}</span>
    </div>
</template>

<script>
    const STARLENGTH = 5
    const STAR_ON = 'on'
    const STAR_OFF = 'off'
    const STAR_HALF = 'half'

    export default {
        name: "ElmStar",
        props: {
            size: {
                type: Number,
                default: 48
            },
            score: {
                type: Number,
                default: 0
            },
            isshows:{
                type: Boolean
            }
        },
        computed: {
            starArr() {
                // 4.5  四星半 [on,on,on,on,half]
                // 4.2  四星   [on,on,on,on,off]
                // 3.8  三星半 [on,on,on,half,off]
                // 2.6  两星半 [on,on,half,off,off]

                let record = []
                //  >= 0.5  -> 0.5
                //  < 0.5  -> 0
                let score = Math.floor(this.score/2 * 2) / 2
                // 定义整数型的score,存储 on 全星
                let intScore = parseInt(score)

                for (let i = 1; i <= STARLENGTH; i++) {
                    if (i <= intScore) {
                        record.push(STAR_ON)
                    } else if (i > intScore && i === Math.ceil(score)) {
                        record.push(STAR_HALF)
                    } else {
                        record.push(STAR_OFF)
                    }
                }

                return record
            }
        }

    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    @import "../../public/sass/mixin";

    .star {
        font-size: 0;
        /*text-align: center;*/

        .star-item {
            display: inline-block;
        }
    }

    .star-48 {
        .star-item {
            width: 15px;
            height: 15px;

            &:last-child {
                margin-right: 0;
            }

            &.on {
                @include bg-img("../assets/images/star48_on", 15px 15px)
            }

            &.half {
                @include bg-img("../assets/images/star48_half", 15px 15px)
            }

            &.off {
                @include bg-img("../assets/images/star48_off", 15px 15px)
            }
        }
    }

    .star-36 {
        .star-item {
            width: 15px;
            height: 15px;
            margin-right: 6px;

            &:last-child {
                margin-right: 0;
            }

            &.on {
                @include bg-img("/images/star36_on", 15px 15px)
            }

            &.half {
                @include bg-img("/images/star36_half", 15px 15px)
            }

            &.off {
                @include bg-img("/images/star36_off", 15px 15px)
            }
        }
    }

    .star-24 {
        .star-item {
            width: 10px;
            height: 10px;
            margin-right: 3px;

            &:last-child {
                margin-right: 0;
            }

            &.on {
                @include bg-img("/images/star24_on", 10px 10px)
            }

            &.half {
                @include bg-img("/images/star24_half", 10px 10px)
            }

            &.off {
                @include bg-img("/images/star24_off", 10px 10px)
            }
        }
    }
</style>