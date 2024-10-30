<template>
  <div>
    <h2>{{ editingContact ? "Edit Contact" : "Add Contact" }}</h2>
    <form @submit.prevent="submitForm">
      <!-- 输入表单行 -->
      <div class="form-row">
        <input v-model="name" type="text" placeholder="Name" required />
        <input v-model="phone" type="text" placeholder="Phone" required />
      </div>
      <div class="form-row">
        <input v-model="email" type="email" placeholder="Email" />
        <select v-model="group" required>
          <option disabled value="">Select Group</option>
          <option value="Family">Family</option>
          <option value="Friends">Friends</option>
          <option value="Work">Work</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <!-- 收藏联系人复选框 -->
      <label>
        Favorite:
        <input type="checkbox" v-model="favorite" />
      </label>
      <!-- 提交按钮 -->
      <button type="submit">
        {{ editingContact ? "Update Contact" : "Add Contact" }}
      </button>

      <!-- 显示反馈信息 -->
      <transition name="fade" @after-leave="clearFeedbackMessage">
        <div v-if="feedbackMessage" class="feedback">
          {{ feedbackMessage }}
        </div>
      </transition>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: {
    // 编辑模式下传递的联系人数据
    editingContact: Object,
    // 父组件传递的联系人列表
    contacts: {
      type: Array,
      default: () => [],  // 默认空数组
    },
  },
  data() {
    return {
      // 表单数据，若处于编辑模式则预填充数据
      name: this.editingContact ? this.editingContact.name : "",
      phone: this.editingContact ? this.editingContact.phone : "",
      email: this.editingContact ? this.editingContact.email : "",
      group: this.editingContact ? this.editingContact.group : "",
      favorite: this.editingContact ? !!this.editingContact.favorite : false,
      feedbackMessage: "", // 用户操作反馈消息
    };
  },
  methods: {
    /**
     * 提交表单，根据编辑模式调用不同的方法
     * @returns {void}
     */
    submitForm() {
        if (this.editingContact) {
            this.updateContact(this.editingContact); // 编辑模式，更新联系人
        } else {
            this.checkDuplicateContact(); // 新增模式，检查是否有重复联系人
        }
    },

    /**
     * 检查是否存在重复联系人
     * @returns {void}
     */
    checkDuplicateContact() {
        const newContact = {
            name: this.name.trim(),  // 去除多余空格
            phone: this.phone.trim(),
            email: this.email,
            group: this.group,
            favorite: this.favorite ? 1 : 0,
        };

        // 调用后端API进行重复检查
        axios.post('http://localhost:3000/api/contacts/check-duplicate', newContact)
            .then((response) => {
                const { exists, existingContact } = response.data;

                if (exists) {
                    if (confirm("A contact with the same name or phone exists. Update?")) {
                        this.updateContact(existingContact); // 更新重复联系人
                    } else {
                        this.resetForm(); // 重置表单
                    }
                } else {
                    this.addContact(); // 无重复，直接添加新联系人
                }
            })
            .catch((error) => {
                console.error("Error checking for duplicate contact:", error);
            });
    },

    /**
     * 更新现有联系人
     * @param {Object} existingContact - 要更新的联系人对象
     * @returns {void}
     */
    updateContact(existingContact) {
        if (!existingContact || !existingContact.id) {
            console.error("Invalid contact data");
            return;
        }

        const updatedContact = {
            ...existingContact,
            name: this.name,
            phone: this.phone,
            email: this.email,
            group: this.group,
            favorite: this.favorite ? 1 : 0,
        };

        // 调用后端API更新联系人
        axios.put(`http://localhost:3000/api/contacts/${existingContact.id}`, updatedContact)
            .then(() => {
                this.feedbackMessage = "Contact updated successfully!";
                this.resetForm(); // 重置表单
                this.$emit("contact-updated"); // 通知父组件更新联系人列表
                setTimeout(() => {
                    this.feedbackMessage = "";
                }, 3000);
            })
            .catch((error) => {
                console.error("Error updating contact:", error);
            });
    },

    /**
     * 添加新联系人
     * @returns {void}
     */
    addContact() {
        const newContact = {
            name: this.name.trim(),
            phone: this.phone.trim(),
            email: this.email,
            group: this.group,
            favorite: this.favorite ? 1 : 0,
        };

        // 调用后端API保存联系人
        axios.post("http://localhost:3000/api/contacts", newContact)
            .then(() => {
                this.feedbackMessage = "Contact added successfully!";
                this.resetForm(); // 重置表单
                this.$emit("contact-added"); // 通知父组件更新联系人列表
                setTimeout(() => {
                    this.feedbackMessage = "";
                }, 3000);
            })
            .catch((error) => {
                console.error("Error adding contact:", error);
            });
    },

    /**
     * 重置表单数据
     * @returns {void}
     */
    resetForm() {
        this.name = "";
        this.phone = "";
        this.email = "";
        this.group = "";
        this.favorite = false;
        this.$emit("reset-editing"); // 通知父组件重置编辑状态
    },

    /**
     * 清除反馈信息
     * @returns {void}
     */
    clearFeedbackMessage() {
        this.feedbackMessage = "";
    },
  },

  watch: {
    /**
     * 监控 editingContact 属性变化，动态更新表单数据
     */
    editingContact: {
      immediate: true,
      handler(newValue) {
        if (newValue) {
          // 编辑模式时填充表单数据
          this.name = newValue.name;
          this.phone = newValue.phone;
          this.email = newValue.email;
          this.group = newValue.group;
          this.favorite = !!newValue.favorite;
        } else {
          this.resetForm(); // 清空表单
        }
      },
    },
  },
};
</script>

<style scoped>
/* 表单过渡效果 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

/* 表单行样式 */
.form-row {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 10px;
  box-sizing: border-box;
}

/* 输入框和选择框样式 */
.form-row input,
.form-row select {
  width: 48%;
  padding: 8px;
  font-size: 1rem;
  box-sizing: border-box;
}

.form-row input:not(:last-child),
.form-row select:not(:last-child) {
  margin-right: 4%;
}

/* 提交按钮样式 */
button {
  padding: 10px 15px;
  background-color: #42b983;
  color: white;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #3a9c7f;
}

form {
  width: 100%;
  box-sizing: border-box;
}

label {
  margin: 10px 0;
  display: block;
}

/* 反馈信息样式 */
.feedback {
  margin-top: 10px;
  color: green;
  font-weight: bold;
  transition: opacity 0.5s ease;
}
</style>
