import { defineStore } from "pinia";
import { db } from '@/services/pocketbase'

export const useAuthStore = defineStore({
    id: "auth",

    state: () => ({
        user: db.authStore.model || ''
    }),

    actions: {
        async initialize () {
            if(!this.user) return;

            return await db.collection('users').authRefresh();
        },

        async getTotpSecretkey () {
            return await db.send('/auth-generate-totp')
        },

        async deleteTotpAuth(formData) {
            return await db.send('/auth-remove-totp', { method: "POST", body: formData });
        },

        async activateTotpAuth (formData) {
            return await db.send('/auth-activate-totp', { method: "POST", body: formData });
        },

        async login (formData) {
            const auth = await db.send('/auth-login', { method: "POST", body: formData })

            /* if twoFactor is enabeld set twoFactor required in user object */
            if (auth.tfa_required) return this.user = { tfa_required: auth.tfa_required }

            if(auth.token) {
                /* Save the token and the user record */
                db.authStore.save(auth.token, auth.record)

                /* Set user record */
                this.user = { ...auth.record }

                return this.router.push({ name: 'home'})
            }
        },

        async register (formData) {

            try {
                /* Create user */
                await db.collection('users').create(formData)

                /* Login user and set auth record */
                const auth = await db.collection('users').authWithPassword(formData.email, formData.password);

                this.$patch({ user: auth.record })

                return this.router.push({ name: 'home'})
            } catch(_) {}

        },

        logout() {
            db.authStore.clear();

            this.$patch({ token: null, user: null })
        }
    }
});
