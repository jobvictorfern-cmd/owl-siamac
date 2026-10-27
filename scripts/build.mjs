import {readFile,writeFile} from 'node:fs/promises';
import {transform as jsTransform} from 'esbuild';
import {transform as cssTransform} from 'lightningcss';

const assets=new URL('../dist/assets/',import.meta.url);
const sourceJS=await readFile(new URL('app.js',assets),'utf8');
const sourceCSS=await readFile(new URL('styles.css',assets));
const js=await jsTransform(sourceJS,{minify:true,target:'es2020',legalComments:'inline'});
const css=cssTransform({filename:'styles.css',code:sourceCSS,minify:true});
await writeFile(new URL('app.min.js',assets),js.code);
await writeFile(new URL('styles.min.css',assets),css.code);
console.log(`JS: ${Buffer.byteLength(sourceJS)} → ${Buffer.byteLength(js.code)} bytes; CSS: ${sourceCSS.length} → ${css.code.length} bytes`);
