<template>
    <div class="box">
        <div class="container">
            <div class="content">
                <h1>少鹏商城</h1>
                <span class="n1" style="font-style: italic"
                    >购无限惊奇，度精彩人生。</span
                >
                <span class="n2" style="font-style: italic"
                    >打造专业、认真、负责的购物平台</span
                >
            </div>
            <div class="forms-container">
                <form class="sign-in-form" action="">
                    <h2 class="title">登录</h2>
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
                    <el-button @click="goLogin" size="large" round
                        >登录</el-button
                    >
                    <p class="social-text">Or Sign in with social platforms</p>
                    <div class="media">
                        <a @click="click" href="#" class="social-icon">
                            <i class="iconfont icon-QQ" />
                        </a>
                        <a href="#" class="social-icon">
                            <i class="iconfont icon-weixin" />
                        </a>
                        <a href="#" class="social-icon">
                            <i class="iconfont icon-github" />
                        </a>
                    </div>
                </form>
            </div>
        </div>
        <div class="bottom">
            <span></span>
        </div>
    </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { ElMessage, ElNotification } from "element-plus";
import { Lock, Message } from "@element-plus/icons-vue";
import { login } from "../network/user";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
const router = useRouter();
const store = useStore();
const userInfo = reactive({
    email: "",
    password: "",
});
const goLogin = () => {
    login(userInfo).then(
        (res) => {
            // 将Token保存包本地 window.localStorage setItme(key,value)  getItme(key)
            window.localStorage.setItem("token", res.access_token);
            //在vuex isLogin
            store.commit("setIsLogin", true);
            console.log(store.state.isLogin);
            userInfo.email = "";
            userInfo.password = "";
            ElMessage({
                title: "登陆成功",
                message: "登陆成功,少鹏商城欢迎您!",
                type: "success",
            });
            setTimeout(() => {
                router.push("/index/statistics");
            }, 1500);
        },
    );
};
</script>
<style lang="scss" scoped>
@import url("@/assets/css/iconfont.css");

.box {
    width: 100%;
    min-height: 100vh;
    position: relative;
    .container {
        user-select: none;
        position: relative;
        width: 100%;
        min-height: 99vh;
        background: #fff;
        overflow: hidden;
        background: url("../assets/images/desk.svg") no-repeat 90%;
        &::before {
            content: "";
            position: absolute;
            width: 2000px;
            height: 2000px;
            background: linear-gradient(-45deg, #3e4e88, #546296);
            border-radius: 50%;
            top: -10px;
            right: 48%;
            transform: translateY(-50%);
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
            left: 340px;
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
            .register {
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

            .social-text {
                padding: 0 0.7rem;
            }

            .media {
                display: flex;
                justify-content: center;
                .social-icon {
                    height: 46px;
                    width: 46px;
                    margin: 10px 0.5rem;
                    display: flex;
                    color: #333;
                    justify-content: center;
                    align-items: center;
                    text-decoration: none;
                    border: 1px solid #333;
                    border-radius: 50%;
                    transition: 0.3s;
                    &:hover {
                        color: #c6e6e8;
                        border: #c6e6e8 1px solid;
                    }
                }
            }
            .img {
                transform: translateY(-550px);
                position: relative;
            }
        }
    }
}
</style>
