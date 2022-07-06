<template>
    <div class="container">
        <!-- <div class="content">
                <h1>少鹏商城</h1>
                <span class="n1" style="font-style: italic"
                    >购无限惊奇，度精彩人生。</span
                >
                <span class="n2" style="font-style: italic"
                    >打造专业、认真、负责的购物平台</span
                >
            </div> -->
        <div class="forms-container">
            <form class="sign-in-form" action="">
                <h2 class="title">注册</h2>
                <div class="input-field">
                    <el-icon :size="20">
                        <Avatar />
                    </el-icon>
                    <input
                        v-model="userInfo.username"
                        type="text"
                        placeholder="Username"
                    />
                </div>
                <div class="input-field">
                    <el-icon :size="20">
                        <Message />
                    </el-icon>
                    <input
                        v-model="userInfo.email"
                        type="text"
                        placeholder="Email"
                    />
                </div>
                <div class="input-field">
                    <el-icon :size="20">
                        <Lock />
                    </el-icon>
                    <input
                        v-model="userInfo.password"
                        type="password"
                        placeholder="Password"
                    />
                </div>
                <router-link class="login" to="/login"
                    >已有账号,立即登录?</router-link
                >
                <el-button @click="goRegister" size="large" round
                    >注册</el-button
                >
            </form>
        </div>
    </div>
    <div class="bottom">
        <span></span>
    </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { Lock, Avatar, Message } from "@element-plus/icons-vue";
import { register } from "../network/user";
import { useStore } from "vuex";
const store = useStore();
const userInfo = reactive({
    username: "",
    email: "",
    password: "",
});
const goRegister = () => {};
</script>
<style lang="scss" scoped>
@import url("@/assets/css/iconfont.css");

* {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
}

.container {
    margin: 0;
    padding: 0;
    user-select: none;
    position: relative;
    width: 100%;
    min-height: 99vh;
    background: #fff;
    overflow: hidden;
    background: url("../assets/images/s.svg") no-repeat 10% 48%;
    &::before {
        content: "";
        width: 2000px;
        height: 2000px;
        background: linear-gradient(-45deg, #3e4e88, #546296);
        border-radius: 50%;
        position: absolute;
        top: 5px;
        left: 48%;
    }
    &::after {
        content: "少鹏商城打造一个专注与中国人民的购物平台";
        position: absolute;
        font-weight: 600;
        font-size: 26px;
        top: 80%;
        left: 60%;
        font-style:italic;
        color:#222;
    }
    .content {
        position: relative;
        font-size: 26px;
        color: #222;
        top: 100px;
        left: 100px;
        .n1 {
            display: block;
            margin-top: 60px;
            margin-left: 80px;
            color: #7f8fa6;
        }
        .n2 {
            display: block;
            margin-top: 260px;
            margin-left: -50px;
            color: #7f8fa6;
        }
    }
    .forms-container {
        position: absolute;
        height: 100%;
        width: 100%;
        top: 200px;
        left: -440px;
    }

    .sign-in-form {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        // position: relative;
        .title {
            font-size: 2.2rem;
            color: #444;
            margin-bottom: 20px;
        }
        .login {
            text-decoration: none;
            color: #7f8fa6;
            position: relative;
            top: -10px;
            left: 120px;
            font-size: 14px;
        }
        .input-field {
            max-width: 380px;
            width: 100%;
            height: 55px;
            background-color: #f0f0f0;
            margin-bottom: 18px;
            border-radius: 40px;
            display: grid;
            grid-template-columns: 15% 85%;
            padding: 0 0.4rem;

            .el-icon {
                left: 20px;
                top: 16px;
                color: #acacac;
            }

            input {
                background: none;
                border: none;
                outline: none;
                line-height: 1;
                font-weight: 600;
                font-size: 1.1rem;
                color: #333;
                &::-ms-reveal {
                    position: relative;
                    left: -15px;
                }
                &::placeholder {
                    color: #aaa;
                    font-weight: 500px;
                }
            }
        }

        .el-button {
            border-radius: 40px;
            width: 135px;
            height: 49px;
            font-size: 1.2rem;
            background: #6877ab;
            color: #fff;
            transition: 0.5s;
            margin-bottom: 10px;
            &:hover {
                background: #4d5984;
            }
        }
    }
}
</style>
