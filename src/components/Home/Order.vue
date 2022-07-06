<template>
    <div class="container">
        <div class="serach">
            <div class="input">
                <div class="space"></div>
                <div>
                    <span style="font-size: 14px">单号: &nbsp;&nbsp;</span>
                    <el-input
                        style="width: 200px"
                        placeholder="请输入订单单号"
                        v-model="serachInfo.order_no"
                    />
                </div>
            </div>
            <div class="btn">
                <el-button>重置</el-button>
                <el-button style="color: #fff" color="#00a8ff" @click="serach"
                    >查询</el-button
                >
            </div>
        </div>
        <div class="list">
            <div class="header">
                <div class="space"></div>
                <div class="title">订单列表</div>
                <div class="operate">
                    <el-icon
                        style="
                            vertical-align: middle;
                            cursor: pointer;
                            margin-left: 10px;
                        "
                        :size="20"
                        @click="refresh"
                        :class="{ loading: isLoading }"
                    >
                        <refresh-right />
                    </el-icon>
                    <el-icon
                        style="
                            vertical-align: middle;
                            cursor: pointer;
                            margin-left: 10px;
                        "
                        :size="20"
                    >
                        <Tools />
                    </el-icon>
                </div>
                <div class="space"></div>
            </div>
            <div>
                <el-table :data="data" style="width: 100%">
                    <el-table-column width="200" prop="order_no" label="单号" />
                    <el-table-column prop="user_id" label="用户" />
                    <el-table-column prop="amount" label="金额" />
                    <el-table-column prop="status" label="状态" />
                    <el-table-column
                        prop="created_at"
                        label="支付时间"
                        width="180"
                    />
                    <el-table-column label="操作">
                        <template #default="scope">
                            <el-button type="text" @click="f(scope.row)"
                                >详细</el-button
                            >
                            <el-button type="text" @click="f(scope.row)"
                                >发货</el-button
                            >
                        </template>
                    </el-table-column>
                </el-table>
                <div class="page">
                    <el-pagination
                        background
                        layout="prev, pager, next"
                        :total="page.total"
                        @current-change="currentChange"
                        :current-page="Number(serachInfo.current)"
                    />
                </div>
            </div>
        </div>
    </div>
    <el-dialog v-model="isOpen" title="提醒" width="30%">
        <span>功能正在完善中</span>
        <template #footer>
            <span class="dialog-footer">
                <el-button type="primary" @click="isOpen = false"
                    >确定</el-button
                >
            </span>
        </template>
    </el-dialog>
</template>

<script setup>
import { RefreshRight, Plus, Tools } from "@element-plus/icons-vue";
import { reactive, ref } from "vue";
import { getOder } from "@/network/order";
import { ElMessage } from "element-plus";
let isLoading = ref(false);
let data = ref([]);
let page = ref({
    total: 0,
});
let isOpen = ref(false);
let arr = ["", "下单", "支付", "发货", "过期"];
const serachInfo = reactive({
    current: "1",
    order_no: "",
});
const refresh = () => {
    isLoading.value = true;
    init();
    setTimeout(() => {
        isLoading.value = false;
        ElMessage({
            message: "刷新成功!",
            type: "success",
        });
    }, 1500);
};
const init = () => {
    getOder(serachInfo).then((res) => {
        data.value = res.data;
        page.value = res.meta.pagination;
        console.log(res.meta.pagination);
        data.value.forEach((i) => {
            i.status = arr[i.status];
        });
    });
};
const currentChange = (newSize) => {
    serachInfo.current = newSize;
    init();
};
init();
console.log(data.value);
const f = (t) => {
    isOpen.value = true;
};
const serach = () => {
    init();
};
</script>

<style lang="scss" scoped>
.container {
    display: flex;
    flex-direction: column;
    .serach {
        margin: 5px auto;
        width: 95%;
        height: 60px;
        background: #fafafa;
        text-align: 60px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .input {
            display: flex;
            align-items: center;
            justify-content: center;
            div {
                margin-right: 15px;
                span {
                    color: #000;
                    font-size: 16px;
                }
            }
            .btn {
                span {
                    display: inline-block;
                    font-size: 14px;
                    transform: translate(-10px, 6px);
                }
            }
        }
        .space {
            flex: 0.1;
            line-height: 40px;
        }
    }
    .list {
        width: 95%;
        margin: 5px auto;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-content: center;
        .header {
            height: 40px;
            color: #000;
            background: #fff;
            display: flex;
            justify-content: space-between;
            align-content: center;
            .space {
                flex: 0.1;
                line-height: 40px;
            }
            .title {
                flex: 4.5;
                line-height: 40px;
                font-size: 16px;
            }
            .operate {
                line-height: 40px;
                .el-button {
                    color: #fff;
                }
                .el-icon {
                    line-height: center;
                }
            }
        }
        .page {
            margin-top: 10px;
            transform: translateX(40%);
        }
    }
}
.loading {
    transition: all 1.5s;
    transform: rotate(720deg);
}
</style>