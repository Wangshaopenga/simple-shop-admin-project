<template>
    <div class="container">
        <div class="left-menu">
            <el-row>
                <el-col :span="12">
                    <el-aside width="null" class="menu">
                        <div class="title">
                            <img src="@/assets/images/default.jpg" />
                            少鹏商城
                        </div>
                        <el-menu
                            :default-active="route.path"
                            active-text-color="#409EFF"
                            text-color="#f5f6fa"
                            :router="true"
                        >
                            <el-menu-item index="/index/statistics">
                                <template #title>
                                    <el-icon><TrendCharts /></el-icon>
                                    <span>首页统计</span>
                                </template>
                            </el-menu-item>
                            <el-menu-item index="/index/classify">
                                <template #title>
                                    <el-icon><Menu /></el-icon>
                                    <span>分类管理</span>
                                </template>
                            </el-menu-item>
                            <el-menu-item index="/index/user">
                                <template #title>
                                    <el-icon><User /></el-icon>
                                    <div>用户管理</div>
                                </template>
                            </el-menu-item>
                            <el-menu-item index="/index/goods">
                                <template #title>
                                    <el-icon><TrendCharts /></el-icon>
                                    <span>商品管理</span>
                                </template>
                            </el-menu-item>
                            <el-menu-item index="/index/order">
                                <template #title>
                                    <el-icon><Coin /></el-icon>
                                    <span>订单管理</span>
                                </template>
                            </el-menu-item>
                            <el-menu-item index="/index/comment">
                                <template #title>
                                    <el-icon><ChatDotRound /></el-icon>
                                    <span>评论管理</span>
                                </template>
                            </el-menu-item>
                            <el-menu-item index="/index/slideshow">
                                <template #title>
                                    <el-icon><List /></el-icon>
                                    <span>轮播管理</span>
                                </template>
                            </el-menu-item>
                        </el-menu>
                    </el-aside>
                </el-col>
            </el-row>
        </div>
        <div class="right-view">
            <div class="nav">
                <div>王少鹏2020414382</div>
                <div class="icon">
                    <el-icon><Search /></el-icon>
                </div>
                <div class="icon">
                    <el-icon><QuestionFilled /></el-icon>
                </div>
                <div class="img">
                    <img src="@/assets/images/default.jpg" alt="" />
                </div>
                <div class="name">超级管理员</div>
                <div class="dev">
                    <el-button size="small" color="#fdcb6e">dev</el-button>
                </div>
                <div class="translate">
                    <img src="../assets/images/fanyi.png" alt="" />
                </div>
            </div>
            <div class="content">
                <div class="tag">
                    <div class="path">首页 / {{ route.name }}</div>
                    <span
                        style="
                            font-weight: 600;
                            font-size: 18px;
                            color: #111;
                            margin-left: 10px;
                        "
                        >{{ route.name }}</span
                    >
                </div>
                <router-view name="index" />
            </div>
        </div>
    </div>
</template>

<script setup>
import {
    TrendCharts,
    QuestionFilled,
    Bottom,
    Menu,
    List,
    Coin,
    ChatDotRound,
    User,
    Search,
} from "@element-plus/icons-vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
const store = useStore();
const router = useRouter();
const route = useRoute();
</script>

<style lang="scss" scoped>
.container {
    display: flex;
    .left-menu {
        width: 20%;
        min-height: 100vh;
        background-color: #2c3a47;
        color: #fff;
        user-select: none;
        .el-row {
            .el-col {
                background: #2c3a47;
                .menu {
                    overflow: hidden;
                    width: 200.5%;
                }
                .el-menu {
                    .el-menu-item {
                        background-color: #2c3a47;
                    }
                }
                .title {
                    height: 60px;
                    text-align: center;
                    color: #93b5cf;
                    line-height: 60px;
                    font-size: 28px;
                    font-weight: 600;
                    font-style: italic;
                    img {
                        width: 50px;
                        height: 50px;
                        border-radius: 50%;
                        position: relative;
                        left: -010px;
                    }
                }
            }
        }
    }
    .right-view {
        width: 80%;
        background: #edeff1;
        .nav {
            width: 100%;
            height: 40px;
            background: #fff;
            font-size: 18px;
            display: flex;
            text-align: center;
            line-height: 40px;
            justify-content: right;
            align-content: center;
            div {
                margin-right: 15px;
            }
            .img {
                img {
                    width: 30px;
                    height: 30px;
                    border-radius: 100%;
                    margin-top: 5px;
                }
            }
            .name {
                margin-left: -10px;
                font-size: 12px;
            }
            .translate {
                img {
                    width: 20px;
                    height: 20px;
                }
                margin-top: 5px;
                margin-right: 20px;
            }
        }
        .content {
            color: #95a5a6;
            font-size: 14px;
            margin-top: 5px;
            .tag {
                height: 60px;
                background: #fff;
                margin-bottom: 15px;
            }
        }
    }
}
</style>