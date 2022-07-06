<template>
    <div class="list">
        <div class="header">
            <div class="space"></div>
            <div class="title">图片列表</div>
            <div class="operate">
                <el-button @click="open" color="#409eff"> + 添加 </el-button>
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
        <el-table
            lazy
            row-key="id"
            :data="data"
            table-layout="auto"
            :default-sort="{ prop: 'date', order: 'descending' }"
            height="531"
        >
            <el-table-column label="轮播图片">
                <template #default="scope">
                    <el-image
                        style="width: 80px; height: 80px"
                        :src="scope.row.img_url"
                        table-layout="auto"
                    />
                </template>
            </el-table-column>
            <el-table-column label="标题" prop="title" />
            <el-table-column label="跳转连接" prop="url" />
            <el-table-column label="是否禁用">
                <template #default="scope">
                    <el-switch
                        active-color="#13ce66"
                        inactive-color="#ff4949"
                        :model-value="scope.row.status == 1 ? true : false"
                        inline-prompt
                        active-text="启用"
                        inactive-text="禁用"
                        size="large"
                        @click="locked(scope.row)"
                    />
                </template>
            </el-table-column>
            <el-table-column label="排序" prop="seq" />
            <el-table-column label="更新时间" prop="created_at" />
            <el-table-column label="操作">
                <template #default="scope">
                    <el-button type="text" @click="open(scope)">
                        编辑
                    </el-button>
                    <el-popconfirm
                        confirm-button-text="确定"
                        cancel-button-text="取消"
                        @confirm="delSlide(scope.row)"
                        title="是否删除该轮播图"
                    >
                        <template #reference>
                            <el-button type="text"> 删除 </el-button>
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
        <div class="page">
            <el-pagination
                background
                layout="prev, pager, next"
                :total="page.total"
                @current-change="currentChange"
            />
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
import { ref } from "vue";
import { ElMessage } from "element-plus";
import { RefreshRight, Plus, Tools } from "@element-plus/icons-vue";
import { getSlides, forbidSlide, deleteSlide } from "@/network/slideshow";
let isLoading = ref(false);
let isOpen = ref(false);
let data = ref([]);
let page = ref({
    total: 0,
    current: 1,
});
const init = () => {
    getSlides(page.current).then((res) => {
        data.value = res.data;
        page.value = res.meta.pagination;
        console.log(res);
    });
};
init();
const locked = (p) => {
    console.log(p);
    forbidSlide(p.id).then((res) => {
        console.log(res);
        p.status = p.status == 1 ? 0 : 1;
    });
};
let open = (p) => {
    isOpen.value = true;
};
const currentChange = (newSize) => {
    page.current = newSize;
    init();
};
const delSlide = (itme) => {
    deleteSlide(itme.id).then((res) => {
        console.log(res);
        ElMessage({
            title: "删除成功",
            message: "删除成功!",
            type: "success",
        });
    });
};
const f = (p) => {
    console.log(p);
};
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
</script>

<style lang="scss" scoped>
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
        margin: 5px auto;
    }
    .loading {
        transition: all 1.5s;
        transform: rotate(720deg);
    }
}
</style>