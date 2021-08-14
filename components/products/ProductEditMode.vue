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
            <a-col :span="16">
              <TextFormItem
                :initial-value="data.name"
                decorator="name"
                label="TODO Product name"
                placeholder="TODO Product name"
                required
                message="TODO campo obrigatório"
              />
            </a-col>

            <a-col :span="8">
              <SelectFormItem
                :initial-value="data.departmentId"
                :options="departments"
                :decorator="`departmentId`"
                label="TODO departamento"
                placeholder="TODO departamento"
                required
                message="TODO campo obrigatório"
              />
            </a-col>

            <a-col :span="8">
              <NumberFormItem
                :initial-value="data.price"
                :min="0"
                :precision="2"
                decorator="price"
                label="TODO productPrice"
                placeholder="TODO productPrice"
                required
                message="TODO campo obrigatório"
              />
            </a-col>

            <a-col :span="16">
              <SelectFormItem
                :initial-value="data.measurement"
                :options="measurementOptions"
                decorator="measurement"
                label="TODO measurement"
                placeholder="TODO measurement"
                required
                message="TODO campo obrigatório"
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
import NumberFormItem from '~/components/common/form-item/NumberFormItem'
import SelectFormItem from '~/components/common/form-item/SelectFormItem'
import DrawerForm from '~/components/common/DrawerForm'

export default {
  name: 'ProductEditMode',
  components: {
    DrawerForm,
    SelectFormItem,
    TextFormItem,
    NumberFormItem,
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
    departments: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      measurementOptions: [],
      form: this.$form.createForm(this),
    }
  },
  watch: {
    data() {
      this.form = this.$form.createForm(this)
    },
  },

  mounted() {
    this.getMeasurementList()
  },

  methods: {
    async getMeasurementList() {
      const measurementList = await FirebaseService.getAllOnce(
        'productsMeasurements'
      )
      this.measurementOptions = measurementList.map((measurement) => ({
        name: measurement.name,
        value: measurement.id,
      }))
    },

    async handleSubmit(e) {
      e.preventDefault()
      await this.form.validateFields(async (err, values) => {
        if (err) {
          // TODO
          return
        }
        // TODO add LOADING
        await FirebaseService.createOrEditItem('products', {
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
