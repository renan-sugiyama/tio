<template>
  <a-row type="flex" justify="center" align="middle" style="height: 100vh">
    <a-col :span="8">
      <a-form :form="form" class="login-form" @submit.prevent="login">
        <a-form-item>
          <a-input
            v-decorator="[
              'email',
              {
                rules: [{ required: true, message: 'E-mail é obrigatório' }],
              },
            ]"
            placeholder="E-mail"
          >
            <a-icon
              slot="prefix"
              type="user"
              style="color: rgba(0, 0, 0, 0.25)"
            />
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-input
            v-decorator="[
              'password',
              {
                rules: [
                  { required: true, message: 'Please input your Password!' },
                ],
              },
            ]"
            type="password"
            placeholder="Password"
          >
            <a-icon
              slot="prefix"
              type="lock"
              style="color: rgba(0, 0, 0, 0.25)"
            />
          </a-input>
        </a-form-item>
        <a-form-item>
          <!-- TODO -->
          <!-- <a-checkbox
        v-decorator="[
          'remember',
          {
            valuePropName: 'checked',
            initialValue: true,
          },
        ]"
      >
        Remember me
      </a-checkbox> -->
          <!-- TODO -->
          <!-- <a class="login-form-forgot" href=""> Forgot password </a> -->
          <a-button
            type="primary"
            block
            class="login-form-button"
            html-type="submit"
          >
            Log in
          </a-button>
        </a-form-item>
      </a-form>
    </a-col>
  </a-row>
</template>

<script>
export default {
  name: 'Login',
  layout: 'empty',
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: 'normal_login' })
  },
  methods: {
    login() {
      this.form.validateFields(async (err, values) => {
        if (!err) {
          try {
            await this.$store.dispatch('admin/login', {
              email: values.email,
              password: values.password,
            })
            this.$router.push({ path: '/registration/order/list' })
          } catch (error) {
            // TODO exibir msg de erro
            console.log(error)
            this.$message.error(
              'Erro ao fazer login. Verifique usuário e senha'
            )
          }
        }
      })
    },
  },
}
</script>
