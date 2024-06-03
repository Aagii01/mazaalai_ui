import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Product } from '../../api/product';
import { ProductService } from '../../service/product.service';
import { Subscription, debounceTime } from 'rxjs';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';
@Component({
    templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit, OnDestroy {
    items!: MenuItem[];
    products!: Product[];
    chartData: any;
    chartOptions: any;
    subscription!: Subscription;
    totalOrder: number = 0;
    totalUser: number = 0;
    orderList: any;
    totalRev: number = 0;

    myOrderList = [];
    myTotalRev = 0;
    userType: number = 0;
    userID: number = 0;
    constructor(
        private productService: ProductService,
        public layoutService: LayoutService,
        private orderService: OrderService,
        private userService: UserService
    ) {
        this.subscription = this.layoutService.configUpdate$
            .pipe(debounceTime(25))
            .subscribe((config) => {
                this.initChart();
            });
    }

    ngOnInit() {
        this.userType = Number(localStorage.getItem('token'));
        this.userID = Number(localStorage.getItem('user_id'));
        this.initChart();
        this.productService
            .getProductsSmall()
            .then((data) => (this.products = data));

        this.items = [
            { label: 'Add New', icon: 'pi pi-fw pi-plus' },
            { label: 'Remove', icon: 'pi pi-fw pi-minus' },
        ];

        this.orderService.getOrders().subscribe((response) => {
            console.log('response: ', response);
            this.totalOrder = response['body'].length;
            this.orderList = response['body'];

            let sum = 0;
            let sum1 = 0;
            this.orderList.map((val) => {
                if (val.status != '0') {
                    sum += 25000;
                }
                if (val.user_id == this.userID) {
                    this.myOrderList.push(val);
                    sum1 += 25000;
                }
            });
            this.myTotalRev = sum1;
            this.totalRev = sum;
        });

        this.userService.getUsers().subscribe((response) => {
            this.totalUser = response.length;
        });
    }

    initChart() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue(
            '--text-color-secondary'
        );
        const surfaceBorder =
            documentStyle.getPropertyValue('--surface-border');

        this.chartData = {
            labels: [
                'January',
                'February',
                'March',
                'April',
                'May',
                'June',
                'July',
            ],
            datasets: [
                {
                    label: 'First Dataset',
                    data: [65, 59, 80, 81, 56, 55, 40],
                    fill: false,
                    backgroundColor:
                        documentStyle.getPropertyValue('--bluegray-700'),
                    borderColor:
                        documentStyle.getPropertyValue('--bluegray-700'),
                    tension: 0.4,
                },
                {
                    label: 'Second Dataset',
                    data: [28, 48, 40, 19, 86, 27, 90],
                    fill: false,
                    backgroundColor:
                        documentStyle.getPropertyValue('--green-600'),
                    borderColor: documentStyle.getPropertyValue('--green-600'),
                    tension: 0.4,
                },
            ],
        };

        this.chartOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: textColor,
                    },
                },
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary,
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false,
                    },
                },
                y: {
                    ticks: {
                        color: textColorSecondary,
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false,
                    },
                },
            },
        };
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
