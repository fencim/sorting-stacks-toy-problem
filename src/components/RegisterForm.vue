<template>
  <div>
    <q-form
      @submit="submit" 
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
            v-model="profile.firstName"
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
            v-model="profile.lastName"
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
            v-model="profile.middleName"
            label="Middle name (Optional)"
            stack-label
          />
        </div>
        <div class="col-6">
          <q-input
            outlined
            v-model="profile.nickName"
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
            v-model="profile.age"
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
            v-model="profile.gender"
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

<script lang="ts">
import { mapActions, mapState } from 'vuex';
import { Vue, Component } from 'vue-property-decorator';
import { Profile } from 'src/store/profiles/state';

@Component({
  computed: {
    ...mapState('profiles', ['currentProfile'])
  },
  methods: {
    ...mapActions('profiles', ['register'])
  }
})
export default class RegisterForm extends Vue {
  currentProfile!: Profile;
  register!:(profile:Profile) => Promise<void>;
  profile: Profile = {};
  mounted() {
    this.profile = {...this.currentProfile};
  }
  submit() {
    this.register(this.profile).catch((e:string)=> {
      this.$q.notify({icon: 'error', message: e});
    }).finally(()=> {
      this.$router.push('/').catch((e:string) => {
        this.$q.notify({icon: 'error', message: e})
      });
    });
    
  }
};
</script>
