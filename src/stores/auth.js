import { defineStore } from "pinia";
import { db } from '@/services/pocketbase'

export const useAuthStore = defineStore({
  id: "auth",

  state: () => ({
    user: db.authStore.model || ''
  }),

  getters: {},

  actions: {
    async initialize () {
      if(!this.user) return;

      await db.collection('users').authRefresh();
    },

    async getTotp () {
      return await db.send('/auth-generate-totp')
    },

    async removeTotp (formData) {
      const res = await db.send('/auth-remove-totp', { method: "POST", body: formData });
      this.user.secret_otp = false
      return res
    },

    async setTotp (formData) {
      const res = await db.send('/auth-activate-totp', { method: "POST", body: formData });
      this.user.secret_otp = true
      return res
    },

    async login (formData) {

      const auth = await db.send('/auth-login-totp', { method: "POST", body: formData })

      if(auth.status === "authenticator_enabled") {
        return auth;
      }

      db.authStore.save(auth.token, auth.record)

      this.$patch({
        user: auth.record
      })

      this.router.push({ name: 'home'})
    },

    async register (formData) {

      await db.collection('users').create(formData)

      const auth = await db.collection('users').authWithPassword(formData.email, formData.password);

      auth.secret_otp = (auth.secret_otp) ? true : false 

      this.$patch({
        user: auth.record
      })

      this.router.push({ name: 'home'})
    },

    logout() {
      db.authStore.clear();

      this.$patch({
          token: null,
          user: null,
      });
    },
  },
});
