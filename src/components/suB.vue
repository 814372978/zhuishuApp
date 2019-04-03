<template>
    <div>

        <div v-for="(item,i) in list" :key="i" class="suB-box" @click="SJdetails(i,item._id)">
            <div class="suB-box-img">
                <img :src="img(item.cover)" alt="" class="auto-img">
            </div>
            <div class="sub-text">
                <div class="suB-text-title">
                    {{item.title}}
                </div>
                <div class="suB-text-name">
                    {{item.author}}
                </div>
                <div class="suB-text-synopsis">
                    {{item.shortIntro}}
                </div>
                <div class="suB-text-proper">
                    <span>{{item.latelyFollower}}</span>人气 | <span>{{item.retentionRatio}}%</span>读者读剩
                </div>

            </div>

        </div>
    </div>

</template>

<script>
    export default {
        name: "suB",
        props:['list'],
        data(){
            return{
                loading:false
            }
        },
        methods:{

            img(imgs){
                return 'http://statics.zhuishushenqi.com'+imgs
            },
            SJdetails(i,id){
                this.$router.push({
                    path:'/details'
                })
                this.$store.state.id=id
            }

        },
        computed:{




        },
        created(){
            // console.log(this.list);
        }



    }
</script>

<style lang="scss" rel="stylesheet/scss">
    .demo-loadmore-wrap {
        width: 100%;
        max-width: 360px;
        height: 420px;
        display: flex;
        flex-direction: column;
        .mu-appbar {
            width: 100%;
        }
    }
    .demo-loadmore-content {
        flex: 1;
        overflow: auto;
        -webkit-overflow-scrolling: touch;
    }
.suB-box{
    display: flex;
    width: 95%;
    margin: 10px auto;
    border-bottom: 1px solid rgba(7,17,27,.2);

    .auto-img{
        width: 100%;
        display: block;
        height: 110px;
    }
    .suB-box-img{
        margin-right:  10px;
        width: 80px;
        max-width: 90px;
        min-width: 90px;
        height: 120px;
    }
    .sub-text{
        width: 70%;
        color: #7b7b7b;
        font-size: 13px;
        div{
            margin-bottom: 5px;
        }
        .suB-text-title{
            color:black ;
            font-weight: bold;
            font-size: 16px;
        }
        .suB-text-proper{
            color: black;
            span{
                color: red;
            }
        }
    }
    .suB-text-synopsis{
        width: 100%;

        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }
}
</style>