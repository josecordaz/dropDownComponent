import { Component, Input, OnInit, forwardRef, OnChanges, Output, EventEmitter } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
@Component({
  selector    : 'app-drop-down',
  templateUrl : './drop-down.component.html',
  styleUrls   : ['./drop-down.component.css'],
  providers   : [
      {
          provide: NG_VALUE_ACCESSOR,
          useExisting : forwardRef(() => DropDownComponent),
          multi : true
      }
  ]
})
export class DropDownComponent implements OnInit, ControlValueAccessor, OnChanges {
  private itemSelected;
  private localData;
  private inputValue: string;
  private mainWidth: string;
  @Input() disabled: boolean;
  @Input() initLabelSelection: string;
  @Input() data: Array<any>;
  @Input() width: string;
  @Input() showLeft: string;
  @Input() modelValue: any;
  @Input() modelText: string;
  @Input() _value = 0;
  @Output() change = new EventEmitter();
  propagateChange = (_: any) => {};
  get value(){
      return this._value;
  }
  set value(val){
    console.log('value');
    console.log(val);
    setTimeout(() => {
      this._value = val;
      if (this.data && this.data[0] && ( typeof this.data[0] === 'string' || typeof this.data[0] === 'number')) {
        this.itemSelected = val;
        console.log('itemSelected1 '+val);
        console.log(this.itemSelected);
      }
      this.propagateChange(this._value);
      this.change.emit(this._value);
    }, 1);
  }

  ngOnInit() {
      console.log('ngOnInit');
      this.updateLocalData();
      this.mainWidth = ((+this.width.substr(0, this.width.indexOf('px'))) + (this.showLeft !== 'true' ? 0 : 83)) + 'px';
      this.inputValue = '';
  }
  ngOnChanges(changes: any) {
    console.log('ngOnChanges');
    if (changes.data) {
      this.updateLocalData();
      this.value = this.localData.reduce((pv, cv) => {
        if ('' + cv[this.modelValue] === '' + this.inputValue) {
          pv = cv;
        }
        return pv;
      }, {});
      console.log('ngOnChanges AFTER REDUCE');
      console.log(this.value);
      if (JSON.stringify(this.value) === '{}') {
        this.inputValue = '';
      } else {
        this.itemSelected = this.value;
        console.log('itemSelected'+this.value);
      }
    }
    
  }
  updateLocalData(): void {
      console.log('updateLocalData');
      this.localData = [this.initLabelSelection];
      this.itemSelected = this.initLabelSelection;
      this.localData.push(...this.data);
      console.log('INSIDE updateLocalData');
      console.log(this.value);
  }
  selectItem(item) {
    console.log('selectItem');
    console.log(item);
    if (
      (item.hasOwnProperty(this.modelValue) && item.hasOwnProperty(this.modelText)
      && (item[this.modelValue] || item[this.modelValue] === 0 || item[this.modelValue]) && item[this.modelText]
      || typeof item === 'number')
       || typeof item === 'string' ) {
      console.log('I am inside if');
      this.itemSelected = item;
      console.log('itemSelected');
      console.log(this.itemSelected);
      if (item[this.modelValue] === 0) {
        this.inputValue = '' + 0;
      } else {
        if (item[this.modelValue]) {
          if (typeof item[this.modelValue] === 'string') {
            this.inputValue = item[this.modelValue].trim();
          } else {
            this.inputValue = item[this.modelValue];
          }
        } else {
          this.inputValue = '';
        }
      }
      this.value = this.itemSelected;
      this.propagateChange(this.itemSelected);
    } else {
      this.inputValue = '';
    }
  }
  writeValue(value: any) {
    console.log('writeValue');
    console.log(value);
     if (value) {
       this.updateLocalData();
       this.selectItem(value);
     }
  }
  registerOnChange(fn) {
    this.propagateChange = fn;
  }
  registerOnTouched() {}
  selectByInput(e) {
    console.log('selectByInput');
    if (e.which === 13) {
      let item = this.getItemById(this.inputValue);
      if (item === this.initLabelSelection) {
         this.inputValue = '';
      }
      this.selectItem(item);
    }
  }
  inputBlur() {
    console.log('inputBlur');
    let item = this.getItemById(this.inputValue);
    if (typeof item === 'string') {
      this.inputValue = '';
      this.itemSelected = this.localData[0];
    }
    this.selectItem(item);
  }
  private getItemById(id) {
    console.log('getItemById');
    return this.localData.reduce((pv, cv) => {
        if (('' + id).trim() === ('' + cv[this.modelValue]).trim()) {
          pv = cv;
        }
        return pv;
      }, this.localData[0]);
  }
}
