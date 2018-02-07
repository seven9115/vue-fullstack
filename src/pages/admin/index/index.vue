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
import api from '../../../fetch/api'

export default {
  name: 'admin',
  data () {
    return {
    }
  },
  methods: {
    uploadLit (e) {
      let file = e.target.files[0];
      debugger;
      let param = new FormData(); //创建form对象
      param.append('file',file,file.name);//通过append向form对象添加数据
      param.append('chunk','0');//添加form表单中其他数据
      console.log(param.get('file')); //FormData私有类对象，访问不到，可以通过get判断值是否传进去
      let config = {
        headers:{'Content-Type':'multipart/form-data'}
      };  //添加请求头
      api.uploadApi(param, config)
      .then(response=>{
        console.log(response);
      })
    }
  }
} 
</script>


<style scoped>

</style>