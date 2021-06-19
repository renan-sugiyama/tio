<template>
  <a-form
    :form="form"
    :label-col="{ span: 5 }"
    :wrapper-col="{ span: 12 }"
    layout="horizontal"
    @submit="handleSubmit"
  >
    <a-form-item label="Note">
      <a-input
        v-decorator="[
          'note',
          { rules: [{ required: true, message: 'Please input your note!' }] },
        ]"
      />
    </a-form-item>
    <a-form-item label="Gender">
      <a-select
        v-decorator="[
          'gender',
          {
            rules: [{ required: true, message: 'Please select your gender!' }],
          },
        ]"
        placeholder="Select a option and change input text above"
        @change="handleSelectChange"
      >
        <a-select-option value="male"> male </a-select-option>
        <a-select-option value="female"> female </a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
      <a-button type="primary" html-type="submit"> Salvar </a-button>
      <a-divider type="vertical" />
      <a-button type="danger" ghost> Cancelar </a-button>
    </a-form-item>
  </a-form>
</template>

<script>
export default {
  data() {
    return {
      form: this.$form.createForm(this, { name: 'coordinated' }),
      id: this.$route.params.id,
    }
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault()
      console.log(this.$router)
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
        }
      })
    },
    handleSelectChange(value) {
      console.log(value)
      this.form.setFieldsValue({
        note: `Hi, ${value === 'male' ? 'man' : 'lady'}!`,
      })
    },
  },
}
</script>
