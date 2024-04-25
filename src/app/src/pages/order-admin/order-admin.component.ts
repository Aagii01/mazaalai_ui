import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AutoCompleteModule } from 'primeng/autocomplete';
import { CalendarModule } from 'primeng/calendar';
import { ChipsModule } from 'primeng/chips';
import { DropdownModule } from 'primeng/dropdown';
import { InputMaskModule } from 'primeng/inputmask';
import { InputNumberModule } from 'primeng/inputnumber';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';

import { Product } from 'src/app/demo/api/product';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ProductService } from 'src/app/demo/service/product.service';

import { TableModule } from 'primeng/table';
import { FileUploadModule } from 'primeng/fileupload';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { RatingModule } from 'primeng/rating';
import { RadioButtonModule } from 'primeng/radiobutton';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { OrderService } from 'src/app/services/order.service';

@Component({
    selector: 'app-order-admin',
    standalone: true,
    imports: [
        CommonModule,
        AutoCompleteModule,
        CalendarModule,
        ChipsModule,
        DropdownModule,
        InputMaskModule,
        InputNumberModule,
        CascadeSelectModule,
        MultiSelectModule,
        InputTextareaModule,
        InputTextModule,
        TableModule,
        FileUploadModule,
        FormsModule,
        ButtonModule,
        RippleModule,
        ToastModule,
        ToolbarModule,
        RatingModule,
        InputTextModule,
        InputTextareaModule,
        DropdownModule,
        RadioButtonModule,
        InputNumberModule,
        DialogModule,
    ],
    providers: [MessageService],
    templateUrl: './order-admin.component.html',
    styleUrl: './order-admin.component.scss',
})
export class OrderAdminComponent implements OnInit {
    order: any = {};
    orders: any[] = [];
    selectedOrders: any = [];
    cols: any[] = [];
    orderDialog: boolean = false;
    statuses: any[] | undefined;

    constructor(
        private orderService: OrderService,
        private messageService: MessageService
    ) {
        this.statuses = [
            { name: 'Баталгаажаагүй', code: '0' },
            { name: 'Хүлээн авсан', code: '1' },
            { name: 'Монгол руу гарсан', code: '2' },
            { name: 'Монгол дахь салбарт ирсэн', code: '3' },
        ];
    }

    ngOnInit(): void {
        this.orderService.getOrders().subscribe((data: any) => {
            console.log('data: ', data);
            this.orders = data.body;
        });
    }
    editOder(order) {
        console.log('order: ', order);
        this.order = { ...order };
        this.orderDialog = true;
    }
    hideDialog() {
        this.order = {};
        this.orderDialog = false;
    }

    saveOrder() {
        console.log('order: ', this.order);
        const body = {
            id: this.order.id,
            track_code: this.order.track_code,
            status: this.order.status,
            price: this.order.price,
            description: this.order.description,
            user_id: this.order.user_id,
        };

        console.log('body: ', body);
        this.orderService.upateOrder(body).subscribe((response) => {
            if (response.status === true) {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: response.message,
                    life: 3000,
                });
                this.order = {};
                this.orderDialog = false;
                this.ngOnInit();
            } else {
                this.messageService.add({
                    severity: 'warn',
                    summary: 'Warning !!',
                    detail: response.message,
                    life: 3000,
                });
            }
        });
    }
}
