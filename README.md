# angular2-ngrx-rest-app

- Built upon [angular2-webpack-starter](https://github.com/AngularClass/angular2-webpack-starter) by AngularClass.
- Based on the tutorials:
    + [Build a Better Angular 2 Application with Redux and ngrx](http://onehungrymind.com/build-better-angular-2-application-redux-ngrx/)
    by Lukas Ruebbelke
    + [Adding Redux with NgRx/Store to Angular 2](http://orizens.com/wp/topics/adding-redux-with-ngrxstore-to-angular-2-part-1/) by Oren Farhi

==

## Check for the latest recommended configuration
- https://angular.io/docs/ts/latest/quickstart.html

## File structure

```shell
.
├── LICENSE
├── README.md
├── helpers.js
├── karma.conf.js
├── node_modules
├── package.json
├── protractor.conf.js
├── spec-bundle.js
├── src
│   ├── app
│   │   ├── app.ts
│   │   ├── components
│   │   ├── directives
│   │   ├── models
│   │   ├── services
│   │   └── store.ts
│   ├── assets
│   │   ├── css
│   │   ├── data.json
│   │   ├── humans.txt
│   │   ├── img
│   │   ├── manifest.json
│   │   ├── robots.txt
│   │   └── service-worker.js
│   ├── custom-typings.d.ts
│   ├── index.html
│   ├── main.ts
│   ├── polyfills.ts
│   └── vendor.ts
├── tsconfig.json
├── tslint.json
├── typedoc.json
├── typings
├── typings.json
├── webpack.config.js
├── webpack.prod.config.js
└── webpack.test.config.js
```

==

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


 
