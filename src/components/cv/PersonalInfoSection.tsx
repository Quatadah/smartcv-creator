import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
        <div>
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            id="fullName"
            value={personalInfo.fullName}
            onChange={(e) => onUpdate("fullName", e.target.value)}
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={personalInfo.email}
            onChange={(e) => onUpdate("email", e.target.value)}
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            value={personalInfo.phone}
            onChange={(e) => onUpdate("phone", e.target.value)}
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            value={personalInfo.location}
            onChange={(e) => onUpdate("location", e.target.value)}
            className="mt-1"
          />
        </div>
      </div>
    </Card>
  );
}