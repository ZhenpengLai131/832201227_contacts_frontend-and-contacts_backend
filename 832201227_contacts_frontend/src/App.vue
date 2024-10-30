<template>
  <div id="app">
    <h1 class="app-title">Welcome to Address Book</h1>
    <!-- 联系人表单组件 -->
    <div class="form-container">
      <ContactForm
        :contacts="contacts"
        @contact-added="fetchContacts"
        @contact-updated="fetchContacts"
        @reset-editing="resetEditing"
        :editingContact="selectedContact"
      />
    </div>
    <!-- 联系人列表组件 -->
    <div class="contacts-list-container">
      <h2 class="contacts-list-title">Contacts List</h2>
      <ContactList
        :contacts="contacts"
        @edit-contact="editContact"
        @contact-deleted="fetchContacts"
      />
    </div>
  </div>
</template>

<script>
import ContactForm from './components/ContactForm.vue';
import ContactList from './components/ContactList.vue';
import axios from 'axios';

export default {
  data() {
    return {
      contacts: [],  // 存储联系人列表
      selectedContact: null,  // 当前选中的联系人，用于编辑
    };
  },
  components: {
    ContactForm,
    ContactList,
  },
  methods: {
    /**
     * @description 从后端获取最新的联系人列表
     * @returns {void}
     */
    fetchContacts() {
      axios
        .get('http://localhost:3000/api/contacts')
        .then((response) => {
          // 成功获取联系人数据，将其存入组件的状态中
          this.contacts = response.data;
        })
        .catch((error) => {
          // 捕获错误并输出到控制台
          console.error('Error fetching contacts:', error);
          // 提示用户请求失败的消息
          alert('Failed to fetch contacts. Please try again later.');
        });
    },
    /**
     * @description 选择一个联系人进行编辑
     * @param {Object} contact - 用户选择的联系人
     * @returns {void}
     */
    editContact(contact) {
      axios
        .get(`http://localhost:3000/api/contacts/${contact.id}`)
        .then((response) => {
          // 更新选中的联系人信息，确保从后端获取最新数据
          this.selectedContact = response.data;
        })
        .catch((error) => {
          console.error('Error fetching contact details:', error);
          alert('Failed to load contact details. Please try again later.');
        });
    },
    /**
     * @description 重置编辑状态
     * @returns {void}
     */
    resetEditing() {
      this.selectedContact = null;
    },
  },
  /**
   * @description 组件挂载后，立即从后端获取联系人列表
   * @returns {void}
   */
  mounted() {
    this.fetchContacts();
  },
};
</script>

<style scoped>
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  overflow: hidden;
}

#app {
  min-height: 100%;
  overflow-y: auto;
  padding: 20px;
  box-sizing: border-box;
}

body {
  background-color: #f4f4f9;
  font-family: 'Arial', sans-serif;
}

.app-title {
  text-align: center;
  font-size: 2.5em;
  margin: 20px 0;
  font-weight: bold;
  color: #333;
}

.form-container {
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  background-color: white;
}

.contacts-list-title {
  font-size: 1.8em;
  text-align: center;
  margin: 20px 0;
  font-weight: bold;
  color: #333;
}

.contacts-list-container {
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 10px;
  overflow-y: auto;
}
</style>
