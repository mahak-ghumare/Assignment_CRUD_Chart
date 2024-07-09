import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { CommonService } from 'src/app/core/services/common.service';

@Component({
	selector: 'app-product-add-edit',
	templateUrl: './product-add-edit.component.html',
	styleUrls: ['./product-add-edit.component.css']
})
export class ProductAddEditComponent implements OnInit {
	productForm: UntypedFormGroup | any;
	modalType: string = 'Add';

	@Input() displayAddEditModal: boolean = true;
	@Input() selectedProduct: any = null;
	@Output() clickClose: EventEmitter<boolean> = new EventEmitter<boolean>();
	@Output() clickAdd: EventEmitter<any> = new EventEmitter<any>();

	constructor(
		private fb: FormBuilder,
		private _commonService: CommonService,
		private messageService: MessageService
	) { }

	ngOnInit(): void {
		this.productForm = this.fb.group({
			title: [null, Validators.required],
			price: [null, Validators.required],
			description: [null, Validators.required],
			category: [null, Validators.required],
			image: [""],
		});
	}

	ngOnChanges(): void {
		if (this.selectedProduct) {
			this.modalType = 'Edit';
			this.productForm.patchValue(this.selectedProduct)
		} else {
			this.modalType = 'Add';
			this.productForm?.reset();
		}
	}

	/**Fuction called on submission of form*/
	onSubmit() {
		if (this.productForm.valid) {
			const isAddMode = this.modalType === 'Add';
			const endPoint = isAddMode ? 'products' : `products/${this.selectedProduct.id}`;
			const method = isAddMode ? 'post' : 'put';

			this._commonService.sendRequest(method, endPoint, this.productForm.value).subscribe({
				next: (respData: any) => {
					this.clickAdd.emit(respData);
					this.closeModal();
					this.messageService.add({ severity: 'success', summary: 'Success', detail: `Product ${isAddMode ? 'Added' : 'Edited'} Successfully` });
				},
				error: (err) => {
					this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Some Error Occurred' });
				}
			});
		}
	}


	/**Fuction used to close product modal*/
	closeModal() {
		this.productForm.reset();
		this.clickClose.emit(true);
	}

}
