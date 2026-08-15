"use client";

import { useCVContext } from "@/context/CVContext";
import { User, Mail, Phone, MapPin, Globe, Linkedin, Github, FileText, Camera } from "lucide-react";

export default function PersonalInfoForm() {
  const { cvData, updatePersonalInfo } = useCVContext();
  const p = cvData.personalInfo;

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        updatePersonalInfo({ photo: ev.target?.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-4">
      {/* Photo Upload */}
      <div className="flex items-center gap-4">
        <div className="relative">
          {p.photo ? (
            <img src={p.photo} alt="Profile" className="w-16 h-16 rounded-full object-cover border-2 border-teal-300" />
          ) : (
            <div className="w-16 h-16 rounded-full bg-gray-700 flex items-center justify-center border-2 border-dashed border-gray-500">
              <User size={24} className="text-gray-400" />
            </div>
          )}
          <label className="absolute bottom-0 right-0 bg-teal-600 rounded-full p-1 cursor-pointer hover:bg-teal-500 transition-colors">
            <Camera size={10} className="text-white" />
            <input type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} />
          </label>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-200">Profile Photo</p>
          <p className="text-xs text-gray-400">Optional. JPG, PNG up to 2MB</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <FormField label="Full Name" icon={<User size={13} />} placeholder="John Doe" value={p.fullName} onChange={v => updatePersonalInfo({ fullName: v })} />
        <FormField label="Job Title" icon={<FileText size={13} />} placeholder="Software Engineer" value={p.jobTitle} onChange={v => updatePersonalInfo({ jobTitle: v })} />
        <FormField label="Email" icon={<Mail size={13} />} placeholder="john@example.com" value={p.email} onChange={v => updatePersonalInfo({ email: v })} type="email" />
        <FormField label="Phone" icon={<Phone size={13} />} placeholder="+234 800 000 0000" value={p.phone} onChange={v => updatePersonalInfo({ phone: v })} />
        <FormField label="Location" icon={<MapPin size={13} />} placeholder="Lagos, Nigeria" value={p.location} onChange={v => updatePersonalInfo({ location: v })} />
        <FormField label="Website" icon={<Globe size={13} />} placeholder="https://yoursite.com" value={p.website || ""} onChange={v => updatePersonalInfo({ website: v })} />
        <FormField label="LinkedIn" icon={<Linkedin size={13} />} placeholder="linkedin.com/in/johndoe" value={p.linkedin || ""} onChange={v => updatePersonalInfo({ linkedin: v })} />
        <FormField label="GitHub" icon={<Github size={13} />} placeholder="github.com/johndoe" value={p.github || ""} onChange={v => updatePersonalInfo({ github: v })} />
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-300 mb-1.5">Professional Summary</label>
        <textarea
          value={p.summary}
          onChange={e => updatePersonalInfo({ summary: e.target.value })}
          placeholder="A brief, compelling summary of your professional background, skills, and what makes you unique..."
          rows={4}
          className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none transition-all"
        />
        <p className="text-xs text-gray-500 mt-1">{p.summary.length}/500 characters</p>
      </div>
    </div>
  );
}

function FormField({
  label, icon, placeholder, value, onChange, type = "text"
}: {
  label: string; icon: React.ReactNode; placeholder: string; value: string; onChange: (v: string) => void; type?: string;
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-gray-300 mb-1.5">{label}</label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">{icon}</span>
        <input
          type={type}
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full bg-gray-800 border border-gray-600 rounded-lg pl-8 pr-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
        />
      </div>
    </div>
  );
}

