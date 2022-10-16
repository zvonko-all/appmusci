<template>
    <div class="playlist-container">
        <div @click="clickHow" :index="index" :isActivity="index==$store.state.count?true:false" class="playlist"
            v-for="(i,index) in $store.state.songs" :key="index">
            <div class="playlist-left">
                <img id="myImag" :src="i.songImag" />
            </div>
            <div class="playlist-right">
                <div id="song">{{i.songName}}</div>
                <div id="songer">{{i.songer}}</div>
            </div>
            <div v-if="index==$store.state.count" class="tip">正在播放</div>
        </div>
    </div>
</template>

<script>


export default {
    components: {

    },
    data() {
        return {

        }
    },
    methods: {
        clickHow() {
            let e = window.event || event
            e = e.currentTarget || e.srcElement
            this.$store.state.count = parseInt(e.getAttribute("index"))
            this.$store.state.idPlay = 1
            let musicObj = document.getElementById("player")
            musicObj.src = "http://v.api.aa1.cn/api/wymusic/index.php?id=" + this.$store.state.songs[this.$store.state.count].songId
            musicObj.play()
            this.$store.getters.clickPlay
        }
    },

    beforeRouteEnter(to, from, next) {
        next(vm => {
            document.documentElement.scrollTop = vm.scollPos
        })
    },
    beforeRouteLeave(to, from, next) {
        this.scollPos = document.documentElement.scrollTop
        next()
    }
}
</script>

<style>
.tip {
    float: right;
    vertical-align: middle;
    margin-right: 10px;
    line-height: 40px;
    margin-right: 10px;
    color: white;
}


#myImag {
    float: left;
    padding-left: 20px;
    vertical-align: middle;
    width: 40px;
}

.playlist-right {
    float: left;
    padding-left: 20px;
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

.playlist {
    overflow-y: auto;
    padding: 10px 0px;
    border-bottom: 1px solid white;
    margin: 0px 10px;
}

.playlist-container {
    margin-bottom: 53px;
}
</style>