<template>
    <div class="playBar">
        <div class="container-play-left">
            <span>
                <slot name="songImg" ></slot>
            </span>
            <div class="container-play-left-title">
                <slot name="song"></slot>
                <slot name="songer"></slot>
            </div>
        </div>
        <div class="container-play-right" :v-show="false">
            <slot name="playList"></slot>
            <slot name="play"></slot>
            <slot name="playNext"></slot>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style>
* {
    margin: 0px;
    padding: 0px;
}
.playBar{
    height: 49px;
}
.container-play{
    overflow: hidden;
}

.container-play-left {
    float: left;
}


.container-play-right {
    position: absolute;
    right: 20px;
    height: 42px;
    line-height: 42px;
    vertical-align: middle;
}


.container-play-left-title {
    display: inline-block;
    vertical-align: middle;
}


.container-play-right img {
    width: 24px;
    padding-left: 10px;
    vertical-align: middle;
}
</style>