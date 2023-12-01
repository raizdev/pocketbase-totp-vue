<template>
  <Notifications/>
  <router-view></router-view>
</template>

<script>
import Notifications from '@/components/Notification.vue';

export default {
  components: {
    Notifications
  }
}
</script>

