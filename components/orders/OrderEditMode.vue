<template>
  <div>
    <DrawerForm
      :title="data && data.id ? 'TODO Editar Pedido' : 'TODO Novo Pedido'"
      :visible="visible"
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
            <a-step title="TODO Dados do Cliente">
              <template slot="description">
                <a-row v-show="currentStep === 0" :gutter="[8, 16]">
                  <a-col :span="24">
                    <TextFormItem
                      :initial-value="data.contactName"
                      decorator="contactName"
                      label="TODO contactName name"
                      placeholder="TODO contactName name"
                      required
                      message="TODO campo obrigatório"
                    />
                  </a-col>

                  <a-col :span="24">
                    <TextFormItem
                      :initial-value="data.deliverAddress"
                      decorator="deliverAddress"
                      label="TODO Order deliverAddress"
                      placeholder="TODO Order deliverAddress"
                      required
                      message="TODO Please enter user deliverAddress"
                    />
                  </a-col>

                  <a-col :span="24">
                    <TextFormItem
                      :initial-value="data.contactPhone"
                      decorator="contactPhone"
                      label="TODO Order contactPhone"
                      placeholder="TODO Order contactPhone"
                      required
                      message="TODO Please enter user contactPhone"
                    />
                  </a-col>

                  <a-col :span="24">
                    <TextFormItem
                      :initial-value="data.contactEmail"
                      decorator="contactEmail"
                      label="TODO Order contactEmail"
                      placeholder="TODO Order contactEmail"
                      :required="false"
                      message="TODO Please enter user contactEmail"
                    />
                  </a-col>
                </a-row>
              </template>
            </a-step>

            <a-step title="Produtos">
              <template slot="description">
                <a-row v-show="currentStep === 1">
                  <a-col :span="24">
                    <button @click="addProduct">TODO + produto</button>
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
                              label="TODO product name"
                              placeholder="TODO product name"
                              required
                              message="TODO campo obrigatório"
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
                              label="TODO departamento"
                              placeholder="TODO departamento"
                              required
                              disabled
                              message="TODO campo obrigatório"
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
                                label="TODO quantity"
                                placeholder="TODO quantity"
                                required
                                message="TODO campo obrigatório"
                                @change="
                                  (value) =>
                                    updateProduct(index, value, 'quantity')
                                "
                              />
                            </a-col>

                            <a-col :span="8">
                              <SelectFormItem
                                :initial-value="product.measurement"
                                :options="measurementOptions"
                                :decorator="`productMeasurement_${index}`"
                                label="TODO measurement"
                                placeholder="TODO measurement"
                                required
                                message="TODO campo obrigatório"
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

            <a-step title="Info">
              <template slot="description">
                <a-row v-show="currentStep === 2" :gutter="[8, 16]">
                  <a-col :span="24">
                    <DateFormItem
                      :initial-value="initialDeliveryDate"
                      decorator="deliveryDate"
                      label="TODO delivery date"
                      placeholder="TODO delivery date"
                      required
                      message="TODO campo obrigatório"
                    />
                  </a-col>

                  <a-col :span="24">
                    <TextAreaFormItem
                      :initial-value="data.note"
                      decorator="note"
                      :label="`TODO observação (${actualNoteLength} / 100)`"
                      placeholder="TODO observação"
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
            Submit
          </a-button>
        </div>
      </template>
    </DrawerForm>
  </div>
</template>

<script>
import moment from 'moment'
import FirebaseService from '~/service/firebase'
import NumberFormItem from '~/components/common/form-item/NumberFormItem'
import TextFormItem from '~/components/common/form-item/TextFormItem'
// import AutoCompleteFormItem from '~/components/common/form-item/AutoCompleteFormItem'
import SelectFormItem from '~/components/common/form-item/SelectFormItem'
import DateFormItem from '~/components/common/form-item/DateFormItem'
import TextAreaFormItem from '~/components/common/form-item/TextAreaFormItem'
import DrawerForm from '~/components/common/DrawerForm'

export default {
  name: 'OrderEditMode',
  components: {
    NumberFormItem,
    TextFormItem,
    // AutoCompleteFormItem,
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
    measurementOptions: {
      type: Array,
      default: () => [],
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
        ? moment(new Date(this.data.deliveryDate))
        : moment(),
    }
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
        if (err) {
          this.$message.error('TODO verifique os campos obrigatórios')
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
            contactName: values.contactName,
            contactEmail: values.contactEmail,
            contactPhone: values.contactPhone,
            deliverAddress: values.deliverAddress,
            products: values.products,
            deliveryDate: values.deliveryDate.toDate().getTime(),
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
              deliverAddress: values.deliverAddress,
              products: values.products,
              deliveryDate: values.deliveryDate.toDate().getTime(),
              note: values.note,
            })
          } else {
            this.$emit('update', {
              id: result?.id,
              orderNumber,
              contactName: values.contactName,
              contactEmail: values.contactEmail,
              contactPhone: values.contactPhone,
              deliverAddress: values.deliverAddress,
              products: values.products,
              deliveryDate: values.deliveryDate.toDate().getTime(),
              note: values.note,
              createdAt: result?.createdAt,
              updatedAt: result?.updatedAt,
            })
          }
        } catch (error) {
          this.$message.error(
            `${
              this.data?.id
                ? 'TODO Não foi possível atualizar o pedido'
                : 'TODO Não foi possível criar o pedido'
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
