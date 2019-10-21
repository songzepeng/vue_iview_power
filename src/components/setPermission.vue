<template>
  <div class="setPermission">
    <Modal
      title="给当前用户设置权限"
      @on-ok="powerOk"
      :value="visible"
      @on-cancel="closepowerModal"
    >
      给当前的：
      <span style="color:orange;font-size:30px">{{
        user ? user.name : null
      }}</span
      >设置一个权限
      <CheckboxGroup v-model="checkedPowerArr">
        <Row>
          <Col v-for="item in powerAll" :key="item.id" span="8">
            <Checkbox :label="item.id">
              {{ item.des }}
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
  name: "setPermission",
  props: ["visible", "close", "user"],
  data() {
    return {
      powerAll: [],
      checkedPowerArr: [1, 3],
      userPower: []
    };
  },
  created() {
    request.getpermissionData(this.params).then(res => {
      this.powerAll = res.data;
      console.log(this.powerAll);
    });
  },
  methods: {
    powerOk() {
      // console.log(this.checkedPowerArr);
      // console.log(this.userPower);
      let promiseArr = [];
      this.checkedPowerArr.forEach(permissionId => {
        if (
          this.userPower.findIndex(ur => ur.permissionId === permissionId) < 0
        ) {
          // 新增加
          let p1 = request.addUserPower({
            del: 0,
            subon: new Date().toString(),
            permissionId,
            userId: this.user.id
          });
          promiseArr.push(p1);
        }
      });
      // 第二种： 删除
      this.userPower.forEach(ur => {
        if (!this.checkedPowerArr.includes(ur.permissionId)) {
          let p2 = request.deleteUserPower(ur.id);
          promiseArr.push(p2);
        }
      });
      Promise.all(promiseArr)
        .then(() => {
          this.$Message.info({ content: "设置成功！" });
          this.close();
        })
        .catch(err => {
          console.log(err);
          this.$Message.info({ content: "设置失败！" });
        });
    },
    closepowerModal() {
      this.close();
    }
  },
  watch: {
    user() {
      if (!this.user) {
        return;
      }
      request.getPermissionUserData(this.user.id).then(res => {
        console.log(res.data);
        // console.log(this.user.id);
        this.userPower = res.data;
        this.checkedPowerArr = res.data.map(item => item.permissionId);
        // console.log(this.userPower);
      });
    }
  }
};
</script>

<style scoped></style>
