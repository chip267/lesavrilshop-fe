"use client";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, logout, isAuthenticated } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  const menuItems = [
    { id: "purchases", label: "My purchases", href: "/profile/purchases" },
    { id: "details", label: "Personal details", href: "/profile/details" },
    { id: "addresses", label: "Saved addresses", href: "/profile/addresses" },
  ];

  if (!user) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 flex gap-12">
      {/* Left Section - Navigation */}
      <div className="w-1/4 space-y-6">
        <div className="space-y-1">
          <h1 className="text-2xl font-medium">Hi {user.username}</h1>
          <p className="text-sm text-gray-600">{user.email}</p>
        </div>

        <nav className="space-y-4">
          {menuItems.map((item) => (
            <Button
              key={item.id}
              variant="ghost"
              className={`w-full justify-start p-0 h-auto hover:bg-transparent text-[17px]
                ${
                  pathname === item.href
                    ? "text-black font-medium"
                    : "text-gray-600 hover:text-black"
                }`}
              onClick={() => router.push(item.href)}
            >
              {item.label}
            </Button>
          ))}

          <Button
            variant="ghost"
            className="w-full justify-start p-0 h-auto hover:bg-transparent font-medium"
            onClick={handleLogout}
          >
            Log out
          </Button>
        </nav>
      </div>

      {/* Right Section - Content */}
      <div className="w-3/4">{children}</div>
    </div>
  );
}
