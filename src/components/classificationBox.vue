<template>
    <mu-row gutter class="classificationBox">
        <mu-col span="4" v-for="(item,i) in textsAll" :key="i" class="classificationBoxDiv">
            <div class="grid-cell" @click="getrouter(item.name,genders)">
                {{item.name}}
                <div class="bookCount">
                    {{item.bookCount}}
                </div>
            </div>
        </mu-col>
    </mu-row>
</template>

<script>
    export default {
        name: "classificationBox",
        props:['textsAll','genders'],
        methods:{
            getrouter(items,genders){
                this.$router.push({name:'profile',params:{names:items,genders:genders}})
            }
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss">

    .classificationBox{
        width: 100%;
        padding: 10px;
        text-align: center;
        .classificationBoxDiv{
            margin: 10px 0px;
            .grid-cell{
                color: #202020;
                font-weight: 700;
            }
            .bookCount{
                color: #9c9c9c;
                font-weight: 100;
            }
        }
    }

</style>