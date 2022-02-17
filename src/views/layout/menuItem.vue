<template>
  <div>
    <el-menu-item
      v-if="item.children.length === 1"
      :index="item.path + '/' + item.children[0].path"
      class="home"
    >
      <i :class="item.children[0].meta.icon"></i>
      <span>{{ item.children[0].meta.title }}</span>
    </el-menu-item>
    <el-submenu v-else :index="item.path">
        <template slot="title">
            <i :class="item.meta.icon"></i>
            <span>{{item.meta.title}}</span>
        </template>
        <el-menu-item
          :index="item.path + '/' + smallItem.path"
          v-for="smallItem in item.children"
          :key="smallItem.path"
        >
          <i :class="smallItem.meta.icon"></i>
          <span>{{smallItem.meta.title}}</span>
        </el-menu-item>
    </el-submenu>
  </div>
</template>
<script>
export default{
    props:{
        item:Object
    },
}
</script>