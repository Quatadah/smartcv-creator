import { useState } from "react";
import { Modal, ModalContent, ModalHeader, Button, Input } from "@nextui-org/react";
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
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader>
          {mode === 'signin' ? 'Sign In' : 'Create Account'}
        </ModalHeader>
        <form onSubmit={handleSubmit} className="space-y-4 p-6">
          <Input
            type="email"
            label="Email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            variant="bordered"
            className="max-w-full"
          />
          <Input
            type="password"
            label="Password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            variant="bordered"
            className="max-w-full"
          />
          <Button type="submit" color="primary" className="w-full">
            {mode === 'signin' ? 'Sign In' : 'Sign Up'}
          </Button>
        </form>
      </ModalContent>
    </Modal>
  );
}