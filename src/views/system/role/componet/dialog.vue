<template>
  <div>
    <el-dialog
      ref="dialog"
      title="收货地址"
      v-bind="$attrs"
      v-on="$listeners"
    >
      <el-form :model="form">
        <el-form-item label="活动名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="活动区域" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai" />
            <el-option label="区域二" value="beijing" />
          </el-select>
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
const EVENT_NAME = {
  success: 'success'
}
export default {
  name: 'AddUpdateDetailDialog',
  props: {
    roleId: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      title: '',
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      formLabelWidth: '120px'
    }
  },
  mounted() {
    console.log(this.roleId)
  },
  methods: {
    cancel() {
      this.$refs.dialog.hide()
    },
    confirm() {
      // 这里提交数据
      this.$emit(EVENT_NAME.success)
    }
  }
}
</script>

<style scoped>

</style>
