import { Component, Input, SimpleChanges } from '@angular/core';
import { Color, ScaleType } from '@swimlane/ngx-charts';

@Component({
	selector: 'app-bar-chart',
	templateUrl: './bar-chart.component.html',
	styleUrl: './bar-chart.component.css',
})
export class BarChartComponent {
	@Input() products: any[] = [];

	chartData: any[] = [];
	view: [number, number] = [700, 400]; 

	// Graph options
	showXAxis = true;
	showYAxis = true;
	gradient = false;
	showLegend = false;
	showXAxisLabel = true;
	xAxisLabel = 'Product';
	showYAxisLabel = true;
	yAxisLabel = 'Price';

	colorScheme: Color = {
		name: 'myScheme',
		selectable: true,
		group: ScaleType.Ordinal,
		domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
	};

	constructor() { }

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['products']) {
			this.updateChartData();
		}
	}

	/**Fuction used to display 
	* product's data into graph */
	updateChartData() {
		this.chartData = this.products.map(product => ({
			name: product.title,
			value: product.price
		}));
	}
}
