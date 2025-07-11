import React, { useState } from 'react';

interface FormData {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  costGuess: string;
  spidrPin: string;
}

const InterestForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    costGuess: '',
    spidrPin: '',
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});

  const formatPhoneNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{0,3})(\d{0,3})(\d{0,4})$/);
    if (match) {
      return !match[2] ? match[1] : `(${match[1]}) ${match[2]}${match[3] ? `-${match[3]}` : ''}`;
    }
    return value;
  };

  const formatSpidrPin = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    const formatted = cleaned.replace(/(\d{4})(?=\d)/g, '$1-');
    return formatted.substring(0, 19); // 16 digits + 3 dashes = 19 characters max
  };

  const formatCurrency = (value: string) => {
    const cleaned = value.replace(/[^0-9.]/g, '');
    const parts = cleaned.split('.');
    if (parts.length > 2) {
      return parts[0] + '.' + parts[1];
    }
    if (parts[1] && parts[1].length > 2) {
      return parts[0] + '.' + parts[1].substring(0, 2);
    }
    return cleaned;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let formattedValue = value;

    switch (name) {
      case 'phoneNumber':
        formattedValue = formatPhoneNumber(value);
        break;
      case 'spidrPin':
        formattedValue = formatSpidrPin(value);
        break;
      case 'costGuess':
        formattedValue = formatCurrency(value);
        break;
    }

    setFormData(prev => ({
      ...prev,
      [name]: formattedValue
    }));

    // Clear error when user starts typing
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    const phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/;
    if (!formData.phoneNumber || !phoneRegex.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Please enter a valid phone number';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.costGuess || parseFloat(formData.costGuess) <= 0) {
      newErrors.costGuess = 'Please enter a valid cost guess';
    }

    const pinRegex = /^\d{4}-\d{4}-\d{4}-\d{4}$/;
    if (!formData.spidrPin || !pinRegex.test(formData.spidrPin)) {
      newErrors.spidrPin = 'PIN must be 16 digits in format ####-####-####-####';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      console.log('Form Submission Data:', {
        ...formData,
        costGuess: `$${formData.costGuess}`
      });
      
      // Show success message (in a real app, this would be a toast or modal)
      alert('Interest form submitted successfully! Check the console for details.');
      
      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
        costGuess: '',
        spidrPin: '',
      });
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-white/20">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">
          Express Your Interest
        </h2>
        <p className="text-spidr-light-teal text-lg">
          Be the first to experience the future of cooking
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-white mb-2">
              First Name *
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 bg-white/10 border ${
                errors.firstName ? 'border-red-400' : 'border-white/30'
              } rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-spidr-teal focus:border-transparent transition-all duration-200`}
              placeholder="Enter your first name"
            />
            {errors.firstName && (
              <p className="mt-1 text-sm text-red-400">{errors.firstName}</p>
            )}
          </div>

          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-white mb-2">
              Last Name *
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 bg-white/10 border ${
                errors.lastName ? 'border-red-400' : 'border-white/30'
              } rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-spidr-teal focus:border-transparent transition-all duration-200`}
              placeholder="Enter your last name"
            />
            {errors.lastName && (
              <p className="mt-1 text-sm text-red-400">{errors.lastName}</p>
            )}
          </div>
        </div>

        {/* Contact Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="phoneNumber" className="block text-sm font-medium text-white mb-2">
              Phone Number *
            </label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 bg-white/10 border ${
                errors.phoneNumber ? 'border-red-400' : 'border-white/30'
              } rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-spidr-teal focus:border-transparent transition-all duration-200`}
              placeholder="(555) 123-4567"
            />
            {errors.phoneNumber && (
              <p className="mt-1 text-sm text-red-400">{errors.phoneNumber}</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 bg-white/10 border ${
                errors.email ? 'border-red-400' : 'border-white/30'
              } rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-spidr-teal focus:border-transparent transition-all duration-200`}
              placeholder="your.email@example.com"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-400">{errors.email}</p>
            )}
          </div>
        </div>

        {/* Special Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="costGuess" className="block text-sm font-medium text-white mb-2">
              Guess the Air Fryer's Cost *
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60">$</span>
              <input
                type="text"
                id="costGuess"
                name="costGuess"
                value={formData.costGuess}
                onChange={handleInputChange}
                className={`w-full pl-8 pr-4 py-3 bg-white/10 border ${
                  errors.costGuess ? 'border-red-400' : 'border-white/30'
                } rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-spidr-teal focus:border-transparent transition-all duration-200`}
                placeholder="199.99"
              />
            </div>
            {errors.costGuess && (
              <p className="mt-1 text-sm text-red-400">{errors.costGuess}</p>
            )}
          </div>

          <div>
            <label htmlFor="spidrPin" className="block text-sm font-medium text-white mb-2">
              Secret 16-digit Spidr PIN *
            </label>
            <input
              type="text"
              id="spidrPin"
              name="spidrPin"
              value={formData.spidrPin}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 bg-white/10 border ${
                errors.spidrPin ? 'border-red-400' : 'border-white/30'
              } rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-spidr-teal focus:border-transparent transition-all duration-200 font-mono`}
              placeholder="1234-5678-9012-3456"
              maxLength={19}
            />
            {errors.spidrPin && (
              <p className="mt-1 text-sm text-red-400">{errors.spidrPin}</p>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-6">
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-spidr-teal to-spidr-accent hover:from-spidr-light-teal hover:to-spidr-teal text-white font-semibold py-4 px-8 rounded-lg transform transition-all duration-200 hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-spidr-teal/50"
          >
            Submit Interest Form
          </button>
        </div>
      </form>
    </div>
  );
};

export default InterestForm;
