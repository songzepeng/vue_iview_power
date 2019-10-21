<template>
  <div class="adduser">
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
        姓名:<input
          type="text"
          placeholder=" 输入要添加的用户名"
          v-model="form.name"
        /><br />
        邮箱:<input
          type="text"
          placeholder=" 输入要添加的邮箱"
          v-model="form.mail"
        />
        <br />
        学校:<input
          type="text"
          placeholder=" 输入要添加的学校"
          v-model="form.school"
        />
        <br />
        电话:<input
          type="text"
          placeholder=" 输入要添加的电话"
          v-model="form.phone"
        />
      </form>
    </Modal>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "adduser",
  data() {
    return {
      addModel: false,
      loading: true,
      form: {
        name: "",
        mail: "",
        school: "",
        phone: ""
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
          .post("http://localhost:8888/per/user", this.form)
          .then(res => {
            if (this.form.mail != "") {
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
