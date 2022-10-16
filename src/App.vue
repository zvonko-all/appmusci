<template>
  <div id="app" v-if="$store.state.songs.length!=0" v-cloak>
    <audio id="player" src="" @ended="handleNext"></audio>
    <div class="container-nav">
      <router-link tag="div" to="/recommend/">音乐推荐</router-link>
      <router-link tag="div" to="/play">播放器</router-link>
      <router-link tag="div" to="/playlist">播放列表</router-link>
    </div>
    <div class="bom-dian"></div>
    <div class="mid-flexd">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
    <div class="container-play">
      <div class="container-play-img">
        <img @click="toPlayListPage" :src="$store.state.songs[$store.state.count].songImag" />
      </div>
      <div style="width:170px">
        <div id="song">{{$store.state.songs[$store.state.count].songName}}</div>
        <div id="songer">{{$store.state.songs[$store.state.count].songer}}</div>
      </div>
      <div class="playbarOpa">
        <span>
          <img @click="toPlayPage" :src="$store.state.recommend[0].bottomCases[0]" />
        </span>
        <span>
          <img id="midImg" @click="playMusic"
            :src="$store.state.idPlay==0?$store.state.recommend[0].bottomCases[1]:$store.state.recommend[0].bottomCases[3]" />
        </span>
        <span>
          <img @click="nextMusic" :src="$store.state.recommend[0].bottomCases[2]" />
        </span>
      </div>
    </div>

  </div>
</template>

<script>
import { myaxios } from "./network/request"

export default {
  name: 'App',
  components: {
  },
  data() {
    return {
      myList: [],
      timer: {},
    }
  },
  methods: {
    // 公共函数
    startPlay() {
      let musicObj = document.getElementById("player")
      musicObj.src = "http://v.api.aa1.cn/api/wymusic/index.php?id=" + this.$store.state.songs[this.$store.state.count].songId
      musicObj.play()
      this.$store.getters.clickPlay
    },
    // 自动播放下一首
    handleNext() {
      this.$store.state.count += 1
      this.startPlay()
    },
    // 下一首歌曲
    nextMusic() {
      if (this.$store.state.idPlay == 0)
        this.$store.state.idPlay = 1
      this.$store.state.count += 1
      this.startPlay()
    },
    // 跳到播放页
    toPlayListPage() {
      this.$router.push("/play")
    },
    // 跳到播放列表
    toPlayPage() {
      this.$router.push("/playlist")
    },
    // 数组切割
    group(array, subGroupLength) {
      let index = 0;
      let newArray = [];
      while (index < array.length) {
        newArray.push(array.slice(index, index += subGroupLength));
      }
      return newArray;
    },
    // 播放音乐
    playMusic() {
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
  },

  // app渲染完成,数据也要获取到
  created() {
    // 页面刷新
    if (window.performance.navigation.type == 1) {
      this.$router.replace({ path:'/' })
    }
  },
  mounted() {

    // 获取推荐页面得信息
    myaxios({
      url: "/AppMusic/Api/GetMainInfo.php?fileName=Main",
      method: "get"
    }).then(data => {
      let mylist = this.group(data.data.data[2].BottomRecommend, 6)
      this.$store.commit("mountedPage", [data.data.data, mylist]);
    }).catch(err => {
      console.log(err);
    });


    // 获取详细页面的信息
    myaxios({
      url: "/AppMusic/Api/GetMainInfo.php?fileName=Song",
      method: "get"
    }).then(data => {
      this.$store.commit("mountedSongs", data.data);
    }).catch(err => {
      console.log(err);
    });

  }
}
</script>

<style>
#midImg {
  padding: 0px 10px;
}

#song {
  width: 140px;
  color: white;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

#songer {
  width: 140px;
  font-size: 14px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  color: #b9b9b9;
}

.playbarOpa img {
  width: 30px;
}

.container-play-img img {
  width: 40px;
  height: 40px;
  margin: 5px 10px;
  vertical-align: middle;
}

.container-play>div {
  display: inline-block;
  vertical-align: middle;
}

[v-cloak] {
  display: none;
}

body {
  overflow-x: hidden;
}

* {
  margin: 0px;
  padding: 0px;
}

.bom-dian {
  height: 42.70px;
}

.mid-flexd {
  overflow: hidden;
}

.container-play {
  position: fixed;
  bottom: 0px;
  left: 0px;
  right: 0px;
  background-color: #5c5858;
  overflow: hidden;
  z-index: 1200000;
}

body {
  background-color: #171717;
}

.container-nav {
  position: fixed;
  left: 0px;
  right: 0px;
  display: flex;
  background-color: #171717;
}

.container-nav div {
  flex: 1;
  color: white;
  padding: 10px 0;
  text-align: center;
  border-bottom: 2px solid white;
  background-color: #171717;
}

div .activity {
  border-bottom: 2px solid #b5b5b5;
  color: #b5b5b5;
}
</style>
