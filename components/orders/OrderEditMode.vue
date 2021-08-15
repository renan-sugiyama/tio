<template>
  <div>
    <DrawerForm
      :title="data && data.id ? 'Edit order' : 'Create a order'"
      :visible="visible"
      width="100vw"
      @close="$emit('close')"
    >
      <template slot="content">
        <a-form :form="form" layout="vertical" hide-required-mark>
          <a-steps
            :current="currentStep"
            direction="vertical"
            size="small"
            @change="onStepChange"
          >
            <a-step title="Client Info">
              <template slot="description">
                <a-row v-show="currentStep === 0" :gutter="[8, 16]">
                  <a-col :span="24">
                    <TextFormItem
                      :initial-value="data.contactName"
                      decorator="contactName"
                      label="Client Name"
                      placeholder=""
                      required
                      message="This field is required"
                    />
                  </a-col>

                  <a-col :span="24">
                    <TextFormItem
                      :initial-value="data.contactPhone"
                      decorator="contactPhone"
                      label="Phone number"
                      placeholder=""
                      required
                      message="This field is required"
                    />
                  </a-col>

                  <a-col :span="24">
                    <TextFormItem
                      :initial-value="data.contactEmail"
                      decorator="contactEmail"
                      label="E-mail"
                      placeholder=""
                      :required="false"
                    />
                  </a-col>
                </a-row>
              </template>
            </a-step>

            <a-step title="Produtos">
              <template slot="description">
                <a-row v-show="currentStep === 1">
                  <a-col :span="24">
                    <a-button type="primary" @click="addProduct">
                      Add product
                    </a-button>
                  </a-col>

                  <a-col :span="24">
                    <a-row
                      v-for="(product, index) in form.getFieldValue('products')"
                      :key="`${product.id}_${index}`"
                      :gutter="[16, 12]"
                      type="flex"
                      align="middle"
                    >
                      <a-col :span="24">
                        <hr v-if="index !== 0" />
                      </a-col>

                      <a-col :span="22">
                        <a-row :gutter="[8, 12]">
                          <a-col :span="16">
                            <SelectFormItem
                              :initial-value="product.name"
                              :options="productOptions"
                              :decorator="`productName_${index}`"
                              label="Product name"
                              placeholder=""
                              required
                              message="This field is required"
                              @change="
                                (value) => updateSelectedProduct(index, value)
                              "
                            />
                          </a-col>

                          <a-col v-if="product.name" :span="8">
                            <SelectFormItem
                              :initial-value="
                                product.department && product.department.name
                              "
                              :options="departmentOptions"
                              :decorator="`productDepartment_${index}`"
                              label="Department"
                              placeholder=""
                              required
                              disabled
                              message="This field is required"
                              @change="
                                (value, options) =>
                                  updateProductDepartment(
                                    index,
                                    value,
                                    'department'
                                  )
                              "
                            />
                          </a-col>

                          <template v-if="product.name">
                            <a-col :span="8">
                              <NumberFormItem
                                :initial-value="product.quantity"
                                :min="0"
                                :precision="2"
                                :decorator="`productQuantity_${index}`"
                                label="Quantity"
                                placeholder=""
                                required
                                message="This field is required"
                                @change="
                                  (value) =>
                                    updateProduct(index, value, 'quantity')
                                "
                              />
                            </a-col>

                            <a-col :span="8">
                              <SelectFormItem
                                :initial-value="product.measurement"
                                :options="measurements"
                                :decorator="`productMeasurement_${index}`"
                                label="Measurement"
                                placeholder=""
                                required
                                message="This field is required"
                                @change="
                                  (value) =>
                                    updateProduct(index, value, 'measurement')
                                "
                              />
                            </a-col>
                          </template>
                        </a-row>
                      </a-col>

                      <a-col :span="2" style="text-align: center">
                        <a-icon
                          style="color: #a33"
                          type="minus-circle-o"
                          @click="() => removeProduct(index)"
                        />
                      </a-col>
                    </a-row>
                  </a-col>
                </a-row>
              </template>
            </a-step>

            <a-step title="Additional Info">
              <template slot="description">
                <a-row v-show="currentStep === 2" :gutter="[8, 16]">
                  <a-col :span="12">
                    <DateFormItem
                      :initial-value="initialDeliveryDate"
                      decorator="deliveryDate"
                      label="Delivery date"
                      placeholder=""
                      required
                      message="This field is required"
                    />
                  </a-col>

                  <a-col :span="12">
                    <SelectFormItem
                      :initial-value="data.deliveryPeriod"
                      :options="deliveryPeriods"
                      decorator="deliveryPeriod"
                      label="Delivery Period"
                      placeholder=""
                      :required="false"
                    />
                  </a-col>

                  <a-col :span="24">
                    <TextAreaFormItem
                      :initial-value="data.note"
                      decorator="note"
                      :label="`Note (${actualNoteLength} / 100)`"
                      placeholder=""
                      :autosize="{ minRows: 3 }"
                      @change="updateNoteLength"
                    />
                  </a-col>
                </a-row>
              </template>
            </a-step>
          </a-steps>
        </a-form>
      </template>

      <template slot="actions">
        <div
          :style="{
            position: 'absolute',
            right: 0,
            bottom: 0,
            width: '100%',
            borderTop: '1px solid #e9e9e9',
            padding: '10px 16px',
            background: '#fff',
            display: 'flex',
            'align-items': 'center',
            zIndex: 1,
          }"
        >
          <a-button
            :style="{ marginRight: '8px' }"
            :disabled="loading"
            @click="$emit('close')"
          >
            Cancel
          </a-button>
          <a-button type="primary" :loading="loading" @click="handleSubmit">
            {{ data && data.id ? 'Edit' : 'Create' }}
          </a-button>
        </div>
      </template>
    </DrawerForm>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import moment from 'moment'
import FirebaseService from '~/service/firebase'
import NumberFormItem from '~/components/common/form-item/NumberFormItem'
import TextFormItem from '~/components/common/form-item/TextFormItem'
import SelectFormItem from '~/components/common/form-item/SelectFormItem'
import DateFormItem from '~/components/common/form-item/DateFormItem'
import TextAreaFormItem from '~/components/common/form-item/TextAreaFormItem'
import DrawerForm from '~/components/common/DrawerForm'

export default {
  name: 'OrderEditMode',
  components: {
    NumberFormItem,
    TextFormItem,
    SelectFormItem,
    DateFormItem,
    TextAreaFormItem,
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
      loading: false,
      actualNoteLength: this.data.note?.length || 0,
      currentStep: 0,
      productOptions: [],
      clientOptions: [],
      departmentOptions: [],
      form: this.$form.createForm(this),
      initialDeliveryDate: this.data.deliveryDate
        ? moment(this.data.deliveryDate)
        : moment(),
    }
  },

  computed: {
    ...mapGetters({
      measurements: 'globalValues/getMeasurements',
      deliveryPeriods: 'globalValues/getDeliveryPeriods',
    }),
  },

  watch: {
    data() {
      this.form = this.$form.createForm(this)
    },
  },

  async mounted() {
    this.form.getFieldDecorator('products', {
      initialValue: this.data.products || [],
      preserve: true,
    })

    // this.form.setFieldsValue({
    //   products: this.data.products || [],
    // })

    await this.getDepartmentList()
    this.getProductList()
  },

  methods: {
    updateNoteLength($event) {
      this.actualNoteLength = $event?.target?.value?.length
    },

    onStepChange(nextStep) {
      if (typeof nextStep === typeof 0) this.currentStep = nextStep
    },

    async getDepartmentList() {
      const departmentList = await FirebaseService.getAllOnce('departments')
      this.departmentOptions = departmentList.map((department) => ({
        name: department.name,
        id: department.id,
      }))
    },

    getProductDepartment(departmentId) {
      return this.departmentOptions.find(
        (department) => department.id === departmentId
      )
    },

    async getProductList() {
      const productList = await FirebaseService.getAllOnce('products')

      this.productOptions = productList.map((product) => ({
        id: product.id,
        name: product.name,
        measurement: null,
        quantity: 1,
        department: this.getProductDepartment(product.departmentId),
      }))
    },

    updateSelectedProduct(index, productId) {
      const products = this.form.getFieldValue('products')
      const product = this.productOptions.find(
        (product) => product.id === productId
      )
      products[index] = { ...product }

      this.form.setFieldsValue({
        products,
        [`productQuantity_${index}`]: 1,
        [`productMeasurement_${index}`]: null,
        [`productDepartment_${index}`]: product.department.name,
      })
    },

    updateProduct(index, newValue, prop) {
      const products = this.form.getFieldValue('products')
      products[index] = {
        ...products[index],
        [prop]: newValue,
      }
      this.form.setFieldsValue({ products })
    },

    updateProductDepartment(index, departmentId, prop) {
      const products = this.form.getFieldValue('products')
      const departmentName = this.departmentOptions.find(
        (item) => item.id === departmentId
      ).name
      products[index] = {
        ...products[index],
        [prop]: {
          name: departmentName,
          id: departmentId,
        },
      }
      this.form.setFieldsValue({ products })
    },

    addProduct() {
      const { form } = this
      const products = form.getFieldValue('products')
      const productsUpdated = products.concat({
        name: '',
        measurement: null,
        quantity: 0,
        department: null,
      })
      form.setFieldsValue({
        products: productsUpdated,
      })
    },

    removeProduct(index) {
      const { form } = this
      const products = form.getFieldValue('products')

      products.splice(index, 1)

      form.setFieldsValue({
        products,
      })
    },

    async handleSubmit(e) {
      e.preventDefault()
      await this.form.validateFields(async (err, values) => {
        if (!(values.products && values.products.length)) {
          this.$message.error('Selecione ao menos um produto')
          return
        }

        if (err) {
          this.$message.error('Please, fill all required fields')
          return
        }
        try {
          this.loading = true
          let orderNumber = 0
          if (!this.data?.id) {
            orderNumber = await FirebaseService.incrementCounter('orders')
          }
          const result = await FirebaseService.createOrEditItem('orders', {
            id: this.data?.id,
            orderNumber: this.data.orderNumber || orderNumber,
            ...this.data,
            contactNameToFilter: values.contactName.toLowerCase(),
            contactName: values.contactName,
            contactEmail: values.contactEmail,
            contactPhone: values.contactPhone,
            products: values.products,
            deliveryDate: values.deliveryDate.format('YYYY-MM-DD'),
            deliveryPeriod: values.deliveryPeriod,
            note: values.note,
          })
          if (this.data?.id) {
            this.$emit('update', {
              id: this.data?.id,
              orderNumber: this.data.orderNumber || orderNumber,
              ...this.data,
              contactName: values.contactName,
              contactEmail: values.contactEmail,
              contactPhone: values.contactPhone,
              products: values.products,
              deliveryDate: values.deliveryDate.format('YYYY-MM-DD'),
              deliveryPeriod: values.deliveryPeriod,
              note: values.note,
            })
          } else {
            this.$emit('update', {
              id: result?.id,
              orderNumber,
              contactName: values.contactName,
              contactEmail: values.contactEmail,
              contactPhone: values.contactPhone,
              products: values.products,
              deliveryDate: values.deliveryDate.format('YYYY-MM-DD'),
              deliveryPeriod: values.deliveryPeriod,
              note: values.note,
              createdAt: result?.createdAt,
              updatedAt: result?.updatedAt,
            })
          }
        } catch (error) {
          this.$message.error(
            `${
              this.data?.id
                ? 'It was not possible to edit the order'
                : 'It was not possible to create the order'
            }`
          )
        } finally {
          this.loading = false
        }
      })
    },
  },
}
</script>
