"use client";

import "react-phone-input-2/lib/style.css";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Loader2 } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { showErrorToast, showSuccessToast } from "@/utils/toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const roleOptions = [
  { label: "Visitor", value: "visitor" },
  { label: "Exhibitor", value: "exhibitor" },
  { label: "Sponsor", value: "sponsor" },
];

const jobTitleOptions = [
  "CEO / Founder",
  "Director",
  "Manager",
  "Merchandiser",
  "Procurement Lead",
  "Marketing Lead",
];

const normalizeCompanyOptions = (items = []) => {
  const seen = new Set();

  return items
    .map((item) => item?.name || item?.label || item?.company_name || item?.title)
    .filter((item) => Boolean(item))
    .map((item) => String(item).trim())
    .filter((item) => {
      if (!item || seen.has(item.toLowerCase())) return false;
      seen.add(item.toLowerCase());
      return true;
    });
};

const formSchema = z.object({
  name: z.string().min(2, { message: "Name is required." }),
  email: z.string().email({ message: "Email is required." }),
  phone: z.string().optional(),
  company: z.string().min(2, { message: "Company is required." }),
  job_title: z.string().min(1, { message: "Job title is required." }),
  job_function: z.string().min(2, { message: "Job function is required." }),
});

const getDefaultValues = (user) => ({
  name: user?.full_name || user?.user_name || "",
  email: user?.email || "",
  phone: "",
  company: "",
  job_title: "",
  job_function: "",
});

const panelClasses = "rounded-[16px] bg-[#F8FAFC] p-4 md:p-5";

const fieldClasses =
  "h-12 rounded-[12px] border-[#D0D5DD] bg-white px-4 text-[14px] font-normal text-[#101828] placeholder:text-[#98A2B3] shadow-[0_1px_2px_rgba(16,24,40,0.04)] transition-colors focus-visible:border-[#FDB022] focus-visible:ring-0 focus-visible:ring-offset-0";

const selectTriggerClasses =
  "h-12 rounded-[12px] border-[#D0D5DD] bg-white px-4 text-[14px] text-[#101828] shadow-[0_1px_2px_rgba(16,24,40,0.04)] focus:ring-0 focus:ring-offset-0 [&>span]:text-left data-[placeholder]:text-[#98A2B3] [&>svg]:text-[#667085] [&>svg]:opacity-100";

const expoCompaniesBaseUrl =
  process.env.NEXT_PUBLIC_BASE_URL || process.env.NEXT_PUBLIC_API_URL || "";
const fallbackExpoRegistrationSlug = "aspernatur-qui-dicta";

const FieldLabel = ({ label, required = false }) => (
  <span className="mb-2.5 block text-[14px] font-medium leading-5 text-[#101828]">
    {label}
    {required ? <span className="ml-1 text-[#F79009]">*</span> : null}
  </span>
);

const RegistrationTerms = ({ showNote = true }) => (
  <div className="space-y-4 px-0.5 text-[14px] leading-7 text-[#475467]">
    <p className="text-[14px]">
      By submitting, you agree to our{" "}
      {/* <span className="font-semibold text-[#344054] underline">
        Terms of Use
      </span>{" "} */}
      {/* and{" "} */}
      <Link
        href="/privacy-policy"
        className="font-semibold text-[#344054] underline"
      >
        Privacy Policy
      </Link>
      .
    </p>

    {showNote ? (
      <p className="text-[14px]">
        <span className="font-semibold text-[#101828]">Note:-</span>{" "}
        Please note your information might be shared with the organizer for the
        sole purpose to assist you with your interest in exhibiting or visiting
        the event.
      </p>
    ) : null}
  </div>
);

const RegistrationTypeSelector = ({
  registrationRole,
  onRegistrationRoleChange,
}) => (
  <div className={panelClasses}>
    <p className="text-[16px] font-semibold leading-7 text-[#1D2939]">
      Registration as a
    </p>

    <RadioGroup
      value={registrationRole}
      onValueChange={onRegistrationRoleChange}
      className="mt-3 grid grid-cols-1 gap-1 rounded-[14px] border border-[#DCE3EE] bg-white p-1.5 sm:grid-cols-3 md:p-2"
    >
      {roleOptions.map((option) => {
        const optionId = `expo-role-${option.value}`;

        return (
          <div
            key={option.value}
            className="flex min-h-11 cursor-pointer items-center gap-2.5 rounded-[12px] px-3 py-2 text-[14px] font-semibold leading-5 text-[#344054] transition-colors hover:bg-[#FCFCFD] md:gap-2 md:text-[14px] md:leading-6"
            onClick={() => onRegistrationRoleChange(option.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                onRegistrationRoleChange(option.value);
              }
            }}
            role="button"
            tabIndex={0}
          >
            <RadioGroupItem
              id={optionId}
              value={option.value}
              className="cs_radio_inp shrink-0"
            />
            <label htmlFor={optionId} className="cursor-pointer select-none text-[14px] leading-5">
              {option.label}
            </label>
          </div>
        );
      })}
    </RadioGroup>
  </div>
);

const getPhonePayload = (rawPhone = "", selectedPhoneCode = "+1") => {
  const sanitizedPhone = String(rawPhone || "").replace(/\D/g, "");
  const sanitizedCode = String(selectedPhoneCode || "").replace(/\D/g, "");

  if (!sanitizedPhone) {
    return {
      phone_code: "",
      phone: "",
    };
  }

  if (sanitizedCode && sanitizedPhone.startsWith(sanitizedCode)) {
    return {
      phone_code: selectedPhoneCode || "",
      phone: sanitizedPhone.slice(sanitizedCode.length),
    };
  }

  return {
    phone_code: selectedPhoneCode || "",
    phone: sanitizedPhone,
  };
};

const ExpoRegistrationModal = ({
  open,
  onOpenChange,
  expoSlug = "",
  visitorRegUrl = "",
  modalId = "expo_registration_modal",
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { data: session, status } = useSession();
  const { toast } = useToast();
  const hasAppliedUrlRoleRef = useRef(false);
  const hasAutoOpenedFromQueryRef = useRef(false);
  const [registrationRole, setRegistrationRole] = useState("visitor");
  const [submitting, setSubmitting] = useState(false);
  const [companyOptions, setCompanyOptions] = useState([]);
  const [phoneCode, setPhoneCode] = useState("+1");

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: getDefaultValues(session?.user),
  });

  const selectedRoleLabel = useMemo(
    () =>
      roleOptions.find((option) => option.value === registrationRole)?.label ||
      "Visitor",
    [registrationRole]
  );

  const clearRegistrationQueryFlags = useCallback(() => {
    const nextParams = new URLSearchParams(searchParams.toString());
    const keysToDelete = ["expoRegistration", "expoRole", "expoModalId"];

    let hasRemovedAny = false;
    keysToDelete.forEach((key) => {
      if (nextParams.has(key)) {
        nextParams.delete(key);
        hasRemovedAny = true;
      }
    });

    if (!hasRemovedAny) return;

    const query = nextParams.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }, [pathname, router, searchParams]);

  const resolvedExpoSlug = useMemo(() => {
    const trimmedExpoSlug = String(expoSlug || "").trim();
    if (trimmedExpoSlug) return trimmedExpoSlug;

    const queryExpoSlug = String(searchParams.get("expoSlug") || "").trim();
    if (queryExpoSlug) return queryExpoSlug;

    const pathMatch = pathname?.match(/^\/expro\/([^/?#]+)/);
    if (pathMatch?.[1]) return decodeURIComponent(pathMatch[1]);

    return fallbackExpoRegistrationSlug;
  }, [expoSlug, pathname, searchParams]);
  const resolvedVisitorRegUrl = useMemo(() => {
    const trimmedVisitorRegUrl = String(visitorRegUrl || "").trim();
    if (trimmedVisitorRegUrl) return trimmedVisitorRegUrl;

    return String(searchParams.get("expoVisitorRegUrl") || "").trim();
  }, [searchParams, visitorRegUrl]);

  useEffect(() => {
    if (open) return;
    if (hasAutoOpenedFromQueryRef.current) return;

    const shouldOpenFromQuery = searchParams.get("expoRegistration") === "1";
    if (!shouldOpenFromQuery) return;

    const requestedModalId = String(searchParams.get("expoModalId") || "").trim();
    if (requestedModalId && requestedModalId !== modalId) return;
    const requestedRole = String(searchParams.get("expoRole") || "").trim();
    if (requestedRole && roleOptions.some((option) => option.value === requestedRole)) {
      setRegistrationRole(requestedRole);
    }

    onOpenChange(true);
    hasAutoOpenedFromQueryRef.current = true;
    clearRegistrationQueryFlags();
  }, [clearRegistrationQueryFlags, modalId, onOpenChange, open, searchParams]);

  useEffect(() => {
    if (!open) {
      hasAppliedUrlRoleRef.current = false;
      return;
    }

    if (hasAppliedUrlRoleRef.current) return;

    const requestedRole = searchParams.get("expoRole");
    if (requestedRole && roleOptions.some((option) => option.value === requestedRole)) {
      setRegistrationRole(requestedRole);
    }
    hasAppliedUrlRoleRef.current = true;
  }, [open, searchParams]);

  useEffect(() => {
    if (!open) return;
    setPhoneCode("+1");
    form.reset(getDefaultValues(session?.user));
  }, [
    open,
    session?.user?.email,
    session?.user?.full_name,
    session?.user?.user_name,
    form,
  ]);

  useEffect(() => {
    if (!open) {
      setCompanyOptions([]);
      return;
    }
    if (status !== "authenticated" || registrationRole === "visitor") {
      setCompanyOptions([]);
      return;
    }

    let isCancelled = false;
    const controller = new AbortController();
    const timeoutId = setTimeout(async () => {
      try {
        if (!expoCompaniesBaseUrl) {
          setCompanyOptions([]);
          return;
        }

        const params = new URLSearchParams({
          per_page: 50,
          page: "1",
        });

        const headers = {
          "Content-Type": "application/json",
        };

        if (session?.accessToken) {
          headers.Authorization = `Bearer ${session.accessToken}`;
        }

        const response = await fetch(
          `${expoCompaniesBaseUrl}/expo/companies?${params.toString()}`,
          {
            method: "GET",
            cache: "no-store",
            headers,
            signal: controller.signal,
          }
        );

        if (!response.ok) {
          throw new Error(`Failed with status ${response.status}`);
        }

        const data = await response.json();
        const payload = data?.data ?? data;
        const listData = Array.isArray(payload?.data)
          ? payload.data
          : Array.isArray(payload)
            ? payload
            : Array.isArray(payload?.items)
              ? payload.items
              : [];

        if (isCancelled) return;
        setCompanyOptions(normalizeCompanyOptions(listData));
      } catch (error) {
        if (isCancelled || error?.name === "AbortError") return;
        console.error("Error fetching company options:", error);
        setCompanyOptions([]);
      }
    }, 300);

    return () => {
      isCancelled = true;
      clearTimeout(timeoutId);
      controller.abort();
    };
  }, [
    open,
    status,
    registrationRole,
    session?.accessToken,
  ]);

  const handleLogin = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("expoRegistration", "1");
    params.set("expoRole", registrationRole);
    params.set("expoModalId", String(modalId || "").trim() || "expo_registration_modal");
    if (resolvedExpoSlug) {
      params.set("expoSlug", resolvedExpoSlug);
    }
    if (resolvedVisitorRegUrl) {
      params.set("expoVisitorRegUrl", resolvedVisitorRegUrl);
    }

    const query = params.toString();
    const callbackUrl = query ? `${pathname}?${query}` : pathname;

    onOpenChange(false);
    router.push(`/login?callbackUrl=${encodeURIComponent(callbackUrl)}`);
  };

  const handleCancel = () => {
    form.reset(getDefaultValues(session?.user));
    onOpenChange(false);
  };

  const isAuthenticated = status === "authenticated";
  const isVisitorRegistration = registrationRole === "visitor";
  const showLoadingState = status === "loading" && !isVisitorRegistration;
  const showLoginPrompt =
    !isAuthenticated && status !== "loading" && !isVisitorRegistration;
  const showVisitorRegistration = isVisitorRegistration;
  const showDetailedRegistrationForm =
    isAuthenticated && !isVisitorRegistration;
  const modalMaxWidth = "sm:max-w-[650px]";

  const submitRegistration = async (formValues) => {
    setSubmitting(true);
    try {
      if (isVisitorRegistration && resolvedVisitorRegUrl) {
        if (typeof window !== "undefined") {
          window.open(resolvedVisitorRegUrl, "_blank", "noopener,noreferrer");
        }

        showSuccessToast(toast, "Redirecting to visitor registration.");
        form.reset(getDefaultValues(session?.user));
        onOpenChange(false);
        return;
      }

      if (!isVisitorRegistration) {
        if (!expoCompaniesBaseUrl) {
          throw new Error("Registration API URL is not configured.");
        }

        const jobTitleId = jobTitleOptions.findIndex(
          (option) => option === formValues?.job_title
        ) + 1;

        if (jobTitleId <= 0) {
          throw new Error("Please select a valid job title.");
        }

        const { phone_code, phone } = getPhonePayload(
          formValues?.phone,
          phoneCode
        );

        const payload = {
          type: registrationRole,
          name: String(formValues?.name || "").trim(),
          email: String(formValues?.email || "").trim(),
          phone_code,
          phone,
          company: String(formValues?.company || "").trim(),
          job_title_id: jobTitleId,
          job_function: String(formValues?.job_function || "").trim(),
        };

        const headers = {
          "Content-Type": "application/json",
        };

        if (session?.accessToken) {
          headers.Authorization = `Bearer ${session.accessToken}`;
        }

        const response = await fetch(
          `${expoCompaniesBaseUrl}/expo/${resolvedExpoSlug}/register`,
          {
            method: "POST",
            cache: "no-store",
            headers,
            body: JSON.stringify(payload),
          }
        );

        const data = await response.json().catch(() => ({}));
        if (!response.ok || data?.status === false) {
          throw new Error(
            data?.message || `Registration failed with status ${response.status}`
          );
        }
      }

      showSuccessToast(
        toast,
        `Expo registration submitted as ${selectedRoleLabel}.`
      );
      form.reset(getDefaultValues(session?.user));
      onOpenChange(false);
    } catch (error) {
      showErrorToast(
        toast,
        error?.message || "Failed to submit expo registration."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const onSubmit = async (values) => {
    await submitRegistration(values);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={`w-[calc(100%-24px)] max-w-[650px] gap-0 overflow-hidden rounded-[24px] border border-[#EAECF0] bg-white p-0 shadow-[0_24px_64px_rgba(16,24,40,0.12)] [&>button]:right-4 [&>button]:top-4 [&>button]:rounded-full [&>button]:bg-transparent [&>button]:p-1.5 [&>button]:text-[#667085] [&>button]:opacity-100 [&>button]:transition-colors [&>button:hover]:bg-[#F2F4F7] [&>button:hover]:opacity-100 md:w-full md:[&>button]:right-7 md:[&>button]:top-6 max-md:left-0 max-md:right-0 max-md:top-auto max-md:bottom-0 max-md:w-full max-md:max-w-none max-md:translate-x-0 max-md:translate-y-0 max-md:rounded-b-none max-md:border-x-0 max-md:border-b-0 max-md:data-[state=open]:slide-in-from-bottom max-md:data-[state=closed]:slide-out-to-bottom ${modalMaxWidth}`}
      >
        <div className="flex max-h-[88vh] flex-col">
          <DialogHeader className="border-b border-[#EAECF0] px-5 py-4 text-left md:px-6 md:py-5">
            <DialogTitle className="text-[20px] font-semibold leading-8 text-[#1D2939]">
              Expo Registration
            </DialogTitle>
            <DialogDescription className="sr-only">
              Register for the expo by selecting your role and completing the
              required details.
            </DialogDescription>
          </DialogHeader>

          {showLoadingState ? (
            <div className="flex min-h-[220px] items-center justify-center px-6 py-6 text-[#667085]">
              <Loader2 className="h-6 w-6 animate-spin" />
            </div>
          ) : null}

          {showLoginPrompt ? (
            <div className="px-5 py-4 md:px-5 md:py-4">
              <RegistrationTypeSelector
                registrationRole={registrationRole}
                onRegistrationRoleChange={setRegistrationRole}
              />

              <div className="px-2 pb-2 pt-14 text-center md:px-10 md:pt-16">
                <h3 className="text-[20px] font-semibold text-[#1D2939] md:text-[24px]">
                  Login to Expo Registration.
                </h3>
                <p className="mx-auto mt-4 max-w-[560px] text-[16px] leading-6 text-[#667085]">
                  You must login to registration. By logged in you will manage
                  your registration & bookmark expo easily from your profile.
                </p>

                <button
                  type="button"
                  onClick={handleLogin}
                  className="mt-8 inline-flex h-12 min-w-[202px] items-center justify-center rounded-[12px] bg-[#F79009] px-8 text-[16px] font-semibold text-white transition-colors hover:bg-[#DC6803]"
                >
                  Log In Now
                </button>
              </div>
            </div>
          ) : null}

          {showVisitorRegistration ? (
            <div className="flex flex-col">
              <div className="px-5 py-5 md:px-6 md:py-6">
                <div className="space-y-3">
                  <RegistrationTypeSelector
                    registrationRole={registrationRole}
                    onRegistrationRoleChange={setRegistrationRole}
                  />
                  <RegistrationTerms showNote={false} />
                </div>
              </div>

              <div className="border-t border-[#EAECF0] px-5 py-4 md:px-8 md:py-6">
                <div className="grid grid-cols-2 gap-3 md:gap-4">
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="h-12 rounded-[12px] border border-[#D0D5DD] bg-white px-6 text-[16px] font-semibold text-[#344054] transition-colors hover:bg-[#F9FAFB]"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={submitRegistration}
                    disabled={submitting}
                    className="inline-flex h-12 items-center justify-center gap-2 rounded-[12px] bg-[#F79009] px-6 text-[16px] font-semibold text-white transition-colors hover:bg-[#DC6803] disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        Submitting
                      </>
                    ) : (
                      <>
                        Go For Registration
                        <ArrowRight className="h-5 w-5" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ) : null}

          {showDetailedRegistrationForm ? (
            <Form {...form}>
              <form
                id="expo-registration-form"
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex min-h-0 flex-1 flex-col"
              >
                <div className="min-h-0 flex-1 overflow-y-auto px-5 py-5 md:px-6 md:py-6">
                  <div className="space-y-5 md:space-y-6">
                    <RegistrationTypeSelector
                      registrationRole={registrationRole}
                      onRegistrationRoleChange={setRegistrationRole}
                    />

                    <div className={panelClasses}>
                      <div className="grid grid-cols-1 gap-x-7 gap-y-6 md:grid-cols-2">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem className="space-y-0">
                              <FormLabel>
                                <FieldLabel label="Name" required />
                              </FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="Ex: Jhon Doe"
                                  className={fieldClasses}
                                />
                              </FormControl>
                              <FormMessage className="pt-1.5 text-[12px]" />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem className="space-y-0">
                              <FormLabel>
                                <FieldLabel label="Email" required />
                              </FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  type="email"
                                  placeholder="Ex: jhon@mail.com"
                                  className={fieldClasses}
                                />
                              </FormControl>
                              <FormMessage className="pt-1.5 text-[12px]" />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem className="space-y-0">
                              <FormLabel>
                                <FieldLabel label="Phone" />
                              </FormLabel>
                              <FormControl>
                                <PhoneInput
                                  country="us"
                                  enableSearch
                                  specialLabel=""
                                  value={field.value}
                                  onChange={(value, country) => {
                                    field.onChange(value);
                                    if (country?.dialCode) {
                                      setPhoneCode(`+${country.dialCode}`);
                                    }
                                  }}
                                  containerClass="!w-full"
                                  inputClass="!h-12 !w-full !rounded-[12px] !border !border-[#D0D5DD] !bg-white !pl-[72px] !pr-4 !text-[14px] !font-normal !text-[#101828] !shadow-[0_1px_2px_rgba(16,24,40,0.04)] placeholder:!text-[#98A2B3]"
                                  buttonClass="!left-0 !top-0 !h-12 !rounded-l-[12px] !rounded-r-none !border-0 !border-r !border-[#D0D5DD] !bg-transparent !px-3"
                                  dropdownClass="!z-[50010]"
                                />
                              </FormControl>
                              <FormMessage className="pt-1.5 text-[12px]" />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="company"
                          render={({ field }) => (
                            <FormItem className="space-y-0">
                              <FormLabel>
                                <FieldLabel label="Company" required />
                              </FormLabel>
                              <Select
                                value={field.value || undefined}
                                onValueChange={field.onChange}
                              >
                                <FormControl>
                                  <SelectTrigger className={selectTriggerClasses}>
                                    <SelectValue placeholder="Select company" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent className="rounded-[12px] border border-[#D0D5DD] bg-white p-1 shadow-[0_12px_24px_rgba(16,24,40,0.12)]">
                                  {companyOptions.length > 0 ? (
                                    companyOptions.map((option) => (
                                      <SelectItem
                                        key={option}
                                        value={option}
                                        className="rounded-[10px] py-2.5 text-[14px] text-[#101828]"
                                      >
                                        {option}
                                      </SelectItem>
                                    ))
                                  ) : (
                                    <div className="px-2 py-2.5 text-[13px] text-[#667085]">
                                      No company options available
                                    </div>
                                  )}
                                </SelectContent>
                              </Select>
                              <FormMessage className="pt-1.5 text-[12px]" />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="job_title"
                          render={({ field }) => (
                            <FormItem className="space-y-0">
                              <FormLabel>
                                <FieldLabel label="Job Title" required />
                              </FormLabel>
                              <Select
                                value={field.value}
                                onValueChange={field.onChange}
                              >
                                <FormControl>
                                  <SelectTrigger className={selectTriggerClasses}>
                                    <SelectValue placeholder="Select your job title" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent className="rounded-[12px] border border-[#D0D5DD] bg-white p-1 shadow-[0_12px_24px_rgba(16,24,40,0.12)]">
                                  {jobTitleOptions.map((option) => (
                                    <SelectItem
                                      key={option}
                                      value={option}
                                      className="rounded-[10px] py-2.5 text-[14px] text-[#101828]"
                                    >
                                      {option}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage className="pt-1.5 text-[12px]" />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="job_function"
                          render={({ field }) => (
                            <FormItem className="space-y-0">
                              <FormLabel>
                                <FieldLabel label="Job Function" required />
                              </FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="Type job function"
                                  className={fieldClasses}
                                />
                              </FormControl>
                              <FormMessage className="pt-1.5 text-[12px]" />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    <RegistrationTerms />
                  </div>
                </div>

                <div className="border-t border-[#EAECF0] px-5 py-4 md:px-9 md:py-6">
                  <div className="grid grid-cols-2 gap-3 md:gap-6">
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="h-12 rounded-[12px] border border-[#D0D5DD] bg-white text-[15px] font-semibold text-[#344054] transition-colors hover:bg-[#F9FAFB] md:h-14 md:text-[16px]"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="inline-flex h-12 items-center justify-center rounded-[12px] bg-[#F79009] text-[15px] font-semibold text-white transition-colors hover:bg-[#DC6803] disabled:cursor-not-allowed disabled:opacity-70 md:h-14 md:text-[16px]"
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Submitting
                        </>
                      ) : (
                        "Submit"
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </Form>
          ) : null}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ExpoRegistrationModal;
