import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/products',
      name: 'allProducts',
      component: () => import('../views/Products/ProductsPage.vue')
    },
    {
      path: '/products/:slug',
      name: 'product_detail',
      component: () => import('../views/Products/ProductDetail.vue')
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: () => import('../views/Checkout.vue')
    },
    {
      path: '/signin',
      name: 'signin',
      component: () => import('../views/AuthPages/Signin.vue')
    },
    {
      path: '/forget-password',
      name: 'reset_password',
      component: () => import('../views/AuthPages/ResetPassword.vue')
    },
    {
      path: '/reset-password',
      name: 'new_password',
      component: () => import('../views/AuthPages/ConfirmPasswordReset.vue')
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/AdminPages/AdminLogin.vue')
    },
    {
      path: '/admin/dashboard',
      name: 'dashboard',
      component: () => import('../views/AdminPages/AdminDashboard.vue')
    },
    {
      path: '/admin/create',
      name: 'newProduct',
      component: () => import('../views/AdminPages/CreateProducts.vue')
    },
    {
      path: '/admin/category',
      name: 'category',
      component: () => import('../views/AdminPages/CategoryPage.vue')
    },
    {
      path: '/admin/orders',
      name: 'orders',
      component: () => import('../views/AdminPages/Orders.vue')
    },
    {
      path: '/admin/orders/:slug',
      name: 'order-detail',
      component: () => import('../views/AdminPages/OrderDetails.vue')
    },
    {
      path: '/admin/customers',
      name: 'customers',
      component: () => import('../views/AdminPages/Customers.vue')
    },
    {
      path: '/admin/customers/:slug',
      name: 'customerDetail',
      component: () => import('../views/AdminPages/CustomerDetails.vue')
    },
    {
      path: '/admin/products',
      name: 'products',
      component: () => import('../views/AdminPages/Products.vue')
    },
    {
      path: '/admin/products/:slug',
      name: 'productDetails',
      component: () => import('../views/AdminPages/ProductDetails.vue')
    },
    {
      path: '/payment-success',
      name: 'paymentSuccessful',
      component: () => import('../views/Payments/PaymentSuccess.vue')
    },
    {
      path: '/payment-failure',
      name: 'paymentFailed',
      component: () => import('../views/Payments/PaymentFailure.vue')
    },
  ]
})

export default router
