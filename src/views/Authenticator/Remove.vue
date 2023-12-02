<template>
    <section>
    <div class="flex flex-col items-center justify-center mx-auto">
        <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    Remove Authenticator
                </h1>
                <template v-if="!returnMessage">
                    <form @submit.prevent="onSubmit">
                        <div>
                            <label for="totpCode" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Google Authenticator Code</label>
                            <input type="text" v-model="form.twoFactorCode" name="totpCode" id="totpCode" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="">
                        </div>
                        <div>
                            <button type="submit" class="mt-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Remove Authenticator</button>
                        </div>
                    </form>
                </template>
                    <div>
                        <button type="submit" @click="$router.go(-1)" class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                            Terug
                        </button>
                    </div>
            </div>
        </div>
    </div>
</section>
</template>

<script>
import { mapActions } from 'pinia'
import { useAuthStore } from '@/stores/auth'


export default {
    data() {
        return {
            form: {
                twoFactorCode: ''
            },
            returnMessage: '',
        }
    },

    methods: {
        ...mapActions(useAuthStore, ['removeTotp']),

        async onSubmit () {
            const formData = {
                twoFactorCode: this.form.twoFactorCode
            }
            
            this.returnMessage = await this.removeTotp(formData) 
        }
    }
}
</script>