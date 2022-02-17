<template>
  <div class="nav-item">
      <el-menu-item
        v-if="item.children.length === 1"
        :index="item.path + '/' + item.children[0].path"
      >
            <i :class="item.children[0].meta.icon"></i>
          <span>{{item.children[0].meta.title}}</span>
      </el-menu-item>
      <el-submenu
        v-else
        :index="item.path"
      >
        <template slot="title" index="item.path">
            <i :class="item.meta.icon"></i>
            <span>{{item.meta.title}}</span>
        </template>
        <el-menu-item
            v-for="littleItem in item.children" :key="littleItem.path"
            :index="item.path + '/' + littleItem.path"
        >
            <i :class="littleItem.meta.icon"></i>
            <span>{{littleItem.meta.title}}</span>
        </el-menu-item>
      </el-submenu>
  </div>
</template>

<script>
export default {
    props:{
        item:Object
    },
    created(){
        console.log(this.item)
    }
}
</script>

<style>

</style>