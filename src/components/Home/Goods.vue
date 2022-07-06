<template>
    <div class="container">
        <div class="serach">
            <div class="input">
                <div class="space"></div>
                <div>
                    <span style="font-size: 14px">商品名: &nbsp;&nbsp;</span>
                    <el-input
                        v-model="goodsListData.title"
                        style="width: 200px"
                        placeholder="请输入商品名"
                    />
                </div>
                <div class="btn">
                    <span>是否推荐:</span>
                    <el-radio-group v-model="goodsListData.is_recommend">
                        <el-radio-button
                            @click.prevent="cancelIsRecommend(0)"
                            :label="0"
                        >
                            未推荐
                        </el-radio-button>
                        <el-radio-button
                            @click.prevent="cancelIsRecommend(1)"
                            :label="1"
                        >
                            已推荐
                        </el-radio-button>
                    </el-radio-group>
                </div>
                <div class="btn">
                    <span>是否上架:</span>
                    <el-radio-group v-model="goodsListData.is_on">
                        <el-radio-button
                            @click.prevent="cancelIsOn(0)"
                            :label="0"
                        >
                            未上架
                        </el-radio-button>
                        <el-radio-button
                            @click.prevent="cancelIsOn(1)"
                            :label="1"
                        >
                            已上架
                        </el-radio-button>
                    </el-radio-group>
                </div>
            </div>
            <div class="btn">
                <el-button @click="reset">重置</el-button>
                <el-button
                    @click="serachGoods"
                    style="color: #fff"
                    color="#00a8ff"
                    >查询</el-button
                >
            </div>
        </div>
        <div class="list">
            <div class="header">
                <div class="space"></div>
                <div class="title">商品列表</div>
                <div class="operate">
                    <el-button @click="isAddGoods = true" color="#409eff">
                        + 添加
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
            <el-table
                lazy
                row-key="id"
                :data="data"
                table-layout="auto"
                :default-sort="{ prop: 'date', order: 'descending' }"
                height="531"
            >
                <el-table-column label="图片">
                    <template #default="scope">
                        <el-image
                            style="width: 50px; height: 50px"
                            :src="scope.row.cover_url"
                            table-layout="auto"
                        />
                    </template>
                </el-table-column>
                <el-table-column fixed label="商品名" prop="title" />
                <el-table-column label="价格" prop="price" />
                <el-table-column label="库存" prop="stock" />
                <el-table-column label="销量" prop="sales" />
                <el-table-column label="是否上架">
                    <template #default="scope">
                        <el-switch
                            :model-value="scope.row.is_on == 1 ? true : false"
                            active-color="#13ce66"
                            inactive-color="#ff4949"
                            @click="locked(scope.row)"
                        />
                    </template>
                </el-table-column>
                <el-table-column label="是否推荐">
                    <template #default="scope">
                        <el-switch
                            :model-value="
                                scope.row.is_recommend == 1 ? true : false
                            "
                            active-color="#13ce66"
                            inactive-color="#ff4949"
                            @click="recommend(scope.row)"
                        />
                    </template>
                </el-table-column>
                <el-table-column label="创建时间" sortable prop="created_at" />
                <el-table-column label="操作">
                    <template #default="scope">
                        <el-button type="text" @click="getRowInfo(scope.row)">
                            编辑
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="page">
                <el-pagination
                    background
                    layout="prev, pager, next"
                    :total="pageTotal"
                    @current-change="currentChange"
                    :current-page="goodsListData.current"
                />
            </div>
        </div>
        <el-dialog width="400px" v-model="isAddGoods" title="添加商品">
            <el-form
                ref="addGoods"
                label-width="auto"
                label-position="top"
                :model="addGoodsData"
            >
                <el-form-item label="分类">
                    <el-cascader
                        clearable
                        placeholder="请选择"
                        :props="selectProps"
                        :options="goodsCategoryList"
                        v-model="addGoodsData.category_id"
                        @click="f(goodsCategoryList)"
                    />
                </el-form-item>
                <el-form-item label="商品名">
                    <el-input
                        v-model="addGoodsData.title"
                        clearable
                        placeholder="请输入商品名称"
                    />
                </el-form-item>
                <el-form-item label="描述">
                    <el-input
                        v-model="addGoodsData.description"
                        autosize
                        type="textarea"
                        placeholder="请输入商品描述"
                    />
                </el-form-item>
                <el-form-item label="价格">
                    <el-input
                        v-model="addGoodsData.price"
                        clearable
                        placeholder="请输入商品价格"
                    />
                </el-form-item>
                <el-form-item label="库存">
                    <el-input
                        v-model="addGoodsData.stock"
                        clearable
                        placeholder="请输入商品库存量"
                    />
                </el-form-item>
                <el-form-item label="封面">
                    <el-upload
                        ref="uploadRef"
                        class="upload-demo"
                        action="/api/common/upload"
                        :auto-upload="false"
                        :on-success="handleChange"
                    >
                        <template #trigger>
                            <el-button type="primary">选择图片</el-button>
                        </template>
                        <template #tip>
                            <div
                                style="
                                    color: #acacac;
                                    font-size: 12px;
                                    margin-left: 20px;
                                "
                            >
                                jpg/png文件大小必须小于500kb
                            </div>
                        </template>
                    </el-upload>
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="isAddGoods = false"> 取消 </el-button>
                    <el-button type="primary" @click="AddGoods">
                        添加
                    </el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script setup>
import { RefreshRight, Plus, Tools } from "@element-plus/icons-vue";
import {
    getGoods,
    addGoods,
    changeIsOn,
    changeIsRecommend,
} from "@/network/goods";
import { reactive, ref } from "vue";
import { ElMessage, UploadInstance } from "element-plus";
import { getCategoryList } from "@/network/category";
let data = ref([]);
let isLoading = ref(false);
let isAddGoods = ref(false);
let pageTotal = ref(1);
let goodsCategoryList = ref([]);
const goodsListData = reactive({
    current: 1,
    title: "",
    is_on: "",
    is_recommend: "",
});
const addGoodsData = reactive({
    title: "",
    description: "",
    price: "",
    stock: "",
    cover: "",
    details: "1",
    category_id: "",
});
const selectProps = {
    label: "name",
    value: "id",
    expandTrigger: "hover",
};
const cancelIsRecommend = (text) => {
    if (goodsListData.is_recommend === text) {
        goodsListData.is_recommend = "";
    } else {
        goodsListData.is_recommend = text;
    }
    console.log(goodsListData);
    init();
};
const cancelIsOn = (text) => {
    if (goodsListData.is_on === text) {
        goodsListData.is_on = "";
    } else {
        goodsListData.is_on = text;
    }
    console.log(goodsListData);
    init();
};
const init = () => {
    getGoods(goodsListData).then((res) => {
        data.value = res.data;
        pageTotal.value = res.meta.pagination.total;
    });
};
init();
getCategoryList().then((res) => {
    goodsCategoryList = res;
});
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
const locked = (p) => {
    changeIsOn(p.id).then((res) => {
        p.is_on = p.is_on == 1 ? 0 : 1;
    });
};
const recommend = (p) => {
    changeIsRecommend(p.id).then((res) => {
        p.is_recommend = p.is_recommend == 1 ? 0 : 1;
    });
};
const getRowInfo = (p) => {};
const handleChange = (res) => {
    //上传图片
    addGoodsData.cover = res.data.url;
    console.log(123 + "" + addGoodsData.cover);
};
const AddGoods = () => {
    addGoodsData.category_id = addGoodsData.category_id[1];
    addGoodsData.cover = addGoodsData.cover.substring(5);
    console.log(addGoodsData);
    addGoods(addGoodsData).then((res) => {
        console.log(res);
        init();
        isAddGoods.value = false;
    });
};
const currentChange = (newSize) => {
    goodsListData.current = newSize;
    init();
};
const reset = () => {
    goodsListData.current = 1;
    goodsListData.title = "";
    init();
};
const serachGoods = () => {
    goodsListData.current = 1;
    init();
    console.log(goodsListData);
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
            margin: 5px auto;
        }
    }
}
.loading {
    transition: all 1.5s;
    transform: rotate(720deg);
}
</style>