"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Bell } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const page = () => {
  const [notification, setNotification] = useState([]);
 const userData=useSelector((state:any)=> state.user)
  useEffect(() => {
    const fetchNotification = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/notification/${userData.id}`
        );
        console.log(res.data);
        setNotification(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchNotification();
  }, [userData.id]);

  return (
    <div className="w-full max-h-svh mt-2">
      <div className="notification-container  w-full h-full ">
        {/* notification */}
        <div className="mt-4 px-2 md:px-4 flex flex-col gap-2">
          {notification &&
            notification.map((val:any) => (
              <div key={val.id} className="one flex  gap-3 border-b  bg-[#080812] border-amber-300/20   py-4 px-2">
                <div className=" bg-yellow-500/80 max-w-fit max-h-fit px-2 py-2 rounded-4xl">
                  <Bell className=""></Bell>
                </div>
                <div>
                  <h1 className=" font-bold">{val?.title}</h1>
                  <p className="text-sm text-zinc-500/90">
                   {val?.body}
                  </p>
                  <p className="mt-1 text-sm text-zinc-700">3m ago</p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default page;
