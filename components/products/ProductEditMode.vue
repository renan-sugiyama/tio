<template>
  <a-modal
    :title="data && data.id ? 'Product edit' : 'Create a product'"
    :visible="visible"
    :ok-text="data && data.id ? 'Edit' : 'Create'"
    @close="$emit('close')"
    @ok="handleSubmit"
    @cancel="$emit('close')"
  >
    <a-form :form="form" layout="vertical" hide-required-mark>
      <a-row :gutter="[8, 16]">
        <a-col :span="16">
          <TextFormItem
            :initial-value="data.name"
            decorator="name"
            label="Product name"
            placeholder=""
            required
            message="This field is required"
          />
        </a-col>

        <a-col :span="8">
          <SelectFormItem
            :initial-value="data.departmentId"
            :options="departments"
            :decorator="`departmentId`"
            label="Department"
            placeholder=""
            required
            message="This field is required"
          />
        </a-col>
      </a-row>
    </a-form>
  </a-modal>
</template>

<script>
import { mapGetters } from 'vuex'
import FirebaseService from '~/service/firebase'
import TextFormItem from '~/components/common/form-item/TextFormItem'
import SelectFormItem from '~/components/common/form-item/SelectFormItem'

export default {
  name: 'ProductEditMode',
  components: {
    SelectFormItem,
    TextFormItem,
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

  computed: {
    ...mapGetters({
      departments: 'globalValues/getDepartments',
    }),
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
          this.$message.error('Please, fill all the required fields')
          return
        }
        // TODO add LOADING
        if (this.data?.id) {
          await FirebaseService.createOrEditItem('products', {
            id: this.data?.id,
            ...this.data,
            ...values,
            nameToFilter: values.name.toLowerCase(),
          })
          this.$emit('update', {
            id: this.data?.id,
            ...this.data,
            ...values,
          })
        } else {
          const result = await FirebaseService.createOrEditItem('products', {
            ...values,
            nameToFilter: values.name,
          })
          this.$emit('update', {
            id: result?.id,
            createdAt: result?.createdAt,
            updatedAt: result?.updatedAt,
            ...values,
          })
        }
      })
    },
  },
}
</script>
