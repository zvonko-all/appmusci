<template>
    <div class="one">
        <div><slot name="imags"></slot></div>
        <div id="text"><slot name="albumName"></slot></div>
    </div>
</template>

<script>
export default {

}
</script>

<style>
    #text{
        color: white;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }
</style>