<template>
  <el-container>
    <el-aside width="200px">
      <div style="margin: 10px">
        <el-input v-model="deptName" placeholder="请输入部门名称" prefix-icon="el-icon-search" />
      </div>
      <el-tree
        class="filter-tree"
        :data="deptTreeData"
        :props="defaultProps"
        default-expand-all
        :filter-node-method="filterNode"
        ref="tree"
        @node-click="handleNodeClick"
      />
    </el-aside>
    <el-main>
      <el-form>
        <el-form-item label="用户名称">
          <el-input v-model="userSearch.username" placeholder="请输入用户名称" style="width: 230px" />
        </el-form-item>
      </el-form>
      <div>
        <el-button icon="el-icon-search" @click="searchUser">搜索</el-button>
        <el-button icon="el-icon-refresh">重置</el-button>
      </div>
      <el-table
        :data="users"
        style="width: 100%"
      >
        <el-table-column
          label="用户编号"
          width="180"
        >
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="用户名称"
          width="180"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.username }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="用户昵称"
          width="180"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.nickName }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="部门"
          width="180"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.dept.deptName }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="角色"
          width="180"
        >
          <template slot-scope="scope">
            <div v-for="(item, index) in scope.row.roles" :key="index">
              {{ item.roleName }}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="创建时间"
          width="180"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.gmtCreate }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)"
            >编辑
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
            >删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
  </el-container>
</template>

<script>
import { deptTree } from '@/api/dept'
import { pageList } from '@/api/user'

export default {
  name: 'UserManage',
  data() {
    return {
      deptTreeData: [],
      deptName: '',
      userSearch: {
        username: '',
        deptCode: '',
        pageDTO: {
          current: 1,
          size: 10
        }
      },
      users: [],
      defaultProps: {
        children: 'children',
        label: 'deptName'
      }
    }
  },
  watch: {
    deptName(val) {
      this.$refs.tree.filter(val)
    }
  },
  mounted() {
    this.deptTree()
    this.searchUser()
  },
  methods: {
    handleNodeClick(data) {
      this.userSearch.deptCode = data.deptCode
      this.searchUser()
    },
    filterNode(value, data) {
      if (!value) return true
      return data.deptName.indexOf(value) !== -1
    },
    deptTree() {
      deptTree().then(response => {
        this.deptTreeData = response.data
      }, err => {
        console.log(err)
      })
    },
    searchUser() {
      pageList(this.userSearch).then(response => {
        this.users = response.data.records
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
