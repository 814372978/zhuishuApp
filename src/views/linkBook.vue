<template>
    <div class="linkBook" :class="[nums===1?'more':nums===2?'yejian':nums===3?'huyan':'']">
        <!--点击出现弹窗-->
        <div class="flexBox">
            <mu-flex class="mu-transition-row">
                <mu-slide-bottom-transition>
                    <div class="maskBottom" v-show="show1">

                        <div>
                            <div class="maskBottom_flex">
                                <span @click="pluss">Aa-</span>
                                <mu-flex fill style="padding: 0 16px;" class="maskBottom_flexing">
                                    <mu-slider v-model="size" :min="12" :max="32"/>
                                </mu-flex>
                                <span @click="reduces">Aa+</span>
                            </div>
                            <div class="maskBottomMoSi">
                                <span :class="[nums===1?'active':'']" @click="actives1()">默认</span>
                                <span :class="[nums===2?'active':'']" @click="actives2()">夜间</span>
                                <span :class="[nums===3?'active':'']" @click="actives3()">护眼</span>
                            </div>
                            <div class="maskBottomNext">

                                <span @click="uppers">上一章</span>
                                <span @click="open = !open">目录</span>
                                <span @click="lowers">下一章</span>

                            </div>
                        </div>
                    </div>
                </mu-slide-bottom-transition>
                <mu-slide-top-transition>
                    <div class="maskTop" v-show="show1">
                        <div class="topBoxs">
                            <mu-icon value="chevron_left" class="chevronLeft" @click="fan"></mu-icon>

                            <span>{{$store.state.listName}}</span>

                            <mu-icon value="menu" class="chevronRight"></mu-icon>

                            <div class="floatBok">
                                <mu-icon value="arrow_drop_up" class="drop_up"></mu-icon>


                                <li @click="oppensBookshelf">
                                    <mu-icon value="book"></mu-icon>
                                    书架
                                </li>
                                <li @click="oppens">
                                    <mu-icon value="assignment"></mu-icon>
                                    详情
                                </li>
                            </div>
                        </div>
                    </div>
                </mu-slide-top-transition>
            </mu-flex>

        </div>
        <mu-drawer :open.sync="open" :docked="docked" :right="position === 'right'">
            <div>
                <div v-for="(item,i) in booklist.chapters" :key="i" class="list" @click="newBook(item.link,item.isVip,i)">
                    <span class="i">{{i+1}}.</span><span>{{title(item.title)}}</span>
                    <mu-icon value="lock" style="float: right" v-show="item.isVip"></mu-icon>
                </div>
            </div>
        </mu-drawer>
        <div @click="inshow">
            <div>
                <div v-show="isVip">
                    <div class="title">{{linktitle}}</div>

                    <div class="text" ref="linkText" :style="{fontSize:size} ">
                        <p v-for="(item,i) in linktext" :key="i">
                            {{trim(item)}}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "linkBook",
        data() {
            return {
                docked: false,
                open: false,
                position: 'left',
                linkbook: {},
                linktext: {},
                linktitle: '',
                show1: false,
                name: '',
                booklist: {},
                minSize: 12,
                maxSize: 32,
                size: 20,
                nums: 1,
                active: true,
                indexs: 0,
                isVip: ''
            }
        },
        methods: {
            //章节标题
            title(title) {
                let titles = String(title).substring(5)
                return titles
            },
            //屏幕点击
            inshow() {
                this.show1 = !this.show1
                if (this.show1) {
                    document.body.style.overflow = 'hidden'
                } else {
                    document.body.style.overflow = ''
                }
            },
            //三个页面样式
            actives1() {
                this.nums = 1

            },
            actives2() {
                this.nums = 2

            },

            actives3() {
                this.nums = 3
            },
            //去掉空格
            trim(str) {
                return str.replace(/(^\s*)|(\s*$)/g, "");
            },
            //返回
            fan() {
                document.body.style.overflow = ''

                this.$router.go(-1);//返回上一层
            },

            //字体放大
            reduces() {

                if (this.size <= this.maxSize) {
                    this.size += 2
                } else {
                    return
                }

                this.$refs.linkText.style.fontSize = this.size + 'px';
            },
            //字体放小
            pluss() {
                if (this.size >= this.minSize) {
                    this.size -= 2
                } else {
                    console.log('1', this.minSize);
                }
                this.$refs.linkText.style.fontSize = this.size + 'px';
            },
            //章节点击
            newBook(link, isVip,i) {
                if (!isVip) {

                    this.indexs=i
                    this.link = encodeURIComponent(link)
                    let text = '/api/chapters/' + this.link
                    this.axios.get(text).then(response => {
                        this.linkbook = response.data
                        this.linktext = response.data.chapter.cpContent.split('。')
                        this.linktitle = response.data.chapter.title
                        this.open = false;
                        this.show1 = false;

                        // console.log('1', this.$route.params.link,this.$route.params.id);
                    }, err => {
                        alert(err)
                    })
                }
            },
            //上一章
            uppers() {
                if (this.indexs >= 0) {
                    this.indexs--
                    let newBook = this.booklist.chapters[this.indexs]
                    this.link = encodeURIComponent(newBook.link)
                    let text = '/api/chapters/' + this.link
                    this.axios.get(text).then(response => {
                        this.linkbook = response.data
                        this.linktext = response.data.chapter.cpContent.split('。')
                        this.linktitle = response.data.chapter.title
                        this.open = false;
                        this.show1 = false;

                        // console.log('1', this.$route.params.link,this.$route.params.id);
                    }, err => {
                        alert(err)
                    })
                }
                else {
                    return this.indexs
                }
                document.body.style.overflow = ''
            },
            // 下一章
            lowers() {
                if (this.indexs >= 0) {
                    this.indexs++;

                    let newBook = this.booklist.chapters[this.indexs]
                    this.link = encodeURIComponent(newBook.link)
                    let text = '/api/chapters/' + this.link
                    this.axios.get(text).then(response => {
                        this.linkbook = response.data
                        this.linktext = response.data.chapter.cpContent.split('。')
                        this.linktitle = response.data.chapter.title
                        this.open = false;
                        this.show1 = false;

                        // console.log('1', this.$route.params.link,this.$route.params.id);
                    }, err => {
                        alert(err)
                    })
                }
                document.body.style.overflow = ''


            },
            oppens() {
                document.body.style.overflow = ''
                this.$router.push({
                    path: '/details'
                })
                // this.$store.state.id;
            },
            oppensBookshelf() {
                document.body.style.overflow = ''
                this.$router.push({
                    path: '/'
                })
            }
        },
        //页面加载前数据请求
        created() {
            // console.log(this.$route.params.link);
            //书籍章节内容
            let text = '/api/chapters/' + this.$route.params.link
            this.axios.get(text).then(response => {
                this.linkbook = response.data
                this.linktext = response.data.chapter.cpContent.split('。')
                this.linktitle = response.data.chapter.title
                // console.log('1', this.$route.params.link, this.$route.params.id);
            }, err => {
                alert(err)
            })

            console.log(this.$store.state.index);
            //书籍章节列表
            let booktui = '/api/book-chapters/' + this.$store.state.index

            this.axios.get(booktui).then(response => {
                this.booklist = response.data
                this.isVip = this.booklist.chapters[this.indexs];
            }, err => {
                alert(err)
            })
            // console.log(this.booklist.chapters);
        }

    }
</script>

<style lang="scss" rel="stylesheet/scss">
    .ishows {

    }

    .flexBox {

    }

    .more {

        background-color: #eee6dd;
        color: #5c5d58;
    }

    .yejian {
        background-color: #0c0c0c;
        color: #888;;
    }

    .huyan {
        background-color: #b8cd8d;
        color: #0c2e10;
    }

    .linkBook {
        padding: 15px;

        .clickBox {
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
        }
        .maskBottom {
            background: rgba(50, 51, 52, .9);;
            width: 100%;
            height: 25%;
            position: fixed;
            bottom: 0;
            left: 0;
            .maskBottom_flex {
                margin-bottom: 10px;
                display: flex;
                padding: 10px;
                span {
                    font-size: 22px;
                    color: white;
                }
                .maskBottom_flexing {
                    position: relative;
                    top: 5px;
                }
            }
            .maskBottomMoSi {
                margin-bottom: 10px;

                display: flex;
                align-items: center;
                justify-content: center;
                span {
                    padding: 5px 40px;
                    border-radius: 5px;
                    margin: 0 5px;
                    border: 1px solid #535353;
                    color: whitesmoke;
                }
                span.active {
                    border: 1px solid #ff3d3c;
                    color: #ff3d3c;
                }
            }
            .maskBottomNext {
                display: flex;
                justify-content: space-between;
                padding: 20px;
                color: whitesmoke;
                line-height: 20px;

                span:first-child, span:last-child {
                    font-size: 16px;
                    color: whitesmoke;
                }

            }
        }
        .maskTop {
            background-color: rgba(50, 51, 52, .9);
            width: 100%;
            /*height:7%;*/
            position: fixed;
            top: 0;
            left: 0;
            .topBoxs {
                width: 100%;
                text-align: center;
                padding: 10px;
                line-height: 20px;
                color: white;
                span {
                    position: relative;
                    left: -5px;
                }
                .chevronLeft {
                    float: left;
                    position: relative;
                    top: -2px;
                }
                .chevronRight {
                    float: right;
                    position: relative;
                    top: -2px;
                }
            }
        }
        .title {
            font-size: 24px;
        }
        .text {
            font-size: 20px;
            line-height: 1.5;
            margin: .13333rem 0;
            text-indent: 2em;
            text-align: justify;
        }
        .floatBok {
            position: absolute;
            top: 52px;
            right: 19px;
            background-color: rgba(50, 51, 52, .9);
            color: #ababab;
            font-size: 12px;
            border-radius: 7px;

            .drop_up {
                position: absolute;
                top: -17px;
                right: -3px;
                color: rgba(0, 0, 0, .6);
                font-size: 30px;

            }

            li {
                list-style: none;
                padding: 5px 30px;
                border-bottom: 1px solid rgba(221, 221, 221, 0.25);
                i {
                    font-size: 14px;
                    margin-right: 5px;
                    position: relative;
                    top: 3px;
                }
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

</style>