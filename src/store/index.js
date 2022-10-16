import Vuex from "vuex";
import Vue from "vue";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // 推荐列表
    recommend: [],
    // 播放列表详细信息
    songs: [],
    // 歌单
    gedan: [],
    // 正在播放的歌曲
    count: 0,
    // 是否播放
    idPlay: 0,
    // 播放地址
    playUrl: "",
    // 音乐标签
    musicDom: {},
    // 进度条dom
    processDom: {},
    // 总时长
    totalTime: 0,
    // 开始时间
    starTime: "00:00",
  },
  mutations: {
    // 渲染页面
    mountedPage(state, data) {
      state.recommend = data[0];
      state.gedan = data[1];
    },
    // 将歌曲渲染到播放列表
    mountedSongs(state, data) {
      state.songs = data;
    },
    // 获取共享dom
    getSpeDom(state, dom) {
      state.musicDom = dom[0];
      state.processDom = dom[1];
    }
  },
  // 相当于计算属性
  getters: {
    // 计算时间
    secodesToFormat(state) {
      let s = state.totalTime;
      if (s > 3600) {
        let h =
          parseInt(s / 3600) < 10
            ? "0" + parseInt(s / 3600)
            : parseInt(s / 3600);
        let m =
          parseInt((s - h * 3600) / 60) < 10
            ? "0" + parseInt((s - h * 3600) / 60)
            : parseInt((s - h * 3600) / 60);
        let sec =
          s - h * 3600 - m * 60 < 10
            ? "0" + s - h * 3600 - m * 60
            : s - h * 3600 - m * 60;
        return h + ":" + m + ":" + sec;
      } else {
        let m =
          parseInt(s / 60) < 10 ? "0" + parseInt(s / 60) : parseInt(s / 60);
        let sec =
          parseInt(s - m * 60) < 10
            ? "0" + parseInt(s - m * 60)
            : parseInt(s - m * 60);
        return m + ":" + sec;
      }
    },
    // 开始计算时长
    clickPlay(state, getters) {
      let processSlide = state.processDom;
      let playMusic = state.musicDom;
      let t;
      if (t != null) clearInterval(t);
      t = setInterval(() => {
        // 计算时长
        let playTime = parseInt(playMusic.currentTime);
        let durationTime = parseInt(playMusic.duration);

        processSlide.style.width = (playTime / durationTime) * 100 + "%";
        state.totalTime = playTime;

        state.starTime = getters.secodesToFormat;

        return 1;
      }, 100);
    }
  },
  // 异步操作
  actions: {}
});
