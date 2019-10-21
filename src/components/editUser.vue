<template>
  <div class="edituser">
    <Modal
      @on-cancel="closeEdit"
      title="修改用户"
      @on-ok="handleEdit"
      :value="value"
    >
      <Form ref="userfrm" :model="user">
        <FormItem label="学校" :label-width="80" prop="school">
          <Input type="text" v-model="user.school" placeholder="school">
            <Icon type="ios-lock-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem label="电话" :label-width="80" prop="phone">
          <Input type="text" v-model="user.phone" placeholder="phone">
            <Icon type="ios-lock-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem label="邮箱" :label-width="80" prop="mail">
          <Input type="text" v-model="user.mail" placeholder="mail">
            <Icon type="ios-lock-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem label="姓名" :label-width="80" prop="name">
          <Input type="text" v-model="user.name" placeholder="name">
            <Icon type="ios-lock-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "edituser",
  props: ["value", "editUser"],
  data() {
    return {
      user: {
        name: "",
        phone: "",
        mail: "",
        school: ""
      }
    };
  },
  watch: {
    editUser() {
      Object.assign(this.user, this.editUser);
    }
  },
  methods: {
    handleEdit() {
      // console.log("修改：", this.user.id);
      // this.closeEdit();
      axios
        .put(`http://localhost:8888/per/user/${this.user.id}`, this.user)
        .then(res => {
          this.$emit("edit");
          let editIndex = this.data.findIndex(row => res.data.id === row.id); //this.$message.success("编辑成功");
          this.data.splice(editIndex, 1, res.data);
        })
        .catch(() => {});
    },
    closeEdit() {
      //取消修改
      // console.log("close");
      this.$emit("input", false);
    }
  }
};
</script>
<style scoped></style>
