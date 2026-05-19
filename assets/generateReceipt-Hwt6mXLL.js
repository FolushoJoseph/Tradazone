const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/html2pdf-C77jehQP.js","assets/rolldown-runtime-BTPm5ob3.js"])))=>i.map(i=>d[i]);
import{o as e}from"./rolldown-runtime-BTPm5ob3.js";import{p as t}from"./vendor-BWo6cvn1.js";var n={USD:`$`,EUR:`€`,GBP:`£`,NGN:`₦`};async function r({id:r,merchantName:i,customerEmail:a,items:o=[],fiatAmount:s,fiatCurrency:c=`USD`,cryptoAmount:l,selectedCrypto:u,txHash:d,network:f,paidAt:p}){let m=(await t(async()=>{let{default:t}=await import(`./html2pdf-C77jehQP.js`).then(t=>e(t.default,1));return{default:t}},__vite__mapDeps([0,1]))).default,h=n[c]||c,g=p?new Date(p).toLocaleString():new Date().toLocaleString(),_=f?f.charAt(0).toUpperCase()+f.slice(1):u,v=o.map(e=>`
        <tr>
            <td style="padding:9px 0;border-bottom:1px solid #eee;font-size:13px;">${e.name}</td>
            <td style="padding:9px 0;border-bottom:1px solid #eee;font-size:13px;text-align:center;">${e.quantity}</td>
            <td style="padding:9px 0;border-bottom:1px solid #eee;font-size:13px;text-align:right;">${e.price}</td>
        </tr>
    `).join(``),y=`
        <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:620px;margin:0 auto;padding:48px 56px;color:#1a1a1a;background:#fff;">

            <!-- Header -->
            <div style="display:flex;justify-content:space-between;align-items:flex-start;border-bottom:2px solid #3d3cf5;padding-bottom:24px;margin-bottom:28px;">
                <div>
                    <div style="font-size:22px;font-weight:800;color:#3d3cf5;letter-spacing:-0.5px;">&#8801;tradazone</div>
                    <div style="font-size:11px;color:#999;margin-top:5px;text-transform:uppercase;letter-spacing:1.2px;">Payment Receipt</div>
                </div>
                <div style="text-align:right;">
                    <div style="font-size:11px;color:#999;margin-bottom:3px;">Receipt #</div>
                    <div style="font-size:15px;font-weight:700;">${r}</div>
                    <div style="font-size:11px;color:#999;margin-top:5px;">${g}</div>
                </div>
            </div>

            <!-- Status badge -->
            <div style="display:inline-block;background:#dcfce7;color:#15803d;padding:5px 16px;font-size:11px;font-weight:700;letter-spacing:0.8px;border-radius:100px;margin-bottom:24px;">
                PAYMENT CONFIRMED
            </div>

            <!-- Parties -->
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;background:#f5f5ff;border-radius:8px;padding:18px 20px;margin-bottom:28px;">
                <div>
                    <div style="font-size:10px;color:#888;text-transform:uppercase;letter-spacing:0.8px;margin-bottom:4px;">From</div>
                    <div style="font-size:13px;font-weight:600;">${i||`Tradazone`}</div>
                </div>
                <div>
                    <div style="font-size:10px;color:#888;text-transform:uppercase;letter-spacing:0.8px;margin-bottom:4px;">Billed To</div>
                    <div style="font-size:13px;font-weight:600;">${a||`&#8212;`}</div>
                </div>
            </div>

            ${o.length>0?`
            <!-- Items table -->
            <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
                <thead>
                    <tr style="border-bottom:2px solid #eee;">
                        <th style="text-align:left;font-size:10px;color:#888;text-transform:uppercase;letter-spacing:0.8px;padding-bottom:8px;">Item</th>
                        <th style="text-align:center;font-size:10px;color:#888;text-transform:uppercase;letter-spacing:0.8px;padding-bottom:8px;">Qty</th>
                        <th style="text-align:right;font-size:10px;color:#888;text-transform:uppercase;letter-spacing:0.8px;padding-bottom:8px;">Price</th>
                    </tr>
                </thead>
                <tbody>${v}</tbody>
            </table>
            `:``}

            <!-- Amount summary -->
            <div style="border-top:2px solid #eee;padding-top:16px;margin-bottom:24px;">
                ${s?`
                <div style="display:flex;justify-content:space-between;margin-bottom:8px;">
                    <span style="font-size:13px;color:#666;">Invoice amount</span>
                    <span style="font-size:13px;">${h}${parseFloat(s).toFixed(2)} ${c}</span>
                </div>
                `:``}
                <div style="display:flex;justify-content:space-between;align-items:center;">
                    <span style="font-size:15px;font-weight:700;">Amount paid</span>
                    <span style="font-size:17px;font-weight:800;color:#3d3cf5;">${l} ${u}</span>
                </div>
            </div>

            <!-- Transaction details -->
            <div style="background:#f0f0ff;border-radius:8px;padding:18px 20px;margin-bottom:32px;">
                <div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:1.2px;color:#3d3cf5;margin-bottom:14px;">
                    Transaction Details
                </div>
                <div style="display:flex;gap:40px;margin-bottom:${d?`14px`:`0`};">
                    <div>
                        <div style="font-size:10px;color:#888;margin-bottom:3px;">Network</div>
                        <div style="font-size:13px;font-weight:600;">${_}</div>
                    </div>
                    <div>
                        <div style="font-size:10px;color:#888;margin-bottom:3px;">Status</div>
                        <div style="font-size:13px;font-weight:600;color:#15803d;">Confirmed</div>
                    </div>
                </div>
                ${d?`
                <div>
                    <div style="font-size:10px;color:#888;margin-bottom:5px;">Transaction Hash</div>
                    <div style="font-size:10px;font-family:monospace;word-break:break-all;background:#fff;padding:8px 12px;border-radius:4px;color:#444;">${d}</div>
                </div>
                `:``}
            </div>

            <!-- Footer -->
            <div style="text-align:center;border-top:1px solid #eee;padding-top:20px;">
                <div style="font-size:11px;color:#bbb;">Automated receipt generated by Tradazone &bull; Payments verified on-chain</div>
            </div>
        </div>
    `,b=document.createElement(`div`);b.innerHTML=y,Object.assign(b.style,{position:`fixed`,left:`-9999px`,top:`0`}),document.body.appendChild(b);try{await m().set({margin:0,filename:`tradazone-receipt-${r}.pdf`,image:{type:`jpeg`,quality:.98},html2canvas:{scale:2,useCORS:!0},jsPDF:{unit:`mm`,format:`a4`,orientation:`portrait`}}).from(b.firstChild).save()}finally{document.body.removeChild(b)}}export{r as t};