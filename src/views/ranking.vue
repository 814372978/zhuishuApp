<template>
    <div>
        <TabBox :name="$route.params.title" :istopBox="true"></TabBox>

        <mu-tabs :value.sync="active1" inverse color="secondary" text-color="rgba(0, 0, 0, .54)" full-width>
            <mu-tab @click="change">周榜</mu-tab>
            <mu-tab @click="change">月榜</mu-tab>
            <mu-tab @click="change">总榜</mu-tab>
        </mu-tabs>

        <div class="demo-text" v-if="active1 === 0">
            <suB :list="listRank"></suB>
        </div>
        <div class="demo-text" v-if="active1 === 1">
            <suB :list="listRankyue"></suB>
        </div>
        <div class="demo-text" v-if="active1 === 2">
            <suB :list="listRankZong"></suB>
        </div>
        <mu-flex class="flex-wrapper" justify-content="center">
            <mu-flex class="flex-demo" justify-content="center"><span class="overs">没有更多书籍了~</span></mu-flex>
        </mu-flex>
    </div>
</template>

<script>
    import TabBox from '../components/TabBox'
    import suB from '../components/suB'

    export default {
        name: "ranking",
        components: {
            TabBox,
            suB
        },

        data() {
            return {
                listRank: {},
                active1: 0,
                listRankYue: {},
                listRankZong: {}

            }
        },
        methods: {
            change() {
                if (this.active1 === 1) {
                    this.listId = this.$route.params.male[this.$route.params.index].monthRank;
                    let rank = '/api/rank/' + this.listId

                    this.axios.get(rank).then(response => {
                        this.listRankyue = response.data.ranking.books
                        console.log(this.listRankyue);
                    }, err => {
                        alert(err)
                    })
                }
                if (this.active1 === 2) {
                    this.listId = this.$route.params.male[this.$route.params.index].totalRank;
                    let rank = '/api/rank/' + this.listId

                    this.axios.get(rank).then(response => {
                        this.listRankZong = response.data.ranking.books
                        console.log(this.listRankyue);
                    }, err => {
                        alert(err)
                    })
                }
            }
        },
        created() {

            let rank = '/api/rank/' + this.$route.params.id

            this.axios.get(rank).then(response => {
                this.listRank = response.data.ranking.books
                // console.log(this.listRank);
            }, err => {
                alert(err)
            })
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss">
    .flex-wrapper{
    .overs {
        color: #999;
        height: 12px;
        line-height: 1.06667rem;
    }}
</style>