import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AppService } from './app.service';
import { INewToDoItem, IToDoItem } from './ToDo.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ToDo';
  public localItems: IToDoItem[] = [] as IToDoItem[];
  public localNewItem: INewToDoItem = this.appService.resetNewToDoItem();
  public localItem: IToDoItem = this.appService.resetToDoItem();

  constructor(private appService: AppService,
    private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit(): void {

    this.appService.getAllItems().subscribe({
      next: (res) => {
        this.localItems = res;
        this.changeDetectorRef.detectChanges();
      },
    });
  }

  public selectItem(item: IToDoItem ){
    this.localItem = item;
  }

  public UpdateItem(){
    this.appService.updateItem(this.localItem.id, this.localItem).subscribe({
      next: (res) => {
        this.appService.getAllItems().subscribe({
          next: (res) => {
            this.localItems = res;
          },
        });
        this.localItem = this.appService.resetToDoItem();
        this.changeDetectorRef.detectChanges();
      },
    });
  }

  public AddItem(){
    this.appService.addItem(this.localNewItem).subscribe({
      next: (res) => {
        this.appService.getAllItems().subscribe({
          next: (res) => {
            this.localItems = res;
          },
        });
        this.localNewItem = this.appService.resetNewToDoItem();
        this.changeDetectorRef.detectChanges();
      },
    });
  }

  public DeleteItem(item: IToDoItem){
    this.appService.deleteItem(item.id).subscribe({
      next: (res) => {
        this.appService.getAllItems().subscribe({
          next: (res) => {
            this.localItems = res;
          },
        });
        this.changeDetectorRef.detectChanges();
      },
    });
  }
  

}
