<template>
    <div class="home">
        <TopBOx :name="'搜索'"></TopBOx>
        <div class="Search">

            <div class="SearchBox">
                <mu-icon value="search" class="searchIcon"></mu-icon>
                <input type="text" placeholder="请输入搜索内容" ref="inputs" @input="complete">
            </div>
            <span @click="searchAll">确认</span>
            <div class="complete" v-show="iscompletes">
                <div v-for="(item,i) in completelist.keywords" :key="i" class="keywords" @click="autoCompletes(i,item)">
                    {{item}}
                </div>
             </div>
        </div>

        <div v-show="iscomplete">
            <HotWords :searchr="searchr" :title="'搜索热词'" @changes="changes" ref="hot" @inautoCompletes="autoCompletes"></HotWords>
            <HotWords :searchr="hotBooksr" :title="'热门推荐'" @changes="changea" ref="hotx" @inautoCompletes="autoCompletes"></HotWords>
            <div class="inputvalAll">
                <mu-list class="mu-lists">
                    <mu-list-item button :ripple="false">
                        <mu-list-item-title>历史记录</mu-list-item-title>
                        <mu-list-item-action>
                            <div class="mu-list-item-action-icon">
                                <mu-icon value="clear" @click="deletes()"></mu-icon>
                            </div>
                        </mu-list-item-action>
                    </mu-list-item>
                </mu-list>
                <div v-for="(item,i) in $store.state.listAll" :key="i" class="viewVal" ref="record">
                    {{item}}
                </div>
            </div>
        </div>
        <BottomTab></BottomTab>
    </div>
</template>

<script>
    import TopBOx from '../../components/TabBox'
    import HotWords from '../../components/HotWords'
    import BottomTab from '../../components/bottomTab'
    // import  {mapStore} from "vuex"
    export default {
        name: 'Search',
        data() {
            return {
                names: '',
                searchText: {},
                searchr: {},
                hotBooks: {},
                hotBooksr: {},
                completelist:{},
                iscomplete:true,
                iscompletes:false,
                list:[]
            }
        },
        components: {
            TopBOx,
            HotWords,
            BottomTab
        },
        computed:{

        },
        methods: {
            changes() {
                let num = parseInt(Math.random() * 100)
                if (num >= 10) {
                    console.log(num, num - 10)
                    let search = '/api/search-hotwords'
                    this.axios.get(search).then(response => {
                        this.searchText = response.data.searchHotWords
                        this.searchr = this.searchText.slice(num - 10, num)
                        this.$refs.hot.hidden()

                    }, err => {
                        alert(err)
                    })
                }
            },
            changea() {
                let num = parseInt(Math.random() * 24)
                if (num >= 7 && num < 24) {
                    console.log(num, num - 7)
                    let hotBooks = '/api/hot-books'
                    this.axios.get(hotBooks).then(response => {

                        this.hotBooks = response.data.newHotWords
                        this.hotBooksr = this.hotBooks.slice(num - 7, num)

                        this.$refs.hotx.hidden()

                    }, err => {
                        alert(err)
                    })
                }
            },
            searchAll() {
                // console.log(this.$store.state.listAll);
                if (this.$refs.inputs.value == ''||this.$refs.inputs.value ==null) {
                    alert('输入不能为空')
                } else {
                    this.$store.state.listName = this.$refs.inputs.value
                    // this.list.push(this.$store.state.listName)
                    console.log(this.$store.state);
                    // this.$store.state.listAll.push(this.$store.state.listName)



                    this.$router.push({
                        path: ('/SearchList'),
                    })
                    this.$refs.inputs.value = ''
                }
            },

            // //删除记录
            deletes(){

                this.$store.state.listAll=[]
                this.$refs.record.map((item)=>{
                    item.remove()
                });
            },

            //自动补全
            complete(){
                if (this.$refs.inputs.value){
                    this.iscomplete=false
                    this.iscompletes=true
                }
                else {
                    this.iscomplete=true
                    this.iscompletes=false


                }

                let complete='/api/auto-complete?query='+this.$refs.inputs.value
                this.axios.get(complete).then(response => {
                    this.completelist = response.data
                    console.log(this.completelist);
                }, err => {
                    alert(err)
                })
            },

            //选择补全
            autoCompletes(i,item){
                this.$refs.inputs.value=item;
                this.$store.state.listName=item
                console.log(this.$store.state.listAll);
                this.$router.push({
                    path: ('/SearchList'),
                })

                // this.$store.state.listAll.push(this.$store.state.listName)
            }
        },
        //api
        created() {
            //搜索热词
            let search = '/api/search-hotwords'
            this.axios.get(search).then(response => {

                this.searchText = response.data.searchHotWords
                this.searchr = this.searchText.slice(0, 15)


            }, err => {
                alert(err)
            })

            //热门推荐
            let hotBooks = '/api/hot-books'
            this.axios.get(hotBooks).then(response => {
                this.hotBooks = response.data.newHotWords
                this.hotBooksr = this.hotBooks.slice(0, 7)
            }, err => {
                alert(err)
            })
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    .Search {
        position: relative;
        width: 100%;
        span {
            position: absolute;
            right: 15px;
            top: 7px;
            color: #999;
        }

        .SearchBox {
            width: 80%;
            position: relative;
            margin: 10px 10px 0px 20px;

        }
        input {
            width: 100%;
            margin: 0 auto;
            display: block;
            padding-left: 30px;
            border-radius: 20px;
            border: 0;
            background: rgba(7, 17, 27, 0.1);
            height: 35px;
            font-size: 12px;
            outline: none;
        }
        .searchIcon {
            position: absolute;
            left: 9px;
            top: 10px;
            font-size: 18px;
        }
    }

    .inputvalAll {
        width: 100%;
        margin: 0 auto;
        color:#9b9ba3;
        .viewVal {
            padding: 6px 10px 10px;
            margin:0 17px;
            border-bottom: 1px solid #ddd;

        }
    }
    .complete{
        padding: 10px;
        width: 100%;
        height: 100%;
        background: #fafafa;

        .keywords{
            padding: 10px 0px 10px 30px;
        }
    }


</style>
