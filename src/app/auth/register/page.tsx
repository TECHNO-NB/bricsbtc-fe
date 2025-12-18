"use client";

import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ArrowLeft,
  UploadCloud,
  CheckCircle2,
  ShieldCheck,
  User,
  MapPin,
  Lock,
  Mail,
  FileText,
  X,
  Pin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";

type FormDataT = {
  email: string;
  password: string;
  fullName: string;
  address: string;
  country: string;
  avatar: File | null;
};

export default function RegisterPage() {
  const totalSteps = 3;
 const router=useRouter();
  const COUNTRIES = [
    { code: "US", name: "United States" },
    { code: "CA", name: "Canada" },
    { code: "AU", name: "Australia" },
    { code: "GB", name: "United Kingdom" },
    { code: "IN", name: "India" },
    { code: "CN", name: "China" },
    { code: "JP", name: "Japan" },
    { code: "KR", name: "South Korea" },
    { code: "DE", name: "Germany" },
    { code: "FR", name: "France" },
    { code: "IT", name: "Italy" },
    { code: "ES", name: "Spain" },
    { code: "NL", name: "Netherlands" },
    { code: "SE", name: "Sweden" },
    { code: "NO", name: "Norway" },
    { code: "CH", name: "Switzerland" },
    { code: "BR", name: "Brazil" },
    { code: "MX", name: "Mexico" },
    { code: "AR", name: "Argentina" },
    { code: "ZA", name: "South Africa" },
    { code: "AE", name: "United Arab Emirates" },
    { code: "SA", name: "Saudi Arabia" },
    { code: "SG", name: "Singapore" },
    { code: "MY", name: "Malaysia" },
    { code: "TH", name: "Thailand" },
    { code: "PH", name: "Philippines" },
    { code: "ID", name: "Indonesia" },
    { code: "NP", name: "Nepal" },
    { code: "PK", name: "Pakistan" },
    { code: "BD", name: "Bangladesh" },
    { code: "LK", name: "Sri Lanka" },
  ];

  // top-level state
  const [step, setStep] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [documentsType, setDocumentsType] = useState("passport");

  // form state
  const [formData, setFormData] = useState<FormDataT>({
    email: "",
    password: "",
    fullName: "",
    address: "",
    country: "",
    avatar: null,
  });

  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  // KYC uploaded files (fixed 2 slots)
  const MAX_FILES = 2;
  const [uploadedFiles, setUploadedFiles] = useState<(File | null)[]>(
    new Array(MAX_FILES).fill(null)
  );

  // Generate preview URLs for uploadedFiles
  const previewUrls = useMemo(() => {
    return uploadedFiles.map((file) =>
      file ? URL.createObjectURL(file) : null
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uploadedFiles.map((f) => (f ? f.name + f.size : "null")).join("|")]);

  // Clean up preview URLs when uploadedFiles change OR on unmount
  useEffect(() => {
    return () => {
      previewUrls.forEach((u) => u && URL.revokeObjectURL(u));
    };
  }, [previewUrls]);

  // Clean up avatar preview on unmount
  useEffect(() => {
    return () => {
      if (avatarPreview) URL.revokeObjectURL(avatarPreview);
    };
  }, [avatarPreview]);

  // Helpers
  const handleNext = () => setStep((s) => Math.min(totalSteps, s + 1));
  const handleBack = () => setStep((s) => Math.max(1, s - 1));

  // Avatar select (single)
  const handleAvatarSelect = (file?: File | null) => {
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) {
      alert("Avatar exceeds 10MB.");
      return;
    }
    if (avatarPreview) URL.revokeObjectURL(avatarPreview);
    const url = URL.createObjectURL(file);
    setAvatarPreview(url);
    setFormData((prev) => ({ ...prev, avatar: file }));
  };

  // KYC file select for a given slot index
  const handleKycFileSelect = (index: number, file: File) => {
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) {
      alert("File size exceeds the 10MB limit.");
      return;
    }

    setUploadedFiles((prev) => {
      const newFiles = [...prev];
      newFiles[index] = file;
      return newFiles;
    });
  };

  const handleKycFileRemove = (index: number) => {
    setUploadedFiles((prev) => {
      const newFiles = [...prev];
      newFiles[index] = null;
      return newFiles;
    });
  };

  // submit
  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();

    // basic validation
    if (!formData.email || !formData.password || !formData.fullName) {
      alert("Please fill required fields.");
      return;
    }
    if (!formData.avatar) {
      alert("Please upload an avatar.");
      setStep(2);
      return;
    }
    if (!uploadedFiles.some(Boolean)) {
      alert("Please upload at least one KYC document.");
      setStep(3);
      return;
    }

    setIsLoading(true);
    try {
      const fd = new FormData();

      fd.append("email", formData.email);
      fd.append("password", formData.password);
      fd.append("fullName", formData.fullName);
      fd.append("address", formData.address);
      fd.append("countryName", formData.country);
      fd.append("documentType", documentsType);

      if (formData.avatar) fd.append("avatar", formData.avatar);

      // append kyc files
      uploadedFiles.forEach((f) => {
        if (f) fd.append("kycDocuments", f);
      });

      // change this backend url if needed
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/register`,
        {
          method: "POST",
          body: fd,
        }
      );

      const json = await res.json();
      if (!res.ok) {
        throw new Error(json?.message || "Registration failed");
      }

      setIsSuccess(true);
    } catch (err: any) {
      console.error(err);
      alert(err.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  // Animation variants
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 50 : -50,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 50 : -50,
      opacity: 0,
    }),
  };

  return (
    <div className="min-h-screen overflow-y-auto w-full bg-black text-white flex items-center justify-center relative overflow-hidden font-sans selection:bg-yellow-500/30">
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] right-[20%] w-[600px] h-[600px] bg-yellow-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[20%] w-[500px] h-[500px] bg-zinc-800/20 rounded-full blur-[100px]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="z-10 w-full max-w-lg px-4"
      >
        <Card className="bg-zinc-950/80 border-zinc-800 backdrop-blur-xl shadow-2xl relative overflow-hidden">
          {!isSuccess && (
            <div className="absolute top-0 left-0 w-full h-1 bg-zinc-900">
              <motion.div
                className="h-full bg-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.5)]"
                initial={{ width: "0%" }}
                animate={{ width: `${(step / totalSteps) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          )}

          <CardHeader className="text-center space-y-2 pb-6">
            <CardTitle className="text-2xl font-bold tracking-tight text-white flex items-center justify-center gap-2">
              {!isSuccess && (
                <ShieldCheck className="w-6 h-6 text-yellow-500" />
              )}
              {isSuccess ? "Welcome Aboard" : "Create Account"}
            </CardTitle>
            <CardDescription className="text-zinc-400">
              {isSuccess
                ? "Your application is under review."
                : `Step ${step} of ${totalSteps} • ${
                    step === 1
                      ? "Credentials"
                      : step === 2
                      ? "Personal Details"
                      : "Identity Verification"
                  }`}
            </CardDescription>
          </CardHeader>

          <CardContent className="min-h-[320px] relative">
            <AnimatePresence mode="wait" custom={step}>
              {isSuccess ? (
                <SuccessView key="success" />
              ) : (
                <motion.form
                  key={step}
                  custom={step}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="space-y-4"
                  onSubmit={(e) => e.preventDefault()}
                >
                  {/* STEP 1 */}
                  {step === 1 && (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label className="text-zinc-300">Email Address</Label>
                        <div className="relative group">
                          <Mail className="absolute left-3 top-2.5 h-5 w-5 text-zinc-500 group-focus-within:text-yellow-500 transition-colors" />
                          <Input
                            placeholder="you@example.com"
                            className="pl-10 bg-zinc-900/50 border-zinc-800 text-white focus-visible:ring-yellow-500/50"
                            value={formData.email}
                            onChange={(e) =>
                              setFormData((prev) => ({
                                ...prev,
                                email: e.target.value,
                              }))
                            }
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-zinc-300">Password</Label>
                        <div className="relative group">
                          <Lock className="absolute left-3 top-2.5 h-5 w-5 text-zinc-500 group-focus-within:text-yellow-500 transition-colors" />
                          <Input
                            type="password"
                            placeholder="••••••••"
                            className="pl-10 bg-zinc-900/50 border-zinc-800 text-white focus-visible:ring-yellow-500/50"
                            value={formData.password}
                            onChange={(e) =>
                              setFormData((prev) => ({
                                ...prev,
                                password: e.target.value,
                              }))
                            }
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-zinc-300">
                          Confirm Password
                        </Label>
                        <div className="relative group">
                          <Lock className="absolute left-3 top-2.5 h-5 w-5 text-zinc-500 group-focus-within:text-yellow-500 transition-colors" />
                          <Input
                            type="password"
                            placeholder="••••••••"
                            className="pl-10 bg-zinc-900/50 border-zinc-800 text-white focus-visible:ring-yellow-500/50"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* STEP 2 */}
                  {step === 2 && (
                    <div className="space-y-4">
                      <Label className="text-zinc-300">Upload Avatar</Label>

                      <label className="border-2 border-dashed border-zinc-800 hover:border-yellow-500/50 bg-zinc-900/30 rounded-xl p-6 transition-colors text-center cursor-pointer group flex flex-col items-center">
                        {avatarPreview ? (
                          <img
                            src={avatarPreview}
                            alt="Avatar preview"
                            className="w-24 h-24 rounded-full object-cover mb-2 border border-zinc-700"
                          />
                        ) : (
                          <div className="w-12 h-12 bg-zinc-900 rounded-full flex items-center justify-center mb-3 group-hover:bg-yellow-500/20 transition-colors">
                            <UploadCloud className="w-6 h-6 text-zinc-500 group-hover:text-yellow-500" />
                          </div>
                        )}

                        <h3 className="text-sm font-medium text-zinc-300 mb-1">
                          Click to upload or drag & drop
                        </h3>
                        <p className="text-xs text-zinc-500">
                          PNG, JPG (max 10MB)
                        </p>

                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) =>
                            handleAvatarSelect(e.target.files?.[0] || null)
                          }
                        />
                      </label>

                      <div className="space-y-2">
                        <Label className="text-zinc-300">Full Legal Name</Label>
                        <div className="relative group">
                          <User className="absolute left-3 top-2.5 h-5 w-5 text-zinc-500 group-focus-within:text-yellow-500 transition-colors" />
                          <Input
                            placeholder="John Doe"
                            className="pl-10 bg-zinc-900/50 border-zinc-800 text-white focus-visible:ring-yellow-500/50"
                            value={formData.fullName}
                            onChange={(e) =>
                              setFormData((prev) => ({
                                ...prev,
                                fullName: e.target.value,
                              }))
                            }
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-zinc-300">Address</Label>
                        <div className="relative group">
                          <Pin className="absolute left-3 top-2.5 h-5 w-5 text-zinc-500 group-focus-within:text-yellow-500 transition-colors" />
                          <Input
                            placeholder="Address"
                            className="pl-10 bg-zinc-900/50 border-zinc-800 text-white focus-visible:ring-yellow-500/50"
                            value={formData.address}
                            onChange={(e) =>
                              setFormData((prev) => ({
                                ...prev,
                                address: e.target.value,
                              }))
                            }
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-zinc-300">
                          Country of Residence
                        </Label>

                        <div className="relative">
                          <MapPin className="absolute left-3 top-2.5 h-5 w-5 text-zinc-500 z-10" />

                          <Select
                            value={formData.country}
                            onValueChange={(value) =>
                              setFormData((prev) => ({
                                ...prev,
                                country: value,
                              }))
                            }
                          >
                            <SelectTrigger className="pl-10 bg-zinc-900/50 border-zinc-800 text-white focus:ring-yellow-500/50">
                              <SelectValue placeholder="Select Country" />
                            </SelectTrigger>

                            <SelectContent className="bg-zinc-950 border-zinc-800 text-white max-h-72">
                              {COUNTRIES.map((country) => (
                                <SelectItem
                                  key={country.code}
                                  value={country.name}
                                  className="cursor-pointer focus:bg-yellow-500/20"
                                >
                                  {country.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                        <p className="text-xs text-yellow-500/80">
                          ⚠️ Ensure your name matches your government ID exactly
                          to avoid KYC delays.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* STEP 3 */}
                  {step === 3 && (
                    <div className="space-y-4">
                      <h2 className="text-xl font-semibold text-zinc-100 mb-4">
                        Document Upload
                      </h2>

                      <p className="text-zinc-400 mb-6">
                        Please upload your Government ID or Passport (Max 2
                        documents).
                      </p>

                      <div className="flex gap-6">
                        {uploadedFiles.map((file, index) => {
                          const previewSrc = previewUrls[index];

                          return (
                            <div key={index} className="flex-1 relative">
                              <label className="text-zinc-300 block mb-2">
                                Document {index + 1}
                              </label>

                              <label
                                htmlFor={`file-upload-${index}`}
                                className={`border-2 border-dashed rounded-xl p-6 transition-colors text-center cursor-pointer group flex flex-col items-center justify-center min-h-[200px] ${
                                  file
                                    ? "border-green-500/50 bg-green-900/10"
                                    : "border-zinc-800 hover:border-yellow-500/50 bg-zinc-900/30"
                                }`}
                              >
                                {file && previewSrc ? (
                                  <img
                                    src={previewSrc}
                                    alt={`Document preview ${index + 1}`}
                                    className="w-32 h-32 rounded-lg object-cover mb-3 border border-zinc-700 shadow-md"
                                  />
                                ) : (
                                  <div className="w-12 h-12 bg-zinc-900 rounded-full flex items-center justify-center mb-3 group-hover:bg-yellow-500/20 transition-colors">
                                    <UploadCloud className="w-6 h-6 text-zinc-500 group-hover:text-yellow-500" />
                                  </div>
                                )}

                                <h3 className="text-sm font-medium text-zinc-300 mb-1">
                                  {file
                                    ? file.name
                                    : "Click to upload or drag & drop"}
                                </h3>
                                <p className="text-xs text-zinc-500">
                                  PNG, JPG (max 10MB)
                                </p>

                                <input
                                  id={`file-upload-${index}`}
                                  type="file"
                                  accept="image/png, image/jpeg"
                                  className="hidden"
                                  onChange={(e) => {
                                    const selectedFile = e.target.files?.[0];
                                    if (selectedFile)
                                      handleKycFileSelect(index, selectedFile);
                                    if (e.target) e.target.value = "";
                                  }}
                                  disabled={!!file}
                                />
                              </label>

                              {file && (
                                <button
                                  type="button"
                                  onClick={() => handleKycFileRemove(index)}
                                  className="absolute top-0 right-0 p-1 bg-red-600 rounded-full text-white hover:bg-red-700 transition-colors transform translate-x-1/2 -translate-y-1/2 z-10"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              )}
                            </div>
                          );
                        })}
                      </div>

                      <div className="mt-8 pt-4 border-t border-zinc-800">
                        <h3 className="text-md font-medium text-zinc-300 mb-2">
                          Current Uploads
                        </h3>

                        <ul className="text-sm text-zinc-400">
                          {uploadedFiles.map((f, i) => (
                            <li key={i}>
                              Slot {i + 1}: {f ? f.name : "No file selected"}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* DOCUMENT TYPE */}
                      <div className="space-y-2 pt-2">
                        <Label className="text-zinc-300">Document Type</Label>
                        <div className="grid grid-cols-2 gap-2">
                          <div
                            onClick={() => setDocumentsType("passport")}
                            className={`flex items-center space-x-2 border rounded-lg p-3 bg-zinc-900/50 cursor-pointer ${
                              documentsType === "passport"
                                ? "border-yellow-500"
                                : "border-zinc-800"
                            } hover:border-yellow-500/50 transition-colors`}
                          >
                            <FileText className="w-4 h-4 text-zinc-400" />
                            <span className="text-xs text-zinc-300">
                              Passport
                            </span>
                          </div>

                          <div
                            onClick={() => setDocumentsType("nationalId")}
                            className={`flex items-center space-x-2 border rounded-lg p-3 bg-zinc-900/50 cursor-pointer ${
                              documentsType === "nationalId"
                                ? "border-yellow-500"
                                : "border-zinc-800"
                            } hover:border-yellow-500/50 transition-colors`}
                          >
                            <FileText className="w-4 h-4 text-zinc-400" />
                            <span className="text-xs text-zinc-300">
                              National ID
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.form>
              )}
            </AnimatePresence>
          </CardContent>

          <CardFooter className="flex justify-between pt-2">
            {!isSuccess && (
              <>
                <Button
                  variant="ghost"
                  onClick={handleBack}
                  disabled={step === 1 || isLoading}
                  className="text-zinc-400 hover:text-white hover:bg-zinc-900"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" /> Back
                </Button>

                {step === totalSteps ? (
                  <Button
                    onClick={(e) => handleSubmit(e)}
                    disabled={isLoading}
                    className="bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 text-black font-semibold shadow-lg shadow-yellow-500/20 w-32"
                  >
                    {isLoading ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 1 }}
                        className="w-5 h-5 border-2 border-black border-t-transparent rounded-full"
                      />
                    ) : (
                      "Verify & Join"
                    )}
                  </Button>
                ) : (
                  <Button
                    onClick={handleNext}
                    className="bg-zinc-100 text-black hover:bg-zinc-300 w-32"
                  >
                    Next Step <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                )}
              </>
            )}

            {isSuccess && (
              <Button onClick={()=>router.push("/auth/login")} className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-bold">
                Go to Login
              </Button>
            )}
          </CardFooter>
        </Card>

        {!isSuccess && (
          <p className="text-center text-zinc-500 text-sm mt-6">
            Already have an account?{" "}
            <span onClick={()=>router.push("/auth/login")} className="text-yellow-500 font-medium cursor-pointer hover:underline">
              Log in here
            </span>
          </p>
        )}
      </motion.div>
    </div>
  );
}

// Sub-component for Success View
function SuccessView() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center h-full text-center py-8"
    >
      <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mb-6">
        <CheckCircle2 className="w-10 h-10 text-green-500" />
      </div>
      <h3 className="text-xl font-semibold text-white mb-2">
        Registration Complete!
      </h3>
      <p className="text-zinc-400 text-sm max-w-xs">
        We have received your KYC documents. You will receive an email
        verification shortly.
      </p>
    </motion.div>
  );
}
