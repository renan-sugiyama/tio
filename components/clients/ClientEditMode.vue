<template>
  <div>
    <DrawerForm
      :handle-submit="handleSubmit"
      title="usuarios"
      :visible="visible"
      @close="$emit('close')"
    >
      <template slot="content">
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
      </template>
    </DrawerForm>
  </div>
</template>

<script>
import FirebaseService from '~/service/firebase'
import DrawerForm from '~/components/common/DrawerForm'

export default {
  name: 'ClientEditMode',
  components: {
    DrawerForm,
  },
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
  watch: {
    data() {
      this.form = this.$form.createForm(this)
    },
  },
  methods: {
    async handleSubmit(e) {
      e.preventDefault()
      await this.form.validateFields(async (err, values) => {
        if (err) {
          // TODO
          return
        }
        // TODO add LOADING
        await FirebaseService.createOrEditItem('clients', {
          id: this.data?.id,
          ...this.data,
          ...values,
        })
        this.$emit('update')
      })
    },
  },
}
</script>
