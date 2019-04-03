<template>
    <div class="sub">
        <TopBox :name="names" :istopBox="true"></TopBox>
        <div>

            <div class="subtop">
                <span>热门</span>
                <span>新书</span>
                <span>好评</span>
                <span>完结</span>
                <span>包月</span>
            </div>
            <div class="subtop">
                <div class="subtopDiv">


                    <span @click="tabBox($event)" ref="tabBox">全部</span>
                    <span v-for="(item,i) in subcategories.mins" :key="i" @click="tabBoxs(i,$event)" ref="tabBoxs">
                        {{item}}
                    </span>
                </div>

            </div>

            <mu-load-more @refresh="refresh" :refreshing="refreshing" :loading="loading" @load="load">
            <SuB :list="txt.books" class="suB"></SuB>
            </mu-load-more>

        </div>
        <!--数据请求是动画-->
        <mu-container class="loading" v-if="$store.state.isShow">
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
        name: "SubClassification",
        props: ['names','genders'],
        components: {
            TopBox,
            SuB
        },

        data() {
            return {
                subcategories: {},
                texts: {},
                active: 0,
                intabBox: '',
                txt: {},
                loading:false,
                num:10,
                refreshing:false
            }
        },

        methods: {
            trim(s) {
                return s.replace(/(^\s*)|(\s*$)/g, "");
            },
            //封装一个请求api
            apis(){
                let subcategories = '/api/category-info?gender='+ this.genders+'&type=hot&major=' + this.names + '&minor=' + this.trim(this.intabBox) + '&start=0&limit='+this.num

                this.axios.get(subcategories).then(response => {
                    this.txt = response.data
                    // console.log(this.txt);
                }, err => {
                    alert(err)
                })
                // console.log(this);
            },

            //点击全部
            tabBox() {
                this.intabBox = '';
                //更新数据
                this.apis()
            },

            //点击其他的
            tabBoxs(i, event) {
                this.intabBox = event.target.innerText;
                //更新数据
                this.apis()


            },
            refresh () {
                this.refreshing = true;
                this.$refs.container.scrollTop = 0;
                setTimeout(() => {
                    this.refreshing = false;
                    this.text = this.text === 'List' ? 'Menu' : 'List';
                    this.num = 10;
                }, 2000)
            },
            load () {
                this.loading = true;
                setTimeout(() => {
                    this.loading = false;
                    this.num += 10;
                    this.apis()
                }, 2000)
            }
        },
        created() {

            let subcategoriess = '/api/sub-categories'

            let subcategories = '/api/category-info?gender=male&type=hot&major=' + this.names + '&minor=' + this.intabBox + '&start=0&limit=10'

            this.axios.get(subcategories).then(response => {

                this.txt = response.data
                console.log(this.txt);


            }, err => {
                alert(err)
            })


            this.axios.get(subcategoriess).then(response => {
                [...response.data.female, ...response.data.male, ...response.data.picture, ...response.data.press].map((item) => {
                    if (item.major === this.names) {
                        this.subcategories = item
                    }
                    // return this.subcategories


                })


                // console.log(this.subcategories);
            }, err => {
                alert(err)
            })
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss">
    .loading {
        width: 100%;
        padding: 0;
        margin: 0;
        position: fixed;
        bottom: 57px;
        left: 0;
    }
    .sub {
        position: absolute;
        width: 100%;
        height: 100%;
        .subtop {
            padding: 5px;
            border-bottom: 1px solid #eeeeee;
            background: white;
            color: black;
            width: 100%;
            overflow-x: auto;

            font-size: 12px;
            span {
                margin: 0 10px;

                font-size: 12px;
            }
            .subtopDiv {
                white-space: nowrap;
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

    .suB {
        padding-bottom: 30px;
    }

</style>