---
inject: true
to: src/router/routes.js
before: "todo"
---
  // <%= title %>
  {
    path: '/<%= name %>',
    name: '<%= name %>',
    component: () => import('@pages/<%= name %>/<%= name %>')
  },
