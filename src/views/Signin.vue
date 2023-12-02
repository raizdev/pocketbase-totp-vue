<template>
<section>
  <div class="flex flex-col items-center justify-center">
      <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Sign in
              </h1>
              <form class="space-y-4 md:space-y-6" @submit.prevent="onSubmit">
                <template v-if="!user?.tfa_required">
                  <div>
                      <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                      <input type="email" v-model="form.email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  required="">
                  </div>
                  <div>
                      <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                      <input type="password" v-model="form.password" name="password" id="password" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="">
                  </div>
                </template>
                <template v-else>
                  <div>
                      <label for="toptCode" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Google Authenticator Code</label>
                      <input type="text" v-model="form.twoFactorCode" name="toptCode" id="toptCode" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="">
                  </div>
                </template>
                  <div class="flex items-center justify-between">
                      <div class="flex items-start">
                          <div class="flex items-center h-5">
                          </div>
                          <div class="ml-3 text-sm">
                          </div>
                      </div>
                      <RouterLink :to="{ name: 'registration' }" class="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500" v-if="!user?.tfa_required">No account? Register here</RouterLink>
                  </div>
                  <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Inloggen</button>
                </form>
          </div>
      </div>
  </div>
</section>
</template>
<script>
import { mapActions, mapState } from 'pinia'
import { useAuthStore } from '@/stores/auth'
import QrCodeVue from 'qrcode.vue';

export default {

  data () {
    return {
      totp: false,
      form: {
        email: '',
        password: ''
      }
    }
  },

  components: {
    QrCodeVue
  },

  computed: {
    ...mapState(useAuthStore, ['user'])
  },

  methods: {
    ...mapActions(useAuthStore, ['login']),

    async onSubmit () {
      await this.login(this.form)
    }
  },
}
</script>