<template>
  <div>
    <a-drawer
      title="Create a new account"
      :width="720"
      :visible="visible"
      :body-style="{ paddingBottom: '80px' }"
      @close="$emit('close')"
    >
      <a-form :form="form" layout="vertical" hide-required-mark>
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item label="Name">
              <a-input
                v-decorator="[
                  'name',
                  {
                    initialValue: data.name,
                    rules: [
                      { required: true, message: 'Please enter user name' },
                    ],
                  },
                ]"
                placeholder="Please enter user name"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="Idade">
              <a-input-number
                v-decorator="[
                  'age',
                  {
                    initialValue: data.age,
                    rules: [{ required: true, message: 'please enter url' }],
                  },
                ]"
                :min="1"
                :max="10"
              />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
      <div
        :style="{
          position: 'absolute',
          right: 0,
          bottom: 0,
          width: '100%',
          borderTop: '1px solid #e9e9e9',
          padding: '10px 16px',
          background: '#fff',
          textAlign: 'right',
          zIndex: 1,
        }"
      >
        <a-button :style="{ marginRight: '8px' }" @click="$emit('close')">
          Cancel
        </a-button>
        <a-button type="primary" @click="handleSubmit"> Submit </a-button>
      </div>
    </a-drawer>
  </div>
</template>
<script>
export default {
  name: 'ClientEditMode',
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    data: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      form: this.$form.createForm(this),
    }
  },
  methods: {
    async handleSubmit(e) {
      e.preventDefault()
      await this.form.validateFields(async (err, values) => {
        if (err) {
          // TODO
          return
        }
        // TODO LOADING
        await this.$store.dispatch('clients/editItem', values)
        this.$emit('close', values)
      })
    },
  },
}
</script>
