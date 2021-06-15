<template>
  <q-page
    :style="
      !$q.screen.lt.md
        ? 'padding-left: 150px; padding-right: 150px; padding-top: 50px; padding-bottom: 50px'
        : ''
    "
  >
    <RegisterForm></RegisterForm>
  </q-page>
</template>

<script>
import RegisterForm from '../components/RegisterForm.vue';
export default {
  name: 'Register',
  components: {
    RegisterForm
  }
};
</script>
