import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/login',
    method: 'post',
    data
  })
}

export function getInfo() {
  return request({
    url: '/userInfo',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/logout',
    method: 'post'
  })
}

export function pageList(data) {
  return request({
    url: 'user/pageList',
    method: 'post',
    data
  })
}

export function resetPassword(userId) {
  return request({
    url: 'user/resetPassword/' + userId,
    method: 'post'
  })
}

export function removeUser(userId) {
  return request({
    url: 'user/' + userId,
    method: 'delete'
  })
}
