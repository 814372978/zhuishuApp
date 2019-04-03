<template>
    <div class="selist">
        <TopBox :name="$store.state.listName" :istopBox="true" :searchs="true"></TopBox>
        <SuB :list="list"></SuB>
        <div class="imgbox" v-if="isshows">
            <img src="../assets/images/wu.png" alt="">
            <span>没有找到该书籍哦 T T</span>
        </div>
        <mu-container class="loading" v-if="this.$store.state.isShow">
            <mu-flex class="demo-linear-progress">
                <mu-linear-progress></mu-linear-progress>
            </mu-flex>
        </mu-container>
    </div>

</template>

<script>
    import TopBox from '../components/TabBox'
    import SuB from '../components/suB'
    export default {
        name: "SearchList",
        components:{
            TopBox,
            SuB
        },
        data(){
            return{
                list:[],
                isshows:''
            }
        },

        created(){
            console.log(this.$store.state.listName)
            let seach='/api/search?keyword='+this.$store.state.listName

            this.axios.get(seach).then(response => {
                this.list = response.data.books;
                this.isshows = this.list.books.length === 0;
                // console.log(this.list);
            }, err => {
                alert(err)
            })
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss">
.selist{
    .imgbox{
        position: absolute;
        text-align: center;
        top: 50%;
        left: 50%;
        width: 50%;
        margin-top: -100px;
        margin-left: -94px;
        color: #999999;

        img{
            margin-bottom:10px ;
            width: 100%;
            display: block;
        }
    }
    .loading {
        width: 100%;
        padding: 0;
        margin: 0;
        position: fixed;
        bottom: 57px;
        left: 0;
    }
}
</style>