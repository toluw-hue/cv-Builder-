"use client";

import { useState } from "react";
import { useCVContext } from "@/context/CVContext";
import { X, Shield, CreditCard, Smartphone, CheckCircle, Loader2 } from "lucide-react";

interface PaymentModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

export default function PaymentModal({ onClose, onSuccess }: PaymentModalProps) {
  const { cvData, setHasPayment } = useCVContext();
  const [email, setEmail] = useState(cvData.personalInfo.email || "");
  const [name, setName] = useState(cvData.personalInfo.fullName || "");
  const [phone, setPhone] = useState(cvData.personalInfo.phone || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handlePayment = () => {
    if (!email || !name) {
      setError("Please enter your name and email to proceed.");
      return;
    }

    const publicKey = process.env.NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY;
    if (!publicKey || publicKey.includes("your-public-key")) {
      setError("Payment is not configured yet. Please contact support.");
      return;
    }

    setLoading(true);
    setError("");

    // Load Flutterwave inline script dynamically
    const script = document.createElement("script");
    script.src = "https://checkout.flutterwave.com/v3.js";
    script.onload = () => {
      const FlutterwaveCheckout = (window as unknown as { FlutterwaveCheckout: (config: unknown) => void }).FlutterwaveCheckout;
      FlutterwaveCheckout({
        public_key: publicKey,
        tx_ref: `CV-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        amount: 500,
        currency: "NGN",
        payment_options: "card,mobilemoney,ussd,banktransfer,opay",
        customer: {
          email,
          phone_number: phone,
          name,
        },
        customizations: {
          title: "CV Builder Pro",
          description: "Download your professional CV (500 NGN)",
          logo: `${window.location.origin}/icons/icon-192x192.png`,
        },
        callback: (response: { status: string; transaction_id: string }) => {
          setLoading(false);
          if (response.status === "successful" || response.status === "completed") {
            setHasPayment(true);
            onSuccess();
          } else {
            setError("Payment was not completed. Please try again.");
          }
        },
        onclose: () => {
          setLoading(false);
        },
      });
    };
    script.onerror = () => {
      setLoading(false);
      setError("Failed to load payment gateway. Check your internet connection.");
    };
    document.body.appendChild(script);
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 border border-gray-700 rounded-2xl w-full max-w-md shadow-2xl animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600/20 rounded-xl flex items-center justify-center">
              <CreditCard size={20} className="text-indigo-400" />
            </div>
            <div>
              <h2 className="text-white font-bold text-lg">Download Your CV</h2>
              <p className="text-gray-400 text-xs">One-time payment to unlock PDF export</p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors p-1">
            <X size={20} />
          </button>
        </div>

        {/* Price Card */}
        <div className="mx-6 mt-5 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-4 flex items-center justify-between">
          <div>
            <p className="text-white/70 text-xs">One-time download</p>
            <p className="text-white text-3xl font-bold">₦500</p>
            <p className="text-white/70 text-xs mt-0.5">Professional PDF CV</p>
          </div>
          <div className="text-right">
            <div className="bg-white/20 rounded-lg px-3 py-1.5 text-white text-xs font-medium">
              ✓ Instant Download
            </div>
            <div className="bg-white/20 rounded-lg px-3 py-1.5 text-white text-xs font-medium mt-1">
              ✓ High Quality PDF
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="p-6 space-y-4">
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 text-red-400 text-sm">
              {error}
            </div>
          )}

          <div>
            <label className="block text-xs font-medium text-gray-300 mb-1.5">Full Name</label>
            <input
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="John Doe"
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-300 mb-1.5">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="john@example.com"
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-300 mb-1.5">Phone (optional)</label>
            <input
              value={phone}
              onChange={e => setPhone(e.target.value)}
              placeholder="+234 800 000 0000"
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <button
            onClick={handlePayment}
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-xl font-semibold text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/25"
          >
            {loading ? (
              <><Loader2 size={16} className="animate-spin" /> Processing...</>
            ) : (
              <><Smartphone size={16} /> Pay ₦500 with Flutterwave</>
            )}
          </button>

          {/* Security badge */}
          <div className="flex items-center justify-center gap-2 text-gray-500 text-xs">
            <Shield size={12} />
            <span>Secured by Flutterwave · Pay via Card, Bank Transfer, OPay & more</span>
          </div>
        </div>
      </div>
    </div>
  );
}
