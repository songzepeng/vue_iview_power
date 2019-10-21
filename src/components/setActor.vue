<template>
  <div class="setactor">
    <Button
      type="info"
      @click="showModal"
      style="margin-right:5px;height:50px;font-size:18px;width:150px;float:left"
      >设置角色</Button
    >
    <Modal v-model="infoModel" title="设置角色" @on-ok="ok6">
      给当前的：
      <span style="color:orange;font-size:30px">{{
        user ? user.name : null
      }}</span
      >设置角色
      <CheckboxGroup v-model="checkedRoleArr">
        <Row>
          <Col v-for="item in allActor" :key="item.id" span="8">
            <Checkbox :label="item.id">
              {{ item.name }}
            </Checkbox>
          </Col>
        </Row>
      </CheckboxGroup>
    </Modal>
  </div>
</template>

<script>
import request from "../service/request";
export default {
  name: "setactor",
  data() {
    return {
      infoModel: false,
      allActor: [],
      userRole: [],
      user: null,
      checkedRoleArr: []
    };
  },
  props: ["dataarr"],
  created() {
    // 加载所有的角色信息
    request.getActorData(this.params).then(res => {
      this.allActor = res.data;
      console.log(this.allActor);
    });
  },
  methods: {
    getCheckedStatus(roleId) {
      return this.userRole.findIndex(ur => ur.roleId === roleId) >= 0;
    },
    ok6() {
      // 设置角色确定的回调的回调
      let promiseArr = [];
      // 设置角色 ：添加时不重复添加 做出的运算处理 理解如下
      // 添加的diff计算 forEach遍历map映射后的新数组{里面放的是}中的每个角色ID 执行回调函数（判断从中间件数据{意思为设置用户为某角色而单独生成的一条数据}里去找角色id如果小于0成立{也就是没有这条角色ID}，反之，如果要是有大于0的角色ID那么不添加这条角色ID。
      // 然后发送axios请求，添加一条一条中间件数据进去{中间件内容就为数据格式状态，roleId使用了属性简写，userID 就是父组件传过来的用户id}）
      // 最后一步： 因为axios请求返回的是一条promise对象，所以再let一个数组， 把返回的promise对象实例，push到数组存起来
      this.checkedRoleArr.forEach(roleId => {
        if (this.userRole.findIndex(ur => ur.roleId === roleId) < 0) {
          let a1 = request.addUserRole({
            del: 0,
            subon: new Date().toString(),
            roleId,
            userId: this.dataarr[0].id
          });
          promiseArr.push(a1);
        }
      });
      // 设置角色：添加时 取消已经有的角色 时做出的运算处理  遍历中间件的数据， 判断新数组里有没有当前的角色id
      this.userRole.forEach(ur => {
        if (!this.checkedRoleArr.includes(ur.roleId)) {
          let a2 = request.deleteUserRole(ur.id);
          promiseArr.push(a2);
        }
      });
      // 使用promise.all 接收这个已经有添加和删除处理的数组，然后成功之后提示一下并关闭对话框，反之则失败
      Promise.all(promiseArr)
        .then(() => {
          this.$Message.info({ content: "设置成功！" });
        })
        .catch(err => {
          console.log(err);
          this.$Message.info({ content: "设置失败！" });
        });
    },
    showModal() {
      console.log(this.dataarr.id);
      if (this.dataarr.length !== 1) {
        this.$Message.error("请选中一个用户");
      } else {
        this.user = this.dataarr[0];
        this.infoModel = true;
        request.loadUserRole(this.dataarr[0].id).then(res => {
          console.log(this.dataarr[0].id);
          // this.$Message.info({ content: "s" });
          this.userRole = res.data;
          // 把把最新中间件数据的每一项角色id 都放到了checkedRoleArr 这个数组里 ，这个数组里放的是最新每个用户已设置上的的角色id
          this.checkedRoleArr = res.data.map(item => item.roleId);
          console.log(this.checkedRoleArr);
        });
      }
    }
  }
  // // watch: {
  // //   dataarr() {
  // //     this.$Message.info({ content: "s" });
  // //     // 重新加载  选中框的数据
  // //     // 加所有的当前用户已经关联的角色信息
  // //     if (!this.dataarr) {
  // //       return;
  // //     }
  // //     // this.user.id  // 给用户设置角色的id
  // //   }
  // }
};
</script>
<style scoped>
span {
  font-weight: bold;
}
</style>
