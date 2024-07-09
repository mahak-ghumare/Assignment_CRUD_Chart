import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CommonService } from 'src/app/core/services/common.service';
import { Product } from 'src/app/models/product.model';

@Component({
	selector: 'app-product-list',
	templateUrl: './product-list.component.html',
	styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
	products: Product[] = [];
	displayAddEditModal: boolean = false;
	selectedProduct: any = null;
	showGraph: boolean = false;

	constructor(
		private _commonService: CommonService,
		private messageService: MessageService,
		private confirmationService: ConfirmationService
	) { }

	ngOnInit(): void {
		this.getAllProducts();
	}

	/**Fuction used to get all products */
	getAllProducts() {
		var endPoint: string = 'products';

		this._commonService.sendRequest('get', endPoint, '').subscribe({
			next: (respData: any) => {
				if (Array.isArray(respData)) {
					this.products = respData as Product[];

				} else {
					console.error('Some Error Occured:', respData);
				}
			},
			error: (err) => {
				this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error fetching products' })

			}
		});
	}

	/**Fuction to search products from the list*/
	onGlobalFilter(event: Event, table: any): void {
		const inputElement = event.target as HTMLInputElement;
		table.filterGlobal(inputElement.value, 'contains');
	}

	/**Fuction to add the new prodcut to the list*/
	saveProducts(newProduct: any) {
		if (newProduct.id == this.selectedProduct?.id) {
			const productIndex = this.products.findIndex(data => data.id === newProduct.id);
			this.products[productIndex] = newProduct;
		} else {
			this.products.unshift(newProduct);
		}

		this.updateChartData();
	}

	/**Fuction used to display add-product modal*/
	showAddModal() {
		this.displayAddEditModal = true;
		this.selectedProduct = null;
	}

	/**Fuction used to hide add-product modal*/
	hideAddModal(isClosed: boolean) {
		this.displayAddEditModal = !isClosed;
	}

	/**Fuction to edit product*/
	showEditModal(product: Product) {
		this.displayAddEditModal = true;
		this.selectedProduct = product;
	}

	/**Fuction to delete product*/
	deleteProduct(product: Product) {
		this.confirmationService.confirm({
			message: 'Are you sure you want to delete this product?',
			header: 'Confirmation',
			icon: 'pi pi-exclamation-triangle',
			accept: () => {
				var endPoint: string = 'products/' + product.id;

				this._commonService.sendRequest('delete', endPoint, '').subscribe({
					next: (respData: any) => {
						this.products = this.products.filter(data => data.id != product.id);
						this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Product Deleted Successfuly' })
					},
					error: (err) => {
						this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error deleting product' })
					}
				});
			}
		});
	}

	/**Fuction to update graph*/
	updateChartData() {
		this.products = [...this.products];
	}


	/**Function to toggle the visibility of the graph */
	toggleGraph() {
		this.showGraph = !this.showGraph;
	}
}
