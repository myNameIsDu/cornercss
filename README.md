# Corner Css

A simple css theme, It is secondly development from [Doodle CSS](https://github.com/chr15m/DoodleCSS), I love it, But I also have some my own ideas, So I've forked it. Hope you like.

[demo](https://mynameisdu.github.io/corner.html)

### Native HTML Elements

<img src="https://resource.sunbohao.com/uPic/gbQDAQ.png" alt="gbQDAQ" width='60%'/>

### Extra Components

#### Modal

<img src="https://resource.sunbohao.com/uPic/BvSbaN.png" alt="BvSbaN" width='60%'/>

```ts
interface CornerConfirmParamsType {
  title: string;
  content: string;
  onOk?: () => void | Promise<void>;
  onCancel?: () => void | Promise<void>;
  cancelText?: string;
  okText?: string;
}
```

If you don't pass `okText` and `cancelText`, It won't render footer `button`

<img src="https://resource.sunbohao.com/uPic/9TZbY4.png" alt="9TZbY4" width='60%'/>

## How to use it

```shell
npm i cornercss
```

Add the class corner to the top level element you want to apply the theme to:

```html
<body class="corner">...</body>
```

Then import it.

```js
import "cornercss/index.css";
import { cornerConfirm } from "cornercss";

cornerConfirm({...})
```

If you like CDN, This is my own, You can use it, I will publish it after every build and change.

```html
<link rel="stylesheet" href="https://resource.sunbohao.com/cornerCss/index-2a2cb631fc.css" />
<script src="https://resource.sunbohao.com/cornerCss/index-a9b94fbf8c.js" ></script>
<!-- if you only need Html Elements, you can ignore this script -->
```

Please don't use it in production. Because it's a side project.
