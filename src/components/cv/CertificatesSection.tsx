import { Card, Input, Button, Textarea } from "@nextui-org/react";
import { Certificate } from "@/types/cv";

interface CertificatesSectionProps {
  certificates: Certificate[];
  onUpdate: (index: number, field: keyof Certificate, value: string) => void;
  onAdd: () => void;
}

export function CertificatesSection({ certificates, onUpdate, onAdd }: CertificatesSectionProps) {
  return (
    <Card className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Certificates</h2>
      {certificates.map((cert, index) => (
        <div key={index} className="mb-6">
          <div className="flex w-full flex-wrap md:flex-nowrap gap-4 mb-4">
            <Input
              type="text"
              label="Certificate Name"
              placeholder="Enter certificate name"
              value={cert.name}
              onChange={(e) => onUpdate(index, "name", e.target.value)}
              className="flex-1"
            />
            <Input
              type="text"
              label="Issuer"
              placeholder="Enter issuer"
              value={cert.issuer}
              onChange={(e) => onUpdate(index, "issuer", e.target.value)}
              className="flex-1"
            />
          </div>
          <div className="mb-4">
            <Input
              type="date"
              label="Date"
              value={cert.date}
              onChange={(e) => onUpdate(index, "date", e.target.value)}
              className="w-full"
            />
          </div>
          <Textarea
            label="Description (optional)"
            placeholder="Enter description"
            value={cert.description}
            onChange={(e) => onUpdate(index, "description", e.target.value)}
            className="w-full"
          />
        </div>
      ))}
      <Button onClick={onAdd} className="w-full">
        Add Certificate
      </Button>
    </Card>
  );
}