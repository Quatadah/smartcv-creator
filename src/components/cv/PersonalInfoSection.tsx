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
      <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
        <Input
          type="text"
          label="Full Name"
          placeholder="Enter your full name"
          value={personalInfo.fullName}
          onChange={(e) => onUpdate("fullName", e.target.value)}
          className="max-w-full"
        />
        <Input
          type="email"
          label="Email"
          placeholder="Enter your email"
          value={personalInfo.email}
          onChange={(e) => onUpdate("email", e.target.value)}
          className="max-w-full"
        />
      </div>
      <div className="flex w-full flex-wrap md:flex-nowrap gap-4 mt-4">
        <Input
          type="tel"
          label="Phone"
          placeholder="Enter your phone number"
          value={personalInfo.phone}
          onChange={(e) => onUpdate("phone", e.target.value)}
          className="max-w-full"
        />
        <Input
          type="text"
          label="Location"
          placeholder="Enter your location"
          value={personalInfo.location}
          onChange={(e) => onUpdate("location", e.target.value)}
          className="max-w-full"
        />
      </div>
    </Card>
  );
}