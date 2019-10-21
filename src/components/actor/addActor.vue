<template>
  <div class="addactor">
    <Button
      type="success"
      @click="addModel = true"
      style="display: inline-block;height:50px;font-size:18px;float:left;margin-right:5px;"
      >添加一个用户</Button
    >
    <Modal
      v-model="addModel"
      title="添加用户"
      :loading="loading"
      @on-ok="addUser"
    >
      <form action="" :model="form">
        角色名:<input
          type="text"
          placeholder=" 输入要添加的角色"
          v-model="form.name"
        /><br />
        角色描述:<input
          type="text"
          placeholder=" 输入角色描述"
          v-model="form.des"
        />
        <br />
        是否开启:<input
          type="text"
          placeholder=" 输入权限是否开启"
          v-model="form.status"
        />
        <br />
        父ID:<input
          type="text"
          placeholder=" 输入要添加的父ID"
          v-model="form.pId"
        />
      </form>
    </Modal>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "addactor",
  data() {
    return {
      addModel: false,
      loading: true,
      form: {
        name: "",
        des: "",
        status: "",
        pId: ""
      }
      //   userList: []
    };
  },
  // props: ['list'],
  methods: {
    // 异步对话框进行表单提交
    addUser() {
      //   console.log(userList);
      setTimeout(() => {
        // console.log(this.form.mail);
        // console.log(this.$parent.userList); //  此方法获取到父组件的数据
        axios
          .post("http://localhost:8888/per/role", this.form)
          .then(res => {
            if (this.form.name != "") {
              this.$Message.info("添加成功");
              this.$parent.userList.push(res.data);
              // console.log(this.data);
              this.addModel = false;
              this.$parent.LoadData();
            } else {
              this.$Message.error("添加内容不能为空！");
              this.addModel = false;
              this.loading = false;
            }
          })
          .catch(e => {
            this.$Message.info("添加失败！", e);
            // console.log(this.$parent.userList);
          });
      }, 500);
    }
  }
};
</script>
<style scoped></style>
