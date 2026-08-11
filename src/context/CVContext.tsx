"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { CVData, defaultCVData } from "@/types/cv";

interface CVContextType {
  cvData: CVData;
  updateCVData: (data: Partial<CVData>) => void;
  updatePersonalInfo: (info: Partial<CVData["personalInfo"]>) => void;
  setTemplate: (template: CVData["template"]) => void;
  setPrimaryColor: (color: string) => void;
  resetCV: () => void;
  hasPayment: boolean;
  setHasPayment: (paid: boolean) => void;
}

const CVContext = createContext<CVContextType | undefined>(undefined);

export function CVProvider({ children }: { children: ReactNode }) {
  const [cvData, setCvData] = useState<CVData>(defaultCVData);
  const [hasPayment, setHasPaymentState] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("cv-builder-data");
      if (saved) {
        setCvData(JSON.parse(saved));
      }
      const paid = sessionStorage.getItem("cv-paid");
      if (paid === "true") {
        setHasPaymentState(true);
      }
    } catch {}
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem("cv-builder-data", JSON.stringify(cvData));
    } catch {}
  }, [cvData]);

  const updateCVData = (data: Partial<CVData>) => {
    setCvData((prev) => ({ ...prev, ...data }));
  };

  const updatePersonalInfo = (info: Partial<CVData["personalInfo"]>) => {
    setCvData((prev) => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, ...info },
    }));
  };

  const setTemplate = (template: CVData["template"]) => {
    setCvData((prev) => ({ ...prev, template }));
  };

  const setPrimaryColor = (color: string) => {
    setCvData((prev) => ({ ...prev, primaryColor: color }));
  };

  const resetCV = () => {
    setCvData(defaultCVData);
    localStorage.removeItem("cv-builder-data");
  };

  const setHasPayment = (paid: boolean) => {
    setHasPaymentState(paid);
    if (paid) {
      sessionStorage.setItem("cv-paid", "true");
    } else {
      sessionStorage.removeItem("cv-paid");
    }
  };

  return (
    <CVContext.Provider
      value={{
        cvData,
        updateCVData,
        updatePersonalInfo,
        setTemplate,
        setPrimaryColor,
        resetCV,
        hasPayment,
        setHasPayment,
      }}
    >
      {children}
    </CVContext.Provider>
  );
}

export function useCVContext() {
  const context = useContext(CVContext);
  if (!context) throw new Error("useCVContext must be used within CVProvider");
  return context;
}
