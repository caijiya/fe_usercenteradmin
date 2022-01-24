<template>
  <el-container>
    <el-aside width="200px">
      <div style="margin: 10px">
        <el-input v-model="deptName" placeholder="请输入部门名称" prefix-icon="el-icon-search"></el-input>
      </div>
      <el-tree :data="deptTreeData" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
    </el-aside>
    <el-main>Main</el-main>
  </el-container>
</template>

<script>
import { deptTree } from '@/api/dept'

export default {
  name: 'UserManage',
  data() {
    return {
      deptTreeData: [
      ],
      defaultProps: {
        children: 'children',
        label: 'deptName'
      }
    }
  },
  mounted() {
    this.initDeptTree()
  },
  methods: {
    handleNodeClick(data) {
      console.log(data)
    },
    initDeptTree() {
      deptTree().then(response => {
        this.deptTreeData = response.data
      }, err => {
        console.log(err)
      })
    }
  }
}
</script>

<style scoped>
el-aside {
  border: 1px solid red !important;
}
</style>
