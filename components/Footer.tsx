import { Zap } from "lucide-react";

const Footer = () => {
    return (
              <footer
        className="px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-4"
        style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded flex items-center justify-center" style={{ background: "#6366F1" }}>
            <Zap size={11} color="#fff" fill="#fff" />
          </div>
          <span className="text-sm font-semibold" style={{ color: "#52525B" }}>ShipKit</span>
        </div>
        <p className="text-xs" style={{ color: "#27272A" }}>
          © {new Date().getFullYear()} ShipKit. Built for developers who ship.
        </p>
        <div className="flex gap-6">
          {["Docs","Changelog","Twitter","Discord"].map(link => (
            <a key={link} href="#" className="text-xs transition-colors" style={{ color: "#3F3F46" }}
              onMouseEnter={e => (e.currentTarget.style.color = "#71717A")}
              onMouseLeave={e => (e.currentTarget.style.color = "#3F3F46")}
            >{link}</a>
          ))}
        </div>
      </footer>
    )
}

export default Footer;
