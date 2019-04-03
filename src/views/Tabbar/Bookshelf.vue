<template>
  <div class="home">
    <TopBOx :name="'书架'"></TopBOx>
    <BottomTab></BottomTab>
  </div>
</template>

<script>
  import TopBOx from '../../components/TabBox'
  import BottomTab from '../../components/bottomTab'
export default {
  name: 'home',
    data(){
      return{
          names:''
      }
    },
  components: {
      TopBOx,BottomTab

  }
}
</script>
