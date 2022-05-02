import { Options, Vue } from 'vue-class-component'
import { Product } from '@/interfaces/products.interface'
import { ShopCart } from '@/interfaces/shopcart.interface'

import Multiselect from '@vueform/multiselect'
import '@vueform/multiselect/themes/default.css'

import { CURRENCY } from '@/data/currency'

@Options({
	props: {
		products: {
			type: Array,
			required: true,
			default: [] as Product[]
		}
	},
	watch: {
		shoppingCart: {
			handler: 'shoppingCartChanged',
			immediate: false,
			deep: true
		},
		currencySelected: {
			handler: 'currencySelectedChanged',
			immediate: false,
			deep: true
		}
	},
	components: {
		Multiselect
	}
})
export default class ProductComponent extends Vue {
	// Data
	products!: Product[]
	shoppingCart: ShopCart[] = []
	currencies: any[] = CURRENCY
	currencySelected = 1

	// Methods
	capitalize(value: string): string {
		if (!value) return ''
		return value.charAt(0).toUpperCase() + value.slice(1)
	}

	calculateTotal(shopCart: ShopCart[]) {
		shopCart.forEach(item => {
			item.total = item.quantity * (item.price * this.currencySelected) - item.discount
		})
	}

	changeCurrency(value: any) {
		this.currencySelected = value.target.value
		this.calculateTotal(this.shoppingCart)
	}

	clear() {
		this.shoppingCart = []
	}

	selected(value: string) {
		const product = this.products.find(product => product.name === value)

		const shopCart = {
			id: product?.id,
			product: product?.name,
			quantity: 1,
			price: product?.price,
			discount: 0,
			total: product?.price
		} as ShopCart

		this.shoppingCart.push(shopCart)
	}

	// Watch
	shoppingCartChanged(value: ShopCart[], oldValue: ShopCart[]) {
		this.calculateTotal(value)
	}

	currencySelectedChanged(value: any, oldValue: any) {
		this.calculateTotal(this.shoppingCart)
	}

	// Computed
	get options() {
		return this.products.map(product => product.name)
	}

	get total() {
		return this.shoppingCart.reduce((total, item) => total + parseFloat(item.total.toString()), 0)
	}
}
