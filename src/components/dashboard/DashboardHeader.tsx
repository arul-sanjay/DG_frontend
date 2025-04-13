
import { useState } from "react";
import { Bell, Search, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "../../context/AuthContext";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";

const DashboardHeader = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const userInitials = user?.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <header className="sticky top-0 z-30 w-full border-b bg-white">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </div>
          <div className="hidden lg:flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center">
              <span className="text-white font-bold text-sm">DG</span>
            </div>
            <span className="font-bold text-xl text-gray-800">DataGuardian</span>
          </div>
          
          <div className="hidden md:flex items-center gap-2 md:w-72">
            <Search className="h-4 w-4 text-gray-400" />
            <Input
              type="search"
              placeholder="Search..."
              className="h-9 md:w-64"
            />
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="relative"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-blue-600" />
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-blue-100 text-blue-800">{userInitials}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => navigate("/profile")}
              >
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  logout();
                  navigate("/login");
                }}
              >
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t p-4 bg-white">
          <div className="flex items-center gap-2 mb-4">
            <Search className="h-4 w-4 text-gray-400" />
            <Input
              type="search"
              placeholder="Search..."
              className="h-9 w-full"
            />
          </div>
          
          <nav className="space-y-2">
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => {
                navigate("/dashboard");
                setIsMobileMenuOpen(false);
              }}
            >
              Dashboard
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => {
                navigate("/pipeline");
                setIsMobileMenuOpen(false);
              }}
            >
              Data Governance Pipeline
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => {
                navigate("/profile");
                setIsMobileMenuOpen(false);
              }}
            >
              Profile
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => {
                navigate("/settings");
                setIsMobileMenuOpen(false);
              }}
            >
              Settings
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default DashboardHeader;
