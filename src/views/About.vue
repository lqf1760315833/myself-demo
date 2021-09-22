<!--
 * @Author: Lqf
 * @Date: 2021-09-18 11:08:10
 * @LastEditors: Lqf
 * @LastEditTime: 2021-09-22 09:34:07
 * @Description: 我添加了修改
-->
<template>
  <div class="about">
    <h1>This is an about page</h1>
    <p>
      <button v-permission="['admin', 'editor']">editor button</button>
      <button v-permission="['admin']">admin button</button>
    </p>
    <router-view></router-view>
  </div>
</template>
