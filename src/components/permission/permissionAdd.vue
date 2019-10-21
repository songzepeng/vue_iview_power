<template>
  <div class="permissionadd">
    <Button
      type="success"
      @click="addModel = true"
      style="display: inline-block;height:50px;font-size:18px;"
      >添加一条权限</Button
    >
    <Modal
      v-model="addModel"
      title="添加权限"
      :loading="loading"
      @on-ok="addUser"
    >
      <Form ref="userfrm" :model="form">
        <FormItem label="权限id" :label-width="80">
          <Input type="text" v-model="form.id" placeholder="权限id">
            <Icon type="ios-lock-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem label="是否删除" :label-width="80">
          <Input
            type="text"
            v-model="form.del"
            placeholder="删除状态还是未删除状态"
          >
            <Icon type="ios-lock-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem label="权限类型" :label-width="80">
          <Input type="text" v-model="form.type" placeholder="权限类型">
            <Icon type="ios-lock-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>

        <FormItem label="权限状态" :label-width="80">
          <Input type="text" v-model="form.status" placeholder="权限状态">
            <Icon type="ios-lock-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem label="权限描述" :label-width="80">
          <Input type="text" v-model="form.des" placeholder="权限描述">
            <Icon type="ios-lock-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem label="提交时间" :label-width="80">
          <DatePicker
            type="date"
            placeholder="Select date"
            style="width: 200px"
          ></DatePicker>
        </FormItem>
        <FormItem label="提交人" :label-width="80">
          <Input type="text" v-model="form.subby" placeholder="提交人">
            <Icon type="ios-lock-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem label="权限码" :label-width="80">
          <Input type="text" v-model="form.code" placeholder="权限码">
            <Icon type="ios-lock-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem label="权限地址" :label-width="80">
          <Input type="text" v-model="form.url" placeholder="权限地址">
            <Icon type="ios-lock-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem label="权限父ID" :label-width="80">
          <Input type="text" v-model="form.pId" placeholder="权限父ID">
            <Icon type="ios-lock-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem label="排序" :label-width="80">
          <Input type="text" v-model="form.order" placeholder="排序">
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
  name: "permissionadd",
  data() {
    return {
      addModel: false,
      loading: true,
      form: {
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
          .post("http://localhost:8888/per/permission", this.form)
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
