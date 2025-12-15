"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { Clipboard, Check } from "lucide-react";
import { Input } from "@/components/ui/input";

const SettingsPage = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const userData = useSelector((state: any) => state.user);
  const userId = userData.id;

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    address: "",
    country: "",
  });

  const [avatar, setAvatar] = useState<any>(null);
  const [previewAvatar, setPreviewAvatar] = useState<any>(null);

  const [kycDocs, setKycDocs] = useState<any>([]);
  const [previewKycDocs, setPreviewKycDocs] = useState<any>([]);

  const [copied, setCopied] = useState(false);

  // Fetch User Data
  useEffect(() => {
    if (!userId) return;

    axios
      .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/setting/${userId}`)
      .then((res) => {
        setUser(res.data.user);

        setForm({
          fullName: res.data.user.fullName,
          phone: res.data.user.phone || "",
          address: res.data.user.address || "",
          country: res.data.user.country || "",
        });

        setLoading(false);
      })
      .catch(() => toast.error("Failed to load settings"));
  }, [userId]);

  // Copy User ID
  const copyUserId = () => {
    navigator.clipboard.writeText(userId);
    setCopied(true);
    toast.success("User ID copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  // Submit Form
  const handleSubmit = async () => {
    const fd = new FormData();
    fd.append("fullName", form.fullName);
    fd.append("phone", form.phone);
    fd.append("address", form.address);
    fd.append("country", form.country);

    if (avatar) fd.append("avatar", avatar);
    kycDocs.forEach((file: any) => fd.append("kycDocuments", file));

    toast.loading("Updating...");

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/setting/update/${userId}`,
        fd
      );
      toast.dismiss();
      toast.success("Updated successfully");
    } catch {
      toast.dismiss();
      toast.error("Update failed");
    }
  };

  if (loading)
    return <p className="text-white text-center mt-10 text-xl">Loading…</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto text-white">
      <h2 className="text-3xl font-bold mb-6 text-center">Account Settings</h2>

      {/* MAIN CARD */}
      <div className="bg-[#111] border border-zinc-800 p-6 rounded-2xl shadow-xl space-y-8">
        {/* USER ID */}
        <div className="flex items-center justify-between bg-zinc-900 p-3 rounded-xl border border-zinc-700">
          <div>
            <label className="text-sm text-zinc-400">User ID</label>
            <Input
              type="text"
              value={userId}
              readOnly
              className="bg-zinc-900 text-white min-w-68 mt-1 p-2 rounded-lg border border-zinc-700 outline-none cursor-not-allowed overflow-x-auto"
            />
          </div>
          <button
            onClick={copyUserId}
            className="ml-4 p-2 bg-zinc-800 rounded-lg hover:bg-zinc-700 transition-all"
          >
            {copied ? (
              <Check className="w-5 h-5 text-green-400" />
            ) : (
              <Clipboard className="w-5 h-5 text-white" />
            )}
          </button>
        </div>

        {/* AVATAR SECTION */}
        <div className="flex items-center gap-6 flex-wrap">
          <img
            src={previewAvatar || user.avatarUrl}
            className="w-24 h-24 rounded-full object-cover shadow-md border border-zinc-700"
          />

          <div>
            <label className="block text-sm text-zinc-400 mb-2">
              Change Profile Picture
            </label>
            <input
              type="file"
              onChange={(e: any) => {
                setAvatar(e.target.files[0]);
                setPreviewAvatar(URL.createObjectURL(e.target.files[0]));
              }}
              className="text-sm text-zinc-400"
            />
          </div>
        </div>

        {/* USER INFO FORM */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-zinc-400">Full Name</label>
            <input
              className="p-3 w-full bg-zinc-900 rounded-xl border border-zinc-700 focus:border-yellow-500 outline-none mt-1"
              value={form.fullName}
              onChange={(e) => setForm({ ...form, fullName: e.target.value })}
            />
          </div>

          <div>
            <label className="text-sm text-zinc-400">Phone</label>
            <input
              className="p-3 w-full bg-zinc-900 rounded-xl border border-zinc-700 focus:border-yellow-500 outline-none mt-1"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
          </div>

          <div>
            <label className="text-sm text-zinc-400">Country</label>
            <input
              className="p-3 w-full bg-zinc-900 rounded-xl border border-zinc-700 focus:border-yellow-500 outline-none mt-1"
              value={form.country}
              onChange={(e) => setForm({ ...form, country: e.target.value })}
            />
          </div>

          <div>
            <label className="text-sm text-zinc-400">Address</label>
            <input
              className="p-3 w-full bg-zinc-900 rounded-xl border border-zinc-700 focus:border-yellow-500 outline-none mt-1"
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
            />
          </div>
        </div>

        {/* KYC SECTION */}
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-3">KYC Information</h3>

          <div className="bg-zinc-900 border border-zinc-700 p-4 rounded-xl">
            <p className="mb-3">
              <span className="text-zinc-400">Status:</span>{" "}
              <span
                className={
                  user.kycStatus === "APPROVED"
                    ? "text-green-400"
                    : user.kycStatus === "REJECTED"
                    ? "text-red-400"
                    : "text-yellow-400"
                }
              >
                {user.kycStatus}
              </span>
            </p>

            {/* Existing KYC Images */}
            {user.kycData && (
              <div className="grid grid-cols-2 gap-3">
                {user.kycData.attachment.map((img: string, i: number) => (
                  <img
                    key={i}
                    src={img}
                    className="w-full h-32 object-cover rounded-lg border border-zinc-700"
                  />
                ))}
              </div>
            )}

            {/* KYC Re-upload (Only if rejected) */}
            {user.kycStatus === "REJECTED" && (
              <div className="mt-4">
                <label className="block text-red-400 font-semibold mb-2">
                  Re-upload KYC Documents (Upload 2)
                </label>

                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e: any) => {
                    const selected = Array.from(e.target.files);

                    if (selected.length > 2) {
                      toast.error("You can upload only 2 documents");
                      return;
                    }

                    setKycDocs(selected);

                    setPreviewKycDocs(
                      selected.map((file: any) => URL.createObjectURL(file))
                    );
                  }}
                  className="text-sm text-zinc-400"
                />

                {/* PREVIEW SECTION */}
                <div className="grid grid-cols-2 gap-3 mt-4">
                  {previewKycDocs.map((src: string, i: number) => (
                    <img
                      key={i}
                      src={src}
                      className="w-full h-40 object-cover rounded-xl border border-zinc-700 shadow"
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* SAVE BUTTON */}
        <button
          onClick={handleSubmit}
          className="w-full bg-yellow-500 text-black py-3 rounded-xl text-lg font-semibold hover:bg-yellow-400 transition-all"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default SettingsPage;
