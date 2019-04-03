<template>
    <div>
        <TabBox :name="'书籍详情'" :istopBox="true" :searchs="false"></TabBox>
        <div class="bookCol">
            <mu-row>
                <mu-col span="3">
                    <div class="grid-cell">
                        <img :src="imgs(bookdetailsAll.cover)" alt="" class="auto-img">
                    </div>
                </mu-col>
                <mu-col span="9">
                    <div class="grid-cell">
                        <div>{{bookdetailsAll.title}}</div>
                        <div><span class="author">{{bookdetailsAll.author}}</span> |
                            <span>{{bookdetailsAll.minorCate}}</span> |
                            <span>{{num.substring(num.length-4,0)}}万个字</span></div>
                        <div><span v-show="bookdetailsAll._gg===false">{{time}}小时前更新</span> <span
                                v-show="bookdetailsAll._gg===true">完结</span></div>
                    </div>
                </mu-col>
            </mu-row>
        </div>
        <div class="button">
            <div class="buttonbox" @click="AddTo">
                <mu-button class="buttonBox"><span ref="adds">加入书架</span></mu-button>
            </div>
            <div class="buttonbox" @click="LookBook">
                <mu-button class="buttonBox" color="primary">开始阅读</mu-button>
            </div>
        </div>
        <div class="follower">
            <mu-row>
                <mu-col span="4">
                    <div class="grid-cell">
                        <div class="followerTitle">追人气</div>
                        <div class="followerText">{{bookdetailsAll.latelyFollower}}</div>
                    </div>
                </mu-col>
                <mu-col span="4">
                    <div class="grid-cell">
                        <div class="followerTitle">读者留存率</div>
                        <div class="followerText">{{bookdetailsAll.retentionRatio}}%</div>
                    </div>

                </mu-col>
                <mu-col span="4">
                    <div class="grid-cell">
                        <div class="followerTitle">
                            日更字数/天
                        </div>
                        <div class="followerText" :class="{followerText1:bookdetailsAll.serializeWordCount===0}">
                            {{bookdetailsAll.serializeWordCount}}
                        </div>
                    </div>

                </mu-col>
            </mu-row>
        </div>
        <div class="longIntroBox">
            <div class="longIntro" ref="longIntro">
                {{bookdetailsAll.longIntro}}
            </div>
            <mu-icon value="keyboard_arrow_down" class="longIntroTop" @click="taggleTop"
                     v-show="taggleTops===false"></mu-icon>
            <mu-icon value="keyboard_arrow_up" class="longIntroTop" @click="taggleTop"
                     v-show="taggleTops===true"></mu-icon>

        </div>
        <div class="mulu">
            <mu-list class="mu-lists">
                <mu-list-item button :ripple="false">
                    <mu-list-item-title>目录</mu-list-item-title>
                    <mu-list-item-action @click="chapters">
                        <div class="mu-list-item-action-icon">
                            <span v-show="bookdetailsAll._gg">[完结]</span>
                            {{bookdetailsAll.lastChapter}}

                            <mu-icon value="keyboard_arrow_right" class="mu-list-item-action-icon"
                                     style="display: inline; position: relative; top: 2px"></mu-icon>
                        </div>
                    </mu-list-item-action>
                </mu-list-item>
            </mu-list>
        </div>
        <div class="hot-comment">
            <mu-list class="mu-lists">
                <mu-list-item button :ripple="false">
                    <mu-list-item-title>热门书评</mu-list-item-title>
                    <mu-list-item-action>
                        <div class="mu-list-item-action-icon">

                            更多评论

                        </div>
                    </mu-list-item-action>
                </mu-list-item>
            </mu-list>
            <div class="hot-comment-boxs">
                <div v-for="(item,i) in bookping" :key="i" class="hot-comment-box">
                    <div class="hot-comment-img">
                        <img :src="imgs(item.author.avatar)" alt="" class="auto-img">
                    </div>
                    <div class="hot-comment-text">
                        <div>{{item.author.nickname}}</div>
                        <div>{{item.title}}</div>
                        <div>
                            <ElmStar :score="item.rating*2"></ElmStar>
                        </div>
                        <div>
                            {{item.content}}
                        </div>
                        <div>
                            {{times(item.updated)}}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div>
            <mu-list class="mu-lists">
            <mu-list-item button :ripple="false" style="border-left: 2px solid #ddd">
                <mu-list-item-title ><span style="font-weight: bold">你可能感兴趣</span></mu-list-item-title>
                <mu-list-item-action>
                    <div class="mu-list-item-action-icon">

                        更多

                    </div>
                </mu-list-item-action>
            </mu-list-item>
        </mu-list>
            <div class="imgbox">
                <div v-for="(item,i) in booktui" :key="i" class="imgboxs">
                    <div class="img">
                        <img :src="imgs(item.cover)" alt="" class="auto-img">
                    </div>
                    <div class="text">
                        <span>
                            {{item.title}}
                        </span>
                    </div>
                </div>
            </div>
        </div>
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
        <!--数据请求是动画-->
        <mu-container class="loading" v-if="this.$store.state.isShow">
            <mu-flex class="demo-linear-progress">
                <mu-linear-progress></mu-linear-progress>
            </mu-flex>
        </mu-container>
    </div>
</template>

<script>
    import TabBox from '../components/TabBox'
    import ElmStar from '../components/ElmStar'

    export default {
        name: "details",
        components: {
            TabBox,
            ElmStar
        },
        data() {
            return {
                bookdetailsAll: {},
                num: '',
                time: '',
                taggleTops: false,
                bookping: {},
                booktui:{},
                bookyuans:{},
                id:'',
                booktuis:{},
                link:'',
                idSeed:'',
                index :'',
                isAdd:this.$store.state.Add
            }
        },
        methods: {
            imgs(img) {
                return 'http://statics.zhuishushenqi.com' + img
            },
            times(timeing) {

                let ings = Math.floor((new Date().getTime() - new Date(timeing).getTime()) / (3600 * 1000 * 1000))
                if (ings > 60) {
                    return ings + '分钟前'
                } else if (ings < 60) {
                    return ings + '小时前'
                }
            },
            taggleTop() {
                this.taggleTops = !this.taggleTops
                if (this.taggleTops) {
                    this.$refs.longIntro.style.webkitLineClamp = 5;
                } else {
                    this.$refs.longIntro.style.webkitLineClamp = 3;
                }
            },
            chapters(){

                this.$router.push({
                    name: `chapter`,
                })

            },
            LookBook(){
                //小说请求
                this.link =encodeURIComponent(this.link)
                this.$router.push({
                    name: 'linkBook',
                    params: {

                        id: this.idSeed,
                        link: this.link,

                    }
                })
            },
            AddTo(){
                console.log(this.$store.state.Add);
                if (this.$store.state.Add){
                   this.$refs.adds.textContent='撤出书架';
                }
                else {
                    this.$refs.adds.textContent='加入书架';
                }
                this.$store.state.Add=!this.$store.state.Add
            }
        },
        computed: {},
        created() {
            // console.log(this.$store.state.id);
            let bookdetails = '/api/book-info/' + this.$store.state.id
            this.axios.get(bookdetails).then(response => {
                this.bookdetailsAll = response.data
                this.num = this.bookdetailsAll.wordCount + '';
                this.time = Math.floor((new Date().getTime() - new Date(this.bookdetailsAll.updated).getTime()) / (3600 * 1000))
                this.axios.interceptors.response.use(function (config) {
                    return config
                })
            }, err => {
                alert(err)
            })
            let reviews = '/api/book/reviews?book=' + this.$store.state.id + '&limit=2'
            this.axios.get(reviews).then(response => {
                this.bookping = response.data.reviews.slice(0, 2)
                // console.log(this.bookping);
            }, err => {
                alert(err)
            })

            let booktui = '/api/recommend/'+this.$store.state.id
            this.axios.get(booktui).then(response => {
                this.booktui = response.data.books.slice(0,4)
                // console.log(this.booktui);
            }, err => {
                alert(err)
            })
            let bookyuan = '/api/book-sources?view=summary&book='+this.$store.state.id

            this.axios.get(bookyuan).then(response => {
                this.bookyuans = response.data[0]
                this.$store.state.index=this.bookyuans._id
            }, err => {
                alert(err)
            })

            console.log(this.$store.state.index);
            // 书籍章节列表
            let booktuis = '/api/book-chapters/' + this.$store.state.index
            this.axios.get(booktuis).then(response => {
                this.booktuis = response.data;
                this.link=this.booktuis.chapters[0].link
                console.log(this.link);
            }, err => {
                alert(err)
            })



        }
    }
</script>

<style lang="scss" rel="stylesheet/scss">
    .auto-img {
        display: block;
        width: 100%;
    }

    .bookCol {
        padding: 15px;
        .grid-cell {
            margin-left: 17px;
            div {
                margin-bottom: 10px;
                .author {
                    color: red;
                }
            }
            div:nth-of-type(2) {
                font-size: 12px;
                color: #9c9c9c;
                span {
                    margin: 0 10px;
                }
                span:first-child {
                    margin-left: 0;
                }
            }
            div:nth-of-type(3) {
                font-size: 12px;
                color: #9c9c9c;
            }
        }
    }

    .button {
        width: 96%;
        .buttonbox {
            margin: 0 0 0 0;
            width: 45%;
            display: inline-block;
            .buttonBox {
                width: 100%;
            }
        }
        .buttonbox:first-child {
            margin: 0 17px;
        }

    }

    .follower {
        border-top: 1px solid #ebebeb;
        border-bottom: 1px solid #ebebeb;
        margin-top: 20px;
        padding: 20px 0;
        text-align: center;
        font-size: 12px;
        .followerTitle {
            color: #a5a5a5;
        }
        .followerText {
            color: black;
            font-size: 16px;
        }
        .followerText1 {
            color: #a5a5a5;
        }
    }

    .longIntroBox {
        width: 90%;
        margin: 0 auto;
        padding: 20px 10px 0 0;
        position: relative;
        .longIntro {
            line-height: 30px;
            font-size: 13px;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 3; //需要控制的文本行数
            overflow: hidden;

        }
        .longIntroTop {
            cursor: pointer;
            display: inline-block;
            position: absolute;
            right: -7px;
            bottom: -6px;
        }
    }

    .mu-item-title {
        width: 10%;
    }

    .mulu {
        margin-top: 20px;
        padding: 10px 0;
        border-bottom: 1px solid #ebebeb;
        border-top: 1px solid #ebebeb;
    }

    .hot-comment-boxs {
        padding: 0 10px;
        box-sizing: border-box;
    }

    .hot-comment-box {
        display: flex;
        .hot-comment-img {
            min-width: 40px;
            max-width: 40px;
            border-radius: 50%;
            margin-right: 12px;
            margin-top: 5px;
            img {
                border-radius: 50%;
            }
        }
        .hot-comment-text {
            width: 80%;

            font-size: 12px;
            margin-bottom: 10px;
            div {
                margin-bottom: 10px;
            }
            div:first-child {
                color: #a58d5e;

            }
            div:nth-of-type(2) {
                line-height: 1rem;
                font-weight: 700;

            }

            div:nth-of-type(4) {
                color: #999;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 3; //需要控制的文本行数
                overflow: hidden;
            }
        }
    }
   .imgbox{
       display: flex;
       .imgboxs{
           width: 20%;
           margin: 0 10px ;
           img{
               height: 90px;
           }


       }
       .text{
            white-space: nowrap;
           text-overflow: ellipsis;
           overflow: hidden;
           color: #626262;
           font-size: 13px;
           padding-bottom:10px ;
       }

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