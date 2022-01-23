import { constantRoutes } from '@/router'
import Layout from '@/layout'

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes({ commit }, menus) {
    return new Promise(resolve => {
      const routes = formatRoutes(menus, Layout)
      commit('SET_ROUTES', routes)
      resolve(routes)
    })
  }
}

export function formatRoutes(routes, Layout) {
  const formatRoutesArr = []
  routes.forEach(route => {
    const router = {
      meta: {}
    }
    const {
      pid,
      path,
      redirect,
      component,
      keep_alive,
      icon,
      menuName,
      children
    } = route
    if (component === 'Layout') {
      router['component'] = Layout
    } else {
      router['component'] = loadView(component)
    }
    if (redirect !== null) {
      router['redirect'] = redirect
    }
    if (icon !== null) {
      router['meta']['icon'] = icon
    }
    if (children && children instanceof Array && children.length > 0) {
      router['children'] = formatRoutes(children)
    }
    if (menuName !== null) {
      router['name'] = menuName
    }
    router['meta']['title'] = menuName
    router['path'] = '/' + path
    if (pid === 0) {
      router['alwaysShow'] = true
    }
    router['meta']['isCache'] = !keep_alive
    formatRoutesArr.push(router)
  })
  // 将404页面添加到最后面
  formatRoutesArr.push({ path: '*', redirect: '/404', hidden: true })
  return formatRoutesArr
}

// export const menu2route = (menus) => {
//   const routes = []
//   menus.forEach(menu => {
//     const {
//       path,
//       component,
//       menuName,
//       iconCls,
//       children,
//       menuType
//     } = menu
//     // if (menuType === 'F') {
//     //   return
//     // }
//     if (children && children instanceof Array) {
//       menu2route(children)
//     }
//     const router = {
//       path: path,
//       name: menuName,
//       meta: {
//         title: menuName,
//         icon: menuName
//       },
//       iconCls: iconCls,
//       children: children,
//       component(resolve) {
//         if (menuType === 'M') {
//           import([layout])
//         } else if (menuType === 'C') {
//           import(['@/views/' + component + '.vue'])
//         }
//       }
//     }
//     routes.push(router)
//   })
//   return routes
// }

function loadView(component) {
  return (resolve) => require([`@/views/${component}`], resolve)
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
