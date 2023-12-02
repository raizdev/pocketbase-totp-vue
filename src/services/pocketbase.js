import PocketBase from 'pocketbase';
import { useNotificationStore } from '@/stores/notification';

const db = new PocketBase('http://localhost:8090');

db.afterSend = function (response, data) {

    const notificationStore = useNotificationStore()

    if([400, 403].includes(data.code)) {
        const field = Object.keys(data?.data)[0];
        if(data.data[field]) {
            notificationStore.notifications.push({ text: data.data[field].message, type: 'error' })
        } else {
            notificationStore.notifications.push({ text: data.message, type: 'error' })
        }
    }

    if(data.status === "success" && data.message ) {
        notificationStore.notifications.push({ text: data.message, type: 'success' })
    }

    return Object.assign(data);
}

export { db };