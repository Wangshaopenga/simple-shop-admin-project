<template>
    <div>
        <el-input
            v-model="input1"
            class="w-50 m-2"
            size="large"
            placeholder="Please Input"
            :prefix-icon="Search"
        />
    </div>
</template>

<script setup>
import { Search } from '@element-plus/icons-vue'
import { ref } from 'vue'
let input1 = ref('');
</script>

<style lang="scss" scoped>
</style>