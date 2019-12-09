/* PrismJS 1.17.1
https://prismjs.com/download.html#themes=prism&languages=markup+css+clike+javascript+java+python+r&plugins=line-numbers+normalize-whitespace */
var _self="undefined"!=typeof window?window:"undefined"!=typeof WorkerGlobalScope&&self instanceof WorkerGlobalScope?self:{},Prism=function(u){var c=/\blang(?:uage)?-([\w-]+)\b/i,r=0;var _={manual:u.Prism&&u.Prism.manual,disableWorkerMessageHandler:u.Prism&&u.Prism.disableWorkerMessageHandler,util:{encode:function(e){return e instanceof L?new L(e.type,_.util.encode(e.content),e.alias):Array.isArray(e)?e.map(_.util.encode):e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/\u00a0/g," ")},type:function(e){return Object.prototype.toString.call(e).slice(8,-1)},objId:function(e){return e.__id||Object.defineProperty(e,"__id",{value:++r}),e.__id},clone:function n(e,t){var a,r,i=_.util.type(e);switch(t=t||{},i){case"Object":if(r=_.util.objId(e),t[r])return t[r];for(var o in a={},t[r]=a,e)e.hasOwnProperty(o)&&(a[o]=n(e[o],t));return a;case"Array":return r=_.util.objId(e),t[r]?t[r]:(a=[],t[r]=a,e.forEach(function(e,r){a[r]=n(e,t)}),a);default:return e}},currentScript:function(){if("undefined"==typeof document)return null;if("currentScript"in document)return document.currentScript;try{throw new Error}catch(e){var r=(/at [^(\r\n]*\((.*):.+:.+\)$/i.exec(e.stack)||[])[1];if(r){var n=document.getElementsByTagName("script");for(var t in n)if(n[t].src==r)return n[t]}return null}}},languages:{extend:function(e,r){var n=_.util.clone(_.languages[e]);for(var t in r)n[t]=r[t];return n},insertBefore:function(n,e,r,t){var a=(t=t||_.languages)[n],i={};for(var o in a)if(a.hasOwnProperty(o)){if(o==e)for(var l in r)r.hasOwnProperty(l)&&(i[l]=r[l]);r.hasOwnProperty(o)||(i[o]=a[o])}var s=t[n];return t[n]=i,_.languages.DFS(_.languages,function(e,r){r===s&&e!=n&&(this[e]=i)}),i},DFS:function e(r,n,t,a){a=a||{};var i=_.util.objId;for(var o in r)if(r.hasOwnProperty(o)){n.call(r,o,r[o],t||o);var l=r[o],s=_.util.type(l);"Object"!==s||a[i(l)]?"Array"!==s||a[i(l)]||(a[i(l)]=!0,e(l,n,o,a)):(a[i(l)]=!0,e(l,n,null,a))}}},plugins:{},highlightAll:function(e,r){_.highlightAllUnder(document,e,r)},highlightAllUnder:function(e,r,n){var t={callback:n,selector:'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'};_.hooks.run("before-highlightall",t);for(var a,i=e.querySelectorAll(t.selector),o=0;a=i[o++];)_.highlightElement(a,!0===r,t.callback)},highlightElement:function(e,r,n){var t=function(e){for(;e&&!c.test(e.className);)e=e.parentNode;return e?(e.className.match(c)||[,"none"])[1].toLowerCase():"none"}(e),a=_.languages[t];e.className=e.className.replace(c,"").replace(/\s+/g," ")+" language-"+t;var i=e.parentNode;i&&"pre"===i.nodeName.toLowerCase()&&(i.className=i.className.replace(c,"").replace(/\s+/g," ")+" language-"+t);var o={element:e,language:t,grammar:a,code:e.textContent};function l(e){o.highlightedCode=e,_.hooks.run("before-insert",o),o.element.innerHTML=o.highlightedCode,_.hooks.run("after-highlight",o),_.hooks.run("complete",o),n&&n.call(o.element)}if(_.hooks.run("before-sanity-check",o),!o.code)return _.hooks.run("complete",o),void(n&&n.call(o.element));if(_.hooks.run("before-highlight",o),o.grammar)if(r&&u.Worker){var s=new Worker(_.filename);s.onmessage=function(e){l(e.data)},s.postMessage(JSON.stringify({language:o.language,code:o.code,immediateClose:!0}))}else l(_.highlight(o.code,o.grammar,o.language));else l(_.util.encode(o.code))},highlight:function(e,r,n){var t={code:e,grammar:r,language:n};return _.hooks.run("before-tokenize",t),t.tokens=_.tokenize(t.code,t.grammar),_.hooks.run("after-tokenize",t),L.stringify(_.util.encode(t.tokens),t.language)},matchGrammar:function(e,r,n,t,a,i,o){for(var l in n)if(n.hasOwnProperty(l)&&n[l]){var s=n[l];s=Array.isArray(s)?s:[s];for(var u=0;u<s.length;++u){if(o&&o==l+","+u)return;var c=s[u],g=c.inside,f=!!c.lookbehind,d=!!c.greedy,h=0,m=c.alias;if(d&&!c.pattern.global){var p=c.pattern.toString().match(/[imsuy]*$/)[0];c.pattern=RegExp(c.pattern.source,p+"g")}c=c.pattern||c;for(var y=t,v=a;y<r.length;v+=r[y].length,++y){var k=r[y];if(r.length>e.length)return;if(!(k instanceof L)){if(d&&y!=r.length-1){if(c.lastIndex=v,!(O=c.exec(e)))break;for(var b=O.index+(f&&O[1]?O[1].length:0),w=O.index+O[0].length,A=y,P=v,x=r.length;A<x&&(P<w||!r[A].type&&!r[A-1].greedy);++A)(P+=r[A].length)<=b&&(++y,v=P);if(r[y]instanceof L)continue;S=A-y,k=e.slice(v,P),O.index-=v}else{c.lastIndex=0;var O=c.exec(k),S=1}if(O){f&&(h=O[1]?O[1].length:0);w=(b=O.index+h)+(O=O[0].slice(h)).length;var j=k.slice(0,b),N=k.slice(w),E=[y,S];j&&(++y,v+=j.length,E.push(j));var C=new L(l,g?_.tokenize(O,g):O,m,O,d);if(E.push(C),N&&E.push(N),Array.prototype.splice.apply(r,E),1!=S&&_.matchGrammar(e,r,n,y,v,!0,l+","+u),i)break}else if(i)break}}}}},tokenize:function(e,r){var n=[e],t=r.rest;if(t){for(var a in t)r[a]=t[a];delete r.rest}return _.matchGrammar(e,n,r,0,0,!1),n},hooks:{all:{},add:function(e,r){var n=_.hooks.all;n[e]=n[e]||[],n[e].push(r)},run:function(e,r){var n=_.hooks.all[e];if(n&&n.length)for(var t,a=0;t=n[a++];)t(r)}},Token:L};function L(e,r,n,t,a){this.type=e,this.content=r,this.alias=n,this.length=0|(t||"").length,this.greedy=!!a}if(u.Prism=_,L.stringify=function(e,r){if("string"==typeof e)return e;if(Array.isArray(e))return e.map(function(e){return L.stringify(e,r)}).join("");var n={type:e.type,content:L.stringify(e.content,r),tag:"span",classes:["token",e.type],attributes:{},language:r};if(e.alias){var t=Array.isArray(e.alias)?e.alias:[e.alias];Array.prototype.push.apply(n.classes,t)}_.hooks.run("wrap",n);var a=Object.keys(n.attributes).map(function(e){return e+'="'+(n.attributes[e]||"").replace(/"/g,"&quot;")+'"'}).join(" ");return"<"+n.tag+' class="'+n.classes.join(" ")+'"'+(a?" "+a:"")+">"+n.content+"</"+n.tag+">"},!u.document)return u.addEventListener&&(_.disableWorkerMessageHandler||u.addEventListener("message",function(e){var r=JSON.parse(e.data),n=r.language,t=r.code,a=r.immediateClose;u.postMessage(_.highlight(t,_.languages[n],n)),a&&u.close()},!1)),_;var e=_.util.currentScript();if(e&&(_.filename=e.src,e.hasAttribute("data-manual")&&(_.manual=!0)),!_.manual){function n(){_.manual||_.highlightAll()}var t=document.readyState;"loading"===t||"interactive"===t&&e&&e.defer?document.addEventListener("DOMContentLoaded",n):window.requestAnimationFrame?window.requestAnimationFrame(n):window.setTimeout(n,16)}return _}(_self);"undefined"!=typeof module&&module.exports&&(module.exports=Prism),"undefined"!=typeof global&&(global.Prism=Prism);
Prism.languages.markup={comment:/<!--[\s\S]*?-->/,prolog:/<\?[\s\S]+?\?>/,doctype:{pattern:/<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:(?!<!--)[^"'\]]|"[^"]*"|'[^']*'|<!--[\s\S]*?-->)*\]\s*)?>/i,greedy:!0},cdata:/<!\[CDATA\[[\s\S]*?]]>/i,tag:{pattern:/<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/i,greedy:!0,inside:{tag:{pattern:/^<\/?[^\s>\/]+/i,inside:{punctuation:/^<\/?/,namespace:/^[^\s>\/:]+:/}},"attr-value":{pattern:/=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/i,inside:{punctuation:[/^=/,{pattern:/^(\s*)["']|["']$/,lookbehind:!0}]}},punctuation:/\/?>/,"attr-name":{pattern:/[^\s>\/]+/,inside:{namespace:/^[^\s>\/:]+:/}}}},entity:/&#?[\da-z]{1,8};/i},Prism.languages.markup.tag.inside["attr-value"].inside.entity=Prism.languages.markup.entity,Prism.hooks.add("wrap",function(a){"entity"===a.type&&(a.attributes.title=a.content.replace(/&amp;/,"&"))}),Object.defineProperty(Prism.languages.markup.tag,"addInlined",{value:function(a,e){var s={};s["language-"+e]={pattern:/(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,lookbehind:!0,inside:Prism.languages[e]},s.cdata=/^<!\[CDATA\[|\]\]>$/i;var n={"included-cdata":{pattern:/<!\[CDATA\[[\s\S]*?\]\]>/i,inside:s}};n["language-"+e]={pattern:/[\s\S]+/,inside:Prism.languages[e]};var t={};t[a]={pattern:RegExp("(<__[\\s\\S]*?>)(?:<!\\[CDATA\\[[\\s\\S]*?\\]\\]>\\s*|[\\s\\S])*?(?=<\\/__>)".replace(/__/g,a),"i"),lookbehind:!0,greedy:!0,inside:n},Prism.languages.insertBefore("markup","cdata",t)}}),Prism.languages.xml=Prism.languages.extend("markup",{}),Prism.languages.html=Prism.languages.markup,Prism.languages.mathml=Prism.languages.markup,Prism.languages.svg=Prism.languages.markup;
!function(s){var t=/("|')(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/;s.languages.css={comment:/\/\*[\s\S]*?\*\//,atrule:{pattern:/@[\w-]+[\s\S]*?(?:;|(?=\s*\{))/,inside:{rule:/@[\w-]+/}},url:{pattern:RegExp("url\\((?:"+t.source+"|[^\n\r()]*)\\)","i"),inside:{function:/^url/i,punctuation:/^\(|\)$/}},selector:RegExp("[^{}\\s](?:[^{};\"']|"+t.source+")*?(?=\\s*\\{)"),string:{pattern:t,greedy:!0},property:/[-_a-z\xA0-\uFFFF][-\w\xA0-\uFFFF]*(?=\s*:)/i,important:/!important\b/i,function:/[-a-z0-9]+(?=\()/i,punctuation:/[(){};:,]/},s.languages.css.atrule.inside.rest=s.languages.css;var e=s.languages.markup;e&&(e.tag.addInlined("style","css"),s.languages.insertBefore("inside","attr-value",{"style-attr":{pattern:/\s*style=("|')(?:\\[\s\S]|(?!\1)[^\\])*\1/i,inside:{"attr-name":{pattern:/^\s*style/i,inside:e.tag.inside},punctuation:/^\s*=\s*['"]|['"]\s*$/,"attr-value":{pattern:/.+/i,inside:s.languages.css}},alias:"language-css"}},e.tag))}(Prism);
Prism.languages.clike={comment:[{pattern:/(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,lookbehind:!0},{pattern:/(^|[^\\:])\/\/.*/,lookbehind:!0,greedy:!0}],string:{pattern:/(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,greedy:!0},"class-name":{pattern:/(\b(?:class|interface|extends|implements|trait|instanceof|new)\s+|\bcatch\s+\()[\w.\\]+/i,lookbehind:!0,inside:{punctuation:/[.\\]/}},keyword:/\b(?:if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/,boolean:/\b(?:true|false)\b/,function:/\w+(?=\()/,number:/\b0x[\da-f]+\b|(?:\b\d+\.?\d*|\B\.\d+)(?:e[+-]?\d+)?/i,operator:/[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,punctuation:/[{}[\];(),.:]/};
Prism.languages.javascript=Prism.languages.extend("clike",{"class-name":[Prism.languages.clike["class-name"],{pattern:/(^|[^$\w\xA0-\uFFFF])[_$A-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\.(?:prototype|constructor))/,lookbehind:!0}],keyword:[{pattern:/((?:^|})\s*)(?:catch|finally)\b/,lookbehind:!0},{pattern:/(^|[^.])\b(?:as|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,lookbehind:!0}],number:/\b(?:(?:0[xX](?:[\dA-Fa-f](?:_[\dA-Fa-f])?)+|0[bB](?:[01](?:_[01])?)+|0[oO](?:[0-7](?:_[0-7])?)+)n?|(?:\d(?:_\d)?)+n|NaN|Infinity)\b|(?:\b(?:\d(?:_\d)?)+\.?(?:\d(?:_\d)?)*|\B\.(?:\d(?:_\d)?)+)(?:[Ee][+-]?(?:\d(?:_\d)?)+)?/,function:/#?[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,operator:/--|\+\+|\*\*=?|=>|&&|\|\||[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?[.?]?|[~:]/}),Prism.languages.javascript["class-name"][0].pattern=/(\b(?:class|interface|extends|implements|instanceof|new)\s+)[\w.\\]+/,Prism.languages.insertBefore("javascript","keyword",{regex:{pattern:/((?:^|[^$\w\xA0-\uFFFF."'\])\s])\s*)\/(?:\[(?:[^\]\\\r\n]|\\.)*]|\\.|[^/\\\[\r\n])+\/[gimyus]{0,6}(?=\s*(?:$|[\r\n,.;})\]]))/,lookbehind:!0,greedy:!0},"function-variable":{pattern:/#?[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*)\s*=>))/,alias:"function"},parameter:[{pattern:/(function(?:\s+[_$A-Za-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*)?\s*\(\s*)(?!\s)(?:[^()]|\([^()]*\))+?(?=\s*\))/,lookbehind:!0,inside:Prism.languages.javascript},{pattern:/[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*=>)/i,inside:Prism.languages.javascript},{pattern:/(\(\s*)(?!\s)(?:[^()]|\([^()]*\))+?(?=\s*\)\s*=>)/,lookbehind:!0,inside:Prism.languages.javascript},{pattern:/((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:[_$A-Za-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*\s*)\(\s*)(?!\s)(?:[^()]|\([^()]*\))+?(?=\s*\)\s*\{)/,lookbehind:!0,inside:Prism.languages.javascript}],constant:/\b[A-Z](?:[A-Z_]|\dx?)*\b/}),Prism.languages.insertBefore("javascript","string",{"template-string":{pattern:/`(?:\\[\s\S]|\${(?:[^{}]|{(?:[^{}]|{[^}]*})*})+}|(?!\${)[^\\`])*`/,greedy:!0,inside:{"template-punctuation":{pattern:/^`|`$/,alias:"string"},interpolation:{pattern:/((?:^|[^\\])(?:\\{2})*)\${(?:[^{}]|{(?:[^{}]|{[^}]*})*})+}/,lookbehind:!0,inside:{"interpolation-punctuation":{pattern:/^\${|}$/,alias:"punctuation"},rest:Prism.languages.javascript}},string:/[\s\S]+/}}}),Prism.languages.markup&&Prism.languages.markup.tag.addInlined("script","javascript"),Prism.languages.js=Prism.languages.javascript;
!function(e){var t=/\b(?:abstract|assert|boolean|break|byte|case|catch|char|class|const|continue|default|do|double|else|enum|exports|extends|final|finally|float|for|goto|if|implements|import|instanceof|int|interface|long|module|native|new|null|open|opens|package|private|protected|provides|public|requires|return|short|static|strictfp|super|switch|synchronized|this|throw|throws|to|transient|transitive|try|uses|var|void|volatile|while|with|yield)\b/,a=/\b[A-Z](?:\w*[a-z]\w*)?\b/;e.languages.java=e.languages.extend("clike",{"class-name":[a,/\b[A-Z]\w*(?=\s+\w+\s*[;,=())])/],keyword:t,function:[e.languages.clike.function,{pattern:/(\:\:)[a-z_]\w*/,lookbehind:!0}],number:/\b0b[01][01_]*L?\b|\b0x[\da-f_]*\.?[\da-f_p+-]+\b|(?:\b\d[\d_]*\.?[\d_]*|\B\.\d[\d_]*)(?:e[+-]?\d[\d_]*)?[dfl]?/i,operator:{pattern:/(^|[^.])(?:<<=?|>>>?=?|->|--|\+\+|&&|\|\||::|[?:~]|[-+*/%&|^!=<>]=?)/m,lookbehind:!0}}),e.languages.insertBefore("java","string",{"triple-quoted-string":{pattern:/"""[ \t]*[\r\n](?:(?:"|"")?(?:\\.|[^"\\]))*"""/,greedy:!0,alias:"string"}}),e.languages.insertBefore("java","class-name",{annotation:{alias:"punctuation",pattern:/(^|[^.])@\w+/,lookbehind:!0},namespace:{pattern:/(\b(?:exports|import(?:\s+static)?|module|open|opens|package|provides|requires|to|transitive|uses|with)\s+)[a-z]\w*(?:\.[a-z]\w*)+/,lookbehind:!0,inside:{punctuation:/\./}},generics:{pattern:/<(?:[\w\s,.&?]|<(?:[\w\s,.&?]|<(?:[\w\s,.&?]|<[\w\s,.&?]*>)*>)*>)*>/,inside:{"class-name":a,keyword:t,punctuation:/[<>(),.:]/,operator:/[?&|]/}}})}(Prism);
Prism.languages.python={comment:{pattern:/(^|[^\\])#.*/,lookbehind:!0},"string-interpolation":{pattern:/(?:f|rf|fr)(?:("""|''')[\s\S]+?\1|("|')(?:\\.|(?!\2)[^\\\r\n])*\2)/i,greedy:!0,inside:{interpolation:{pattern:/((?:^|[^{])(?:{{)*){(?!{)(?:[^{}]|{(?!{)(?:[^{}]|{(?!{)(?:[^{}])+})+})+}/,lookbehind:!0,inside:{"format-spec":{pattern:/(:)[^:(){}]+(?=}$)/,lookbehind:!0},"conversion-option":{pattern:/![sra](?=[:}]$)/,alias:"punctuation"},rest:null}},string:/[\s\S]+/}},"triple-quoted-string":{pattern:/(?:[rub]|rb|br)?("""|''')[\s\S]+?\1/i,greedy:!0,alias:"string"},string:{pattern:/(?:[rub]|rb|br)?("|')(?:\\.|(?!\1)[^\\\r\n])*\1/i,greedy:!0},function:{pattern:/((?:^|\s)def[ \t]+)[a-zA-Z_]\w*(?=\s*\()/g,lookbehind:!0},"class-name":{pattern:/(\bclass\s+)\w+/i,lookbehind:!0},decorator:{pattern:/(^\s*)@\w+(?:\.\w+)*/im,lookbehind:!0,alias:["annotation","punctuation"],inside:{punctuation:/\./}},keyword:/\b(?:and|as|assert|async|await|break|class|continue|def|del|elif|else|except|exec|finally|for|from|global|if|import|in|is|lambda|nonlocal|not|or|pass|print|raise|return|try|while|with|yield)\b/,builtin:/\b(?:__import__|abs|all|any|apply|ascii|basestring|bin|bool|buffer|bytearray|bytes|callable|chr|classmethod|cmp|coerce|compile|complex|delattr|dict|dir|divmod|enumerate|eval|execfile|file|filter|float|format|frozenset|getattr|globals|hasattr|hash|help|hex|id|input|int|intern|isinstance|issubclass|iter|len|list|locals|long|map|max|memoryview|min|next|object|oct|open|ord|pow|property|range|raw_input|reduce|reload|repr|reversed|round|set|setattr|slice|sorted|staticmethod|str|sum|super|tuple|type|unichr|unicode|vars|xrange|zip)\b/,boolean:/\b(?:True|False|None)\b/,number:/(?:\b(?=\d)|\B(?=\.))(?:0[bo])?(?:(?:\d|0x[\da-f])[\da-f]*\.?\d*|\.\d+)(?:e[+-]?\d+)?j?\b/i,operator:/[-+%=]=?|!=|\*\*?=?|\/\/?=?|<[<=>]?|>[=>]?|[&|^~]/,punctuation:/[{}[\];(),.:]/},Prism.languages.python["string-interpolation"].inside.interpolation.inside.rest=Prism.languages.python,Prism.languages.py=Prism.languages.python;
Prism.languages.r={comment:/#.*/,string:{pattern:/(['"])(?:\\.|(?!\1)[^\\\r\n])*\1/,greedy:!0},"percent-operator":{pattern:/%[^%\s]*%/,alias:"operator"},boolean:/\b(?:TRUE|FALSE)\b/,ellipsis:/\.\.(?:\.|\d+)/,number:[/\b(?:NaN|Inf)\b/,/(?:\b0x[\dA-Fa-f]+(?:\.\d*)?|\b\d+\.?\d*|\B\.\d+)(?:[EePp][+-]?\d+)?[iL]?/],keyword:/\b(?:if|else|repeat|while|function|for|in|next|break|NULL|NA|NA_integer_|NA_real_|NA_complex_|NA_character_)\b/,operator:/->?>?|<(?:=|<?-)?|[>=!]=?|::?|&&?|\|\|?|[+*\/^$@~]/,punctuation:/[(){}\[\],;]/};
!function(){if("undefined"!=typeof self&&self.Prism&&self.document){var l="line-numbers",c=/\n(?!$)/g,m=function(e){var t=a(e)["white-space"];if("pre-wrap"===t||"pre-line"===t){var n=e.querySelector("code"),r=e.querySelector(".line-numbers-rows"),s=e.querySelector(".line-numbers-sizer"),i=n.textContent.split(c);s||((s=document.createElement("span")).className="line-numbers-sizer",n.appendChild(s)),s.style.display="block",i.forEach(function(e,t){s.textContent=e||"\n";var n=s.getBoundingClientRect().height;r.children[t].style.height=n+"px"}),s.textContent="",s.style.display="none"}},a=function(e){return e?window.getComputedStyle?getComputedStyle(e):e.currentStyle||null:null};window.addEventListener("resize",function(){Array.prototype.forEach.call(document.querySelectorAll("pre."+l),m)}),Prism.hooks.add("complete",function(e){if(e.code){var t=e.element,n=t.parentNode;if(n&&/pre/i.test(n.nodeName)&&!t.querySelector(".line-numbers-rows")){for(var r=!1,s=/(?:^|\s)line-numbers(?:\s|$)/,i=t;i;i=i.parentNode)if(s.test(i.className)){r=!0;break}if(r){t.className=t.className.replace(s," "),s.test(n.className)||(n.className+=" line-numbers");var l,a=e.code.match(c),o=a?a.length+1:1,u=new Array(o+1).join("<span></span>");(l=document.createElement("span")).setAttribute("aria-hidden","true"),l.className="line-numbers-rows",l.innerHTML=u,n.hasAttribute("data-start")&&(n.style.counterReset="linenumber "+(parseInt(n.getAttribute("data-start"),10)-1)),e.element.appendChild(l),m(n),Prism.hooks.run("line-numbers",e)}}}}),Prism.hooks.add("line-numbers",function(e){e.plugins=e.plugins||{},e.plugins.lineNumbers=!0}),Prism.plugins.lineNumbers={getLine:function(e,t){if("PRE"===e.tagName&&e.classList.contains(l)){var n=e.querySelector(".line-numbers-rows"),r=parseInt(e.getAttribute("data-start"),10)||1,s=r+(n.children.length-1);t<r&&(t=r),s<t&&(t=s);var i=t-r;return n.children[i]}}}}}();
!function(){var i=Object.assign||function(e,n){for(var t in n)n.hasOwnProperty(t)&&(e[t]=n[t]);return e};function e(e){this.defaults=i({},e)}function l(e){for(var n=0,t=0;t<e.length;++t)e.charCodeAt(t)=="\t".charCodeAt(0)&&(n+=3);return e.length+n}e.prototype={setDefaults:function(e){this.defaults=i(this.defaults,e)},normalize:function(e,n){for(var t in n=i(this.defaults,n)){var r=t.replace(/-(\w)/g,function(e,n){return n.toUpperCase()});"normalize"!==t&&"setDefaults"!==r&&n[t]&&this[r]&&(e=this[r].call(this,e,n[t]))}return e},leftTrim:function(e){return e.replace(/^\s+/,"")},rightTrim:function(e){return e.replace(/\s+$/,"")},tabsToSpaces:function(e,n){return n=0|n||4,e.replace(/\t/g,new Array(++n).join(" "))},spacesToTabs:function(e,n){return n=0|n||4,e.replace(RegExp(" {"+n+"}","g"),"\t")},removeTrailing:function(e){return e.replace(/\s*?$/gm,"")},removeInitialLineFeed:function(e){return e.replace(/^(?:\r?\n|\r)/,"")},removeIndent:function(e){var n=e.match(/^[^\S\n\r]*(?=\S)/gm);return n&&n[0].length?(n.sort(function(e,n){return e.length-n.length}),n[0].length?e.replace(RegExp("^"+n[0],"gm"),""):e):e},indent:function(e,n){return e.replace(/^[^\S\n\r]*(?=\S)/gm,new Array(++n).join("\t")+"$&")},breakLines:function(e,n){n=!0===n?80:0|n||80;for(var t=e.split("\n"),r=0;r<t.length;++r)if(!(l(t[r])<=n)){for(var i=t[r].split(/(\s+)/g),o=0,a=0;a<i.length;++a){var s=l(i[a]);n<(o+=s)&&(i[a]="\n"+i[a],o=s)}t[r]=i.join("")}return t.join("\n")}},"undefined"!=typeof module&&module.exports&&(module.exports=e),"undefined"!=typeof Prism&&(Prism.plugins.NormalizeWhitespace=new e({"remove-trailing":!0,"remove-indent":!0,"left-trim":!0,"right-trim":!0}),Prism.hooks.add("before-sanity-check",function(e){var n=Prism.plugins.NormalizeWhitespace;if(!e.settings||!1!==e.settings["whitespace-normalization"])if(e.element&&e.element.parentNode||!e.code){var t=e.element.parentNode,r=/(?:^|\s)no-whitespace-normalization(?:\s|$)/;if(e.code&&t&&"pre"===t.nodeName.toLowerCase()&&!r.test(t.className)&&!r.test(e.element.className)){for(var i=t.childNodes,o="",a="",s=!1,l=0;l<i.length;++l){var c=i[l];c==e.element?s=!0:"#text"===c.nodeName&&(s?a+=c.nodeValue:o+=c.nodeValue,t.removeChild(c),--l)}if(e.element.children.length&&Prism.plugins.KeepMarkup){var u=o+e.element.innerHTML+a;e.element.innerHTML=n.normalize(u,e.settings),e.code=e.element.textContent}else e.code=o+e.code+a,e.code=n.normalize(e.code,e.settings)}}else e.code=n.normalize(e.code,e.settings)}))}();

/**
 * DROPLETS
 *
 * @version: 3.0.0
 * @author: Ethan Lin
 * @url: https://github.com/oel-mediateam/droplets-for-canvas
 *
 * @license: The MIT License (MIT)
 * Copyright 2018-2019 UWEX CEOEL Media
 *
 */

"use strict";

/*********************************************************
  GLOBAL (KICK-OFF) 
**********************************************************/

const dropletsParam = {
    id: 'uws-droplets-page',
    parent: document.querySelector('#main'),
    recursive: true,
    done: function () {
        runDropletsJs();
    }
};

waitForDroplets( dropletsParam );

/*********************************************************
  MUTATION OBSERVER FUNCTION 
**********************************************************/

function waitForDroplets(params) {
    
    new MutationObserver(function() {

        let el = document.getElementById( params.id );

        if ( el ) {
            this.disconnect();
            params.done();
        }

    } ).observe( params.parent || document, {

        subtree: !!params.recursive,
        childList: true

    } );

}

/*********************************************************
  MAIN DROPLETS FUNCTIONS
**********************************************************/

function runDropletsJs() {

     if ( isCanvasLms() ) {

        onCanvasLms();

     } else {

        checkDropletsComponents();

     }

}

function isCanvasLms() {

    if ( location.href.match( new RegExp( '.instructure.com/' ) ) ) {
        return true;
    }

    return false;

}

/**
 * Set and enable Droplets JavaScript components according
 * when the allowed domain is canvas/instructure.com.
 
 * @function onCanvasLms
 * @since 3.0.0
 */
function onCanvasLms() {

    const dropletsPage = document.getElementById( 'uws-droplets-page' );
    
    if ( dropletsPage != undefined ) {
        
        // add canvas-net to indicate it is on Canvas LMS
        dropletsPage.classList.add( 'canvas-net' );
        
        // check to see if it is on an allowed page
        // add no-js class if not to expand any hidden contents
        if ( isAllowedCanvasPage() ) {

            checkDropletsComponents();

        } else {

            dropletsPage.classList.add( 'no-js' );

        }
        
    }

}

/**
 * Check to see if the page is a content page on Canvas
 * @function isAllowedCanvasPage
 * @param {Object} regex - a regular expression object.
 * @since 3.0.0
 * @return {boolean} true if matched, else false
 */
function isAllowedCanvasPage( ) {
    
    if ( location.pathname.match( /\/pages|\/assignments|\/discussion_topics/ ) ) {

        return true;
        
    }
    
    return false;
    
}

/**
 * Checking the DOM to see if any Droplets components are used. If yes,
 * execute the function to set up the component. If not, ignore.
 * @function checkDropletsComponents
 * @since 2.0.0
 * @updated 3.0.0
 */
function checkDropletsComponents() {

    // set initial page container x and y as data- attributes
    const page = document.getElementById( 'uws-droplets-page' );

    //exit function if no-js class is set
    if ( page.classList.contains( 'no-js' ) ) {
        return;
    }

    // get the droplets content bounding position
    const pageBounding = page.getBoundingClientRect();
    
    page.setAttribute( 'data-x', pageBounding.x );
    page.setAttribute( 'data-y', pageBounding.y );
    
    // component elements
    const prefix = '#uws-droplets-page .droplets-';
    const toolTipSelector = document.querySelectorAll( prefix + 'tooltip' );
    const popoverSelector = document.querySelectorAll( prefix + 'popover' );
    const tabsSelector = document.querySelectorAll( prefix + 'tabs' );
    const tabbedSelector = document.querySelectorAll( prefix + 'tabbed' );
    const accordionsSelector = document.querySelectorAll( prefix + 'accordion' );
    const collapsibleSelector = document.querySelectorAll( prefix + 'collapsibles' );
    // let resourcesSelector = document.querySelectorAll( prefix + 'resources' );
    // let readMoreSelector = document.querySelectorAll( prefix + 'readmore' );
    // let revealSelector = document.querySelectorAll( prefix + 'reveal' );
    // let imgZoomSelector = document.querySelectorAll( prefix + 'image-zoom' );
    // let lighboxSelector = document.querySelectorAll( prefix + 'lightbox' );
    
    // check for components
    if ( toolTipSelector.length ) {
        enableToolTips( toolTipSelector );
    }
    
    if ( popoverSelector.length ) {
        enablePopovers( popoverSelector );
    }
	
    if ( tabsSelector.length ) {
        enableTabs( tabsSelector );
    }

    if ( tabbedSelector.length ) {
        enableTabbed( tabbedSelector );
    }
    
    if ( accordionsSelector.length ) {
        enableAccordions( accordionsSelector );
    }

    if ( collapsibleSelector.length ) {
        enableCollapsibles( collapsibleSelector );
    }
    
    // if ( resourcesSelector.length ) {
    //     enableResources( resourcesSelector );
    // }
    
    // if ( readMoreSelector.length ) {
    //     enableReadMore( readMoreSelector );
    // }
    
    // if ( revealSelector.length ) {
    //     enableReveal( revealSelector );
    // }
    
    // if ( imgZoomSelector.length ) {
    //     enableImgZoom( imgZoomSelector );
    // }
    
    // if ( lighboxSelector.length ) {
    //     enableLightbox( lighboxSelector );
    // }

}

/**
 * Enable all tool tip elements.
 * @function enableToolTips
 * @param {Object[]} toolTips - Collection of tool tip elements.
 * @since 2.0.0
 */
function enableToolTips( toolTips ) {
    
    // loop through each tool tip elements to add mouse enter and leave
    // event listener to each tool tip element
    Array.prototype.forEach.call( toolTips, ( el ) => {
        
        el.addEventListener( 'mouseenter', function() {
            
            let tip = this.getAttribute( 'title' );
            let position = {
                left: this.offsetLeft,
                top: this.offsetTop,
                bottom: this.offsetTop - this.offsetHeight
            };
            let x = 0, y = 0;
            
            // create an attribute to hold the original tip
            el.setAttribute( 'data-tip', tip );
            
            // reset tip variable to data-tip attribute value
            tip = el.getAttribute( 'data-tip' );
            
            // create tool tip container with classes
            let toolTipNode = document.createElement( 'div' );
            
            toolTipNode.classList.add( 'tooltip' );
            
            let toolTipInnerNode = document.createElement( 'div' );
            
            toolTipInnerNode.classList.add( 'tooltip-inner' );
            toolTipInnerNode.innerHTML = tip;
            
            toolTipNode.appendChild( toolTipInnerNode );
            
            // add the tool tip container to the DOM
            this.insertBefore( toolTipNode, this.firstChild );
			
            // determine tooltip display positions
            if ( this.classList.contains( 'top' ) ) {
                x = position.top - toolTipNode.offsetHeight - 2;
                y = position.left;
            } else if ( this.classList.contains( 'bottom' ) ) {
                x = position.top + toolTipNode.offsetHeight - 10;
                y = position.left;
            } else if ( this.classList.contains( "right" ) ) {
                x = position.top;
                y = position.left + this.offsetWidth + 5;
            } else if ( this.classList.contains( "left" ) ) {
                x = position.top;
                y = position.left - toolTipNode.offsetWidth - 5;
            } else {
                x = position.top - toolTipNode.offsetHeight - 2;
                y = position.left;
            }
			
            // set tool tip position
            toolTipNode.style.top = x + 'px';
            toolTipNode.style.left = y + 'px';
            
            // remove title attribute
            this.removeAttribute( 'title' );
            
            // add mouse leave event to remove the tool tip container from DOM
            this.addEventListener( "mouseleave", function() {
            
                if ( toolTipNode.parentNode !== null ) {
                    toolTipNode.parentNode.removeChild(toolTipNode);
                }
                
                // add title attribute back
                this.setAttribute( 'title', tip );
            
            } );
            
        } );
        
    } );
    
}

/**
 * Enable all popover elements.
 * @function enablePopovers
 * @param {Object[]} popovers - Collection of pop over elements.
 * @since 2.0.0
 */
function enablePopovers( popovers ) {
    
    // loop through each popovers
    Array.prototype.forEach.call( popovers, ( el ) => {
        
        let title = '';
        
        // if data-title attribute is specified
        if ( el.getAttribute( 'data-title' ) !== null ) {
            
            // set the title to data-title value
            title = el.getAttribute( 'data-title' );
            
        } else {
            
            // set title to the title attribute
            title = el.getAttribute( 'title' )
            
            // create data-title to hold the original title attribute value
            el.setAttribute( 'data-title', title );
            
            // reset the title variable to data-title instead
            title = el.getAttribute( 'data-title' );
            
        }
        
        // create the popover container
        let popoverDiv = document.createElement( 'div' );
                
        popoverDiv.classList.add( 'popover' );
        popoverDiv.setAttribute( 'role', 'tooltip' );
        
        let popoverContentDiv = document.createElement( 'div' );
        
        popoverContentDiv.classList.add( 'popover-content' );
        popoverContentDiv.innerHTML = title;
        
        popoverDiv.appendChild( popoverContentDiv );
        
        // add the popover container to the DOM
        el.insertBefore( popoverDiv, el.firstChild );
        
        // add the click event listener
        el.addEventListener( 'click', function() {
            
            // if visible
            if ( this.querySelector( '.popover' ).style.display === 'block' ) {
                
                // hide
                this.querySelector( '.popover' ).style.display = 'none';
                this.classList.remove( 'active' );
                
            } else {
                
                // else show
                this.classList.add( 'active' );
                popoverDiv.style.display = 'block';
                
                // and determine popover positions
                let x = 0, y = 0;
                let horzCenter = this.offsetWidth - ( ( popoverDiv.offsetWidth + this.offsetWidth ) / 2 );
                let vertzCenter = this.offsetHeight - ( ( popoverDiv.offsetHeight + this.offsetHeight ) / 2 );
                
                if ( this.classList.contains( 'top' ) ) {
                    
                    popoverDiv.classList.add( 'top' );
                    x = ( popoverDiv.offsetHeight + 10 ) * -1;
                    y = horzCenter;
                    
                } else if ( this.classList.contains( 'bottom' ) ) {
                    
                    popoverDiv.classList.add( 'bottom' );
                    x = this.offsetHeight + 10;
                    y = horzCenter;
                    
                } else if ( this.classList.contains( "right" ) ) {
                    
                    popoverDiv.classList.add( 'right' );
                    x = vertzCenter;
                    y = this.offsetWidth + 10;
                    
                } else if ( this.classList.contains( "left" ) ) {
                    
                    popoverDiv.classList.add( 'left' );
                    x = vertzCenter;
                    y = ( popoverDiv.offsetWidth + 10 ) * -1;
                    
                } else {
                    
                    popoverDiv.classList.add( 'top' );
                    x = ( popoverDiv.offsetHeight + 10 ) * -1;
                    y = horzCenter;
                    
                }
                
                // position the popover on the DOM
                popoverDiv.style.top = x + 'px';
                popoverDiv.style.left = y + 'px';
                
            }
            
        } );
        
        // add mouse enter event to remove the title attribute
        // to prevent default tooltip behavior and add back in on mouse leave
        el.addEventListener( 'mouseenter', function() {
            
            this.removeAttribute( 'title' );
            
            this.addEventListener( 'mouseleave', function() {
            
                this.setAttribute( 'title', title );
                
            } );
            
        } );
        
    } );
    
}

/**
 * Enable all (new way) tab elements.
 * @function enableTabbed
 * @param {Object[]} tabs - Collection of tab elements.
 * @since 3.0.0
 */
function enableTabbed( tabs ) {
    
    let activeSet = false;

    // loop through collection of tab elements
    Array.prototype.forEach.call( tabs, function( tabWrapper ) {
        
        // set each tab element's tabs and sections
        const tabBtns = tabWrapper.querySelectorAll( '.tab' );
        const tabContents = tabWrapper.querySelectorAll( '.content' );

        // set screen reader attributes for each tab component
        tabWrapper.setAttribute( 'role', 'rolelist');
        tabWrapper.setAttribute( 'aria-multiselectable', 'false' );

        // for each tab of current tab element iternation
        Array.prototype.forEach.call( tabBtns, function( tab, i ) {
            
            // if current tab contains active class and activeSet
            // is false, set activeSet to true
            // else remove duplicate active class
            if ( tab.classList.contains( 'active' ) && activeSet === false ) {
                activeSet = true;
            } else {
                tab.classList.remove( 'active' );
            }

            // set screen reader attributes for each tab
            tab.setAttribute( 'role', 'tab' );
            tabContents[i].setAttribute( 'role', 'tabpanel' );

            if ( tab.id ) {
                tab.setAttribute( 'id', tab.id );
                tab.setAttribute( 'aria-controls', tab.id + '-content' );
                tabContents[i].setAttribute( 'id', tab.id + '-content' );
                tabContents[i].setAttribute( 'aria-labelledby', tab.id );
            }

            // set tab selected state
            changeTabState( tab, tabContents[i], tab.classList.contains( 'active' ) );
            
            // add event listener to each tab
            tab.addEventListener( 'click', function() {
                
                // if not selected...
                if ( !this.classList.contains( 'active' ) ) {

                    // change all tabs to inactive first
                    Array.prototype.forEach.call( tabBtns, function( el, i ) {
                        changeTabState( el, tabContents[i], false );
                    } );
                    
                    // change selected tab to active
                    changeTabState( this, tabContents[i], true );

                }
                
            } );
            
        } );

        // if there is no active class in tabs, 
        // set first one active
        if ( activeSet === false ) {
            changeTabState( tabBtns[0], tabContents[0], true );
            activeSet = true;
        }
        
    } );
    
}

/**
 * Helper function to change the state of the tabs.
 * @function changeTabState
 * @param {Object} tab - the tab button.
 * @param {Object} content - the tab content.
 * @param {Boolean} active - the state of the tab.
 * @since 3.0.0
 */
function changeTabState( tab, content, active ) {

    // set tab selected state
    if ( active ) {
        tab.classList.add( 'active' );
        tab.setAttribute( 'aria-selected', 'true');
        content.classList.add( 'active' );
    } else {
        tab.classList.remove( 'active' );
        tab.setAttribute( 'aria-selected', 'false');
        content.classList.remove( 'active' );
    }

}

/**
 * Enable all (old way) tab elements.
 * @function enableTabs
 * @param {Object[]} tabs - Collection of tab elements.
 * @since 2.0.0
 * @updated 3.0.0
 */
function enableTabs( tabs ) {
    
    // loop through collection of tab elements
    Array.prototype.forEach.call( tabs, function( tabWrapper ) {
        
        // set each tab element's tabs and sections
        const tabBtns = tabWrapper.querySelectorAll( '.tabs li' );
        const tabSections = tabWrapper.querySelectorAll( '.tab-contents .tab-section' );

        // for each tab of current tab element iternation
        Array.prototype.forEach.call( tabBtns, function( tab, i ) {
            
            // add event listener to each tab
            tab.addEventListener( 'click', function( evt ) {
                
                // remove active class from all tab
                // and hide tab sections
                Array.prototype.forEach.call( tabBtns, function( el, i ) {
                    
                    el.classList.remove( 'active' );
                    el.setAttribute( 'aria-selected', 'false');
                    tabSections[i].classList.remove( 'active' );
                    
                });
                
                // add active class to current clicked tab
                // and display corresponding tab section
                this.classList.add( 'active' );
                this.setAttribute( 'aria-selected', 'true');
                tabSections[i].classList.add( 'active' );
                tabSections[i].setAttribute( 'aria-selected', 'true');
                
                // prevent default event action
                evt.preventDefault();
                
            } );
            
        });
        
    } );
    
}

/**
 * Enable all (new way) accordion/collapsible elements.
 * @function enableCollapsibles
 * @param {Object[]} collapsibles - Collection of tab elements.
 * @since 3.0.0
 */
function enableCollapsibles( collapsibles ) {
    
    // loop through collection of collapsible elements
    Array.prototype.forEach.call( collapsibles, function( collapsiblesWrapper ) {
        
        // set each collapsible element's section and content
        const sections = collapsiblesWrapper.querySelectorAll( '.section' );
        const contents = collapsiblesWrapper.querySelectorAll( '.content' );

        // set screen reader attributes for each collapsible components
        collapsiblesWrapper.setAttribute( 'role', 'rolelist');
        collapsiblesWrapper.setAttribute( 'aria-multiselectable', 'true' );

        // for each section of current collapsible element iternation
        Array.prototype.forEach.call( sections, function( section, i ) {
            
            // set screen reader attributes for each collapsible section
            section.setAttribute( 'role', 'tab' );
            contents[i].setAttribute( 'role', 'tabpanel' );

            if ( section.id ) {
                section.setAttribute( 'id', section.id );
                section.setAttribute( 'aria-controls', section.id + '-content' );
                contents[i].setAttribute( 'id', section.id + '-content' );
                contents[i].setAttribute( 'aria-labelledby', section.id );
            }

            // set section selected state
            if ( section.classList.contains( 'active' ) ) {
                section.setAttribute( 'aria-expanded', 'true');
                contents[i].classList.add( 'active' );
            } else {
                section.setAttribute( 'aria-expanded', 'false');
            }
            
            // add event listener to each section
            section.addEventListener( 'click', function() {
                
                // if opened
                if ( this.classList.contains( 'active' ) ) {
                    
                    // close it
                    toggleSection( this, contents[i], false );

                } else {

                    // open it
                    toggleSection( this, contents[i], true );
                    
                }  
                
            } );
            
        } );

        // create the accordion controls for each accordion
        const controlsWrapper = document.createElement( 'div' );
        controlsWrapper.classList.add( 'controls' );
        
        const closeBtn = document.createElement( 'a' );
        closeBtn.classList.add( 'cbtn', 'closeAll' );
        closeBtn.setAttribute( 'role', 'button' );
        closeBtn.innerHTML = 'Close All';
        closeBtn.href = '';
        
        const openBtn = document.createElement( 'a' );
        openBtn.classList.add( 'cbtn', 'openAll' );
        openBtn.setAttribute( 'role', 'button' );
        openBtn.innerHTML = 'Open All';
        openBtn.href = '';
        
        controlsWrapper.appendChild( closeBtn );
        controlsWrapper.appendChild( openBtn );

        collapsiblesWrapper.insertBefore( controlsWrapper, collapsiblesWrapper.firstChild );

        closeBtn.addEventListener( 'click', (evt) => {
            
            Array.prototype.forEach.call( sections, function(section, i) {
                toggleSection( section, contents[i], false );
            } );
            
            // prevent default event action
            evt.preventDefault();

        } );

        openBtn.addEventListener( 'click', (evt) => {
            
            Array.prototype.forEach.call( sections, function(section, i) {
                toggleSection( section, contents[i], true );
            } );
            
            // prevent default event action
            evt.preventDefault();

        } );
        
    } );
    
}

/**
 * Helper function to toggle the state of the collapsibles.
 * @function toggleSection
 * @param {Object} section - the section label button.
 * @param {Object} content - the section content.
 * @param {Boolean} isClosed - is closed flag.
 * @since 3.0.0
 */
function toggleSection( section, content, isClosed ) {

    if ( isClosed ) {

        section.classList.add( 'active' );
        section.setAttribute( 'aria-expanded', 'true');
        content.classList.add( 'active' );

    } else {

        section.classList.remove( 'active' );
        section.setAttribute( 'aria-expanded', 'false');
        content.classList.remove( 'active' );

    }

}

/**
 * Enable all (old way) accordion elements.
 * @function enableAccordions
 * @param {Object[]} accordions - Collection of accordion elements.
 * @since 2.0.0
 * @updated 3.0.0
 */
function enableAccordions( accordions ) {
    
    // loop through collection of tab elements
    Array.prototype.forEach.call( accordions, function( accordionWrapper ) {
        
        // query the accordion title banners
        const titleBanners = accordionWrapper.querySelectorAll( '.accordion-title' );
        
        // create the accordion controls for each accordion
        const accordionControlsWrapper = document.createElement( 'div' );
        accordionControlsWrapper.classList.add( 'accordion-controls' );
        
        const closeBtn = document.createElement( 'a' );
        closeBtn.classList.add( 'closeAll' );
        closeBtn.setAttribute( 'role', 'button' );
        closeBtn.innerHTML = 'Close All';
        closeBtn.href = 'javascript:void(0)';
        
        const openBtn = document.createElement( 'a' );
        openBtn.classList.add( 'openAll' );
        openBtn.setAttribute( 'role', 'button' );
        openBtn.innerHTML = 'Open All';
        openBtn.href = 'javascript:void(0)';
        
        accordionControlsWrapper.appendChild( closeBtn );
        accordionControlsWrapper.appendChild( openBtn );
        
        // add the accordion controls to the DOM
        accordionWrapper.insertBefore( accordionControlsWrapper, accordionWrapper.firstChild );
        
        // add event listener to the close all control
        closeBtn.addEventListener( 'click', function( evt ) {
            
            Array.prototype.forEach.call( titleBanners, function( banner ) {
                closeAccordionItem( banner );
            } );
            
            // prevent default event action
            evt.preventDefault();
            
        } );
        
        // add event listener to open all control
        openBtn.addEventListener( 'click', function( evt ) {
            
            Array.prototype.forEach.call( titleBanners, function( banner ) {
                openAccordionItem( banner );
            } );
            
            // prevent default event action
            evt.preventDefault();
            
        } );
        
        // loop through each title banner
        Array.prototype.forEach.call( titleBanners, function( banner ) {
            
            // if it contains active class, display the accordion content
            if ( banner.classList.contains( 'active' ) ) {
                openAccordionItem( banner );
            }
            
            // add event listener to each title banner
            banner.addEventListener( 'click', function( evt ) {
                
                // if current target is open, close it
                if ( this.classList.contains( 'active' ) ) {
                    closeAccordionItem( this );
                } else {
                    
                    // close all of the accordion
                    Array.prototype.forEach.call( titleBanners, function( el ) {
                        closeAccordionItem( el );
                    } );
                    
                    // open the current target
                    openAccordionItem( this );
                    
                }
                
                // prevent default event action
                evt.preventDefault();
                
            } );
            
        } );
        
    } );
    
}

/**
 * Close accordion item.
 * @function closeAccordionItem
 * @param {Object} el - element to be hidden.
 * @since 2.0.0
 */
function closeAccordionItem( el ) {
    
    if ( el.classList.contains( 'active' ) ) {
                            
        el.nextElementSibling.style.display = 'none';
        el.nextElementSibling.setAttribute( 'aria-expanded', 'false' );
        el.classList.remove( 'active' );
        
    }
    
}

/**
 * Open accordion item.
 * @function openAccordionItem
 * @param {Object} el - element to be displayed.
 * @since 2.0.0
 */
function openAccordionItem( el ) {
    
    el.classList.add( 'active' );
    el.nextElementSibling.setAttribute( 'aria-expanded', 'true' );
    el.nextElementSibling.style.display = 'block';
    
}