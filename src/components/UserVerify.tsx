"use client";
/* eslint-disable */
import { addUser } from "@/redux/userSlice";
import axios from "axios";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

export default function VerifyUser() {
  const dispatch = useDispatch();
  const userData = useSelector((state: any) => state.user);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const path = usePathname();
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true);
      axios.defaults.withCredentials = true;

      if (!userData || !userData.id) {
        try {
          const res = await axios.get(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/verify`
          );

          if (res.data.success) {
            const data = res.data.data;

            // Save user in Redux
            dispatch(
              addUser({
                id: data.id,
                fullName: data.fullName,
                email: data.email,
                role: data.role,
                country: data.country,
                address: data.address,
                avatarUrl: data.avatarUrl,
                kyc: data.kyc,
                kycStatus: data.kycStatus,
              })
            );

            toast.success(`Welcome back ${data.fullName}`);

            // ❗ Role-based frontend route protection
            if (path.startsWith("/admin") && data.role !== "admin" ) {
              toast.error("Unauthorized Access!");
              router.push("/user/dashboard");
              return;
            }

            if (path.startsWith("/user") && data.role !== "user") {
              toast.error("Unauthorized Access!");
              router.push("/admin/dashboard");
              return;
            }

            if(data.role==="user" && path==="/"){
              router.push("/user/dashboard")
            }
            // Redirect after login/register
            if (["/auth/login", "/auth/register"].includes(path)) {
              if (data.role === "admin") router.push("/admin/dashboard");
              else router.push("/user/dashboard");
            }
          }
        } catch (error) {
          console.log(error);

          // If on a protected page but not logged in, redirect to home
          if (!["/auth/login", "/auth/register"].includes(path)) {
            router.push("/user/dashboard");
          }

          toast.error("Please login first");
        } finally {
          setIsLoading(false);
        }
      } else {
        // User already in Redux, just validate role access
        if (path.startsWith("/admin") && userData.role !== "admin") {
          toast.error("Unauthorized Access!");
          router.push("/user/dashboard");
        }

        if (path.startsWith("/user") && userData.role !== "user") {
          toast.error("Unauthorized Access!");
          router.push("/admin/dashboard");
        }

        

        setIsLoading(false);
      }
    };

    fetchUser();
  }, [path, userData, dispatch, router]);

  // Optional: show nothing or loader while verifying
  if (isLoading) return null;

  return null;
}
