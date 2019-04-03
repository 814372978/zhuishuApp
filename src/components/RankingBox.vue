<template>
    <div class="RankingBox">
        <div class="RankingBoxName">{{Rank}}</div>
        <div v-for="(item,i) in male" :key="i" class="rankingBox" @click="rankings(item.title,item._id,male,i)">
            <div class="rankingBoxImgs">
                <img class="auto-img" :src="imgs(item.cover)" alt="" v-show="imgs(item.cover)">
            </div>
            <div class="rankingBoxtitle">
                <span>{{item.title}}</span>
            </div>
        </div>
        <div class="rankingBox" @click="show3 = !show3">
            <mu-icon value="more_horiz" class="more_horiz-icon"></mu-icon>
            <span>别人家的排行榜</span>
            <mu-icon value="expand_more" class="expand_less-icon"></mu-icon>
        </div>
        <mu-flex class="mu-transition-row">
            <mu-expand-transition>
                <div v-show="show3">
                    <div v-for="(item,i) in males" :key="i" class="rankingBox" @click="rankings(item.title,item._id,male,i)">
                        <div class="rankingBoxImgs">
                            <img class="auto-img" :src="imgs(item.cover)" alt="" v-show="imgs(item.cover)">
                        </div>
                        <div class="rankingBoxtitle">
                            <span>{{item.title}}</span>
                        </div>
                    </div>
                </div>
            </mu-expand-transition>
        </mu-flex>

    </div>
</template>

<script>
    export default {
        name: "RankingBox",
        props:['male','Rank','males'],
        data(){
            return{
                show3: false
            }
        },
        methods:{
            imgs(img){
                return 'http://statics.zhuishushenqi.com'+img
            },
            rankings(title,id,male,index){
                this.$router.push({
                    name:'ranking',
                    params:{
                        title:title,
                        id:id,
                        male:male,
                        index:index
                    }
                })
            }


        },
    }
</script>

<style lang="scss" rel="stylesheet/scss">
    .auto-img{
        width: 100%;
        display: block;
    }
    .RankingBox{

        .RankingBoxName{
            padding: 10px;
            margin: 0;
            background: rgba(17,27,37,.1);
            font-weight: 600;
        }
        .more_horiz-icon{
            background: orange;
            color: whitesmoke;
            border-radius: 50%;
            font-size: 28px;
            margin:0 10px  ;
        }
        .expand_less-icon{
            position: absolute;
            right: 10px;

        }
    }
    .rankingBox{
        display: flex;
        margin: 10px 0;
        align-items: center;
        .rankingBoxImgs{
            width: 1.8rem;
            margin: 0 10px;
        }
        .rankingBoxtitle{
        }
    }
</style>