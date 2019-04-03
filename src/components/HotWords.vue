<template>
    <div>
        <mu-list class="mu-lists">
            <mu-list-item button :ripple="false">
                <mu-list-item-title>{{title}}</mu-list-item-title>

                <mu-list-item-action @click="change">


                    <div class="mu-list-item-action-icon">
                        换一批
                        <mu-icon value="loop" class="mu-list-item-action-icon"
                                 style="display: inline; position: relative; top: 2px"></mu-icon>
                    </div>
                </mu-list-item-action>
            </mu-list-item>
        </mu-list>

        <div class="Hot">
            <mu-circular-progress class="demo-circular-progress" :size="36" v-if="ss"></mu-circular-progress>
            <!--<mu-circular-progress class="demo-circular-progress" :size="36" v-if="sss"></mu-circular-progress>-->


            <div>
                 <span class="box" v-for="(item,i) in searchr" :key="i" @click="autoCompletes(i,item.word)">
                   {{ item.word}}
                </span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "HotWords",
        props: ['searchr', 'title'],
        data() {
            return {
                ss: false
            }
        },
        methods: {
            change() {
                this.ss = true
                this.$emit('changes')
            },
            autoCompletes(i,item){
                console.log(i, item);
                this.$emit('inautoCompletes',i,item)
            },
            hidden(){
                this.ss=false
            }
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss">
    .Hot {
        width: 95%;
        margin: 0 auto;
        position: relative;
        .demo-circular-progress {
            position: absolute;
            left: 50%;
            top: 50%;
            margin: -18px 0 0 -18px;
        }
        .box {
            padding: 5px 10px;
            background: #efeff4;
            color: #9b9ba3;;
            border-radius: 20px;
            display: inline-block;
            margin: 8px;
            font-size: 12px;
        }
    }

    .mu-lists {
        padding: 0;
        .mu-list-item-action-icon {
            font-size: 12px;
            text-align: center;

        }
    }
</style>