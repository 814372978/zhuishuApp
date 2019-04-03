<template>

    <div>
        <div class="topBox">
            <mu-icon value="chevron_left" class="chevronLeft" v-show="istopBox" @click="fan"></mu-icon>

            <span v-show="searchs">跟“</span>{{name}} <span v-show="searchs">”有关的书籍</span>
        </div>

    </div>
</template>

<script>
    export default {
        name: "TabBox",
        props: ['name','istopBox','searchs'],
        methods:{
            fan(){
                this.$router.go(-1);//返回上一层
            }
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss">
    .topBox {
        width: 100%;
        text-align: center;
        padding: 10px;
        line-height: 20px;
        background: #5789ff;
        color: white;
        span{
            position: relative;
            left: -5px;
        }
        .chevronLeft {
            float: left;
            position: relative;
            top: -2px;
        }
    }
</style>