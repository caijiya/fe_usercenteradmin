<template>
  <div>
    <el-dialog
      ref="dialog"
      title="新增/编辑"
      v-bind="$attrs"
      v-on="$listeners"
    >
      <el-form>
        <el-form-item label="角色名称" :label-width="formLabelWidth">
          <el-input v-model="roleInfo.roleName" autocomplete="off" />
        </el-form-item>
        <el-form-item label="角色编码" :label-width="formLabelWidth">
          <el-input v-model="roleInfo.roleCode" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { detail, update } from '@/api/role'

const EVENT_NAME = {
  success: 'success'
}
export default {
  name: 'AddUpdateDetailDialog',
  inheritAttrs: false,
  props: {
    roleId: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      title: '',
      roleInfo: {
        roleName: '',
        roleCode: ''
      },
      formLabelWidth: '120px'
    }
  },
  mounted() {
    console.log(this.roleId)
    detail(this.roleId).then(res => {
      this.roleInfo = res.data
    })
  },
  methods: {
    cancel() {
      this.$refs.dialog.hide()
    },
    confirm() {
      // 这里提交数据
      update({ id: this.roleId, roleName: this.roleInfo.roleName, roleCode: this.roleInfo.roleCode }).then(() => {
        this.$emit(EVENT_NAME.success)
      })
    }
  }
}
</script>

<style scoped>

</style>
