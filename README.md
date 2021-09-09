# web - launch web browsers

The web module lets you spawn web browsers from the deno runtime.

## Example

```ts
import { launch } from "./browser/mod.ts";

const process = await launch({
  url: "https://google.com",
  browser: "chrome",
});
```
