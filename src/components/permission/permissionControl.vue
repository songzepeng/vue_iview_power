<template>
  <div class="permissioncontrol">
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
    <permissionAdd></permissionAdd>
    <permissionEdit
      :editUser="editUser"
      @edit="LoadData"
      v-model="editUser1"
    ></permissionEdit>
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
      highlight-row:true
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
import permissionAdd from "./permissionAdd";
import permissionEdit from "./permissionEdit";
export default {
  name: "permissioncontrol",
  data() {
    return {
      delModal: false,
      loading: true,
      editUser1: false,
      editUser: null,
      columns: [
        {
          title: "全选",
          slot: "check",
          type: "selection",
          width: "60px"
        },
        {
          title: "权限ID",
          key: "id"
        },

        {
          title: "1删除,0未删除",
          key: "del"
        },
        {
          title: "权限类型",
          key: "type",
          width: "120px"
        },
        {
          title: "权限描述",
          key: "des"
        },
        {
          title: "提交时间",
          key: "subon"
        },
        {
          title: "提交人",
          key: "subby",
          width: "100px"
        },
        {
          title: "权限码",
          key: "code"
        },
        {
          title: "权限地址",
          key: "url"
        },
        {
          title: "权限父ID",
          key: "pId"
        },
        {
          title: "排序",
          key: "order"
        },
        {
          title: "编辑",
          slot: "action"
          // render: (h,)
        }
      ],
      selectionGather: [],
      userList: [],
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
            .delete(`http://localhost:8888/per/permission/${selectedItem.id}`)
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
      service.getpermissionData(this.params).then(res => {
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
        .delete(`http://localhost:8888/per/permission/${userId}`)
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
    permissionAdd,
    permissionEdit
  }
};
</script>
<style scoped></style>
