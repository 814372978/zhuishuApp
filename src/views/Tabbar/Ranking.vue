<template>
    <div class="Ranking">
        <TopBOx :name="'排行'"></TopBOx>

        <Rankin :rank="'男生'" :male="male" :males="male1"></Rankin>
        <Rankin :rank="'女生'" :male="female" :males="female1"></Rankin>

        <div class="Rankingover">
            <div>
                沪公网安备 31011202006103号
            </div>
            <div>
            上海元聚网络科技有限公司 增值电信业务经营许可证沪B2-20170022 网络文化经营许可证沪网文（2016）3206-227号 出版物经营许可证新出发沪批字第U7659号
            </div>
            <div>
                客服电话：021-54393188-8048
            </div>
        </div>
        <BottomTab></BottomTab>
        <!--数据请求是动画-->
        <mu-container class="loading" v-if="this.$store.state.isShow">
            <mu-flex class="demo-linear-progress">
                <mu-linear-progress></mu-linear-progress>
            </mu-flex>
        </mu-container>
    </div>
</template>

<script>
    import TopBOx from '../../components/TabBox'
    import Rankin from '../../components/RankingBox'
    import BottomTab from '../../components/bottomTab'

    export default {
        name: 'Ranking',
        data(){
            return{
                names:'',
                txt:{},
                notxt:{},
                male:{},
                male1:{},
                female:{},
                female1:{}

             }
        },
        components: {
            TopBOx,
            Rankin,
            BottomTab
        },
        methods:{
            //为img加上默认url
            imgs(img){
                return 'http://statics.zhuishushenqi.com'+img
            },


        },
        computed:{
            s(txt){
                return txt
            }
        },

        created() {


            let subcategories = '/api/rank-category'

            this.axios.get(subcategories).then(response => {

                this.txt = response.data
                // console.log(this.txt);
                //截取要显示和不显示的数组
                this.male= this.txt.male.slice(0,7)
                this.male1=this.txt.male.slice(7)
                this.female= this.txt.female.slice(0,7)
                this.female1=this.txt.female.slice(7)
            }, err => {
                alert(err)
            })
        },

    }
</script>
<style  lang="scss" rel="stylesheet/scss" scoped>
    .auto-img{
        width: 100%;
        display: block;
    }
    .loading {
        width: 100%;
        padding: 0;
        margin: 0;
        position: fixed;
        bottom: 57px;
        left: 0;
    }
    .Rankingover{
        background: rgba(0,7,17,.1);
        padding: 20px;
        text-align: center;
        font-size: 12px;
        color: #999;
        div{
            margin-bottom: 10px;
        }
    }


</style>
