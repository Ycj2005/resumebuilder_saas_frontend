"use client";
import React, { useState, ChangeEvent, ReactNode, useContext } from "react";
import { User, Lock, Palette, Camera, LogOut } from "lucide-react";
import userContext from "../userContext/context";
import Image from "next/image";
import Cookies from "js-cookie";
import { toast } from "sonner";
// 1. Define Types for the Sidebar Tabs
type TabId = "profile" | "account" | "logout";

// 2. Define Props for Helper Components
interface TabButtonProps {
  active: boolean;
  onClick: () => void;
  icon: ReactNode;
  label: string;
}

interface InputGroupProps {
  label: string;
  placeholder: string;
  type?: "text" | "email" | "password" | "url";
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

interface InputData {
  email: string;
  name: string;
  bio: string;
  personalwebsite: string;
}

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<TabId>("profile");
  const [select, setSelect] = useState<string | null>(null);
  const [selectimageurl, setSelectimageurl] = useState<string | null>(null);
  const cookiename = "tokenCookie";
  const { data } = useContext(userContext);
  console.log("data context :", data);

  const [updateddata, setUpdatedData] = useState<InputData>({
    email: data?.email,
    name: data?.name,
    bio: data?.bio,
    personalwebsite: data?.personalwebsite,
  });

  function handleImageChange(e: any) {
    const file = e.target.files[0];
    const MAX_SIZE = 2 * 1024 * 1024;
    if (file.size < MAX_SIZE + 1) {
      // console.log("********* filesize ****** ", file.size);
      const createurl = URL.createObjectURL(file);

      // console.log("********* url image file ****** ", createurl);
      setSelectimageurl(createurl);
      setSelect(createurl);
    } else {
      alert("your file size is bigger than 2 mb please try again!");
      // console.log("********* filesize ****** ", file.size);
    }
  }
  async function deleteCookies() {
    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/users/logout`, {
      method: "POST",
      credentials: "include",
    });

    localStorage.clear();
    sessionStorage.clear();

    window.location.href = "/login";
  }

  const handleSave = async () => {
    try {
      let res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/users/updateuser`,
        {
          method: "post",
          credentials: "include",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({ ...updateddata }),
        },
      );

      let data = await res.json();
      console.log("updated response  : ", data);
      if (res.ok) {
        toast.success("data is updated ", {
          position: "top-right",
        });
      }
    } catch (error) {
      toast.error("data is not updated ", {
        position: "top-right",
      });
      console.log("error : ", error);
    }
  };
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b px-8 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-800">Account Settings</h1>
        <button
          className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition"
          onClick={handleSave}
        >
          Save Changes
        </button>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar Navigation */}
        <aside className="w-64 bg-white border-r p-6 hidden md:block">
          <nav className="space-y-2">
            <TabButton
              active={activeTab === "profile"}
              onClick={() => setActiveTab("profile")}
              icon={<User size={18} />}
              label="Public Profile"
            />
            <TabButton
              active={activeTab === "account"}
              onClick={() => setActiveTab("account")}
              icon={<Lock size={18} />}
              label="Account Security"
            />
            <TabButton
              active={activeTab === "logout"}
              onClick={() => setActiveTab("logout")}
              icon={<LogOut size={18} />}
              label="Log out"
            />
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-3xl mx-auto">
            {activeTab === "profile" && (
              <section className="space-y-6">
                <div className="flex items-center space-x-4 mb-8">
                  <div className="relative group">
                    {select ? (
                      <>
                        <img
                          src={select}
                          className="w-24 h-24 rounded-full object-cover"
                        />
                      </>
                    ) : (
                      <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center text-2xl font-bold text-gray-500 border-2 border-dashed border-gray-300">
                        {data?.name?.charAt(0) || "JD"}
                      </div>
                    )}
                    <label
                      htmlFor="inputfile"
                      className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 rounded-full text-white opacity-0 group-hover:opacity-100 transition"
                    >
                      <Camera size={20} />
                    </label>
                  </div>
                  <input
                    type="file"
                    id="inputfile"
                    name="inputfile"
                    hidden
                    accept="image/png, image/jpeg, .png, .jpg, .jpeg"
                    onChange={handleImageChange}
                  />
                  <div>
                    <h2 className="text-xl font-semibold">Profile Picture</h2>
                    <p className="text-sm text-gray-500">
                      JPG, GIF or PNG. Max size of 2MB.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputGroup
                    label="Display Name"
                    placeholder={data?.name || "John Doe"}
                    value={updateddata?.name}
                    onChange={(e) =>
                      setUpdatedData((prev) => ({
                        ...prev!,
                        name: e.target.value,
                      }))
                    }
                  />
                  <InputGroup
                    label="Personal Website"
                    placeholder={data?.personalwebsite || "https://johndoe.dev"}
                    type="url"
                    value={updateddata?.personalwebsite}
                    onChange={(e) =>
                      setUpdatedData((prev) => ({
                        ...prev!,
                        personalwebsite: e.target.value,
                      }))
                    }
                  />
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Short Bio
                    </label>
                    <textarea
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                      rows={4}
                      placeholder={
                        data?.bio || "Tell the world about yourself..."
                      }
                      value={updateddata?.bio}
                      onChange={(e) =>
                        setUpdatedData((prev) => ({
                          ...prev!,
                          bio: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>
              </section>
            )}

            {activeTab === "account" && (
              <section className="space-y-6">
                <InputGroup
                  label="Email Address"
                  placeholder={`${data?.email || "johndoe@example.com"}`}
                  type="email"
                  value={updateddata?.email}
                  onChange={(e) =>
                    setUpdatedData((prev) => ({
                      ...prev!,
                      email: e.target.value,
                    }))
                  }
                />
                <hr />
                <div className="pt-4">
                  <h3 className="text-lg font-medium text-red-600">
                    Danger Zone
                  </h3>
                  <p className="text-sm text-gray-500 mb-4">
                    Permanently delete your account and all your resumes.
                  </p>
                  <button className="border border-red-600 text-red-600 px-4 py-2 rounded hover:bg-red-50 transition">
                    Delete Account
                  </button>
                </div>
              </section>
            )}
            {activeTab === "logout" && (
              <section className="space-y-6">
                <div className="flex flex-col items-center gap-3">
                  <div className="font-semibold text-xl select-none">
                    Are you sure to logout this page !
                  </div>
                  <img
                    src="https://i.giphy.com/pynZagVcYxVUk.webp"
                    className="rounded-md"
                  />
                </div>
                <hr />
                <div className="pt-4">
                  <h3 className="text-lg font-medium text-red-600">
                    Danger Zone
                  </h3>
                  <p className="text-sm text-gray-500 mb-4">
                    Log out your account your data will save and safe
                  </p>
                  <button
                    className="border border-red-600 text-red-600 px-4 py-2 rounded hover:bg-red-50 transition"
                    onClick={deleteCookies}
                  >
                    Log Out
                  </button>
                </div>
              </section>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

// --- Helper Components with TS ---

const TabButton: React.FC<TabButtonProps> = ({
  active,
  onClick,
  icon,
  label,
}) => {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition ${
        active ? "bg-black text-white" : "text-gray-600 hover:bg-gray-100"
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
};

const InputGroup: React.FC<InputGroupProps> = ({
  label,
  placeholder,
  type = "text",
  value,
  onChange,
}) => {
  return (
    <div className="flex flex-col">
      <label className="text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none transition"
      />
    </div>
  );
};
