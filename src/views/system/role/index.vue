<template>
  <div>
    <el-form v-loading="listLoading" class="searchContent" label-width="80px" border fit highlight-current-row style="width: 100%">
      <el-row>
        <el-col :span="4">
          <el-form-item label="角色名称">
            <el-input v-model="roleSearchCondition.roleName" placeholder="请输入角色名称" />
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="角色编码">
            <el-input v-model="roleSearchCondition.roleCode" placeholder="请输入角色编码" />
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="状态">
            <el-select v-model="roleSearchCondition.isEnabled" placeholder="请选择">
              <el-option value="" label="全部" />
              <el-option value="1" label="启用" />
              <el-option value="0" label="禁用" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="1">
          <el-button type="primary" icon="el-icon-search" @click="roleSearch">搜索</el-button>
        </el-col>
        <el-col :span="1" style="margin-left: 8px">
          <el-button type="primary" icon="el-icon-search">重置</el-button>
        </el-col>
      </el-row>
    </el-form>
    <el-row style="margin-left: 8px;margin-bottom: 16px">
      <el-col :span="1">
        <el-button type="primary" icon="el-icon-search">新增</el-button>
      </el-col>
      <el-col :span="1" style="margin-left: 8px">
        <el-button type="primary" icon="el-icon-search">导出</el-button>
      </el-col>
    </el-row>
    <el-table
      :data="roles"
      style="width: 100%"
    >
      <el-table-column
        prop="id"
        label="编号"
        width="180"
      />
      <el-table-column
        prop="roleName"
        label="角色名称"
        width="180"
      />
      <el-table-column
        prop="roleCode"
        label="角色编码"
        width="180"
      />
      <el-table-column
        prop="gmtCreate"
        label="创建时间"
        width="180"
      />
      <el-table-column
        label="状态"
        prop="isEnabled"
        width="180"
      >
        <template slot-scope="scope">
          <el-switch
            :value="scope.row.isEnabled"
            :active-value="1"
            :inactive-value="0"
            @change="roleStatusChange($event, scope.row)"
          />
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="160"
      >
        <template slot-scope="scope">
          <i class="el-icon-edit" @click="updateRoleDialogVisible(scope.row.id)">编辑</i>
        </template>
      </el-table-column>
    </el-table>
    <add-update-detail-dialog
      v-if="dialogFormVisible"
      @success="success"
      :visible.sync="dialogFormVisible"
      :role-id="roleId"
    />
  </div>
</template>

<script>
import { pageList, update } from '@/api/role'
import AddUpdateDetailDialog from './componet/dialog'

export default {
  name: 'RoleManage',
  components: {
    AddUpdateDetailDialog
  },
  data() {
    return {
      roleSearchCondition: {
        roleName: '',
        roleCode: '',
        isEnabled: null,
        pageDTO: {
          current: 1,
          size: 10
        }
      },
      roleId: null,
      listLoading: true,
      total: null,
      roles: [],
      dialogFormVisible: false
    }
  },
  created() {
    this.roleSearch()
  },
  methods: {
    success() {
      this.cancel()
    },
    roleSearch() {
      this.listLoading = true
      pageList(this.roleSearchCondition).then(res => {
        this.roles = res.data.records
        this.listLoading = false
      })
    },
    roleStatusChange(roleStatus, row) {
      const { id } = row
      update({ id, isEnabled: roleStatus }).then(res => {
        this.$message('用户状态更新成功')
        row.isEnabled = roleStatus
        // this.roleSearch()
      })
    },
    updateRoleDialogVisible(roleId) {
      this.roleId = roleId
      this.dialogFormVisible = true
    },
    cancel() {
      this.roleId = null
      this.dialogFormVisible = false
    }
  }
}
</script>

<style scoped>
.searchContent {
  margin-top: 20px;
  }

</style>
