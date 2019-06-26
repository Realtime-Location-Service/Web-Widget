<template>
  <div>
    <div class="mainText">
      <div>
        <b-card no-body class="overflow-hidden">
          <b-row no-gutters>
            <b-col md="6">
              <b-card-img :src="require('../assets/login-image.jpg')" class="rounded-0"></b-card-img>
            </b-col>
            <b-col md="6">
              <b-card-body title="Login">
                <b-form @submit="onSubmit" @reset="onReset" v-if="show">
                  <b-form-group
                    id="input-group-1"
                    label="Email address:"
                    label-for="input-1">
                    <b-form-input
                      id="input-1"
                      v-model="form.email"
                      type="email"
                      placeholder="Enter email">
                    </b-form-input>
                  </b-form-group>

                  <b-form-group
                    id="input-group-2"
                    label="Password:"
                    label-for="input-2">
                    <b-form-input
                      type="password"
                      id="input-2"
                      v-model="form.password"
                      placeholder="Enter password">
                    </b-form-input>
                  </b-form-group>
                  <b-button type="submit" variant="outline-info">Explore</b-button>
                  <b-button type="reset" variant="outline-warning">Reset</b-button>
                </b-form>
              </b-card-body>
            </b-col>
          </b-row>
        </b-card>
      </div>
      <br>
    </div>
    <vue-particles
      color="#66a5a0"
      :particleOpacity="0.7"
      :particlesNumber="100"
      shapeType="circle"
      :particleSize="8"
      linesColor="#66a5a0"
      :linesWidth="2"
      :lineLinked="true"
      :lineOpacity="0.4"
      :linesDistance="150"
      :moveSpeed="3"
      :hoverEffect="true"
      hoverMode="grab"
      :clickEffect="true"
      clickMode="push">
    </vue-particles>
  </div>
</template>
<script>
import Types from '../store/types'
export default {
  data () {
    return {
      form: {
        email: '',
        password: ''
      },
      show: true
    }
  },
  methods: {
    async onSubmit (evt) {
      evt.preventDefault()
      // Save the token.
      await this.$store.dispatch(Types.actions.ACTION_SAVE_TOKEN, {
        appKey: 'KSAx2mit9nxoyiUW1TnuQ',
        rlsReferrer: 'www.company1.com'
      })
      this.$router.push({name: 'UserList'})
    },
    onReset (evt) {
      evt.preventDefault()
      this.form.email = ''
      this.form.password = ''
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    }
  }
}
</script>

<style scoped>
  .btn-outline-success {
    color: #c12f93;
    background-color: transparent;
    border-color: #c12f93;
  }

  .btn-outline-success:hover {
    color: white;
    background-color: #c12f93;
  }

  .mainText {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  @media only screen and (max-width: 500px) {
    .mainText {
      width: 75%;
      top: 57%;
    }
  }

  .card-img {
    height: 100%;
  }
</style>
