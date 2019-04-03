<template>
    <div class="home">
        <TopBOx :name="'分类'"></TopBOx>
        <mu-container class="demo-container">
            <div>
                <span class="title">男生</span>
                <classificationBox :textsAll="texts.male" :genders="'male'"></classificationBox>
            </div>
            <div>
                <span class="title" >女生</span>
                <classificationBox :textsAll="texts.female" :genders="'female'"></classificationBox>
            </div>
            <div>
                <span class="title">漫画</span>
                <classificationBox :textsAll="texts.picture" :genders="'picture'"></classificationBox>
            </div>
            <div>
                <span class="title">出版</span>
                <classificationBox :textsAll="texts.press" :genders="'press'"></classificationBox>
            </div>
        </mu-container>

        <BottomTab></BottomTab>



        <mu-container class="loading" v-if="this.$store.state.isShow">
            <mu-flex class="demo-linear-progress">
                <mu-linear-progress></mu-linear-progress>
            </mu-flex>
        </mu-container>



    </div>
</template>

<script>
    import TopBOx from '../../components/TabBox'
    import classificationBox from '../../components/classificationBox'
    import BottomTab from '../../components/bottomTab'
    export default {
        name: 'Class',
        data() {
            return {
                names: '',
                texts: {},
                linear: 30,
            }
        },
        components: {
            TopBOx,
            classificationBox, BottomTab
        },
        methods:{


        },
        created() {
            let api = '/api/categories'

            this.axios.get(api).then(response => {
                this.texts = response.data
                console.log(this.texts);
            }, err => {
                alert(err)
            })

        }
    }

</script>
<style lang="scss" rel="stylesheet/scss" scoped>

    .title {
        width: 100%;
        display: block;
        padding: 10px;
        border-bottom: 1px solid #ddd;
        font-weight: 600;
    }
    .demo-linear-progress {
        margin: 16px 0;
    }
    .loading{
        width: 100%;
        padding: 0;
        margin: 0;
        position: fixed;
        bottom: 40px;
        left: 0;
    }
</style>
