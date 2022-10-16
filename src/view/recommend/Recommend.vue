<template>
  <div class="recommend">
    <slider animation="normal" height="180px">
      <slider-item v-for="(i, index) in $store.state.recommend[1].TopRecommend.MainImg" :key="index">
        <img height="190px" :src="i">
      </slider-item>
    </slider>
    <div class="recommend-mid">
      <div v-for="(i, index) in $store.state.recommend[1].TopRecommend.MainTextAndImg" :key="index">
        <div><img :src="i.IconImg" /></div>
        <div>{{i.text}}</div>
      </div>
    </div>
    <span v-for="(i,index) in $store.state.gedan" :key="index">
      <playalbum :detailInfo="$store.state.gedan[index]" />
    </span>


  </div>
</template>

<script>
import Vue from "vue";
import EasySlider from "vue-easy-slider";
import playalbum from "../../components/playalbum/PlayAlbum"



Vue.use(EasySlider);

export default {
  components: {
    playalbum
  },
  data() {
    return {
      scollPos:0
    }
  },
  methods: {
   
  },
  mounted(){
      
  },
  beforeRouteEnter(to, from, next){
    next(vm=>{
      document.documentElement.scrollTop=vm.scollPos
    })
  },
  beforeRouteLeave(to,from,next){
    this.scollPos=document.documentElement.scrollTop
    next()
  }
}
</script>

<style>
.recommend {
  position: absolute;
  z-index: -10;
  padding-bottom: 53px;
}

.recommend-mid {
  display: flex;
  margin-top: 10%;
}

.recommend-mid div {
  flex: 1;
  text-align: center;
  color: white;
}
</style>