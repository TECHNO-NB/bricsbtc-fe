"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import axios from "axios";
import { Bell } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { formatDistanceToNow } from "date-fns";

const NotificationsPage = () => {
  const [allNotifications, setAllNotifications] = useState<any[]>([]);
  const [unreadNotifications, setUnreadNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const userData = useSelector((state: any) => state.user);

  // Fetch all notifications
  const fetchAllNotifications = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/notification/${userData.id}`
      );
      setAllNotifications(res.data.data || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch unread notifications
  const fetchUnreadNotifications = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/notification/unread/${userData.id}`
      );
      setUnreadNotifications(res.data.notifications || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // Mark all as read
  const markAllRead = async () => {
    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/notification/read/${userData.id}`
      );
      fetchAllNotifications();
      fetchUnreadNotifications();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (userData.id) {
      fetchAllNotifications();
      fetchUnreadNotifications();
    }
  }, [userData.id]);

  const NotificationCard = ({ notif }: { notif: any }) => (
    <div
      className={`flex flex-col sm:flex-row sm:items-center gap-3 border p-4 rounded-lg transition-all hover:scale-[1.01] ${
        !notif.read
          ? "bg-yellow-500/10 border-yellow-400/30 shadow-md"
          : "bg-[#1a1a1a] border-amber-300/20 shadow-sm"
      }`}
    >
      <div className="bg-yellow-500/80 p-3 w-10 h-10 rounded-full flex items-center justify-center shrink-0">
        <Bell size={20} />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-white truncate">{notif.title}</h3>
        <p className="text-sm text-zinc-400 truncate">{notif.body}</p>
        <p className="mt-1 text-xs text-zinc-500">
          {formatDistanceToNow(new Date(notif.createdAt), { addSuffix: true })}
        </p>
      </div>
      {!notif.read && <Badge variant="destructive" className="shrink-0">New</Badge>}
    </div>
  );

  return (
    <div className="w-full max-h-screen mt-2 p-4 hide-scrollbar">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <Bell size={24} /> Notifications
        </h2>
        <Button onClick={markAllRead} disabled={unreadNotifications.length === 0}>
          Mark All Read
        </Button>
      </div>

      <Tabs defaultValue="unread" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="unread">
            Unread ({unreadNotifications.length})
          </TabsTrigger>
          <TabsTrigger value="all">All ({allNotifications.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="unread">
          {loading ? (
            <p className="text-gray-400">Loading...</p>
          ) : unreadNotifications.length === 0 ? (
            <p className="text-gray-400">No unread notifications</p>
          ) : (
            <div className="flex flex-col gap-3 overflow-y-auto max-h-[70vh] pr-2 scrollbar-none">
              {unreadNotifications.map((notif) => (
                <NotificationCard key={notif.id} notif={notif} />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="all">
          {loading ? (
            <p className="text-gray-400">Loading...</p>
          ) : allNotifications.length === 0 ? (
            <p className="text-gray-400">No notifications</p>
          ) : (
            <div className="flex flex-col gap-3 overflow-y-auto max-h-[70vh] pr-2 scrollbar-none">
              {allNotifications.map((notif) => (
                <NotificationCard key={notif.id} notif={notif} />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default NotificationsPage;
