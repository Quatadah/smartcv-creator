import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "@nextui-org/react";
import { useAuth } from "@/contexts/AuthContext";

interface AuthDialogProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'signin' | 'signup';
}

export const AuthDialog = ({ isOpen, onClose, mode }: AuthDialogProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'signin') {
      login(email, password);
    } else {
      login(email, password); // For demo, signup just logs in
    }
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {mode === 'signin' ? 'Sign In' : 'Create Account'}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="email"
            label="Email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            variant="bordered"
          />
          <Input
            type="password"
            label="Password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            variant="bordered"
          />
          <Button type="submit" className="w-full">
            {mode === 'signin' ? 'Sign In' : 'Sign Up'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}