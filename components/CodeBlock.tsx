"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { CheckCheck, Copy } from "lucide-react";

const CODE_SNIPPET = `// All of this is already done.
import { auth } from "@/lib/auth"
import { stripe } from "@/lib/stripe"
import { db } from "@/lib/db"
import { resend } from "@/lib/email"

export async function createSubscription(userId: string) {
  const user = await db.user.findUnique({ where: { id: userId } })
  const session = await stripe.checkout.sessions.create({
    customer_email: user.email,
    line_items: [{ price: env.STRIPE_PRICE_ID, quantity: 1 }],
    mode: "subscription",
    success_url: \`\${env.NEXT_PUBLIC_URL}/dashboard\`,
  })
  await resend.sendWelcomeEmail(user.email)
  return session.url
}`;

const CodeBlock = () => {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(CODE_SNIPPET).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = CODE_SNIPPET.split("\n");

  const tokenize = (line: string) => {
    // Very minimal JS/TS syntax colouring
    return line
      .replace(/(".*?")/g, `<span style="color:#86EFAC">$1</span>`)
      .replace(/(`[^`]*`)/g, `<span style="color:#86EFAC">$1</span>`)
      .replace(/\b(import|export|async|await|const|from|return)\b/g, `<span style="color:#C084FC">$1</span>`)
      .replace(/\b(function|where|mode)\b/g, `<span style="color:#C084FC">$1</span>`)
      .replace(/\/\/.*/g, `<span style="color:#52525B">$&</span>`)
      .replace(/\b(string|userId|user|session|env)\b/g, `<span style="color:#7DD3FC">$1</span>`);
  };

  return (
    <div className="relative rounded-2xl overflow-hidden" style={{ background: "#0D0D0D", border: "1px solid rgba(99,102,241,0.15)" }}>
      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-3" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="flex gap-1.5">
          {["#EF4444","#F59E0B","#22C55E"].map(c => <div key={c} className="w-3 h-3 rounded-full" style={{ background: c, opacity: 0.8 }} />)}
        </div>
        <span className="text-xs font-mono" style={{ color: "#52525B" }}>subscription.ts</span>
        <button
          onClick={copy}
          className="flex items-center gap-1.5 text-xs px-2 py-1 rounded-md transition-colors"
          style={{ color: copied ? "#6366F1" : "#52525B", background: "rgba(255,255,255,0.04)" }}
        >
          {copied ? <CheckCheck size={12} /> : <Copy size={12} />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      {/* Lines */}
      <div className="overflow-x-auto p-5">
        <table className="w-full border-collapse">
          <tbody>
            {lines.map((line, i) => (
              <tr key={i} className="group">
                <td className="pr-4 select-none text-right w-8 align-top" style={{ color: "#3F3F46", fontFamily: "'JetBrains Mono', monospace", fontSize: 12, lineHeight: "1.8", paddingTop: 0 }}>
                  {i + 1}
                </td>
                <td style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12.5, color: "#E4E4E7", lineHeight: "1.8", whiteSpace: "pre" }}
                  dangerouslySetInnerHTML={{ __html: tokenize(line) || "&nbsp;" }}
                />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CodeBlock;