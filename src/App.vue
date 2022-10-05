<template>
  <div id="nav">
    <router-link to="/">Home</router-link>
    <router-link to="/about">About</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style>
/* 可以安装sass或less */
#nav {
  font-family: Arial, Helvetica, sans-serif;
  text-align: center;
  padding: 20px;
}
a {
  text-decoration: none;
  color: black;
  font-weight: bold;
}
a .router-link-exact-active {
  color: #42b983;
}
</style>