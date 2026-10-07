import { useState, useEffect, useCallback } from "react";

export interface ClientProfile {
  clientName: string;
  clientCompany: string;
  clientEmail: string;
  clientTitle: string;
  clientCountry: string;
  packageType: "turnkey" | "blueprint" | "care";
  totalInvestment: number;
  depositAmount: number;
  invoiceNumber: string;
  issueDate: string;
  dueDate: string;
  agreementId: string;
  effectiveDate: string;
  lastUpdated?: number;
}

const STORAGE_KEY = "mm_active_client_profile";

const getDefaultProfile = (): ClientProfile => {
  const today = new Date().toISOString().split("T")[0];
  const due = new Date();
  due.setDate(due.getDate() + 7);

  return {
    clientName: "",
    clientCompany: "",
    clientEmail: "",
    clientTitle: "Chief Executive Officer / Founder",
    clientCountry: "United States",
    packageType: "turnkey",
    totalInvestment: 3500,
    depositAmount: 1750,
    invoiceNumber: `MM-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
    issueDate: today,
    dueDate: due.toISOString().split("T")[0],
    agreementId: `MMA-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
    effectiveDate: today,
  };
};

export function getStoredClientProfile(): ClientProfile {
  if (typeof window === "undefined") return getDefaultProfile();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return { ...getDefaultProfile(), ...parsed };
    }
  } catch (err) {
    console.error("Error reading client profile from storage:", err);
  }
  return getDefaultProfile();
}

export function saveStoredClientProfile(profile: Partial<ClientProfile>): ClientProfile {
  if (typeof window === "undefined") return { ...getDefaultProfile(), ...profile };
  try {
    const current = getStoredClientProfile();
    const updated: ClientProfile = {
      ...current,
      ...profile,
      lastUpdated: Date.now(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    // Dispatch custom event for same-window components
    window.dispatchEvent(new Event("mm_client_profile_updated"));
    return updated;
  } catch (err) {
    console.error("Error saving client profile to storage:", err);
    return { ...getDefaultProfile(), ...profile };
  }
}

export function resetStoredClientProfile(): ClientProfile {
  const fresh = getDefaultProfile();
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(fresh));
      window.dispatchEvent(new Event("mm_client_profile_updated"));
    } catch (err) {
      console.error("Error resetting client profile:", err);
    }
  }
  return fresh;
}

export function useClientProfile() {
  const [profile, setProfileState] = useState<ClientProfile>(() => getStoredClientProfile());

  useEffect(() => {
    const handleSync = () => {
      setProfileState(getStoredClientProfile());
    };

    window.addEventListener("storage", handleSync);
    window.addEventListener("mm_client_profile_updated", handleSync);

    return () => {
      window.removeEventListener("storage", handleSync);
      window.removeEventListener("mm_client_profile_updated", handleSync);
    };
  }, []);

  const updateProfile = useCallback((patch: Partial<ClientProfile>) => {
    const updated = saveStoredClientProfile(patch);
    setProfileState(updated);
  }, []);

  const resetProfile = useCallback(() => {
    const fresh = resetStoredClientProfile();
    setProfileState(fresh);
  }, []);

  return {
    profile,
    updateProfile,
    resetProfile,
  };
}
