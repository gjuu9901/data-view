export default [

  // 总数据中台
  {
    path: '/view-data',
    name: 'view-data',
    component: () => import('@pages/view-data/view-data')
  },
  // todo 保留此处勿删
  {
    path: '/',
    redirect: '/view-data',
  },
  {
    path: '/404',
    name: '404',
    component: require('@pages/_404/_404').default,
    props: true
  },
  {
    path: '*',
    redirect: '404'
  }
]
