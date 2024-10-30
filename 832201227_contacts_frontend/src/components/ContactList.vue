<template>
  <div>
    <!-- 搜索和筛选区 -->
    <div class="search-container">
      <!-- 搜索输入框 -->
      <input
        v-model="searchQuery"
        placeholder="Search contacts"
        class="search-input"
      />
      <!-- 仅显示收藏联系人 -->
      <label class="favorites-label">
        <input type="checkbox" v-model="showFavoritesOnly" /> Show Favorites
      </label>
      <!-- 分组选择下拉框 -->
      <select v-model="selectedGroup" class="group-select">
        <option value="">All Groups</option>
        <option value="Family">Family</option>
        <option value="Friends">Friends</option>
        <option value="Work">Work</option>
        <option value="Other">Other</option>
      </select>
    </div>

    <!-- 联系人列表 -->
    <div class="contact-list-container">
      <ul class="contact-list">
        <!-- 循环生成联系人项 -->
        <li
          v-for="contact in filteredContacts"
          :key="contact.id"
          :id="`contact-${getFirstLetter(contact.name)}`"
          class="contact-item"
        >
          <!-- 联系人信息展示 -->
          <div class="contact-info">
            <div class="name-phone">{{ contact.name }} - {{ contact.phone }}</div>
            <div>Group: {{ contact.group }}</div>
            <div>Email: {{ contact.email || '-' }}</div>
          </div>
          <!-- 联系人操作按钮 -->
          <div class="contact-actions">
            <button @click="editContact(contact)">Edit</button>
            <button @click="deleteContact(contact.id)">Delete</button>
            <button @click="toggleFavorite(contact)">
              {{ contact.favorite ? "Unfavorite" : "Favorite" }}
            </button>
          </div>
        </li>
      </ul>

      <!-- 字母导航栏 -->
      <div class="alphabet-nav">
        <!-- 循环生成字母导航 -->
        <div
          v-for="letter in uniqueFirstLetters"
          :key="letter"
          @click="scrollToLetter(letter)"
          class="alphabet-letter"
        >
          {{ letter }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import pinyin from 'pinyin';

export default {
  props: {
    contacts: Array, // 父组件传递的联系人数组
  },
  data() {
    return {
      searchQuery: '', // 搜索框输入值
      showFavoritesOnly: false, // 是否只显示收藏联系人
      selectedGroup: '', // 当前选择的分组
    };
  },
  computed: {
    /**
     * @description 生成联系人名字的首字母集合，用于字母导航栏
     * @returns {Array} 联系人名字首字母的数组
     */
    uniqueFirstLetters() {
      return [...new Set( // 使用 Set 去重
        this.filteredContacts
          .map((contact) => this.getFirstLetter(contact.name)) // 获取每个联系人的首字母
      )].sort(); // 排序
    },

    /**
     * @description 根据搜索条件、分组和收藏状态过滤联系人列表，并按首字母排序
     * @returns {Array} 过滤后的联系人数组
     */
    filteredContacts() {
      return this.contacts
        .filter((contact) => {
          // 根据名字或电话号码匹配搜索条件
          const matchesSearch =
            contact.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
            contact.phone.includes(this.searchQuery);

          // 只显示收藏联系人时，过滤非收藏联系人
          const matchesFavorite = !this.showFavoritesOnly || contact.favorite === 1;

          // 根据选择的分组进行筛选
          const matchesGroup = !this.selectedGroup || contact.group === this.selectedGroup;

          return matchesSearch && matchesFavorite && matchesGroup;
        })
        .sort((a, b) => {
          const nameA = this.getFirstLetter(a.name); // 获取A的首字母
          const nameB = this.getFirstLetter(b.name); // 获取B的首字母
          return nameA.localeCompare(nameB); // 按首字母排序
        });
    },
  },
  methods: {
    /**
     * @description 获取联系人的名字首字母
     * @param {String} name - 联系人名字
     * @returns {String} 联系人的首字母
     */
    getFirstLetter(name) {
      const trimmedName = name.trim(); // 去除多余的空格

      // 如果名字是英文字符，返回首字母并转为大写
      if (/^[A-Za-z]+$/.test(trimmedName)) {
        return trimmedName.charAt(0).toUpperCase();
      } else {
        // 处理中文名字的情况，返回拼音的首字母
        const pinyinArray = pinyin(trimmedName, { style: pinyin.STYLE_FIRST_LETTER });
        return pinyinArray[0][0].toUpperCase();
      }
    },

    /**
     * @description 触发编辑联系人事件，通知父组件
     * @param {Object} contact - 联系人对象
     */
    editContact(contact) {
      this.$emit('edit-contact', contact); // 向父组件发送编辑事件
    },

    /**
     * @description 删除联系人
     * @param {Number} contactId - 联系人ID
     */
    deleteContact(contactId) {
      if (confirm('Are you sure you want to delete this contact?')) {
        axios
          .delete(`http://localhost:3000/api/contacts/${contactId}`) // 调用API删除联系人
          .then(() => {
            this.$emit('contact-deleted'); // 向父组件发送删除成功的事件
          })
          .catch((error) => {
            console.error('Error deleting contact:', error);
          });
      }
    },

    /**
     * @description 切换联系人收藏状态
     * @param {Object} contact - 联系人对象
     */
    toggleFavorite(contact) {
      const updatedContact = {
        name: contact.name,
        phone: contact.phone,
        email: contact.email || '', // 如果没有 email，使用空字符串
        group: contact.group,
        favorite: contact.favorite === 1 ? 0 : 1, // 切换收藏状态
      };

      axios
        .put(`http://localhost:3000/api/contacts/${contact.id}`, updatedContact)
        .then(() => {
          contact.favorite = updatedContact.favorite;
          this.$forceUpdate(); // 强制更新组件
        })
        .catch((error) => {
          console.error('Error updating favorite:', error);
        });
    },

    /**
     * @description 根据字母滚动到相应的联系人
     * @param {String} letter - 字母
     */
    scrollToLetter(letter) {
      const element = document.getElementById(`contact-${letter}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' }); // 滚动到目标联系人
      }
    },
  },
};
</script>

<style scoped>
.search-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.search-input {
  flex-grow: 2;
  margin-right: 10px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.favorites-label {
  flex-grow: 1;
  margin-right: 10px;
}

.group-select {
  flex-grow: 1;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.contact-list-container {
  position: relative;
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  max-height: 600px;
  overflow-y: auto;
  padding-right: 30px;
  overflow-x: hidden;
}

.contact-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.contact-item {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 5px;
  transition: background-color 0.3s;
  align-items: center;
}

.contact-item:hover {
  background-color: #f0f0f0;
}

.contact-info {
  flex: 1;
}

.contact-actions {
  display: flex;
  gap: 10px;
}

.contact-actions button {
  padding: 5px 10px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  min-width: 80px;
}

.contact-actions button:hover {
  background-color: #3a9c7f;
}

button:active {
  transform: scale(0.95);
}

.alphabet-nav {
  position: absolute;
  right: 0;
  top: 0;
  display: flex;
  flex-direction: column;
  padding: 3px;
  z-index: 9999;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.alphabet-letter {
  cursor: pointer;
  padding: 2px 4px;
  font-weight: bold;
  color: #333;
  text-align: center;
  font-size: 12px;
  margin-bottom: 2px;
}

.alphabet-letter:hover {
  background-color: #f0f0f0;
  color: #42b983;
  border-radius: 2px;
}
</style>
