<template>
  <div id="app">
    <el-container>
      <!--<el-header>-->
        <!--<vheader />-->
      <!--</el-header>-->
      <el-container>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Header from '@/components/component/Header'

export default {
  name: 'app',
  components: {
    'vheader': Header
  }
}

</script>

<style>

</style>
