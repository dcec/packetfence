import ReportsView from '../'
const ReportTable = () => import(/* webpackChunkName: "Reports" */ '../_components/ReportTable')
// const ReportChart = () => import(/* webpackChunkName: "Reports" */ '../_components/ReportChart')

const route = {
  path: '/reports',
  name: 'reports',
  redirect: '/reports/table/registered',
  component: ReportsView,
  meta: { transitionDelay: 300 * 2 }, // See _transitions.scss => $slide-bottom-duration
  children: [
    // {
    //   path: 'graph/:report',
    //   name: 'graph',
    //   component: ReportChart,
    //   props: true
    // },
    {
      path: 'table/:report([a-zA-Z0-9/]+)',
      name: 'table',
      component: ReportTable,
      props: true
    }
  ]
}

export default route
