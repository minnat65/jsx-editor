(this["webpackJsonpjsx-editor"]=this["webpackJsonpjsx-editor"]||[]).push([[242],{410:function(t,n){!function(t){var n=t.util.clone(t.languages.javascript),e=/(?:\s|\/\/.*(?!.)|\/\*(?:[^*]|\*(?!\/))\*\/)/.source,a=/(?:\{(?:\{(?:\{[^{}]*\}|[^{}])*\}|[^{}])*\})/.source,s=/(?:\{<S>*\.{3}(?:[^{}]|<BRACES>)*\})/.source;function g(t,n){return t=t.replace(/<S>/g,(function(){return e})).replace(/<BRACES>/g,(function(){return a})).replace(/<SPREAD>/g,(function(){return s})),RegExp(t,n)}s=g(s).source,t.languages.jsx=t.languages.extend("markup",n),t.languages.jsx.tag.pattern=g(/<\/?(?:[\w.:-]+(?:<S>+(?:[\w.:$-]+(?:=(?:"(?:\\[\s\S]|[^\\"])*"|'(?:\\[\s\S]|[^\\'])*'|[^\s{'"/>=]+|<BRACES>))?|<SPREAD>))*<S>*\/?)?>/.source),t.languages.jsx.tag.inside.tag.pattern=/^<\/?[^\s>\/]*/i,t.languages.jsx.tag.inside["attr-value"].pattern=/=(?!\{)(?:"(?:\\[\s\S]|[^\\"])*"|'(?:\\[\s\S]|[^\\'])*'|[^\s'">]+)/i,t.languages.jsx.tag.inside.tag.inside["class-name"]=/^[A-Z]\w*(?:\.[A-Z]\w*)*$/,t.languages.jsx.tag.inside.comment=n.comment,t.languages.insertBefore("inside","attr-name",{spread:{pattern:g(/<SPREAD>/.source),inside:t.languages.jsx}},t.languages.jsx.tag),t.languages.insertBefore("inside","special-attr",{script:{pattern:g(/=<BRACES>/.source),inside:{"script-punctuation":{pattern:/^=(?=\{)/,alias:"punctuation"},rest:t.languages.jsx},alias:"language-javascript"}},t.languages.jsx.tag);var o=function t(n){return n?"string"===typeof n?n:"string"===typeof n.content?n.content:n.content.map(t).join(""):""},i=function n(e){for(var a=[],s=0;s<e.length;s++){var g=e[s],i=!1;if("string"!==typeof g&&("tag"===g.type&&g.content[0]&&"tag"===g.content[0].type?"</"===g.content[0].content[0].content?a.length>0&&a[a.length-1].tagName===o(g.content[0].content[1])&&a.pop():"/>"===g.content[g.content.length-1].content||a.push({tagName:o(g.content[0].content[1]),openedBraces:0}):a.length>0&&"punctuation"===g.type&&"{"===g.content?a[a.length-1].openedBraces++:a.length>0&&a[a.length-1].openedBraces>0&&"punctuation"===g.type&&"}"===g.content?a[a.length-1].openedBraces--:i=!0),(i||"string"===typeof g)&&a.length>0&&0===a[a.length-1].openedBraces){var r=o(g);s<e.length-1&&("string"===typeof e[s+1]||"plain-text"===e[s+1].type)&&(r+=o(e[s+1]),e.splice(s+1,1)),s>0&&("string"===typeof e[s-1]||"plain-text"===e[s-1].type)&&(r=o(e[s-1])+r,e.splice(s-1,1),s--),e[s]=new t.Token("plain-text",r,null,r)}g.content&&"string"!==typeof g.content&&n(g.content)}};t.hooks.add("after-tokenize",(function(t){"jsx"!==t.language&&"tsx"!==t.language||i(t.tokens)}))}(Prism)}}]);
//# sourceMappingURL=242.562ca21d.chunk.js.map