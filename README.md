
Setup

```
pnpm i
```

Start

```
pnpm dev
```

Test 1
See debug console, "[ReferenceError: document is not defined]" comes from SDK trying to access cookies.

Test 2
In "src\app\api\products\[query]\route.ts" comment out line 4
```
export const runtime = 'edge';
```
Refresh page and see console for "paramsSerializer is not a function"

Test 3
In "lib\order-cloud\index.ts" comment out line 17
```
    axiosAdapter: fetchAdapter,
```

Refresh page and see a list of product names.
