<template>
  <div>
    <DrawerForm
      :handle-submit="handleSubmit"
      title="TODO pedidos"
      :visible="visible"
      @close="$emit('close')"
    >
      <template slot="content">
        <a-form :form="form" layout="vertical" hide-required-mark>
          <a-row :gutter="16">
            <a-col :span="24">
              <!-- TODO search client -->
              <TextFormItem
                :initial-value="data.contacName"
                decorator="contacName"
                label="TODO Order contacName"
                placeholder="TODO Order Name"
                required
                message="TODO Please enter user contacName"
              />
            </a-col>

            <!-- TODO preencher automaticamente -->
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

            <!-- TODO preencher automaticamente -->
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

            <!-- TODO preencher automaticamente -->
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

            <button @click="addProduct">TODO + produto</button>

            <a-col :span="24">
              <a-row
                v-for="(product, index) in form.getFieldValue('products')"
                :key="product.id"
                :gutter="8"
              >
                <a-col :span="24">
                  <!-- TODO colocar search -->
                  <SelectFormItem
                    :initial-value="product.name"
                    :options="productOptions"
                    :decorator="`productName_${index}`"
                    label="TODO product name"
                    placeholder="TODO product name"
                    required
                    message="TODO campo obrigatório"
                    @change="(value) => updateSelectedProduct(index, value)"
                  />
                </a-col>

                <template v-if="product.name">
                  <a-col :span="12">
                    <div style="display: flex; align-items: center">
                      <NumberFormItem
                        :initial-value="product.price"
                        :min="0"
                        :precision="2"
                        :formatter="
                          (value) => `${value} ${product.measurement}`
                        "
                        :parser="
                          (value) =>
                            value.replace(` ${product.measurement}`, '')
                        "
                        :decorator="`productPrice_${index}`"
                        label="TODO price"
                        placeholder="TODO productPrice"
                        required
                        message="TODO campo obrigatório"
                        @change="
                          (value) => updateProduct(index, value, 'price')
                        "
                      />
                    </div>
                  </a-col>

                  <a-col :span="4">
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
                        (value) => updateProduct(index, value, 'quantity')
                      "
                    />
                  </a-col>

                  <a-col :span="4">
                    <div>TODO total</div>
                    <div>
                      {{ product.quantity * product.price || 0 }}
                    </div>
                  </a-col>
                </template>
              </a-row>
            </a-col>
          </a-row>
        </a-form>
      </template>
    </DrawerForm>
  </div>
</template>

<script>
import FirebaseService from '~/service/firebase'
import NumberFormItem from '~/components/common/form-item/NumberFormItem'
import TextFormItem from '~/components/common/form-item/TextFormItem'
import SelectFormItem from '~/components/common/form-item/SelectFormItem'
import DrawerForm from '~/components/common/DrawerForm'

export default {
  name: 'OrderEditMode',
  components: {
    NumberFormItem,
    TextFormItem,
    SelectFormItem,
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
      productOptions: [],
      form: this.$form.createForm(this),
    }
  },

  watch: {
    data() {
      this.form = this.$form.createForm(this)
    },
  },

  mounted() {
    this.form.getFieldDecorator('products', {
      initialValue: this.data.products || [],
      preserve: true,
    })

    this.form.setFieldsValue({
      products: this.data.products || [],
    })

    this.getProductList()
  },

  methods: {
    async getProductList() {
      const productList = await FirebaseService.getAllOnce('products')

      this.productOptions = productList.map((product) => ({
        id: product.id,
        name: product.name,
        price: product.price,
        measurement: product.measurement,
        quantity: 1,
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
        [`productPrice_${index}`]: product.price,
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

    addProduct() {
      const { form } = this
      const products = form.getFieldValue('products')
      const productsUpdated = products.concat({
        name: '',
        measurement: null,
        price: 0,
        quantity: 0,
      })
      form.setFieldsValue({
        products: productsUpdated,
      })
    },

    async handleSubmit(e) {
      e.preventDefault()
      await this.form.validateFields(async (err, values) => {
        if (err) {
          // TODO
          return
        }
        await FirebaseService.createOrEditItem('orders', {
          id: this.data?.id,
          ...this.data,
          contacName: values.contacName,
          contactEmail: values.contactEmail,
          contactPhone: values.contactPhone,
          deliverAddress: values.deliverAddress,
          products: values.products,
        })
        this.$emit('update')
      })
    },
  },
}
</script>
