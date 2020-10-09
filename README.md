#### Install

```bash
$ npm install --save @leonmin/md
```

#### Usage

- parse(data: string): string
- parseBuffer(data: ArrayBuffer): string

```typescript
import { parse, parseBuffer } from "@leonmin/md";
function Markdown() {
  const handleChange = (e: React.FormEvent<HTMLInputElement> & any) => {
    const reader = new FileReader();
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = e.target.files[0];
      reader.readAsArrayBuffer(file);
      reader.onload = (evt) => {
        console.log(parseBuffer(evt.target?.result as ArrayBuffer));
      };
    }
  };
  return (
    <div>
      <input
        onChange={(e: React.FormEvent<HTMLInputElement>) => handleChange(e)}
      />
    </div>
  );
}
```

#### Support List

- [x] 标题
- [x] 列表
- [x] 行内代码/强调
- [x] 多行代码(高亮)
- [x] 图片
