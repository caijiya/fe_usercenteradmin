import request from '@/utils/request'

export function pageList(data) {
  return request({
    url: 'role/pageList',
    method: 'post',
    data
  })
}

export function update(data) {
  return request({
    url: 'role/update',
    method: 'post',
    data
  })
}

export function detail(roleId) {
  return request({
    url: 'role/' + roleId,
    method: 'get'
  })
}

export function add(data) {
  return request(
    {
      url: 'role/add',
      method: 'post',
      data
    }
  )
}
