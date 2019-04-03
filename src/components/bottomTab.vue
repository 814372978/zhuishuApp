<template>
    <div>
        <mu-container style="padding: 0 " class="bottomTab">
            <mu-bottom-nav>
                <mu-bottom-nav-item v-for="(item,i) in tabbar" :key="i" :title="item.name" :icon="item.imgs" :to="{name:item.to,  params: { names: item.name}}" exact>
                </mu-bottom-nav-item>
            </mu-bottom-nav>
        </mu-container>
    </div>
</template>

<script>
    export default {
        name: "bottomTab",
     data() {
        return {
            tabbar: [
                {name: '书架', to: 'Bookshelf', imgs: 'book'},
                {name: '分类', to: 'Classification', imgs: 'dashboard'},
                {name: '排行', to: 'Ranking', imgs: 'equalizer'},
                {name: '搜索', to: 'Search', imgs: 'search'}

            ]
        }
    },
    }
</script>

<style lang="scss" rel="stylesheet/scss">
    .tabbar {
        display: flex;
        position: fixed;
        bottom: 0;
        left: 0;
        background: rgba(7, 17, 27, .1);
        padding: 10px 0;
        font-size: 12px;

        .tabbaritem {
            flex: 1;
            text-align: center;

        }
        .tabbarimg {
            margin: 0 auto;

            width: 30%;
        }
    }
    .tabbaritem-link {
        text-decoration: none;
        color: black;
    }
    .active {
        color: #548eff;
    }
    .bottomTab {
        position: fixed;
        bottom: 0;
        left: 0;
        border-top: 1px solid rgba(7, 17, 27, .1);
    }
</style>