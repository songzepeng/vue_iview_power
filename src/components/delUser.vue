<template>
  <div class="deluser">
    <Button
      type="error"
      @click="delModal = true"
      style="margin-right:5px;float:left"
      >删除选中用户</Button
    >
    <Modal
      v-model="delModal"
      title="删除提醒"
      :loading="loading"
      @on-ok="delGather"
      @on-cancel="cancel"
    >
      <p>你确定要删除吗？</p>
    </Modal>
    <Table :columns="columns" :data="data" ref="selection" @on-select="fun">
      <Button @click="handleSelectAll(true)"></Button>
      <template slot-scope="{ row, index }" slot="action">
        <Poptip
          confirm
          title="你确定要删除吗"
          @on-ok="delUser(row.id)"
          @on-cancel="cancel"
        >
          <Button>删除</Button>
        </Poptip>
        <Button
          type="error"
          size="small"
          @click="remove(index)"
          style="width:60px;height:30px;"
          >修改</Button
        >
      </template>
    </Table>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "deluser",
  data() {
    return {
      delModal: false,
      loading: true,
      selectionGather: []
    };
  },
  methods: {
    delGather() {
      // console.log(this.selectionGather);
      // 多行删除操作  异步对话框提醒用户  差一个判断是否选中
      setTimeout(() => {
        this.delModal = false;
        this.selectionGather.forEach(selectedItem => {
          axios
            .delete(`http://localhost:8888/per/user/${selectedItem.id}`)
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
    }
  },
  // 拿到行数距并解决函数单独作用域的问题，把他添加到状态里使得全局能访问
  fun(selection) {
    // console.log(selection);
    this.selectionGather = selection;
    // return selectionGather;
    // console.log(selectionGather);
  },

  //点击拿到行数据
  handleSelectAll(status) {
    // console.log(this.selection);
    this.$refs.selection.selectAll(status);
  }
};
</script>
<style scoped></style>
