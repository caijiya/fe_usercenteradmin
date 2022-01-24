import request from '@/utils/request'

export function deptTree() {
  return request({ url: '/dept/tree', method: 'get' })
}
