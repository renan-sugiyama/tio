<template>
  <div>
    <DrawerForm
      :handle-submit="handleSubmit"
      title="TODO usuarios"
      :visible="visible"
      @close="$emit('close')"
    >
      <template slot="content">
        <a-form :form="form" layout="vertical" hide-required-mark>
          <a-row :gutter="[8, 16]">
            <a-col :span="24">
              <TextFormItem
                :initial-value="data.name"
                decorator="name"
                label="TODO Client name"
                placeholder="TODO Client Name"
                required
                message="TODO Please enter user name"
              />
            </a-col>

            <a-col :span="24">
              <TextFormItem
                :initial-value="data.phoneNumber"
                decorator="phoneNumber"
                label="TODO Client phoneNumber"
                placeholder="TODO Client phoneNumber"
                required
                message="TODO Please enter user phoneNumber"
              />
            </a-col>

            <a-col :span="24">
              <TextFormItem
                :initial-value="data.address"
                decorator="address"
                label="TODO Client address"
                placeholder="TODO Client address"
                required
                message="TODO Please enter user address"
              />
            </a-col>

            <a-col :span="24">
              <TextFormItem
                :initial-value="data.email"
                decorator="email"
                label="TODO Client email"
                placeholder="TODO Client email"
                :required="false"
                message="TODO Please enter user email"
              />
            </a-col>

            <a-col :span="24">
              <TextFormItem
                :initial-value="data.documentNumber"
                decorator="documentNumber"
                label="TODO Client documentNumber"
                placeholder="TODO Client documentNumber"
                :required="false"
                message="TODO Please enter user documentNumber"
              />
            </a-col>
          </a-row>
        </a-form>
      </template>
    </DrawerForm>
  </div>
</template>

<script>
import FirebaseService from '~/service/firebase'
import TextFormItem from '~/components/common/form-item/TextFormItem'
import DrawerForm from '~/components/common/DrawerForm'

export default {
  name: 'ClientEditMode',
  components: {
    TextFormItem,
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
