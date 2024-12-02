import { Card } from "@/components/ui/card";
import { Input } from "@nextui-org/react";
import { PersonalInfo } from "@/types/cv";

interface PersonalInfoSectionProps {
  personalInfo: PersonalInfo;
  onUpdate: (field: keyof PersonalInfo, value: string) => void;
}

export function PersonalInfoSection({ personalInfo, onUpdate }: PersonalInfoSectionProps) {
  return (
    <Card className="glass-card p-6">
      <h2 className="text-2xl font-semibold mb-4">Personal Information</h2>
      <div className="space-y-4">
        <Input
          label="Full Name"
          value={personalInfo.fullName}
          onChange={(e) => onUpdate("fullName", e.target.value)}
          variant="bordered"
          className="max-w-full"
        />
        <Input
          label="Email"
          type="email"
          value={personalInfo.email}
          onChange={(e) => onUpdate("email", e.target.value)}
          variant="bordered"
          className="max-w-full"
        />
        <Input
          label="Phone"
          type="tel"
          value={personalInfo.phone}
          onChange={(e) => onUpdate("phone", e.target.value)}
          variant="bordered"
          className="max-w-full"
        />
        <Input
          label="Location"
          value={personalInfo.location}
          onChange={(e) => onUpdate("location", e.target.value)}
          variant="bordered"
          className="max-w-full"
        />
      </div>
    </Card>
  );
}