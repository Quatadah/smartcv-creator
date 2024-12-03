import { useState } from "react";
import { Modal, ModalContent, ModalBody, Button, Input, Checkbox } from "@nextui-org/react";
import { useAuth } from "@/contexts/AuthContext";
import { Github } from "lucide-react";
import { Eye, EyeOff } from "lucide-react";

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
  agreeToTerms: boolean;
}

interface FormErrors {
  email?: string;
  password?: string;
  confirmPassword?: string;
  firstName?: string;
  lastName?: string;
  agreeToTerms?: string;
}

export const AuthDialog = ({ isOpen, onOpenChange, mode }: AuthDialogProps) => {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    agreeToTerms: false
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
  const { login, signup, signInWithGoogle, signInWithGithub } = useAuth();

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (mode === 'signup') {
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }

      if (!formData.firstName.trim()) {
        newErrors.firstName = 'First name is required';
      }
      if (!formData.lastName.trim()) {
        newErrors.lastName = 'Last name is required';
      }
      if (!formData.agreeToTerms) {
        newErrors.agreeToTerms = 'You must agree to the Terms and Privacy Policy';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [field]: field === 'agreeToTerms' ? e.target.checked : e.target.value
    }));
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

  const togglePasswordVisibility = () => setIsPasswordVisible(!isPasswordVisible);
  const toggleConfirmPasswordVisibility = () => setIsConfirmPasswordVisible(!isConfirmPasswordVisible);

  return (
    <Modal 
      isOpen={isOpen} 
      onOpenChange={onOpenChange}
      size="sm"
      classNames={{
        base: "bg-background",
        closeButton: "top-3 right-3",
      }}
    >
      <ModalContent>
        {(onClose) => (
          <ModalBody className="p-6">
            <h2 className="text-2xl font-semibold mb-6">
              {mode === 'signin' ? 'Log In' : 'Sign Up'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === 'signup' && (
                <div className="flex gap-2">
                  <Input
                    label="First Name"
                    placeholder="Enter your first name"
                    value={formData.firstName}
                    onChange={handleInputChange('firstName')}
                    isInvalid={!!errors.firstName}
                    errorMessage={errors.firstName}
                    classNames={{
                      input: "bg-background",
                      inputWrapper: "bg-default-100/50"
                    }}
                  />
                  <Input
                    label="Last Name"
                    placeholder="Enter your last name"
                    value={formData.lastName}
                    onChange={handleInputChange('lastName')}
                    isInvalid={!!errors.lastName}
                    errorMessage={errors.lastName}
                    classNames={{
                      input: "bg-background",
                      inputWrapper: "bg-default-100/50"
                    }}
                  />
                </div>
              )}
              <Input
                type="email"
                label="Email Address"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleInputChange('email')}
                isInvalid={!!errors.email}
                errorMessage={errors.email}
                classNames={{
                  input: "bg-background",
                  inputWrapper: "bg-default-100/50"
                }}
              />
              <Input
                label="Password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleInputChange('password')}
                isInvalid={!!errors.password}
                errorMessage={errors.password}
                endContent={
                  <button type="button" onClick={togglePasswordVisibility}>
                    {isPasswordVisible ? (
                      <EyeOff className="h-4 w-4 text-default-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-default-400" />
                    )}
                  </button>
                }
                type={isPasswordVisible ? "text" : "password"}
                classNames={{
                  input: "bg-background",
                  inputWrapper: "bg-default-100/50"
                }}
              />
              {mode === 'signup' && (
                <>
                  <Input
                    label="Confirm Password"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange('confirmPassword')}
                    isInvalid={!!errors.confirmPassword}
                    errorMessage={errors.confirmPassword}
                    endContent={
                      <button type="button" onClick={toggleConfirmPasswordVisibility}>
                        {isConfirmPasswordVisible ? (
                          <EyeOff className="h-4 w-4 text-default-400" />
                        ) : (
                          <Eye className="h-4 w-4 text-default-400" />
                        )}
                      </button>
                    }
                    type={isConfirmPasswordVisible ? "text" : "password"}
                    classNames={{
                      input: "bg-background",
                      inputWrapper: "bg-default-100/50"
                    }}
                  />
                  <div className="flex items-center gap-2">
                    <Checkbox
                      isSelected={formData.agreeToTerms}
                      onValueChange={(checked) => 
                        handleInputChange('agreeToTerms')({ target: { checked } } as any)
                      }
                      isInvalid={!!errors.agreeToTerms}
                    >
                      <span className="text-sm">
                        I agree to the{" "}
                        <a href="#" className="text-primary">Terms</a>
                        {" "}and{" "}
                        <a href="#" className="text-primary">Privacy Policy</a>
                      </span>
                    </Checkbox>
                  </div>
                </>
              )}
              
              <Button
                type="submit"
                color="primary"
                className="w-full"
                size="lg"
              >
                {mode === 'signin' ? 'Log In' : 'Sign Up'}
              </Button>

              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    OR
                  </span>
                </div>
              </div>

              <Button
                className="w-full bg-white text-black hover:bg-gray-100 mb-2"
                size="lg"
                startContent={
                  <svg className="h-4 w-4" viewBox="0 0 24 24">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                }
                onClick={() => signInWithGoogle()}
              >
                Continue with Google
              </Button>

              <Button
                className="w-full bg-[#24292F] text-white hover:bg-[#24292F]/90"
                size="lg"
                startContent={<Github className="h-4 w-4" />}
                onClick={() => signInWithGithub()}
              >
                Continue with Github
              </Button>

              <p className="text-center text-sm text-muted-foreground mt-4">
                {mode === 'signin' ? (
                  <>
                    Need to create an account?{" "}
                    <button
                      type="button"
                      className="text-primary hover:underline"
                      onClick={() => {
                        onClose();
                        setTimeout(() => {
                          const event = new CustomEvent('openAuthDialog', { detail: { mode: 'signup' } });
                          window.dispatchEvent(event);
                        }, 100);
                      }}
                    >
                      Sign Up
                    </button>
                  </>
                ) : (
                  <>
                    Already have an account?{" "}
                    <button
                      type="button"
                      className="text-primary hover:underline"
                      onClick={() => {
                        onClose();
                        setTimeout(() => {
                          const event = new CustomEvent('openAuthDialog', { detail: { mode: 'signin' } });
                          window.dispatchEvent(event);
                        }, 100);
                      }}
                    >
                      Log In
                    </button>
                  </>
                )}
              </p>
            </form>
          </ModalBody>
        )}
      </ModalContent>
    </Modal>
  );
};