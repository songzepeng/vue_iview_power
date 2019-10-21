<template>
  <div class="actorcontrol">
    <Header
      :style="{
        background: '#fff',
        boxShadow: '0 2px 3px 2px rgba(0,0,0,.1)'
      }"
      ><Input
        @on-search="LoadData()"
        v-model="params.q"
        search
        enter-button="搜索用户"
        placeholder="请输入你的大名"
        maxlength="18"
        style="width:600px;margin:0 auto;margin-top:15px;"
    /></Header>
    <Button
      type="error"
      @click="delModal = true"
      style="margin-right:5px;float:left;height:50px;font-size:18px;"
      >删除选中用户</Button
    >
    <addActor></addActor>
    <Button
      @click="handleSetPermission"
      type="info"
      style="margin-right:5px;height:50px;font-size:18px;width:150px;"
      >给角色设置权限</Button
    >
    <editActor
      :editUser="editUser"
      @edit="LoadData"
      v-model="editUser1"
    ></editActor>
    <actorPower
      :user="setperion"
      :visible="setPermissionModal"
      :close="
        () => {
          this.setPermissionModal = false;
        }
      "
    ></actorPower>
    <!-- <Button type="success" @click="addModel = true">添加一个用户</Button> -->

    <Modal
      v-model="delModal"
      title="删除提醒"
      :loading="loading"
      @on-ok="delGather"
      @on-cancel="cancel"
    >
      <p>你确定要删除吗？</p>
    </Modal>
    <Table
      :columns="columns"
      :data="data"
      ref="selection"
      @on-select="fun"
      @on-selection-change="selectionRow"
    >
      <Button @click="handleSelectAll(true)"></Button>
      <template slot-scope="{ row }" slot="action">
        <Poptip
          confirm
          title="你确定要删除吗"
          @on-ok="delUser(row.id)"
          @on-cancel="cancel"
        >
          <Button
            type="error"
            style="margin-right:5px;height:30px;dispaly:inline-block"
            >删除</Button
          >
        </Poptip>
        <Button
          type="warning"
          size="small"
          @click="editUserRow(row)"
          style="width:60px;height:30px;"
          >编辑</Button
        >
      </template>
    </Table>
    <Page
      show-sizer
      @on-change="changePage"
      :total="total"
      :current="params._page"
      :page-size="params._limit"
    />
  </div>
</template>

<script>
import service from "../../service/request";
import axios from "axios";
import addActor from "./addActor";
import editActor from "./editActor";
import actorPower from "./actorPower";
export default {
  name: "usercontol",
  data() {
    return {
      delModal: false,
      loading: true,
      editUser1: false,
      editUser: null,
      setPermissionModal: false,
      columns: [
        {
          title: "全选",
          slot: "check",
          type: "selection",
          width: "50px"
        },
        {
          title: "权限ID",
          key: "id"
        },
        {
          title: "角色名字",
          key: "name"
        },
        {
          title: "1删除,0未删除",
          key: "del"
        },
        {
          title: "角色描述",
          key: "des"
        },
        {
          title: "权限状态，0启用，1禁用",
          key: "status"
        },
        {
          title: "提交时间",
          key: "subon"
        },
        {
          title: "父角色ID",
          key: "pId"
        },
        {
          title: "编辑",
          slot: "action"
          // render: (h,)
        }
      ],
      selectionGather: [],
      userList: [],
      selectAll: [],
      setperion: [],
      total: 0,
      params: {
        _limit: 8,
        _page: 1,
        q: ""
      },
      data: [
        {
          id: 1,
          name: "萨迪克卢萨卡",
          mail: "213124324@qq.com"
        }
      ]
    };
  },
  created() {
    this.LoadData();
  },
  methods: {
    handleSetPermission() {
      if (this.selectAll.length !== 1) {
        this.$Message.error({ content: "no,no,no！" });
        return;
      }
      this.setperion = this.selectAll[0];
      // console.log(this.setperion);
      this.setPermissionModal = true;
    },
    selectionRow(selection) {
      // console.log(selection);
      this.selectAll = selection;
      // console.log(this.selectAll);
    },
    editUserRow(row) {
      this.editUser = row;
      this.editUser1 = true;
    },
    // 拿到行数距并解决函数单独作用域的问题，把他添加到状态里使得全局能访问
    fun(selection) {
      // console.log(selection);
      this.selectionGather = selection;
      // return selectionGather;
      // console.log(selectionGather);
    },
    delGather() {
      // console.log(this.selectionGather);
      // 多行删除操作  异步对话框提醒用户  差一个判断是否选中
      setTimeout(() => {
        this.delModal = false;
        this.selectionGather.forEach(selectedItem => {
          axios
            .delete(`http://localhost:8888/per/role/${selectedItem.id}`)
            .then(() => {
              if (selectedItem.id != 0) {
                this.$Message.info("删除成功");
              }
              this.LoadData();
            })
            .catch(e => {
              this.$Message.info("删除失败", e);
            });
        });
      }, 500);
    },
    //点击拿到行数据
    handleSelectAll(status) {
      // console.log(this.selection);
      this.$refs.selection.selectAll(status);
    },
    // 分页请求
    changePage(page) {
      this.params._page = page;
      this.LoadData();
    },
    // 后台总数据
    LoadData() {
      service.getActorData(this.params).then(res => {
        this.data = res.data;
        this.userList = this.data;
        this.total = parseInt(res.headers["sb"]);
      });
    },

    // delDataBtn(index) {
    //   this.LoadData();
    //   this.params.index;
    //   this.$Message.info({ index });
    // }
    // 单行删除操作
    delUser(userId) {
      // console.log(userId);
      // console.log(this.userList)
      axios
        .delete(`http://localhost:8888/per/role/${userId}`)
        .then(() => {
          if (userId != 0) {
            this.$Message.info("删除成功");
          }
          this.LoadData();
        })
        .catch(e => {
          this.$Message.info("删除失败", e);
        });
    },
    cancel() {
      this.$Message.info("取消删除");
    }
  },
  components: {
    addActor,
    editActor,
    actorPower
  }
};
</script>
<style scoped></style>
