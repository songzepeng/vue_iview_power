<template>
  <div class="permissionedit">
    <Modal
      @on-cancel="closeEdit"
      title="修改这条权限"
      @on-ok="handleEdit(editUser)"
      :value="value"
    >
      <Form ref="userfrm" :model="user">
        <FormItem label="权限id" :label-width="80">
          <Input type="text" v-model="user.id" placeholder="权限id">
            <Icon type="ios-lock-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem label="是否删除" :label-width="80">
          <Input
            type="text"
            v-model="user.del"
            placeholder="删除状态还是未删除状态\"
          >
            <Icon type="ios-lock-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem label="权限类型" :label-width="80">
          <Input type="text" v-model="user.type" placeholder="权限类型">
            <Icon type="ios-lock-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>

        <FormItem label="权限状态" :label-width="80">
          <Input type="text" v-model="user.status" placeholder="权限状态">
            <Icon type="ios-lock-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem label="权限描述" :label-width="80">
          <Input type="text" v-model="user.des" placeholder="权限描述">
            <Icon type="ios-lock-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem label="提交时间" :label-width="80">
          <Input type="text" v-model="user.subon" placeholder="提交时间">
            <Icon type="ios-lock-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem label="提交人" :label-width="80">
          <Input type="text" v-model="user.subby" placeholder="提交人">
            <Icon type="ios-lock-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem label="权限码" :label-width="80">
          <Input type="text" v-model="user.code" placeholder="权限码">
            <Icon type="ios-lock-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem label="权限地址" :label-width="80">
          <Input type="text" v-model="user.url" placeholder="权限地址">
            <Icon type="ios-lock-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem label="权限父ID" :label-width="80">
          <Input type="text" v-model="user.pId" placeholder="权限父ID">
            <Icon type="ios-lock-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem label="排序" :label-width="80">
          <Input type="text" v-model="user.order" placeholder="排序">
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
  name: "permissionedit",
  props: ["value", "editUser"],
  data() {
    return {
      user: {
        id: "",
        del: "",
        type: "",
        status: "",
        des: "",
        subby: "",
        subon: "",
        code: "",
        url: "",
        pId: "",
        order: ""
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
        .put(`http://localhost:8888/per/permission/${this.user.id}`, this.user)
        .then(() => {
          this.$emit("edit");
          this.$message.success("编辑成功");
          // this.data.splice(editIndex, 1, res.data);
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
