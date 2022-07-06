<template>
    <div class="container">
        <div class="serach">
            <div class="input">
                <div>
                    <div style="flex: 0.5; height: 1px"></div>
                    <span>姓名:</span>
                    <el-input
                        v-model="userListData.name"
                        style="width: 260px"
                        placeholder="请输入姓名"
                    />
                </div>
                <div>
                    <span>邮箱:</span>
                    <el-input
                        v-model="userListData.email"
                        style="width: 260px"
                        placeholder="请输入邮箱"
                    />
                </div>
            </div>
            <div class="btn">
                <el-button @click="reset">重置</el-button>
                <el-button @click="findUser">查询</el-button>
            </div>
        </div>
        <div class="list">
            <div class="header">
                <div class="space"></div>
                <div class="title">用户列表</div>
                <div class="operate">
                    <el-button @click="isAddUser = true" color="#409eff">
                        + 新建
                    </el-button>
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
                <el-table
                    lazy
                    row-key="id"
                    :data="data"
                    table-layout="auto"
                    :default-sort="{ prop: 'date', order: 'descending' }"
                    height="575px"
                >
                    <el-table-column label="头像">
                        <template #default="scope">
                            <el-image
                                style="
                                    width: 30px;
                                    border-radius: 50%;
                                    height: 30px;
                                "
                                :src="scope.row.avatar_url"
                                table-layout="auto"
                            />
                        </template>
                    </el-table-column>
                    <el-table-column label="姓名" prop="name" />
                    <el-table-column label="邮箱" prop="email" />
                    <el-table-column label="是否禁用">
                        <template #default="scope">
                            <el-switch
                                :model-value="
                                    scope.row.is_locked == 1 ? true : false
                                "
                                active-color="#13ce66"
                                inactive-color="#ff4949"
                                @click="locked(scope.row)"
                            />
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="创建时间"
                        sortable
                        prop="created_at"
                    />
                    <el-table-column label="操作">
                        <template #default="scope">
                            <el-button
                                type="text"
                                @click="getRowInfo(scope.row)"
                            >
                                编辑
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="page">
                <el-pagination
                    background
                    layout="prev, pager, next"
                    :total="pageTotal"
                    @current-change="currentChange"
                    :current-page="userListData.current"
                />
            </div>
        </div>
        <el-dialog v-model="isAddUser" title="添加用户" width="30%">
            <el-form
                ref="addForm"
                :model="addUserData"
                label-width="auto"
                label-position="top"
                :rules="rules"
            >
                <el-form-item prop="name" label="昵称">
                    <el-input
                        placeholder="请输入昵称"
                        v-model="addUserData.name"
                    />
                </el-form-item>
                <el-form-item prop="email" label="邮箱">
                    <el-input
                        placeholder="请输入邮箱"
                        v-model="addUserData.email"
                    />
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input
                        placeholder="请输入密码"
                        type="password"
                        v-model="addUserData.password"
                    />
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="isAddUser = false">取消</el-button>
                    <el-button type="primary" @click="AddUser(addForm)"
                        >添加</el-button
                    >
                </span>
            </template>
        </el-dialog>
        <el-dialog v-model="isEditUser" draggable title="编辑用户" width="30%">
            <el-form
                ref="addForm"
                :model="editUserData"
                label-width="auto"
                label-position="top"
                :rules="rules"
            >
                <el-form-item prop="name" label="昵称">
                    <el-input
                        placeholder="请输入昵称"
                        v-model="editUserData.name"
                    />
                </el-form-item>
                <el-form-item prop="email" label="邮箱">
                    <el-input
                        placeholder="请输入邮箱"
                        v-model="editUserData.email"
                    />
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="isEditUser = false">取消</el-button>
                    <el-button type="primary" @click="EditUser(addForm)">
                        修改
                    </el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script setup>
import { RefreshRight, Tools } from "@element-plus/icons-vue";
import { getUserList, addUser, isLocked, editUser } from "@/network/user";
import { reactive, ref } from "vue";
import { ElMessage } from "element-plus";
let data = ref([]);
const addForm = ref("");
let isAddUser = ref(false);
let isEditUser = ref(false);
let isLoading = ref(false);
let pageTotal = ref(100);
const addUserData = reactive({
    name: "",
    email: "",
    password: "",
});
const editUserData = reactive({
    id: "",
    name: "",
    email: "",
});
const userListData = reactive({
    current: 1,
    name: "",
    email: "",
});
const getRowInfo = (p) => {
    isEditUser.value = true;
    editUserData.id = p.id;
    editUserData.name = p.name;
    editUserData.email = p.email;
};
const init = () => {
    getUserList(userListData).then((res) => {
        data.value = res.data;
        pageTotal.value = res.meta.pagination.total;
    });
};
init();
const rules = reactive({
    name: [
        {
            required: true,
            message: "昵称不能为空!",
            trigger: "blur",
        },
    ],
    email: [
        {
            required: true,
            message: "邮箱不能为空!",
            trigger: "blur",
        },
        {
            type: "email",
            message: "请输入正确的邮箱",
            trigger: ["blur", "change"],
        },
    ],
    password: [
        {
            required: true,
            message: "密码不能小于6位!",
            trigger: "blur",
            min: 6,
        },
    ],
});
const AddUser = async (formEl) => {
    if (!formEl) return;
    await formEl.validate((valid) => {
        if (valid) {
            addUser(addUserData).then((res) => {
                if (res) {
                    ElMessage({
                        message: "添加成功!",
                        type: "success",
                    });
                    init();
                    isAddUser.value = false;
                }
            });
        }
    });
};
const EditUser = async (formEl) => {
    if (!formEl) return;
    await formEl.validate((valid) => {
        if (valid) {
            editUser(editUserData.id, {
                name: editUserData.name,
                email: editUserData.email,
            }).then((res) => {
                ElMessage({
                    message: "修改成功!",
                    type: "success",
                });
                init();
                isEditUser.value = false;
            });
        }
    });
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
const locked = (p) => {
    isLocked(p.id).then((res) => {
        console.log(res);
        p.is_locked = p.is_locked == 1 ? 0 : 1;
    });
};
const findUser = () => {
    userListData.current = 1;
    init();
    setTimeout(() => {
        ElMessage({
            message: "查询成功!",
            type: "success",
        });
    }, 1500);
};
const currentChange = (newSize) => {
    userListData.current = newSize;
    init();
};
const reset = () => {
    userListData.current = 1;
    userListData.email = "";
    userListData.name = "";
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
            div {
                display: flex;
                align-items: center;
                margin-right: 15px;
                span {
                    color: #000;
                    font-size: 16px;
                }
            }
        }
    }
    .list {
        width: 95%;
        margin: 5px auto;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
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
    }
}
.loading {
    transition: all 1.5s;
    transform: rotate(720deg);
}
</style>