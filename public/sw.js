if(!self.define){let e,i={};const s=(s,c)=>(s=new URL(s+".js",c).href,i[s]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=s,e.onload=i,document.head.appendChild(e)}else e=s,importScripts(s),i()})).then((()=>{let e=i[s];if(!e)throw new Error(`Module ${s} didn’t register its module`);return e})));self.define=(c,a)=>{const n=e||("document"in self?document.currentScript.src:"")||location.href;if(i[n])return;let t={};const r=e=>s(e,n),f={module:{uri:n},exports:t,require:r};i[n]=Promise.all(c.map((e=>f[e]||r(e)))).then((e=>(a(...e),t)))}}define(["./workbox-c7d19dc4"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/app-build-manifest.json",revision:"06167154ec22a988defdcc36d919f68e"},{url:"/_next/static/FMjMZP3yUNigPy4yyFr1u/_buildManifest.js",revision:"c02d2878d90ce4dac5dd66308cd80ddf"},{url:"/_next/static/FMjMZP3yUNigPy4yyFr1u/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/0129962d-e9892aebd857a9fa.js",revision:"FMjMZP3yUNigPy4yyFr1u"},{url:"/_next/static/chunks/192-70447666ab9c4a1d.js",revision:"FMjMZP3yUNigPy4yyFr1u"},{url:"/_next/static/chunks/31-112764e08885c4ef.js",revision:"FMjMZP3yUNigPy4yyFr1u"},{url:"/_next/static/chunks/313-9c0a8e12183ea762.js",revision:"FMjMZP3yUNigPy4yyFr1u"},{url:"/_next/static/chunks/328-952156ffe7caf357.js",revision:"FMjMZP3yUNigPy4yyFr1u"},{url:"/_next/static/chunks/552-4ad85166075555bb.js",revision:"FMjMZP3yUNigPy4yyFr1u"},{url:"/_next/static/chunks/563-50255394a0295bcb.js",revision:"FMjMZP3yUNigPy4yyFr1u"},{url:"/_next/static/chunks/694-97f2bbf987c9907e.js",revision:"FMjMZP3yUNigPy4yyFr1u"},{url:"/_next/static/chunks/6d38d19b-39f65316fbffa05a.js",revision:"FMjMZP3yUNigPy4yyFr1u"},{url:"/_next/static/chunks/76-23eb523fd9554e02.js",revision:"FMjMZP3yUNigPy4yyFr1u"},{url:"/_next/static/chunks/776-713e6c3918dc1781.js",revision:"FMjMZP3yUNigPy4yyFr1u"},{url:"/_next/static/chunks/927-4448f6dddc812e84.js",revision:"FMjMZP3yUNigPy4yyFr1u"},{url:"/_next/static/chunks/app/%5Bproject%5D/%5BalarmId%5D/layout-f52b2ad44262ab17.js",revision:"FMjMZP3yUNigPy4yyFr1u"},{url:"/_next/static/chunks/app/%5Bproject%5D/%5BalarmId%5D/page-82e1af3781dcde31.js",revision:"FMjMZP3yUNigPy4yyFr1u"},{url:"/_next/static/chunks/app/%5Bproject%5D/notice/page-42ebf9115736f20b.js",revision:"FMjMZP3yUNigPy4yyFr1u"},{url:"/_next/static/chunks/app/%5Bproject%5D/page-1ed73e49bc1e6819.js",revision:"FMjMZP3yUNigPy4yyFr1u"},{url:"/_next/static/chunks/app/_not-found/page-bdb8b1873051b1b3.js",revision:"FMjMZP3yUNigPy4yyFr1u"},{url:"/_next/static/chunks/app/error-ddc75088281793c4.js",revision:"FMjMZP3yUNigPy4yyFr1u"},{url:"/_next/static/chunks/app/layout-94797ab7e1ae2c0f.js",revision:"FMjMZP3yUNigPy4yyFr1u"},{url:"/_next/static/chunks/app/page-c8db79f49d9d008f.js",revision:"FMjMZP3yUNigPy4yyFr1u"},{url:"/_next/static/chunks/framework-a950166acd5bd0c1.js",revision:"FMjMZP3yUNigPy4yyFr1u"},{url:"/_next/static/chunks/main-98bb7f5fb02acddb.js",revision:"FMjMZP3yUNigPy4yyFr1u"},{url:"/_next/static/chunks/main-app-f1f7e51838e43b46.js",revision:"FMjMZP3yUNigPy4yyFr1u"},{url:"/_next/static/chunks/pages/_app-b1fff7a213e0aec0.js",revision:"FMjMZP3yUNigPy4yyFr1u"},{url:"/_next/static/chunks/pages/_error-21c61c0af54e54db.js",revision:"FMjMZP3yUNigPy4yyFr1u"},{url:"/_next/static/chunks/polyfills-78c92fac7aa8fdd8.js",revision:"79330112775102f91e1010318bae2bd3"},{url:"/_next/static/chunks/webpack-ea52f4f26cd11310.js",revision:"FMjMZP3yUNigPy4yyFr1u"},{url:"/_next/static/css/11aad1ad512948af.css",revision:"11aad1ad512948af"},{url:"/_next/static/css/16e4ddfc841f0cf3.css",revision:"16e4ddfc841f0cf3"},{url:"/_next/static/media/05a31a2ca4975f99-s.woff2",revision:"f1b44860c66554b91f3b1c81556f73ca"},{url:"/_next/static/media/122c360d7fe6d395-s.p.woff2",revision:"9b2795fb691d8f8a83312a4436f5a453"},{url:"/_next/static/media/513657b02c5c193f-s.woff2",revision:"c4eb7f37bc4206c901ab08601f21f0f2"},{url:"/_next/static/media/51ed15f9841b9f9d-s.woff2",revision:"bb9d99fb9bbc695be80777ca2c1c2bee"},{url:"/_next/static/media/9bbb7f84f3601865-s.woff2",revision:"d8134b7ae9ca2232a397ef9afa6c8d30"},{url:"/_next/static/media/9f05b6a2725a7318-s.woff2",revision:"afbfd524bdefea1003f0ee71b617e50e"},{url:"/_next/static/media/a8eac78432f0a60b-s.woff2",revision:"be605f007472cc947fe6b6bb493228a5"},{url:"/_next/static/media/c740c1d45290834f-s.woff2",revision:"bff99a4bbc4740c49b75b52f290be90e"},{url:"/_next/static/media/c9a5bc6a7c948fb0-s.p.woff2",revision:"74c3556b9dad12fb76f84af53ba69410"},{url:"/_next/static/media/d0697bdd3fb49a78-s.woff2",revision:"50b29fea20cba8e522c34a1413592253"},{url:"/_next/static/media/d6b16ce4a6175f26-s.woff2",revision:"dd930bafc6297347be3213f22cc53d3e"},{url:"/_next/static/media/ec159349637c90ad-s.woff2",revision:"0e89df9522084290e01e4127495fae99"},{url:"/_next/static/media/fd4db3eb5472fc27-s.woff2",revision:"71f3fcaf22131c3368d9ec28ef839831"},{url:"/favicon.ico",revision:"c30c7d42707a47a3f4591831641e50dc"},{url:"/manifest.json",revision:"18ca987130119880a6f56487af96d853"},{url:"/next.svg",revision:"8e061864f388b47f33a1c3780831193e"},{url:"/skynet-128.png",revision:"c945c0fddfafd756e7d3c6d7491ab47b"},{url:"/skynet-144.png",revision:"644b20a565f6d1daf76b1978756fb7db"},{url:"/skynet-152.png",revision:"615450f6f3b25380f36cfa2597666b19"},{url:"/skynet-16.png",revision:"0983cdbc5e9614bbcdd821580ca668f7"},{url:"/skynet-180.png",revision:"f923990bb03029b2813b2d23dd621348"},{url:"/skynet-192.png",revision:"4d599b1227da85cf8bfb08653da51f87"},{url:"/skynet-256.png",revision:"26b1f6a416c61ed3bd2c00f96f81b964"},{url:"/skynet-48.png",revision:"d9bc4810453feb960a80c809e7b2016a"},{url:"/skynet-512.png",revision:"a7b21f1a2257de8f12221a1f6808cb42"},{url:"/skynet-64.png",revision:"4b7ad3a15cf4f72e302c2458be03e451"},{url:"/skynet-72.png",revision:"5fcbc34e8f5417ea29cf359869b78b0f"},{url:"/skynet-96.png",revision:"817cfa5563080883d721352571f3203c"},{url:"/vercel.svg",revision:"61c6b19abff40ea7acd577be818f3976"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:i,event:s,state:c})=>i&&"opaqueredirect"===i.type?new Response(i.body,{status:200,statusText:"OK",headers:i.headers}):i}]}),"GET"),e.registerRoute(/.*/,new e.StaleWhileRevalidate,"GET")}));
