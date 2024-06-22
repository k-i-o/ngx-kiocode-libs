# NgxBrackets (pre-alpha first attempt) - unstable

This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.0.0.

## Usage

If you need to use BracketsViewer you MUST use provideBracketsViewer() method inside app.config.ts

### Example

``` js
import { ApplicationConfig } from '@angular/core';

import { provideBracketsViewer } from '@kiocode/ngx-brackets';

export const appConfig: ApplicationConfig = {
  providers: [provideBracketsViewer()]
};
```
