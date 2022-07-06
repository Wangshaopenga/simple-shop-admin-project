<template>
    <div class="container">
        <div class="data">
            <div>用户数</div>
            <span style="color:#16a085">{{state.data.users_count}}</span>
        </div>
        <div class="data">
            <div>商品数</div>
            <span style="color:#e74c3c">{{state.data.goods_count}}</span>
        </div>
        <div class="data">
            <div>订单数</div>
            <span style="color:#3498db">{{state.data.order_count}}</span>
        </div>
    </div>
</template>

<script setup>
import {onMounted, reactive} from 'vue'
import { getData } from '@/network/statistics';
const state = reactive({
    data:{}
});
onMounted(()=>{
    getData().then(res=>{
        state.data=res;
    })
})
</script>

<style lang="scss" scoped>
.container {
    display: flex;
    justify-content: space-around;
    .data {
        margin-top: 20px;
        width: 340px;
        height: 110px;
        background: #fff;
        font-size: 14px;
        color:#acacac;
        div {
            margin-top: 15px;
            margin-left: 20px;
        }
        span {
            font-size: 26px;
            display: block;
            margin-top: 15px;
            margin-left: 30px;
        }
    }
}
</style>