<template>
  <div>
    <q-form
      @submit=""
      :class="!$q.screen.lt.md ? 'q-pa-xl shadow-10' : 'q-pa-lg'"
    >
      <div
        :class="
          !$q.screen.lt.md ? 'text-h3 q-pb-xl' : 'text-h4 text-center q-pb-lg '
        "
      >
        Registration
      </div>
      <div
        class="q-pb-sm text-grey-8"
        :class="!$q.screen.lt.md ? 'text-h6' : 'text-subtitle1'"
      >
        Personal Information
      </div>
      <div
        class=""
        :class="
          !$q.screen.lt.md
            ? 'row q-col-gutter-x-md q-gutter-y-md'
            : 'q-gutter-y-md'
        "
      >
        <div class="col-6">
          <q-input
            outlined
            v-model="firstName"
            label="First name"
            lazy-rules
            stack-label
            hide-bottom-space
            :rules="[
              val => (val && val.length > 0) || 'Please enter first name'
            ]"
          />
        </div>
        <div class="col-6">
          <q-input
            outlined
            v-model="lastName"
            label="Last name"
            lazy-rules
            stack-label
            hide-bottom-space
            :rules="[
              val => (val && val.length > 0) || 'Please enter last name'
            ]"
          />
        </div>
        <div class="col-6">
          <q-input
            outlined
            v-model="middleName"
            label="Middle name (Optional)"
            stack-label
          />
        </div>
        <div class="col-6">
          <q-input
            outlined
            v-model="nickName"
            label="Nick name"
            stack-label
            :rules="[
              val => (val && val.length > 0) || 'Please enter last name'
            ]"
          />
        </div>
        <div class="col-6">
          <q-input
            outlined
            v-model="age"
            type="number"
            label="Age"
            stack-label
            lazy-rules
            hide-bottom-space
            :rules="[
              val =>
                (val && Number(val) > 10) ||
                'Please enter valid age (over 10 years old)'
            ]"
          >
          </q-input>
        </div>
        <div class="col-6">
          <q-select
            outlined
            stack-label
            v-model="gender"
            label="Gender"
            :options="['Male', 'Female']"
            options-dense
            hide-bottom-space
            :rules="[val => (val && val.length > 0) || 'Please enter gender']"
          />
        </div>
    
      </div>
      <div class="text-right q-gutter-sm q-pt-lg">
        <q-btn
          push
          class="full-width"
          label="Register"
          type="submit"
          color="primary"
          size="lg"
        />
      </div>
    </q-form>
  </div>
</template>

<script>

export default {
  name: 'RegisterForm',
  data() {
    return {
      firstName: '',
      lastName: '',
      middleName: '',
      nickName: '',
      age: '',
      gender: '',
      
    };
  } 
};
</script>
