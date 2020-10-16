<template>
    <div style="display: flex">
        <div class="search-label" >
           {{labelName}}
        </div>
        <div style="flex:1">
            <slot></slot>
        </div>
    </div>
</template>
<script>
    export default {
        props:{
            labelName:{
                type:String
            }
        }
    }
</script>
<style type="less" scoped>
</style>