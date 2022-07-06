<template>
    <div class="container">
        <div class="btn">
            <el-button
                type="primary"
                style="margin-left: 16px"
                @click="state.isOpen = true"
            >
                添加分类
            </el-button>
        </div>
        <el-dialog
            draggable
            v-model="state.isOpen"
            width="600px"
            title="添加分类"
        >
            <el-form class="form">
                <el-form-item>
                    <div class="form2">
                        <div class="select">
                            <div>父级分类</div>
                            <el-select
                                placeholder="请选择父级分类(不填写为添加父级分类)"
                                v-model="state.addData.pid"
                                style="width: 400px"
                            >
                                <el-option
                                    v-for="itme in state.data"
                                    :key="itme.id"
                                    :label="itme.name"
                                    :value="itme.id"
                                />
                            </el-select>
                        </div>
                        <div class="input">
                            <div>分类名称</div>
                            <el-input
                                v-model="state.addData.name"
                                placeholder="请输入分类名称"
                                clearable
                                style="width: 400px"
                            />
                        </div>
                    </div>
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="state.isOpen = false"> 取消 </el-button>
                    <el-button type="primary" @click="AddCategory">
                        添加
                    </el-button>
                </span>
            </template>
        </el-dialog>
        <el-dialog
            draggable
            v-model="state.isEdit"
            width="600px"
            title="编辑分类"
        >
            <el-form class="form">
                <el-form-item>
                    <div class="form2">
                        <div class="select">
                            <div>父级分类</div>
                            <el-select
                                placeholder="请选择父级分类(不填写为修改父级分类)"
                                v-model="state.editData.pid"
                                style="width: 400px"
                            >
                                <el-option
                                    v-for="itme in state.data"
                                    :key="itme.id"
                                    :label="itme.name"
                                    :value="itme.id"
                                />
                            </el-select>
                        </div>
                        <div class="input">
                            <div>分类名称</div>
                            <el-input
                                v-model="state.editData.name"
                                placeholder="请输入分类名称"
                                clearable
                                style="width: 400px"
                            />
                        </div>
                    </div>
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="state.isEdit = false"> 取消 </el-button>
                    <el-button type="primary" @click="EditCategory">
                        修改
                    </el-button>
                </span>
            </template>
        </el-dialog>
        <div class="list">
            <el-table
                :data="state.data"
                lazy
                row-key="id"
                :tree-props="{
                    children: 'children',
                    hasChildren: 'hasChildren',
                }"
                table-layout="auto"
            >
                <el-table-column prop="name" label="分类类型" />
                <el-table-column label="是否禁用">
                    <template #default="scope">
                        <el-switch
                            :model-value="scope.row.status == 1 ? true : false"
                            active-color="#13ce66"
                            inactive-color="#ff4949"
                            @click="isForbidden(scope.row)"
                        />
                    </template>
                </el-table-column>
                <el-table-column type="state.data" label="编辑">
                    <template #default="scope">
                        <el-button type="text" @click="getEditData(scope.row)">
                            编辑
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script setup>
import { reactive } from "vue";
import { ElMessage } from "element-plus";
import {
    getCategoryList,
    addCategory,
    editCategory,
    Forbidden,
} from "@/network/category";
const state = reactive({
    data: [],
    isOpen: false,
    addData: {
        name: "",
    },
    editData: {
        name: "",
        id: "",
    },
    isEdit: false,
    isForbidden: false,
});
const init = () => {
    getCategoryList().then((res) => {
        state.data = res;
    });
};
init();
const AddCategory = () => {
    addCategory(state.addData).then(
        (res) => {
            state.isOpen = false;
            init();
            ElMessage({
                message: "添加成功!",
                type: "success",
            });
        },
        (err) => {
            state.isOpen = false;
            ElMessage({
                message: "添加失败,请重试!",
                type: "error",
            });
        }
    );
    state.addData = {
        name: "",
    };
};
const getEditData = (p) => {
    state.isEdit = true;
    state.editData.id = p.id;
    if (p.pid != 0) {
        state.editData.pid = p.pid;
    }
};
const EditCategory = () => {
    editCategory(state.editData).then((res) => {
        state.isEdit = false;
        init();
        ElMessage({
            message: "修改成功!",
            type: "success",
        });
        (err) => {
            state.isEdit = false;
            ElMessage({
                message: "修改失败,请重试!",
                type: "error",
            });
        };
    });
    state.editData = {
        name: "",
        id: "",
    };
};
const isForbidden = (data) => {
    Forbidden(data.id).then((res) => {
        ElMessage({
            message: "修改成功!",
            type: "success",
        });
    });
    data.status = data.status == 1 ? 0 : 1;
};
</script>
<style lang="scss" scoped>
.container {
    display: flex;
    flex-direction: column;
    .list {
        width: 95%;
        background: #fafafa;
        margin-left: 25px;
        margin-top: 20px;
        .el-table {
            .el-table-column {
                .name {
                    margin-left: 20px;
                }
            }
        }
    }
    .form {
        font-size: 16px;
        .el-form-item {
            .form2 {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-content: center;
                .select {
                    border-top: 1px solid #bdc3c7;
                    div {
                        margin-top: 15px;
                    }
                }
                .input {
                    margin-top: 25px;
                }
            }
        }
    }
}
</style>