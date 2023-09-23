import { ref } from 'vue';
import { defineStore } from 'pinia';
import { Member } from '../components/models/member';

const loginStore = defineStore({
  id: 'login',
  state: () => {
    return {
      isAuthed: ref(false),
      member: ref(new Member('', ''))
    };
  },

  // 주의 : getter는 변수명과 동일하게 사용하면 안된다.
  getters: {
    // isAuthed: (state) => state.isAuthed, -> not working
    // member: (state) => state.member, -> not working
    isAuthedMember: (state) => state.isAuthed,
    getMember: (state) => state.member
  },
  actions: {
    login(member) {
      this.isAuthed = true;
      this.member = member;
    },
    logout() {
      this.isAuthed = false;
      this.member = new Member('', '');
    },
    isStoredMember() {
      return this.isAuthed;
    }
  },
  persist: {
    storage: localStorage
  }
});

export default loginStore;
