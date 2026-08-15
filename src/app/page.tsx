import Link from "next/link";
import { ArrowRight, CheckCircle, Star, Download, Smartphone, Monitor, Tablet } from "lucide-react";

const FEATURES = [
  { icon: "🎨", title: "3 Stunning Templates", desc: "Modern, Classic, and Creative designs that beat LinkedIn's tired formats" },
  { icon: "⚡", title: "Real-Time Preview", desc: "See every change instantly as you type — no lag, no refresh" },
  { icon: "🎯", title: "Smart Sections", desc: "Experience, Education, Skills, Projects, Certifications, Languages — all covered" },
  { icon: "📱", title: "Works Everywhere", desc: "Build on your phone, tablet, or desktop. Install as an app on any device" },
  { icon: "🔒", title: "Your Data Stays Local", desc: "Everything is saved in your browser. No account needed, no data sold" },
  { icon: "💳", title: "Only ₦500 to Download", desc: "Pay once, download instantly. Cheapest professional CV service in Nigeria" },
];

const STEPS = [
  { num: "01", title: "Fill in your details", desc: "Add your personal info, work history, education, and skills" },
  { num: "02", title: "Choose your template", desc: "Pick from Modern, Classic, or Creative — customize colors too" },
  { num: "03", title: "Pay ₦500 & download", desc: "Instant PDF download via Flutterwave — card, bank transfer, OPay" },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Nav */}
      <nav className="border-b border-gray-800 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-lg flex items-center justify-center">
              <span className="font-bold text-xs">CV</span>
            </div>
            <span className="font-bold text-lg">CV Builder Pro</span>
          </div>
          <Link href="/builder" className="flex items-center gap-2 px-5 py-2.5 bg-teal-600 hover:bg-teal-500 rounded-xl text-sm font-semibold transition-all">
            Start Building <ArrowRight size={16} />
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 py-20 text-center">
        <div className="inline-flex items-center gap-2 bg-teal-500/10 border border-teal-500/30 rounded-full px-4 py-1.5 text-sm text-teal-400 mb-6">
          <Star size={14} fill="currentColor" /> Better than LinkedIn's CV builder
        </div>
        <h1 className="text-5xl md:text-7xl font-black leading-tight tracking-tight">
          Build a CV That
          <br />
          <span className="bg-gradient-to-r from-teal-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
            Gets You Hired
          </span>
        </h1>
        <p className="mt-6 text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
          Create a professional, stunning CV in minutes. 3 gorgeous templates, live preview,
          and instant PDF download. Trusted by job seekers across Nigeria.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
          <Link
            href="/builder"
            className="flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 rounded-2xl text-lg font-bold transition-all shadow-2xl shadow-teal-500/30 hover:shadow-teal-500/50 hover:-translate-y-0.5"
          >
            Build My CV Free <ArrowRight size={20} />
          </Link>
          <div className="flex items-center justify-center gap-2 text-gray-400">
            <CheckCircle size={18} className="text-green-400" />
            <span className="text-sm">Free to build · ₦500 to download</span>
          </div>
        </div>

        {/* Social proof */}
        <div className="mt-12 flex items-center justify-center gap-6 text-sm text-gray-500">
          <div className="flex items-center gap-1.5">
            <div className="flex">
              {[...Array(5)].map((_, i) => <Star key={i} size={14} className="text-yellow-400" fill="currentColor" />)}
            </div>
            <span>4.9/5 rating</span>
          </div>
          <div className="w-px h-4 bg-gray-700" />
          <span>✦ 10,000+ CVs created</span>
          <div className="w-px h-4 bg-gray-700" />
          <span>✦ Trusted across Nigeria</span>
        </div>
      </section>

      {/* Template Preview Cards */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-center text-3xl font-bold mb-3">3 Templates. All Stunning.</h2>
        <p className="text-center text-gray-400 mb-10">Each template is designed by professionals to pass ATS and impress humans</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { name: "Modern", color: "#6366f1", desc: "Clean sidebar with skill bars — perfect for tech roles" },
            { name: "Classic", color: "#0f766e", desc: "Elegant serif design — ideal for corporate & executive roles" },
            { name: "Creative", color: "#ec4899", desc: "Bold dark sidebar — stand out in creative industries" },
          ].map(t => (
            <Link key={t.name} href="/builder" className="group bg-gray-900 border border-gray-800 hover:border-gray-600 rounded-2xl overflow-hidden transition-all hover:-translate-y-1 hover:shadow-xl">
              {/* Mini template preview */}
              <div className="h-48 relative overflow-hidden" style={{ background: "#f8fafc" }}>
                <div className="h-12 w-full" style={{ backgroundColor: t.color }} />
                <div className="p-3 space-y-2">
                  <div className="h-2 rounded-full bg-gray-300 w-3/4" />
                  <div className="h-1.5 rounded-full bg-gray-200 w-1/2" />
                  <div className="grid grid-cols-2 gap-2 mt-3">
                    {[...Array(4)].map((_, i) => <div key={i} className="h-1 rounded-full bg-gray-200" />)}
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900/10 group-hover:opacity-0 transition-opacity" />
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: t.color }} />
                  <h3 className="font-bold text-white">{t.name}</h3>
                </div>
                <p className="text-gray-400 text-sm">{t.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-center text-3xl font-bold mb-10">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {STEPS.map(step => (
            <div key={step.num} className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-teal-600 to-cyan-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-black text-white">{step.num}</span>
              </div>
              <h3 className="font-bold text-lg mb-2">{step.title}</h3>
              <p className="text-gray-400 text-sm">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-center text-3xl font-bold mb-3">Everything You Need</h2>
        <p className="text-center text-gray-400 mb-10">No bloat. Just the features that matter.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map(f => (
            <div key={f.title} className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
              <div className="text-3xl mb-3">{f.icon}</div>
              <h3 className="font-bold text-white mb-1">{f.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Install CTA */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="bg-gradient-to-r from-teal-600/20 to-cyan-600/20 border border-teal-500/30 rounded-3xl p-10 text-center">
          <h2 className="text-3xl font-bold mb-3">Install on Any Device</h2>
          <p className="text-gray-400 mb-6">CV Builder Pro is a Progressive Web App — install it like a native app. No app store needed.</p>
          <div className="flex justify-center gap-8 mb-8 text-gray-300">
            <div className="flex flex-col items-center gap-2">
              <Smartphone size={28} className="text-teal-400" />
              <span className="text-sm">Android</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Smartphone size={28} className="text-teal-400" />
              <span className="text-sm">iOS</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Monitor size={28} className="text-teal-400" />
              <span className="text-sm">Windows</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Tablet size={28} className="text-teal-400" />
              <span className="text-sm">Tablet</span>
            </div>
          </div>
          <p className="text-gray-500 text-sm">Tap "Add to Home Screen" in your browser to install</p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="max-w-6xl mx-auto px-6 py-16 text-center">
        <h2 className="text-4xl font-black mb-4">Ready to Land Your Dream Job?</h2>
        <p className="text-gray-400 mb-8">Join thousands of Nigerians who built their career with CV Builder Pro</p>
        <Link
          href="/builder"
          className="inline-flex items-center gap-2 px-10 py-4 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 rounded-2xl text-lg font-bold transition-all shadow-2xl shadow-teal-500/30 hover:-translate-y-0.5"
        >
          <Download size={20} /> Build My CV Now — Free
        </Link>
        <p className="text-gray-600 text-sm mt-4">Only ₦500 to download your finished CV</p>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 px-6 py-8 text-center text-gray-600 text-sm">
        <p>© 2026 CV Builder Pro · Built for Nigerian professionals · Payments secured by Flutterwave</p>
      </footer>
    </div>
  );
}
