<template>
        <section>
        <div class="flex flex-col items-center justify-center mx-auto">
            <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Set Google TOTP
                    </h1>
                    <template v-if="!returnMessage">
                        <form @submit.prevent="onSubmit">
                            <p>
                                Launch the Authenticator application. Click on Scan a barcode. This will launch the device's camera. Point the device camera to the QR Code on Dashboard.
                            </p>
                                <div class="mt-8 flex items-center justify-center">
                                    <QrCodeVue :value="`otpauth://totp/${totp.issuer}:${user.email}?secret=${totp.secret}&issuer=${totp.issuer}`" size="150" v-if="totp.secret"></QrCodeVue>
                                </div>
                            <div>
                                <label for="totpCode" class="mt-8 block mb-2 text-sm font-medium text-gray-900 dark:text-white">Google Authenticator Code</label>
                                <input type="text" v-model="form.totpCode" name="totpCode" id="totpCode" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="">
                            </div>
                            <div>
                                    <button type="submit" class="mt-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Set authentication</button>
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
import { mapActions, mapState } from 'pinia'
import { useAuthStore } from '@/stores/auth'

import QrCodeVue from 'qrcode.vue';

export default {
    data() {
        return {
            totp: {},
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
        ...mapActions(useAuthStore, ['setTotp', 'getTotp']),

        async onSubmit () {
            this.returnMessage = await this.setTotp({
                secret: this.totp.secret,
                issuer: this.totp.issuer,
                totpCode: this.form.totpCode
            })
        }
    },

    async created() {
        this.totp = await this.getTotp()
    }
}
</script>