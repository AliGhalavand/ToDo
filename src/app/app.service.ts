import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { INewToDoItem, IToDoItem } from "./ToDo.model";

@Injectable({
    providedIn: 'root',
})
export class AppService {
    constructor(private httpClient: HttpClient) { }

    getAllItems() {
        const GET_ALL_ITEMS = `http://localhost:1337/items`;
        return this.httpClient.get<IToDoItem[]>(GET_ALL_ITEMS);
    }

    updateItem(id: number, item: IToDoItem) {
        const UPDATE_ITEMS = `http://localhost:1337/items/${id}`;
        return this.httpClient.patch(UPDATE_ITEMS, item);
    }

    addItem(item: INewToDoItem) {
        const ADD_ITEMS = `http://localhost:1337/items`;
        return this.httpClient.post(ADD_ITEMS, item);
    }

    deleteItem(id: number) {
        const DELETE_ITEM = `http://localhost:1337/items/${id}`;
        return this.httpClient.delete(DELETE_ITEM);
    }

    public resetNewToDoItem(): INewToDoItem {
        const defaultObject = {
            TaskName: '',
            Complete: 0,
        };
        return defaultObject;
    }

    public resetToDoItem(): IToDoItem {
        const defaultObject = {
            id:0,
            TaskName: '',
            Complete: 0,
        };
        return defaultObject;
    }

    
}