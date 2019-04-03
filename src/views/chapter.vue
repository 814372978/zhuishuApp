<template>
    <div class="chapter">
        <TabBox :name="booktuis.name" :istopBox="true" :searchs="false"></TabBox>
        <div class="mulus">
            <div class="mulu-title">目录<span>共{{lengths}}章</span>
            </div>
            <div @click="dao">
                倒序
            </div>
        </div>
        <div>
            <div v-for="(item,i) in booktuis.chapters" :key="i" class="list"
                 @click="NovelView(i,item.link,$route.params.id)">
                <span class="i">{{i+1}}.</span><span>{{title(item.title)}}</span>
            </div>
        </div>
        <div>

        </div>
    </div>

</template>

<script>
    import TabBox from '../components/TabBox'

    export default {
        name: "chapter",
        components: {
            TabBox
        },
        data() {
            return {
                booktuis: {},
                lengths: '',
                link: '',
                bookyuans: {},


            }
        },
        methods: {
            title(title) {
                let titles = String(title).substring(5)
                return titles
            },
            dao() {
                this.booktuis.chapters.reverse()
            },
            NovelView(i, link, id) {

                this.link = encodeURIComponent(link)
                console.log(i);

                //小说请求
                this.$router.push({
                    name: 'linkBook',
                    params: {
                        id: id,
                        link: this.link,
                        index: i
                    }
                })


            }
        },
        created() {
            console.log(this.$store.state.id);

            // 书籍章节列表
            let booktui = '/api/book-chapters/' + this.$store.state.index

            this.axios.get(booktui).then(response => {
                this.booktuis = response.data
                this.lengths = response.data.chapters.length
                console.log('1', this.booktuis);
            }, err => {
                alert(err)
            })


        }
    }
</script>

<style lang="scss" rel="stylesheet/scss">

    .chapter {
        .mulus {
            display: flex;
            padding: 15px;
            justify-content: space-between;

            .mulu-title {
                font-size: 16px;
                font-weight: bold;
                span {
                    font-size: 12px;
                    font-weight: 100;
                    color: #717171;
                }
            }
        }
        .list {
            padding: 20px 10px;
            border-bottom: 1px solid #dddddd;
            font-size: 12px;
            color: #999;
            .i {
                margin-right: 10px;
            }
        }
    }
</style>