# Web - Launch web browsers

The `web` module lets you spawn web browsers from the deno runtime with ease.

## Example

```ts
import { launch } from "./browser/mod.ts";

const process = await launch({
  url: "https://google.com",
  browser: "chrome",
});
```
