<template>
    <div class="PDFViewer-outer" v-if="isShow">
        <i class="el-icon-close" @click="toggleShowViewer"></i>
        <div class="PDFViewer-back">
            <iframe :src="src"></iframe>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        src: {
            required: true,
            type: String
        },
        isShow: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        toggleShowViewer() {
            this.$emit('update:isShow', !this.isShow);
        }
    }
};
</script>

<style lang="less" scoped>
.el-icon-close {
    position: absolute;
    left: 50%;
    margin-left: 560px;
    cursor: pointer;
    font-size: 40px;
    color: #fff;
    top: 10px;
}
.PDFViewer-outer {
    box-sizing: border-box;
    background-color: rgba(0, 0, 0, 0.6);
    position: fixed;
    height: 100vh;
    width: 100%;
    left: 0;
    top: 0;
    padding: 50px 0;
    z-index: 21000;
}
.PDFViewer-back {
    width: 1200px;
    height: 100%;
    margin: 0 auto;
    background-color: #fff;
}
.PDFViewer-outer iframe {
    width: 100%;
    height: 100%;
}
.PDFViewer-outer > .fa-close {
    position: absolute;
    left: 50%;
    margin-left: 560px;
    top: 10px;
    color: #fff;
    cursor: pointer;
}
</style>
