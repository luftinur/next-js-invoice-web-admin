import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Building2 } from "lucide-react";

interface CompanyAvatarProps {
  name: string;
  logo?: string;
  size?: "sm" | "default" | "lg";
  showName?: boolean;
  className?: string;
}

export function CompanyAvatar({ name, logo, size = "default", showName = true, className }: CompanyAvatarProps) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <Avatar size={size}>
        {logo ? (
          <img src={logo} alt={name} className="aspect-square size-full rounded-full object-cover" />
        ) : (
          <AvatarFallback className="bg-muted text-xs font-medium">
            {initials || <Building2 className="h-4 w-4" />}
          </AvatarFallback>
        )}
      </Avatar>
      {showName && <span className="font-medium text-sm">{name}</span>}
    </div>
  );
}
