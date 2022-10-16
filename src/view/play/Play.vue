<template>
  <div class="container-page">
    <div class="container-page-top">
      <div>{{$store.state.songs[$store.state.count].songName}}</div>
      <div>{{$store.state.songs[$store.state.count].songer}}</div>
    </div>
    <div class="container-page-mid">
      <img :src="$store.state.songs[$store.state.count].songImag">
    </div>
    <div class="container-page-mid-opratoe">
      <div><img @click="preMusic" :src="$store.state.recommend[0].playList[0]" /></div>
      <div><img
          :src="$store.state.idPlay==0?$store.state.recommend[0].playList[1]:$store.state.recommend[0].playList[3]"
          @click="clickme" /></div>
      <div><img @click="nextMusci" :src="$store.state.recommend[0].playList[2]" /></div>
    </div>
    <div class="container-page-bot">
      <span>{{$store.state.starTime}}</span>
      <div id="backProcess">
        <span id="processContrl"></span>
      </div>
      <span>{{$store.state.songs[$store.state.count].duration}}</span>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      
    }
  },
  mounted(){
    let processSlide=document.getElementById("processContrl")
    let playMusic = document.getElementById("player")
    // 页面创建，将dom共享
    this.$store.commit("getSpeDom",[playMusic,processSlide])
  },
  methods: {
    
    preMusic() {
      if (this.$store.state.idPlay == 0)
        this.$store.state.idPlay = 1
      let musicObj = document.getElementById("player")
      if (this.$store.state.count != 0) {
        this.$store.state.count -= 1
        musicObj.src = "http://v.api.aa1.cn/api/wymusic/index.php?id=" + this.$store.state.songs[this.$store.state.count].songId
      } else {
        this.$store.state.count = this.$store.state.songs.length - 1
        musicObj.src = "http://v.api.aa1.cn/api/wymusic/index.php?id=" + this.$store.state.songs[this.$store.state.count].songId
      }
      musicObj.play()
      this.$store.getters.clickPlay
    },
    nextMusci() {
      if (this.$store.state.idPlay == 0)
        this.$store.state.idPlay = 1
      let musicObj = document.getElementById("player")
      if (this.$store.state.count != this.$store.state.songs.length - 1) {
        this.$store.state.count += 1
        musicObj.src = "http://v.api.aa1.cn/api/wymusic/index.php?id=" + this.$store.state.songs[this.$store.state.count].songId

      } else {
        this.$store.state.count = 0
        musicObj.src = "http://v.api.aa1.cn/api/wymusic/index.php?id=" + this.$store.state.songs[this.$store.state.count].songId
      }
      musicObj.play()
      this.$store.getters.clickPlay

    },
    clickme() {
      this.$store.state.idPlay = !this.$store.state.idPlay
      let musicObj = document.getElementById("player")
      if (musicObj.src.indexOf("localhost") > 0) {
        this.$store.state.playUrl = "http://v.api.aa1.cn/api/wymusic/index.php?id=" + this.$store.state.songs[this.$store.state.count].songId
        musicObj.src = this.$store.state.playUrl
      }
      if (musicObj.paused) {
        musicObj.play()
        this.$store.getters.clickPlay
      } else {
        musicObj.pause()
      }
    }
  }
}
</script>

<style>
.container-page-bot div {
  position: relative;
  display: inline-block;
}



.container-page {
  position: fixed;
  top: 7%;
  left: 0px;
  right: 0px;
  bottom: 0px;
  text-align: center;
}
#backProcess{
  background-color: aqua;
  height: 2px;
  width: 180px;
  margin: 0 10px;
  vertical-align: middle;
}

#processContrl {
  position:absolute;
  width: 0px;
  height: 2px;
  left: 0px;
  background-color: red;
}

.container-page-mid img {
  width: 50%;
  border-radius: 50%;
}

.container-page-mid-opratoe {
  position: absolute;
  bottom: 23%;
  left: 0px;
  right: 0px;
  display: flex;
}

.container-page-mid-opratoe div {
  flex: 1;
}

.container-page-top {
  position: absolute;
  top: 12%;
  left: 0px;
  right: 0px;
  color: white;
}

.container-page-mid {
  position: absolute;
  top: 25%;
  left: 0px;
  right: 0px;
}

.container-page-bot {
  position: absolute;
  bottom: 15%;
  left: 0px;
  right: 0px;
  color: white;
  height: 20px;
  line-height: 20px;
}


</style>