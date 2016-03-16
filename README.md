# angular2-ngrx-rest-app

Based on the tutorial
[Build a Better Angular 2 Application with Redux and ngrx](http://onehungrymind.com/build-better-angular-2-application-redux-ngrx/)
by Lukas Ruebbelke

## Check for the latest recommended configuration
- https://angular.io/docs/ts/latest/quickstart.html

## File structure

```shell
.
├── LICENSE
├── README.md
├── bs-config.json
├── build
│   ├── app
│   │   ├── app.component.js
│   │   ├── app.component.js.map
│   │   ├── main.js
│   │   └── main.js.map
│   ├── index.html
│   └── vendor
│       ├── angular2
│       ├── es6-shim
│       ├── rxjs
│       └── systemjs
├── gulpfile.js
├── node_modules
├── package.json
├── src
│   ├── app
│   │   ├── app.component.ts
│   │   └── main.ts
│   └── index.html
├── tsconfig.json
├── typings
│   ├── browser
│   │   └── ambient
│   ├── browser.d.ts
│   ├── main
│   │   └── ambient
│   └── main.d.ts
└── typings.json

118 directories, 219 files
```

## Troubleshooting

### Property 'assign' does not exist on type 'ObjectConstructor'
- http://stackoverflow.com/a/35959710/3837223

```ts
(<any>Object).assign( {}, item, payload )
```

### cannot build with typescript - error(s) TS2304
- https://github.com/angular/angular/blob/master/CHANGELOG.md#breaking-changes-2
- If you use --target=es5, you will need to add a line somewhere in your application (for example, at the top of the .ts file where you call bootstrap):

```
///<reference path="node_modules/angular2/typings/browser.d.ts"/>
```

## ES6 Setters | error TS2300: Duplicate identifier
- http://stackoverflow.com/a/35712307/3837223

```ts
export class ItemDetails {

    @Input('item') set _item(value: Item) {

        if (value) this.originalName = value.name;
          this.selectedItem = Object.assign({}, value);
    }
    originalName: string;
    selectedItem: Item;

    @Output() saved = new EventEmitter();
    @Output() cancelled = new EventEmitter();
}
```

## All the files must be loaded 200 OK
- Check index.html
- Check gulpfile
 
