<template>
  <el-container>
    <el-aside width="200px">
      <div style="margin: 10px">
        <el-input v-model="deptName" placeholder="请输入部门名称" prefix-icon="el-icon-search" />
      </div>
      <el-tree
        ref="tree"
        class="filter-tree"
        :data="deptTreeData"
        :props="defaultProps"
        default-expand-all
        :filter-node-method="filterNode"
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
        <el-button icon="el-icon-refresh" @click="resetSearchCondition">重置</el-button>
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
              @click="handleEdit(scope.row)"
            >编辑
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click="removeUser(scope.row.id)"
            >删除
            </el-button>
            <el-popover
              placement="bottom-end"
              width="20"
              trigger="hover"
            >
              <div style="text-align: center">
                <el-button type="danger" @click="resetPassword(scope.row.id)">重置密码</el-button>
                <br>
                <el-button style="margin-top: 8px" type="primary">分配角色</el-button>
              </div>
              <el-button slot="reference" style="margin-left: 8px;height:28px">更多操作</el-button>
            </el-popover>
          </template>
        </el-table-column>
      </el-table>
      <div style="margin-top: 16px; display: flex;flex-direction: row-reverse">
        <el-pagination
          :current-page="userSearch.pageDTO.current"
          :page-sizes="[5,10, 30, 50]"
          :page-size="userSearch.pageDTO.size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-main>
  </el-container>
</template>

<script>
import { deptTree } from '@/api/dept'
import { pageList, resetPassword, removeUser } from '@/api/user'

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
      total: null,
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
        this.total = response.data.total
      }, err => {
        console.log(err)
      })
    },
    resetSearchCondition() {
      this.userSearch = {
        username: '',
        pageDTO: {
          current: 1,
          size: 10
        }
      }
    },
    handleSizeChange(val) {
      this.userSearch.pageDTO.size = val
      this.searchUser()
    },
    handleCurrentChange(val) {
      this.userSearch.pageDTO.current = val
      this.searchUser()
    },
    removeUser(userId) {
      this.$confirm('此操作将删除该, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        removeUser(userId).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '操作已取消'
        })
      })
    },
    resetPassword(userId) {
      this.$confirm('此操作将重置密码, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        resetPassword(userId).then(() => {
          this.$message({
            type: 'success',
            message: '重置成功!'
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '操作已取消'
        })
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
