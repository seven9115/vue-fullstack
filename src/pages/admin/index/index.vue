<template>
  <div class="box">
    <header>后台管理系统</header>
    <div class="row main">
      <div class="col-lg-2 left">
        <ul class="menu">
          <li class="on">课程管理</li>
          <li>活动管理</li>
        </ul>
      </div>
      <div class="col-lg-10 border-l pd-t30">
        <h4>新增课程</h4>
        <form  enctype="multipart/form-data">
        <div class="form-group pd-t30">
          <label>课程名</label>
          <input type="text" class="form-control ipt-txt" name="course" placeholder="请输入课程名">
        </div>
        <div class="form-group">
          <label>课程图</label>
          <input type="file" name="litpic" v-on:change="uploadLit">
          <p class="help-block">展示图片</p>
        </div>
        <div class="form-group">
          <label>价格</label>
          <input type="number" class="form-control ipt-num" name="price" placeholder="请输入价格">
        </div>
        <div class="form-group">
          <label>成交量</label>
          <input type="number" class="form-control ipt-num" name="volume" placeholder="请输入成交量">
        </div>
        <div class="form-group">
          <label>详情图</label>
          <input type="file" name="detpic">
          <p class="help-block">展示图片</p>
        </div>
        <div class="checkbox">
          <label>
            <input type="checkbox" name="recommend"> 推荐
          </label>
        </div>
        <button type="button" class="btn btn-primary">确定</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'admin',
  data () {
    return {
    }
  },
  methods: {
    uploadLit (e) {
      let file = e.target.files[0];
    }
  }
}
</script>


<style scoped>

</style>