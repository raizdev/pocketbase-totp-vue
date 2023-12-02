<template>
    <section>
        <div class="flex flex-col items-center justify-center mx-auto">
            <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Authenticator Settings
                    </h1>
                   <div>
                        <RouterLink to="/authenticator/add">
                            <button type="submit" v-if="!user?.secret_otp" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                Set Google Authenticator
                            </button>
                        </RouterLink>
                        <RouterLink to="/authenticator/remove">
                            <button type="submit" v-if="user?.secret_otp" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                Remove Google Authenticator
                            </button>
                        </RouterLink>
                        <RouterLink to="/logout">
                            <button type="submit" class="mt-5 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                Logout
                            </button>
                        </RouterLink>
                    </div>
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
    data() {
        return {
            totp: {},
            generated: false,
            returnMessage: '',
            form: {
                totpCode: ''
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
        ...mapActions(useAuthStore, ['getTotp', 'setTotp']),

        async generateTotpQrCode() {
            this.totp = await this.getTotp()
            this.generated = true
        },

        async setTotpAuthentication () {
            this.returnMessage = await this.setTotp({
                secret: this.totp.secret,
                issuer: this.totp.issuer,
                email: this.user.email,
                totpCode: this.form.totpCode
            })
        },

        async removeTotpAuthentication () {
            await this.removeTotp({

            }) 
        }
    }
}
</script>