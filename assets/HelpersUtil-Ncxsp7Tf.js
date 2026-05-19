import{J as e,M as t,m as n,n as r}from"./ApiController-C_t13FDl.js";var i=globalThis,a=i.ShadowRoot&&(i.ShadyCSS===void 0||i.ShadyCSS.nativeShadow)&&`adoptedStyleSheets`in Document.prototype&&`replace`in CSSStyleSheet.prototype,o=Symbol(),s=new WeakMap,c=class{constructor(e,t,n){if(this._$cssResult$=!0,n!==o)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o,t=this.t;if(a&&e===void 0){let n=t!==void 0&&t.length===1;n&&(e=s.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),n&&s.set(t,e))}return e}toString(){return this.cssText}},l=e=>new c(typeof e==`string`?e:e+``,void 0,o),u=(e,...t)=>new c(e.length===1?e[0]:t.reduce((t,n,r)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if(typeof e==`number`)return e;throw Error(`Value passed to 'css' function must be a 'css' function result: `+e+`. Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.`)})(n)+e[r+1],e[0]),e,o),d=(e,t)=>{if(a)e.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let n of t){let t=document.createElement(`style`),r=i.litNonce;r!==void 0&&t.setAttribute(`nonce`,r),t.textContent=n.cssText,e.appendChild(t)}},ee=a?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t=``;for(let n of e.cssRules)t+=n.cssText;return l(t)})(e):e,{is:te,defineProperty:ne,getOwnPropertyDescriptor:re,getOwnPropertyNames:ie,getOwnPropertySymbols:ae,getPrototypeOf:oe}=Object,f=globalThis,se=f.trustedTypes,ce=se?se.emptyScript:``,le=f.reactiveElementPolyfillSupport,p=(e,t)=>e,m={toAttribute(e,t){switch(t){case Boolean:e=e?ce:null;break;case Object:case Array:e=e==null?e:JSON.stringify(e)}return e},fromAttribute(e,t){let n=e;switch(t){case Boolean:n=e!==null;break;case Number:n=e===null?null:Number(e);break;case Object:case Array:try{n=JSON.parse(e)}catch{n=null}}return n}},h=(e,t)=>!te(e,t),ue={attribute:!0,type:String,converter:m,reflect:!1,useDefault:!1,hasChanged:h};Symbol.metadata??=Symbol(`metadata`),f.litPropertyMetadata??=new WeakMap;var g=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=ue){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){let n=Symbol(),r=this.getPropertyDescriptor(e,n,t);r!==void 0&&ne(this.prototype,e,r)}}static getPropertyDescriptor(e,t,n){let{get:r,set:i}=re(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:r,set(t){let a=r?.call(this);i?.call(this,t),this.requestUpdate(e,a,n)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??ue}static _$Ei(){if(this.hasOwnProperty(p(`elementProperties`)))return;let e=oe(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(p(`finalized`)))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(p(`properties`))){let e=this.properties,t=[...ie(e),...ae(e)];for(let n of t)this.createProperty(n,e[n])}let e=this[Symbol.metadata];if(e!==null){let t=litPropertyMetadata.get(e);if(t!==void 0)for(let[e,n]of t)this.elementProperties.set(e,n)}this._$Eh=new Map;for(let[e,t]of this.elementProperties){let n=this._$Eu(e,t);n!==void 0&&this._$Eh.set(n,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let t=[];if(Array.isArray(e)){let n=new Set(e.flat(1/0).reverse());for(let e of n)t.unshift(ee(e))}else e!==void 0&&t.push(ee(e));return t}static _$Eu(e,t){let n=t.attribute;return!1===n?void 0:typeof n==`string`?n:typeof e==`string`?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){let e=new Map,t=this.constructor.elementProperties;for(let n of t.keys())this.hasOwnProperty(n)&&(e.set(n,this[n]),delete this[n]);e.size>0&&(this._$Ep=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return d(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,n){this._$AK(e,n)}_$ET(e,t){let n=this.constructor.elementProperties.get(e),r=this.constructor._$Eu(e,n);if(r!==void 0&&!0===n.reflect){let i=(n.converter?.toAttribute===void 0?m:n.converter).toAttribute(t,n.type);this._$Em=e,i==null?this.removeAttribute(r):this.setAttribute(r,i),this._$Em=null}}_$AK(e,t){let n=this.constructor,r=n._$Eh.get(e);if(r!==void 0&&this._$Em!==r){let e=n.getPropertyOptions(r),i=typeof e.converter==`function`?{fromAttribute:e.converter}:e.converter?.fromAttribute===void 0?m:e.converter;this._$Em=r;let a=i.fromAttribute(t,e.type);this[r]=a??this._$Ej?.get(r)??a,this._$Em=null}}requestUpdate(e,t,n,r=!1,i){if(e!==void 0){let a=this.constructor;if(!1===r&&(i=this[e]),n??=a.getPropertyOptions(e),!((n.hasChanged??h)(i,t)||n.useDefault&&n.reflect&&i===this._$Ej?.get(e)&&!this.hasAttribute(a._$Eu(e,n))))return;this.C(e,t,n)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:n,reflect:r,wrapped:i},a){n&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,a??t??this[e]),!0!==i||a!==void 0)||(this._$AL.has(e)||(this.hasUpdated||n||(t=void 0),this._$AL.set(e,t)),!0===r&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}let e=this.constructor.elementProperties;if(e.size>0)for(let[t,n]of e){let{wrapped:e}=n,r=this[t];!0!==e||this._$AL.has(t)||r===void 0||this.C(t,void 0,n,r)}}let e=!1,t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};g.elementStyles=[],g.shadowRootOptions={mode:`open`},g[p(`elementProperties`)]=new Map,g[p(`finalized`)]=new Map,le?.({ReactiveElement:g}),(f.reactiveElementVersions??=[]).push(`2.1.2`);var _=globalThis,de=e=>e,v=_.trustedTypes,fe=v?v.createPolicy(`lit-html`,{createHTML:e=>e}):void 0,y=`$lit$`,b=`lit$${Math.random().toFixed(9).slice(2)}$`,x=`?`+b,pe=`<${x}>`,S=document,C=()=>S.createComment(``),w=e=>e===null||typeof e!=`object`&&typeof e!=`function`,T=Array.isArray,me=e=>T(e)||typeof e?.[Symbol.iterator]==`function`,E=`[ 	
\f\r]`,D=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,he=/-->/g,ge=/>/g,O=RegExp(`>|${E}(?:([^\\s"'>=/]+)(${E}*=${E}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,`g`),_e=/'/g,ve=/"/g,ye=/^(?:script|style|textarea|title)$/i,k=e=>(t,...n)=>({_$litType$:e,strings:t,values:n}),be=k(1),xe=k(2),Se=k(3),A=Symbol.for(`lit-noChange`),j=Symbol.for(`lit-nothing`),Ce=new WeakMap,M=S.createTreeWalker(S,129);function we(e,t){if(!T(e)||!e.hasOwnProperty(`raw`))throw Error(`invalid template strings array`);return fe===void 0?t:fe.createHTML(t)}var Te=(e,t)=>{let n=e.length-1,r=[],i,a=t===2?`<svg>`:t===3?`<math>`:``,o=D;for(let t=0;t<n;t++){let n=e[t],s,c,l=-1,u=0;for(;u<n.length&&(o.lastIndex=u,c=o.exec(n),c!==null);)u=o.lastIndex,o===D?c[1]===`!--`?o=he:c[1]===void 0?c[2]===void 0?c[3]!==void 0&&(o=O):(ye.test(c[2])&&(i=RegExp(`</`+c[2],`g`)),o=O):o=ge:o===O?c[0]===`>`?(o=i??D,l=-1):c[1]===void 0?l=-2:(l=o.lastIndex-c[2].length,s=c[1],o=c[3]===void 0?O:c[3]===`"`?ve:_e):o===ve||o===_e?o=O:o===he||o===ge?o=D:(o=O,i=void 0);let d=o===O&&e[t+1].startsWith(`/>`)?` `:``;a+=o===D?n+pe:l>=0?(r.push(s),n.slice(0,l)+y+n.slice(l)+b+d):n+b+(l===-2?t:d)}return[we(e,a+(e[n]||`<?>`)+(t===2?`</svg>`:t===3?`</math>`:``)),r]},N=class e{constructor({strings:t,_$litType$:n},r){let i;this.parts=[];let a=0,o=0,s=t.length-1,c=this.parts,[l,u]=Te(t,n);if(this.el=e.createElement(l,r),M.currentNode=this.el.content,n===2||n===3){let e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;(i=M.nextNode())!==null&&c.length<s;){if(i.nodeType===1){if(i.hasAttributes())for(let e of i.getAttributeNames())if(e.endsWith(y)){let t=u[o++],n=i.getAttribute(e).split(b),r=/([.?@])?(.*)/.exec(t);c.push({type:1,index:a,name:r[2],strings:n,ctor:r[1]===`.`?De:r[1]===`?`?Oe:r[1]===`@`?L:I}),i.removeAttribute(e)}else e.startsWith(b)&&(c.push({type:6,index:a}),i.removeAttribute(e));if(ye.test(i.tagName)){let e=i.textContent.split(b),t=e.length-1;if(t>0){i.textContent=v?v.emptyScript:``;for(let n=0;n<t;n++)i.append(e[n],C()),M.nextNode(),c.push({type:2,index:++a});i.append(e[t],C())}}}else if(i.nodeType===8)if(i.data===x)c.push({type:2,index:a});else{let e=-1;for(;(e=i.data.indexOf(b,e+1))!==-1;)c.push({type:7,index:a}),e+=b.length-1}a++}}static createElement(e,t){let n=S.createElement(`template`);return n.innerHTML=e,n}};function P(e,t,n=e,r){if(t===A)return t;let i=r===void 0?n._$Cl:n._$Co?.[r],a=w(t)?void 0:t._$litDirective$;return i?.constructor!==a&&(i?._$AO?.(!1),a===void 0?i=void 0:(i=new a(e),i._$AT(e,n,r)),r===void 0?n._$Cl=i:(n._$Co??=[])[r]=i),i!==void 0&&(t=P(e,i._$AS(e,t.values),i,r)),t}var Ee=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:t},parts:n}=this._$AD,r=(e?.creationScope??S).importNode(t,!0);M.currentNode=r;let i=M.nextNode(),a=0,o=0,s=n[0];for(;s!==void 0;){if(a===s.index){let t;s.type===2?t=new F(i,i.nextSibling,this,e):s.type===1?t=new s.ctor(i,s.name,s.strings,this,e):s.type===6&&(t=new ke(i,this,e)),this._$AV.push(t),s=n[++o]}a!==s?.index&&(i=M.nextNode(),a++)}return M.currentNode=S,r}p(e){let t=0;for(let n of this._$AV)n!==void 0&&(n.strings===void 0?n._$AI(e[t]):(n._$AI(e,n,t),t+=n.strings.length-2)),t++}},F=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,n,r){this.type=2,this._$AH=j,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=n,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=P(this,e,t),w(e)?e===j||e==null||e===``?(this._$AH!==j&&this._$AR(),this._$AH=j):e!==this._$AH&&e!==A&&this._(e):e._$litType$===void 0?e.nodeType===void 0?me(e)?this.k(e):this._(e):this.T(e):this.$(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==j&&w(this._$AH)?this._$AA.nextSibling.data=e:this.T(S.createTextNode(e)),this._$AH=e}$(e){let{values:t,_$litType$:n}=e,r=typeof n==`number`?this._$AC(e):(n.el===void 0&&(n.el=N.createElement(we(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===r)this._$AH.p(t);else{let e=new Ee(r,this),n=e.u(this.options);e.p(t),this.T(n),this._$AH=e}}_$AC(e){let t=Ce.get(e.strings);return t===void 0&&Ce.set(e.strings,t=new N(e)),t}k(t){T(this._$AH)||(this._$AH=[],this._$AR());let n=this._$AH,r,i=0;for(let a of t)i===n.length?n.push(r=new e(this.O(C()),this.O(C()),this,this.options)):r=n[i],r._$AI(a),i++;i<n.length&&(this._$AR(r&&r._$AB.nextSibling,i),n.length=i)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){let t=de(e).nextSibling;de(e).remove(),e=t}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},I=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,n,r,i){this.type=1,this._$AH=j,this._$AN=void 0,this.element=e,this.name=t,this._$AM=r,this.options=i,n.length>2||n[0]!==``||n[1]!==``?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=j}_$AI(e,t=this,n,r){let i=this.strings,a=!1;if(i===void 0)e=P(this,e,t,0),a=!w(e)||e!==this._$AH&&e!==A,a&&(this._$AH=e);else{let r=e,o,s;for(e=i[0],o=0;o<i.length-1;o++)s=P(this,r[n+o],t,o),s===A&&(s=this._$AH[o]),a||=!w(s)||s!==this._$AH[o],s===j?e=j:e!==j&&(e+=(s??``)+i[o+1]),this._$AH[o]=s}a&&!r&&this.j(e)}j(e){e===j?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??``)}},De=class extends I{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===j?void 0:e}},Oe=class extends I{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==j)}},L=class extends I{constructor(e,t,n,r,i){super(e,t,n,r,i),this.type=5}_$AI(e,t=this){if((e=P(this,e,t,0)??j)===A)return;let n=this._$AH,r=e===j&&n!==j||e.capture!==n.capture||e.once!==n.once||e.passive!==n.passive,i=e!==j&&(n===j||r);r&&this.element.removeEventListener(this.name,this,n),i&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH==`function`?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},ke=class{constructor(e,t,n){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(e){P(this,e)}},Ae={M:y,P:b,A:x,C:1,L:Te,R:Ee,D:me,V:P,I:F,H:I,N:Oe,U:L,B:De,F:ke},je=_.litHtmlPolyfillSupport;je?.(N,F),(_.litHtmlVersions??=[]).push(`3.3.3`);var Me=(e,t,n)=>{let r=n?.renderBefore??t,i=r._$litPart$;if(i===void 0){let e=n?.renderBefore??null;r._$litPart$=i=new F(t.insertBefore(C(),e),e,void 0,n??{})}return i._$AI(e),i},R=globalThis,z=class extends g{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Me(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return A}};z._$litElement$=!0,z.finalized=!0,R.litElementHydrateSupport?.({LitElement:z});var Ne=R.litElementPolyfillSupport;Ne?.({LitElement:z}),(R.litElementVersions??=[]).push(`4.2.2`);var Pe={interpolate(e,t,n){if(e.length!==2||t.length!==2)throw Error(`inputRange and outputRange must be an array of length 2`);let r=e[0]||0,i=e[1]||0,a=t[0]||0,o=t[1]||0;return n<r?a:n>i?o:(o-a)/(i-r)*(n-r)+a}},Fe={black:`#202020`,white:`#FFFFFF`,white010:`rgba(255, 255, 255, 0.1)`,accent010:`rgba(9, 136, 240, 0.1)`,accent020:`rgba(9, 136, 240, 0.2)`,accent030:`rgba(9, 136, 240, 0.3)`,accent040:`rgba(9, 136, 240, 0.4)`,accent050:`rgba(9, 136, 240, 0.5)`,accent060:`rgba(9, 136, 240, 0.6)`,accent070:`rgba(9, 136, 240, 0.7)`,accent080:`rgba(9, 136, 240, 0.8)`,accent090:`rgba(9, 136, 240, 0.9)`,accent100:`rgba(9, 136, 240, 1.0)`,accentSecondary010:`rgba(199, 185, 148, 0.1)`,accentSecondary020:`rgba(199, 185, 148, 0.2)`,accentSecondary030:`rgba(199, 185, 148, 0.3)`,accentSecondary040:`rgba(199, 185, 148, 0.4)`,accentSecondary050:`rgba(199, 185, 148, 0.5)`,accentSecondary060:`rgba(199, 185, 148, 0.6)`,accentSecondary070:`rgba(199, 185, 148, 0.7)`,accentSecondary080:`rgba(199, 185, 148, 0.8)`,accentSecondary090:`rgba(199, 185, 148, 0.9)`,accentSecondary100:`rgba(199, 185, 148, 1.0)`,productWalletKit:`#FFB800`,productAppKit:`#FF573B`,productCloud:`#0988F0`,productDocumentation:`#008847`,neutrals050:`#F6F6F6`,neutrals100:`#F3F3F3`,neutrals200:`#E9E9E9`,neutrals300:`#D0D0D0`,neutrals400:`#BBB`,neutrals500:`#9A9A9A`,neutrals600:`#6C6C6C`,neutrals700:`#4F4F4F`,neutrals800:`#363636`,neutrals900:`#2A2A2A`,neutrals1000:`#252525`,semanticSuccess010:`rgba(48, 164, 107, 0.1)`,semanticSuccess020:`rgba(48, 164, 107, 0.2)`,semanticSuccess030:`rgba(48, 164, 107, 0.3)`,semanticSuccess040:`rgba(48, 164, 107, 0.4)`,semanticSuccess050:`rgba(48, 164, 107, 0.5)`,semanticSuccess060:`rgba(48, 164, 107, 0.6)`,semanticSuccess070:`rgba(48, 164, 107, 0.7)`,semanticSuccess080:`rgba(48, 164, 107, 0.8)`,semanticSuccess090:`rgba(48, 164, 107, 0.9)`,semanticSuccess100:`rgba(48, 164, 107, 1.0)`,semanticError010:`rgba(223, 74, 52, 0.1)`,semanticError020:`rgba(223, 74, 52, 0.2)`,semanticError030:`rgba(223, 74, 52, 0.3)`,semanticError040:`rgba(223, 74, 52, 0.4)`,semanticError050:`rgba(223, 74, 52, 0.5)`,semanticError060:`rgba(223, 74, 52, 0.6)`,semanticError070:`rgba(223, 74, 52, 0.7)`,semanticError080:`rgba(223, 74, 52, 0.8)`,semanticError090:`rgba(223, 74, 52, 0.9)`,semanticError100:`rgba(223, 74, 52, 1.0)`,semanticWarning010:`rgba(243, 161, 63, 0.1)`,semanticWarning020:`rgba(243, 161, 63, 0.2)`,semanticWarning030:`rgba(243, 161, 63, 0.3)`,semanticWarning040:`rgba(243, 161, 63, 0.4)`,semanticWarning050:`rgba(243, 161, 63, 0.5)`,semanticWarning060:`rgba(243, 161, 63, 0.6)`,semanticWarning070:`rgba(243, 161, 63, 0.7)`,semanticWarning080:`rgba(243, 161, 63, 0.8)`,semanticWarning090:`rgba(243, 161, 63, 0.9)`,semanticWarning100:`rgba(243, 161, 63, 1.0)`},B={core:{backgroundAccentPrimary:`#0988F0`,backgroundAccentCertified:`#C7B994`,backgroundWalletKit:`#FFB800`,backgroundAppKit:`#FF573B`,backgroundCloud:`#0988F0`,backgroundDocumentation:`#008847`,backgroundSuccess:`rgba(48, 164, 107, 0.20)`,backgroundError:`rgba(223, 74, 52, 0.20)`,backgroundWarning:`rgba(243, 161, 63, 0.20)`,textAccentPrimary:`#0988F0`,textAccentCertified:`#C7B994`,textWalletKit:`#FFB800`,textAppKit:`#FF573B`,textCloud:`#0988F0`,textDocumentation:`#008847`,textSuccess:`#30A46B`,textError:`#DF4A34`,textWarning:`#F3A13F`,borderAccentPrimary:`#0988F0`,borderSecondary:`#C7B994`,borderSuccess:`#30A46B`,borderError:`#DF4A34`,borderWarning:`#F3A13F`,foregroundAccent010:`rgba(9, 136, 240, 0.1)`,foregroundAccent020:`rgba(9, 136, 240, 0.2)`,foregroundAccent040:`rgba(9, 136, 240, 0.4)`,foregroundAccent060:`rgba(9, 136, 240, 0.6)`,foregroundSecondary020:`rgba(199, 185, 148, 0.2)`,foregroundSecondary040:`rgba(199, 185, 148, 0.4)`,foregroundSecondary060:`rgba(199, 185, 148, 0.6)`,iconAccentPrimary:`#0988F0`,iconAccentCertified:`#C7B994`,iconSuccess:`#30A46B`,iconError:`#DF4A34`,iconWarning:`#F3A13F`,glass010:`rgba(255, 255, 255, 0.1)`,zIndex:`9999`},dark:{overlay:`rgba(0, 0, 0, 0.50)`,backgroundPrimary:`#202020`,backgroundInvert:`#FFFFFF`,textPrimary:`#FFFFFF`,textSecondary:`#9A9A9A`,textTertiary:`#BBBBBB`,textInvert:`#202020`,borderPrimary:`#2A2A2A`,borderPrimaryDark:`#363636`,borderSecondary:`#4F4F4F`,foregroundPrimary:`#252525`,foregroundSecondary:`#2A2A2A`,foregroundTertiary:`#363636`,iconDefault:`#9A9A9A`,iconInverse:`#FFFFFF`},light:{overlay:`rgba(230 , 230, 230, 0.5)`,backgroundPrimary:`#FFFFFF`,borderPrimaryDark:`#E9E9E9`,backgroundInvert:`#202020`,textPrimary:`#202020`,textSecondary:`#9A9A9A`,textTertiary:`#6C6C6C`,textInvert:`#FFFFFF`,borderPrimary:`#E9E9E9`,borderSecondary:`#D0D0D0`,foregroundPrimary:`#F3F3F3`,foregroundSecondary:`#E9E9E9`,foregroundTertiary:`#D0D0D0`,iconDefault:`#9A9A9A`,iconInverse:`#202020`}},V={colors:Fe,fontFamily:{regular:`KHTeka`,mono:`KHTekaMono`},fontWeight:{regular:`400`,medium:`500`},textSize:{h1:`50px`,h2:`44px`,h3:`38px`,h4:`32px`,h5:`26px`,h6:`20px`,large:`16px`,medium:`14px`,small:`12px`},typography:{"h1-regular-mono":{lineHeight:`50px`,letterSpacing:`-3px`},"h1-regular":{lineHeight:`50px`,letterSpacing:`-1px`},"h1-medium":{lineHeight:`50px`,letterSpacing:`-0.84px`},"h2-regular-mono":{lineHeight:`44px`,letterSpacing:`-2.64px`},"h2-regular":{lineHeight:`44px`,letterSpacing:`-0.88px`},"h2-medium":{lineHeight:`44px`,letterSpacing:`-0.88px`},"h3-regular-mono":{lineHeight:`38px`,letterSpacing:`-2.28px`},"h3-regular":{lineHeight:`38px`,letterSpacing:`-0.76px`},"h3-medium":{lineHeight:`38px`,letterSpacing:`-0.76px`},"h4-regular-mono":{lineHeight:`32px`,letterSpacing:`-1.92px`},"h4-regular":{lineHeight:`32px`,letterSpacing:`-0.32px`},"h4-medium":{lineHeight:`32px`,letterSpacing:`-0.32px`},"h5-regular-mono":{lineHeight:`26px`,letterSpacing:`-1.56px`},"h5-regular":{lineHeight:`26px`,letterSpacing:`-0.26px`},"h5-medium":{lineHeight:`26px`,letterSpacing:`-0.26px`},"h6-regular-mono":{lineHeight:`20px`,letterSpacing:`-1.2px`},"h6-regular":{lineHeight:`20px`,letterSpacing:`-0.6px`},"h6-medium":{lineHeight:`20px`,letterSpacing:`-0.6px`},"lg-regular-mono":{lineHeight:`16px`,letterSpacing:`-0.96px`},"lg-regular":{lineHeight:`18px`,letterSpacing:`-0.16px`},"lg-medium":{lineHeight:`18px`,letterSpacing:`-0.16px`},"md-regular-mono":{lineHeight:`14px`,letterSpacing:`-0.84px`},"md-regular":{lineHeight:`16px`,letterSpacing:`-0.14px`},"md-medium":{lineHeight:`16px`,letterSpacing:`-0.14px`},"sm-regular-mono":{lineHeight:`12px`,letterSpacing:`-0.72px`},"sm-regular":{lineHeight:`14px`,letterSpacing:`-0.12px`},"sm-medium":{lineHeight:`14px`,letterSpacing:`-0.12px`}},tokens:{core:B.core,theme:B.dark},borderRadius:{1:`4px`,2:`8px`,10:`10px`,3:`12px`,4:`16px`,6:`24px`,5:`20px`,8:`32px`,16:`64px`,20:`80px`,32:`128px`,64:`256px`,128:`512px`,round:`9999px`},spacing:{0:`0px`,"01":`2px`,1:`4px`,2:`8px`,3:`12px`,4:`16px`,5:`20px`,6:`24px`,7:`28px`,8:`32px`,9:`36px`,10:`40px`,12:`48px`,14:`56px`,16:`64px`,20:`80px`,32:`128px`,64:`256px`},durations:{xl:`400ms`,lg:`200ms`,md:`125ms`,sm:`75ms`},easings:{"ease-out-power-2":`cubic-bezier(0.23, 0.09, 0.08, 1.13)`,"ease-out-power-1":`cubic-bezier(0.12, 0.04, 0.2, 1.06)`,"ease-in-power-2":`cubic-bezier(0.92, -0.13, 0.77, 0.91)`,"ease-in-power-1":`cubic-bezier(0.88, -0.06, 0.8, 0.96)`,"ease-inout-power-2":`cubic-bezier(0.77, 0.09, 0.23, 1.13)`,"ease-inout-power-1":`cubic-bezier(0.88, 0.04, 0.12, 1.06)`}},Ie=`--apkt`;function H(e){if(!e)return{};let t={};return t[`font-family`]=e[`--apkt-font-family`]??e[`--w3m-font-family`]??`KHTeka`,t.accent=e[`--apkt-accent`]??e[`--w3m-accent`]??`#0988F0`,t[`color-mix`]=e[`--apkt-color-mix`]??e[`--w3m-color-mix`]??`#000`,t[`color-mix-strength`]=e[`--apkt-color-mix-strength`]??e[`--w3m-color-mix-strength`]??0,t[`font-size-master`]=e[`--apkt-font-size-master`]??e[`--w3m-font-size-master`]??`10px`,t[`border-radius-master`]=e[`--apkt-border-radius-master`]??e[`--w3m-border-radius-master`]??`4px`,e[`--apkt-z-index`]===void 0?e[`--w3m-z-index`]!==void 0&&(t[`z-index`]=e[`--w3m-z-index`]):t[`z-index`]=e[`--apkt-z-index`],t}var U={createCSSVariables(e){let t={},n={};function r(e,t,n=``){for(let[i,a]of Object.entries(e)){let e=n?`${n}-${i}`:i;a&&typeof a==`object`&&Object.keys(a).length?(t[i]={},r(a,t[i],e)):typeof a==`string`&&(t[i]=`${Ie}-${e}`)}}function i(e,t){for(let[n,r]of Object.entries(e))r&&typeof r==`object`?(t[n]={},i(r,t[n])):typeof r==`string`&&(t[n]=`var(${r})`)}return r(e,t),i(t,n),{cssVariables:t,cssVariablesVarPrefix:n}},assignCSSVariables(e,t){let n={};function r(e,t,i){for(let[a,o]of Object.entries(e)){let e=i?`${i}-${a}`:a,s=t[a];o&&typeof o==`object`?r(o,s,e):typeof s==`string`&&(n[`${Ie}-${e}`]=s)}}return r(e,t),n},createRootStyles(e,t){let n={...V,tokens:{...V.tokens,theme:e===`light`?B.light:B.dark}},{cssVariables:r}=U.createCSSVariables(n),i=U.assignCSSVariables(r,n),a=U.generateW3MVariables(t),o=U.generateW3MOverrides(t),s=U.generateScaledVariables(t),c=U.generateBaseVariables(i),l={...i,...c,...a,...o,...s},u=U.applyColorMixToVariables(t,l),d={...l,...u};return`:root {${Object.entries(d).map(([e,t])=>`${e}:${t.replace(`/[:;{}</>]/g`,``)};`).join(``)}}`},generateW3MVariables(e){if(!e)return{};let t=H(e),n={};return n[`--w3m-font-family`]=t[`font-family`],n[`--w3m-accent`]=t.accent,n[`--w3m-color-mix`]=t[`color-mix`],n[`--w3m-color-mix-strength`]=`${t[`color-mix-strength`]}%`,n[`--w3m-font-size-master`]=t[`font-size-master`],n[`--w3m-border-radius-master`]=t[`border-radius-master`],n},generateW3MOverrides(e){if(!e)return{};let t=H(e),n={};if(e[`--apkt-accent`]||e[`--w3m-accent`]){let e=t.accent;n[`--apkt-tokens-core-iconAccentPrimary`]=e,n[`--apkt-tokens-core-borderAccentPrimary`]=e,n[`--apkt-tokens-core-textAccentPrimary`]=e,n[`--apkt-tokens-core-backgroundAccentPrimary`]=e}return(e[`--apkt-font-family`]||e[`--w3m-font-family`])&&(n[`--apkt-fontFamily-regular`]=t[`font-family`]),t[`z-index`]!==void 0&&(n[`--apkt-tokens-core-zIndex`]=`${t[`z-index`]}`),n},generateScaledVariables(e){if(!e)return{};let t=H(e),n={};if(e[`--apkt-font-size-master`]||e[`--w3m-font-size-master`]){let e=parseFloat(t[`font-size-master`].replace(`px`,``));n[`--apkt-textSize-h1`]=`${Number(e)*5}px`,n[`--apkt-textSize-h2`]=`${Number(e)*4.4}px`,n[`--apkt-textSize-h3`]=`${Number(e)*3.8}px`,n[`--apkt-textSize-h4`]=`${Number(e)*3.2}px`,n[`--apkt-textSize-h5`]=`${Number(e)*2.6}px`,n[`--apkt-textSize-h6`]=`${Number(e)*2}px`,n[`--apkt-textSize-large`]=`${Number(e)*1.6}px`,n[`--apkt-textSize-medium`]=`${Number(e)*1.4}px`,n[`--apkt-textSize-small`]=`${Number(e)*1.2}px`}if(e[`--apkt-border-radius-master`]||e[`--w3m-border-radius-master`]){let e=parseFloat(t[`border-radius-master`].replace(`px`,``));n[`--apkt-borderRadius-1`]=`${Number(e)}px`,n[`--apkt-borderRadius-2`]=`${Number(e)*2}px`,n[`--apkt-borderRadius-3`]=`${Number(e)*3}px`,n[`--apkt-borderRadius-4`]=`${Number(e)*4}px`,n[`--apkt-borderRadius-5`]=`${Number(e)*5}px`,n[`--apkt-borderRadius-6`]=`${Number(e)*6}px`,n[`--apkt-borderRadius-8`]=`${Number(e)*8}px`,n[`--apkt-borderRadius-16`]=`${Number(e)*16}px`,n[`--apkt-borderRadius-20`]=`${Number(e)*20}px`,n[`--apkt-borderRadius-32`]=`${Number(e)*32}px`,n[`--apkt-borderRadius-64`]=`${Number(e)*64}px`,n[`--apkt-borderRadius-128`]=`${Number(e)*128}px`}return n},generateColorMixCSS(e,t){if(!e?.[`--w3m-color-mix`]||!e[`--w3m-color-mix-strength`])return``;let n=e[`--w3m-color-mix`],r=e[`--w3m-color-mix-strength`];if(!r||r===0)return``;let i=Object.keys(t||{}).filter(e=>{let t=e.includes(`-tokens-core-background`)||e.includes(`-tokens-core-text`)||e.includes(`-tokens-core-border`)||e.includes(`-tokens-core-foreground`)||e.includes(`-tokens-core-icon`)||e.includes(`-tokens-theme-background`)||e.includes(`-tokens-theme-text`)||e.includes(`-tokens-theme-border`)||e.includes(`-tokens-theme-foreground`)||e.includes(`-tokens-theme-icon`),n=e.includes(`-borderRadius-`)||e.includes(`-spacing-`)||e.includes(`-textSize-`)||e.includes(`-fontFamily-`)||e.includes(`-fontWeight-`)||e.includes(`-typography-`)||e.includes(`-duration-`)||e.includes(`-ease-`)||e.includes(`-path-`)||e.includes(`-width-`)||e.includes(`-height-`)||e.includes(`-visual-size-`)||e.includes(`-modal-width`)||e.includes(`-cover`);return t&&!n});return i.length===0?``:` @supports (background: color-mix(in srgb, white 50%, black)) {
      :root {
        ${i.map(e=>{let i=t?.[e]||``;return i.includes(`color-mix`)||i.startsWith(`#`)||i.startsWith(`rgb`)?`${e}: color-mix(in srgb, ${n} ${r}%, ${i});`:`${e}: color-mix(in srgb, ${n} ${r}%, var(${e}-base, ${i}));`}).join(``)}
      }
    }`},generateBaseVariables(e){let t={},n=e[`--apkt-tokens-theme-backgroundPrimary`];n&&(t[`--apkt-tokens-theme-backgroundPrimary-base`]=n);let r=e[`--apkt-tokens-core-backgroundAccentPrimary`];return r&&(t[`--apkt-tokens-core-backgroundAccentPrimary-base`]=r),t},applyColorMixToVariables(e,t){let n={};t?.[`--apkt-tokens-theme-backgroundPrimary`]&&(n[`--apkt-tokens-theme-backgroundPrimary`]=`var(--apkt-tokens-theme-backgroundPrimary-base)`),t?.[`--apkt-tokens-core-backgroundAccentPrimary`]&&(n[`--apkt-tokens-core-backgroundAccentPrimary`]=`var(--apkt-tokens-core-backgroundAccentPrimary-base)`);let r=H(e),i=r[`color-mix`],a=r[`color-mix-strength`];if(!a||a===0)return n;let o=Object.keys(t||{}).filter(e=>{let t=e.includes(`-tokens-core-background`)||e.includes(`-tokens-core-text`)||e.includes(`-tokens-core-border`)||e.includes(`-tokens-core-foreground`)||e.includes(`-tokens-core-icon`)||e.includes(`-tokens-theme-background`)||e.includes(`-tokens-theme-text`)||e.includes(`-tokens-theme-border`)||e.includes(`-tokens-theme-foreground`)||e.includes(`-tokens-theme-icon`)||e.includes(`-tokens-theme-overlay`),n=e.includes(`-borderRadius-`)||e.includes(`-spacing-`)||e.includes(`-textSize-`)||e.includes(`-fontFamily-`)||e.includes(`-fontWeight-`)||e.includes(`-typography-`)||e.includes(`-duration-`)||e.includes(`-ease-`)||e.includes(`-path-`)||e.includes(`-width-`)||e.includes(`-height-`)||e.includes(`-visual-size-`)||e.includes(`-modal-width`)||e.includes(`-cover`);return t&&!n});return o.length===0||o.forEach(e=>{let r=t?.[e]||``;e.endsWith(`-base`)||(e===`--apkt-tokens-theme-backgroundPrimary`||e===`--apkt-tokens-core-backgroundAccentPrimary`?n[e]=`color-mix(in srgb, ${i} ${a}%, var(${e}-base))`:r.includes(`color-mix`)||r.startsWith(`#`)||r.startsWith(`rgb`)?n[e]=`color-mix(in srgb, ${i} ${a}%, ${r})`:n[e]=`color-mix(in srgb, ${i} ${a}%, var(${e}-base, ${r}))`)}),n}},{cssVariablesVarPrefix:Le}=U.createCSSVariables(V);function Re(e,...t){return u(e,...t.map(e=>l(typeof e==`function`?e(Le):e)))}var W=void 0,G=void 0,K=void 0,q=void 0,J=void 0,Y={"KHTeka-500-woff2":`https://fonts.reown.com/KHTeka-Medium.woff2`,"KHTeka-400-woff2":`https://fonts.reown.com/KHTeka-Regular.woff2`,"KHTeka-300-woff2":`https://fonts.reown.com/KHTeka-Light.woff2`,"KHTekaMono-400-woff2":`https://fonts.reown.com/KHTekaMono-Regular.woff2`,"KHTeka-500-woff":`https://fonts.reown.com/KHTeka-Light.woff`,"KHTeka-400-woff":`https://fonts.reown.com/KHTeka-Regular.woff`,"KHTeka-300-woff":`https://fonts.reown.com/KHTeka-Light.woff`,"KHTekaMono-400-woff":`https://fonts.reown.com/KHTekaMono-Regular.woff`};function X(e,t=`dark`){W&&document.head.removeChild(W),W=document.createElement(`style`),W.textContent=U.createRootStyles(t,e),document.head.appendChild(W)}function ze(e,t=`dark`){if(J=e,G=document.createElement(`style`),K=document.createElement(`style`),q=document.createElement(`style`),G.textContent=Q(e).core.cssText,K.textContent=Q(e).dark.cssText,q.textContent=Q(e).light.cssText,document.head.appendChild(G),document.head.appendChild(K),document.head.appendChild(q),X(e,t),Z(t),!(e?.[`--apkt-font-family`]||e?.[`--w3m-font-family`]))for(let[e,t]of Object.entries(Y)){let n=document.createElement(`link`);n.rel=`preload`,n.href=t,n.as=`font`,n.type=e.includes(`woff2`)?`font/woff2`:`font/woff`,n.crossOrigin=`anonymous`,document.head.appendChild(n)}Z(t)}function Z(e=`dark`){K&&q&&W&&(e===`light`?(X(J,e),K.removeAttribute(`media`),q.media=`enabled`):(X(J,e),q.removeAttribute(`media`),K.media=`enabled`))}function Be(e){if(J=e,G&&K&&q){G.textContent=Q(e).core.cssText,K.textContent=Q(e).dark.cssText,q.textContent=Q(e).light.cssText;let t=e?.[`--apkt-font-family`]||e?.[`--w3m-font-family`];t&&(G.textContent=G.textContent?.replace(`font-family: KHTeka`,`font-family: ${t}`),K.textContent=K.textContent?.replace(`font-family: KHTeka`,`font-family: ${t}`),q.textContent=q.textContent?.replace(`font-family: KHTeka`,`font-family: ${t}`))}W&&X(e,q?.media===`enabled`?`light`:`dark`)}function Q(e){return{core:u`
      ${e?.[`--apkt-font-family`]||e?.[`--w3m-font-family`]?u``:u`
            @font-face {
              font-family: 'KHTeka';
              src:
                url(${l(Y[`KHTeka-400-woff2`])}) format('woff2'),
                url(${l(Y[`KHTeka-400-woff`])}) format('woff');
              font-weight: 400;
              font-style: normal;
              font-display: swap;
            }

            @font-face {
              font-family: 'KHTeka';
              src:
                url(${l(Y[`KHTeka-300-woff2`])}) format('woff2'),
                url(${l(Y[`KHTeka-300-woff`])}) format('woff');
              font-weight: 300;
              font-style: normal;
            }

            @font-face {
              font-family: 'KHTekaMono';
              src:
                url(${l(Y[`KHTekaMono-400-woff2`])}) format('woff2'),
                url(${l(Y[`KHTekaMono-400-woff`])}) format('woff');
              font-weight: 400;
              font-style: normal;
            }

            @font-face {
              font-family: 'KHTeka';
              src:
                url(${l(Y[`KHTeka-400-woff2`])}) format('woff2'),
                url(${l(Y[`KHTeka-400-woff`])}) format('woff');
              font-weight: 400;
              font-style: normal;
            }
          `}

      @keyframes w3m-shake {
        0% {
          transform: scale(1) rotate(0deg);
        }
        20% {
          transform: scale(1) rotate(-1deg);
        }
        40% {
          transform: scale(1) rotate(1.5deg);
        }
        60% {
          transform: scale(1) rotate(-1.5deg);
        }
        80% {
          transform: scale(1) rotate(1deg);
        }
        100% {
          transform: scale(1) rotate(0deg);
        }
      }
      @keyframes w3m-iframe-fade-out {
        0% {
          opacity: 1;
        }
        100% {
          opacity: 0;
        }
      }
      @keyframes w3m-iframe-zoom-in {
        0% {
          transform: translateY(50px);
          opacity: 0;
        }
        100% {
          transform: translateY(0px);
          opacity: 1;
        }
      }
      @keyframes w3m-iframe-zoom-in-mobile {
        0% {
          transform: scale(0.95);
          opacity: 0;
        }
        100% {
          transform: scale(1);
          opacity: 1;
        }
      }
      :root {
        --apkt-modal-width: 370px;

        --apkt-visual-size-inherit: inherit;
        --apkt-visual-size-sm: 40px;
        --apkt-visual-size-md: 55px;
        --apkt-visual-size-lg: 80px;

        --apkt-path-network-sm: path(
          'M15.4 2.1a5.21 5.21 0 0 1 5.2 0l11.61 6.7a5.21 5.21 0 0 1 2.61 4.52v13.4c0 1.87-1 3.59-2.6 4.52l-11.61 6.7c-1.62.93-3.6.93-5.22 0l-11.6-6.7a5.21 5.21 0 0 1-2.61-4.51v-13.4c0-1.87 1-3.6 2.6-4.52L15.4 2.1Z'
        );

        --apkt-path-network-md: path(
          'M43.4605 10.7248L28.0485 1.61089C25.5438 0.129705 22.4562 0.129705 19.9515 1.61088L4.53951 10.7248C2.03626 12.2051 0.5 14.9365 0.5 17.886V36.1139C0.5 39.0635 2.03626 41.7949 4.53951 43.2752L19.9515 52.3891C22.4562 53.8703 25.5438 53.8703 28.0485 52.3891L43.4605 43.2752C45.9637 41.7949 47.5 39.0635 47.5 36.114V17.8861C47.5 14.9365 45.9637 12.2051 43.4605 10.7248Z'
        );

        --apkt-path-network-lg: path(
          'M78.3244 18.926L50.1808 2.45078C45.7376 -0.150261 40.2624 -0.150262 35.8192 2.45078L7.6756 18.926C3.23322 21.5266 0.5 26.3301 0.5 31.5248V64.4752C0.5 69.6699 3.23322 74.4734 7.6756 77.074L35.8192 93.5492C40.2624 96.1503 45.7376 96.1503 50.1808 93.5492L78.3244 77.074C82.7668 74.4734 85.5 69.6699 85.5 64.4752V31.5248C85.5 26.3301 82.7668 21.5266 78.3244 18.926Z'
        );

        --apkt-width-network-sm: 36px;
        --apkt-width-network-md: 48px;
        --apkt-width-network-lg: 86px;

        --apkt-duration-dynamic: 0ms;
        --apkt-height-network-sm: 40px;
        --apkt-height-network-md: 54px;
        --apkt-height-network-lg: 96px;
      }
    `,dark:u`
      :root {
      }
    `,light:u`
      :root {
      }
    `}}var Ve=u`
  div,
  span,
  iframe,
  a,
  img,
  form,
  button,
  label,
  *::after,
  *::before {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-style: normal;
    text-rendering: optimizeSpeed;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-tap-highlight-color: transparent;
    backface-visibility: hidden;
  }

  :host {
    font-family: var(--apkt-fontFamily-regular);
  }
`,He=u`
  button,
  a {
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;

    will-change: background-color, color, border, box-shadow, width, height, transform, opacity;
    outline: none;
    border: none;
    text-decoration: none;
    transition:
      background-color var(--apkt-durations-lg) var(--apkt-easings-ease-out-power-2),
      color var(--apkt-durations-lg) var(--apkt-easings-ease-out-power-2),
      border var(--apkt-durations-lg) var(--apkt-easings-ease-out-power-2),
      box-shadow var(--apkt-durations-lg) var(--apkt-easings-ease-out-power-2),
      width var(--apkt-durations-lg) var(--apkt-easings-ease-out-power-2),
      height var(--apkt-durations-lg) var(--apkt-easings-ease-out-power-2),
      transform var(--apkt-durations-lg) var(--apkt-easings-ease-out-power-2),
      opacity var(--apkt-durations-lg) var(--apkt-easings-ease-out-power-2),
      scale var(--apkt-durations-lg) var(--apkt-easings-ease-out-power-2),
      border-radius var(--apkt-durations-lg) var(--apkt-easings-ease-out-power-2);
    will-change:
      background-color, color, border, box-shadow, width, height, transform, opacity, scale,
      border-radius;
  }

  a:active:not([disabled]),
  button:active:not([disabled]) {
    scale: 0.975;
    transform-origin: center;
  }

  button:disabled {
    cursor: default;
  }

  input {
    border: none;
    outline: none;
    appearance: none;
  }
`,$=`.`,Ue={getSpacingStyles(e,t){if(Array.isArray(e))return e[t]?`var(--apkt-spacing-${e[t]})`:void 0;if(typeof e==`string`)return`var(--apkt-spacing-${e})`},getFormattedDate(e){return new Intl.DateTimeFormat(`en-US`,{month:`short`,day:`numeric`}).format(e)},formatCurrency(e=0,t={}){let n=Number(e);return isNaN(n)?`$0.00`:new Intl.NumberFormat(`en-US`,{style:`currency`,currency:`USD`,minimumFractionDigits:2,maximumFractionDigits:2,...t}).format(n)},getHostName(e){try{return new URL(e).hostname}catch{return``}},getTruncateString({string:e,charsStart:t,charsEnd:n,truncate:r}){return e.length<=t+n?e:r===`end`?`${e.substring(0,t)}...`:r===`start`?`...${e.substring(e.length-n)}`:`${e.substring(0,Math.floor(t))}...${e.substring(e.length-Math.floor(n))}`},generateAvatarColors(e){let t=e.toLowerCase().replace(/^0x/iu,``).replace(/[^a-f0-9]/gu,``).substring(0,6).padEnd(6,`0`),n=this.hexToRgb(t),r=getComputedStyle(document.documentElement).getPropertyValue(`--w3m-border-radius-master`),i=100-3*Number(r?.replace(`px`,``)),a=`${i}% ${i}% at 65% 40%`,o=[];for(let e=0;e<5;e+=1){let t=this.tintColor(n,.15*e);o.push(`rgb(${t[0]}, ${t[1]}, ${t[2]})`)}return`
    --local-color-1: ${o[0]};
    --local-color-2: ${o[1]};
    --local-color-3: ${o[2]};
    --local-color-4: ${o[3]};
    --local-color-5: ${o[4]};
    --local-radial-circle: ${a}
   `},hexToRgb(e){let t=parseInt(e,16);return[t>>16&255,t>>8&255,t&255]},tintColor(e,t){let[n,r,i]=e;return[Math.round(n+(255-n)*t),Math.round(r+(255-r)*t),Math.round(i+(255-i)*t)]},isNumber(e){return{number:/^[0-9]+$/u}.number.test(e)},getColorTheme(e){return e||(typeof window<`u`&&window.matchMedia&&typeof window.matchMedia==`function`?window.matchMedia(`(prefers-color-scheme: dark)`)?.matches?`dark`:`light`:`dark`)},splitBalance(e){let t=e.split(`.`);return t.length===2?[t[0],t[1]]:[`0`,`00`]},roundNumber(e,t,n){return e.toString().length>=t?Number(e).toFixed(n):e},cssDurationToNumber(e){return e.endsWith(`s`)?Number(e.replace(`s`,``))*1e3:e.endsWith(`ms`)?Number(e.replace(`ms`,``)):0},maskInput({value:e,decimals:t,integers:n}){if(e=e.replace(`,`,`.`),e===$)return`0${$}`;let[r=``,i]=e.split($).map(e=>e.replace(/[^0-9]/gu,``)),a=n?r.substring(0,n):r,o=a.length===2?String(Number(a)):a,s=typeof t==`number`?i?.substring(0,t):i;return(typeof s==`string`&&(typeof t!=`number`||t>0)?[o,s].join($):o)??``},capitalize(e){return e?e.charAt(0).toUpperCase()+e.slice(1):``}};function We(e,t){let{kind:n,elements:r}=t;return{kind:n,elements:r,finisher(t){customElements.get(e)||customElements.define(e,t)}}}function Ge(e,t){return customElements.get(e)||customElements.define(e,t),t}function Ke(e){return function(t){return typeof t==`function`?Ge(e,t):We(e,t)}}var qe={METMASK_CONNECTOR_NAME:`MetaMask`,TRUST_CONNECTOR_NAME:`Trust Wallet`,SOLFLARE_CONNECTOR_NAME:`Solflare`,PHANTOM_CONNECTOR_NAME:`Phantom`,COIN98_CONNECTOR_NAME:`Coin98`,MAGIC_EDEN_CONNECTOR_NAME:`Magic Eden`,BACKPACK_CONNECTOR_NAME:`Backpack`,BITGET_CONNECTOR_NAME:`Bitget Wallet`,FRONTIER_CONNECTOR_NAME:`Frontier`,XVERSE_CONNECTOR_NAME:`Xverse Wallet`,LEATHER_CONNECTOR_NAME:`Leather`,OKX_CONNECTOR_NAME:`OKX Wallet`,BINANCE_CONNECTOR_NAME:`Binance Wallet`,EIP155:e.CHAIN.EVM,ADD_CHAIN_METHOD:`wallet_addEthereumChain`,EIP6963_ANNOUNCE_EVENT:`eip6963:announceProvider`,EIP6963_REQUEST_EVENT:`eip6963:requestProvider`,CONNECTOR_RDNS_MAP:{coinbaseWallet:`com.coinbase.wallet`,coinbaseWalletSDK:`com.coinbase.wallet`},CONNECTOR_TYPE_EXTERNAL:`EXTERNAL`,CONNECTOR_TYPE_WALLET_CONNECT:`WALLET_CONNECT`,CONNECTOR_TYPE_INJECTED:`INJECTED`,CONNECTOR_TYPE_ANNOUNCED:`ANNOUNCED`,CONNECTOR_TYPE_AUTH:`AUTH`,CONNECTOR_TYPE_MULTI_CHAIN:`MULTI_CHAIN`,CONNECTOR_TYPE_W3M_AUTH:`AUTH`,getSDKVersionWarningMessage(e,t){return`
     @@@@@@@           @@@@@@@@@@@@@@@@@@      
   @@@@@@@@@@@      @@@@@@@@@@@@@@@@@@@@@@@@   
  @@@@@@@@@@@@@    @@@@@@@@@@@@@@@@@@@@@@@@@@  
 @@@@@@@@@@@@@@@  @@@@@@@@@@@@@@@@@@@@@@@@@@@  
 @@@@@@@@@@@@@@@  @@@@@@@@@@@@@@   @@@@@@@@@@@ 
 @@@@@@@@@@@@@@@  @@@@@@@@@@@@@   @@@@@@@@@@@@ 
 @@@@@@@@@@@@@@@  @@@@@@@@@@@@@  @@@@@@@@@@@@@
 @@@@@@@@@@@@@@@  @@@@@@@@@@@@   @@@@@@@@@@@@@    
 @@@@@@   @@@@@@  @@@@@@@@@@@   @@@@@@@@@@@@@@    
 @@@@@@   @@@@@@  @@@@@@@@@@@  @@@@@@@@@@@@@@@ 
 @@@@@@@@@@@@@@@  @@@@@@@@@@   @@@@@@@@@@@@@@@ 
 @@@@@@@@@@@@@@@  @@@@@@@@@@@@@@@@@@@@@@@@@@@  
  @@@@@@@@@@@@@    @@@@@@@@@@@@@@@@@@@@@@@@@@  
   @@@@@@@@@@@      @@@@@@@@@@@@@@@@@@@@@@@@   
      @@@@@            @@@@@@@@@@@@@@@@@@  
      
AppKit SDK version ${e} is outdated. Latest version is ${t}. Please update to the latest version for bug fixes and new features.
            
Changelog: https://github.com/reown-com/appkit/releases
NPM Registry: https://www.npmjs.com/package/@reown/appkit`}},Je={getCaipTokens(e){if(!e)return;let t={};return Object.entries(e).forEach(([e,n])=>{t[`${qe.EIP155}:${e}`]=n}),t},isLowerCaseMatch(e,t){return e?.toLowerCase()===t?.toLowerCase()},getActiveNamespaceConnectedToAuth(){let t=r.state.activeChain;return e.AUTH_CONNECTOR_SUPPORTED_CHAINS.find(r=>n.getConnectorId(r)===e.CONNECTOR_ID.AUTH&&r===t)},withRetry({conditionFn:e,intervalMs:t,maxRetries:n}){let r=0;return new Promise(i=>{async function a(){return r+=1,await e()?i(!0):r>=n?i(!1):(setTimeout(a,t),null)}a()})},userChainIdToChainNamespace(t){if(typeof t==`number`)return e.CHAIN.EVM;let[n]=t.split(`:`);return n},getOtherAuthNamespaces(t){return t?e.AUTH_CONNECTOR_SUPPORTED_CHAINS.filter(e=>e!==t):[]},getConnectorStorageInfo(e,n){let r=t.getConnections()[n]??[];return{hasDisconnected:t.isConnectorDisconnected(e,n),hasConnected:r.some(t=>Je.isLowerCaseMatch(t.connectorId,e))}}};export{u as S,be as _,He as a,h as b,Z as c,Le as d,Pe as f,Se as g,A as h,Ue as i,Be as l,j as m,qe as n,ze as o,z as p,Ke as r,Ve as s,Je as t,Re as u,Ae as v,m as x,xe as y};