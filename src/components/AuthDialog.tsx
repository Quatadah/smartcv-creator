import { useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input } from "@nextui-org/react";
import { useAuth } from "@/contexts/AuthContext";

interface AuthDialogProps {
  isOpen: boolean;
  onOpenChange: () => void;
  mode: 'signin' | 'signup';
}

interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
}

interface FormErrors {
  email?: string;
  password?: string;
  confirmPassword?: string;
  firstName?: string;
  lastName?: string;
}

export const AuthDialog = ({ isOpen, onOpenChange, mode }: AuthDialogProps) => {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const { login, signup } = useAuth();

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (mode === 'signup') {
      // Confirm password validation
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }

      // Name validation
      if (!formData.firstName.trim()) {
        newErrors.firstName = 'First name is required';
      }
      if (!formData.lastName.trim()) {
        newErrors.lastName = 'Last name is required';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      if (mode === 'signin') {
        await login(formData.email, formData.password);
      } else {
        await signup(formData.email, formData.password, formData.firstName, formData.lastName);
      }
      onOpenChange();
    } catch (error) {
      console.error('Auth error:', error);
      setErrors(prev => ({
        ...prev,
        email: 'Authentication failed. Please try again.'
      }));
    }
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onOpenChange={onOpenChange}
      size="lg"
    >
      <ModalContent>
        {(onClose) => (
          <form onSubmit={handleSubmit}>
            <ModalHeader className="flex flex-col gap-1">
              {mode === 'signin' ? 'Sign In' : 'Create Account'}
            </ModalHeader>
            <ModalBody>
              {mode === 'signup' && (
                <div className="flex gap-2">
                  <Input
                    label="First Name"
                    placeholder="Enter your first name"
                    value={formData.firstName}
                    onChange={handleInputChange('firstName')}
                    isInvalid={!!errors.firstName}
                    errorMessage={errors.firstName}
                    className="flex-1"
                  />
                  <Input
                    label="Last Name"
                    placeholder="Enter your last name"
                    value={formData.lastName}
                    onChange={handleInputChange('lastName')}
                    isInvalid={!!errors.lastName}
                    errorMessage={errors.lastName}
                    className="flex-1"
                  />
                </div>
              )}
              <Input
                type="email"
                label="Email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleInputChange('email')}
                isInvalid={!!errors.email}
                errorMessage={errors.email}
              />
              <Input
                type="password"
                label="Password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleInputChange('password')}
                isInvalid={!!errors.password}
                errorMessage={errors.password}
              />
              {mode === 'signup' && (
                <Input
                  type="password"
                  label="Confirm Password"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange('confirmPassword')}
                  isInvalid={!!errors.confirmPassword}
                  errorMessage={errors.confirmPassword}
                />
              )}
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Cancel
              </Button>
              <Button color="primary" type="submit">
                {mode === 'signin' ? 'Sign In' : 'Create Account'}
              </Button>
            </ModalFooter>
          </form>
        )}
      </ModalContent>
    </Modal>
  );
};