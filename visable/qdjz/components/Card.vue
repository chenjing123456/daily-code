<template>
    <div class="card-item" @mouseover="toggleModal" @mouseout="toggleModal">
        <div class="flex-center">
            <slot name="view"></slot>
        </div>
        <div class="card-modal" v-show="showModal">
            <slot name="modal"></slot>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            showModal: false
        };
    },
    methods: {
        toggleModal(){
            this.showModal = !this.showModal
        }
    },
};
</script>

<style lang="less" scoped>
@import "../common/less/reset.less";
.card-item {
    position: relative;
    margin-top: 20px;
    margin-right: 20px;
    width: 150px;
    height: 150px;
    overflow: hidden;
    border-radius: 6px;
    text-align: center;
    background-color: #f0f0f0;
    border: 1px solid #ddd;

    .flex-center{
        .flex-center;
        height: 100%;
    }
    .card-modal {
        .flex-center;
        position: absolute;
        left: 0;
        top: 0;
        width: 150px;
        height: 150px;
        background-color: rgba(0, 0, 0, 0.5);
    }
}
</style>
