<template>
    <div class="recommend-bottom">
        <div id="title"><slot name="title">热门音乐</slot></div>
        <span name="recommend-info">
            <playalbumitem  v-for="(i, index) in detailInfo" :key="index">
                <img slot="imags" :src="i.ImgUrl" />
                <span slot="albumName">{{i.ImgName}}</span>
             </playalbumitem>
        </span>

    </div>
</template>

<script>
import playalbumitem from "./PlayAlbumItem.vue"
export default {
    components: {
    playalbumitem,
  },
  props:{
    detailInfo:Array
  }
  
}
</script>

<style>
#title {
    margin-left: 2.5%;
    font-size: 22px;
    color: white;
}

.recommend-bottom .one {
    float: left;
    width: 30%;
    margin-left: 2.5%;
    margin-top: 2.5%;
    text-align: center;
}

.recommend-bottom img{
    width: 100px;
    height: 110px;
}

.recommend-bottom {
    overflow: hidden;
    margin-top: 10%;
}
</style>