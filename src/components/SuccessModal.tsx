import React from 'react';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  formData?: {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    costGuess: string;
    spidrPin: string;
  };
}

const SuccessModal: React.FC<SuccessModalProps> = ({ isOpen, onClose, formData }) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4">
        {/* Modal */}
        <div className="bg-spidr-gray/95 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-spidr-teal/40 max-w-md w-full mx-auto transform transition-all duration-300 scale-100">
          {/* Success Icon */}
          <div className="text-center mb-6">
            <div className="mx-auto w-16 h-16 bg-spidr-teal rounded-full flex items-center justify-center mb-4 shadow-lg">
              <svg 
                className="w-8 h-8 text-white" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M5 13l4 4L19 7" 
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">
              Interest Submitted Successfully!
            </h2>
            <p className="text-spidr-light-teal">
              Thank you for your interest in the Spidr Air Fryer
            </p>
          </div>

          {/* Form Data Summary */}
          {formData && (
            <div className="bg-spidr-dark/60 rounded-xl p-4 mb-6 border border-spidr-teal/20">
              <h3 className="text-sm font-semibold text-white mb-3 opacity-75">
                Submission Details:
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-white/70">Name:</span>
                  <span className="text-white">{formData.firstName} {formData.lastName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Phone:</span>
                  <span className="text-white">{formData.phoneNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Email:</span>
                  <span className="text-white">{formData.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Cost Guess:</span>
                  <span className="text-spidr-accent font-semibold">${formData.costGuess}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">PIN:</span>
                  <span className="text-white font-mono">{formData.spidrPin}</span>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 bg-gradient-to-r from-spidr-teal to-spidr-accent hover:from-spidr-light-teal hover:to-spidr-teal text-white font-semibold py-3 px-6 rounded-lg transform transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-spidr-teal/50 shadow-lg"
            >
              Awesome!
            </button>
            <button
              onClick={() => {
                if (formData) {
                  console.log('Form Submission Data:', {
                    ...formData,
                    costGuess: `${formData.costGuess}`
                  });
                }
                onClose();
              }}
              className="bg-spidr-dark/80 hover:bg-spidr-dark text-white font-medium py-3 px-6 rounded-lg border border-spidr-teal/30 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-spidr-teal/50 shadow-lg"
            >
              View Console
            </button>
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors duration-200 hover:bg-white/10 rounded-full p-1"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
};

export default SuccessModal;
