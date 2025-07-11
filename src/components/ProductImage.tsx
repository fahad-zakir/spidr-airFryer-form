import React, { useState } from 'react';

interface ProductImageProps {
  src?: string;
  alt: string;
  className?: string;
}

const ProductImage: React.FC<ProductImageProps> = ({ 
  src, 
  alt, 
  className = "w-80 h-80 lg:w-96 lg:h-96 object-contain drop-shadow-2xl" 
}) => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  if (imageError || !src) {
    return (
      <div className={`${className} flex items-center justify-center bg-gradient-to-br from-emerald-200 to-emerald-400 rounded-3xl border-4 border-rose-gold`}>
        <div className="text-center p-8">
          {/* Air Fryer Icon Placeholder */}
          <div className="relative mb-4">
            {/* Main body */}
            <div className="w-32 h-40 bg-emerald-300 rounded-t-3xl rounded-b-xl mx-auto relative shadow-inner">
              {/* Handle */}
              <div className="absolute -left-4 top-1/2 w-8 h-6 bg-rose-gold rounded-l-full shadow-md"></div>
              
              {/* Control panel */}
              <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-16 h-8 bg-white/30 rounded-lg">
                <div className="w-6 h-6 bg-rose-gold rounded-full mx-auto mt-1"></div>
              </div>
              
              {/* Basket handle */}
              <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-20 h-4 bg-gray-600 rounded-full"></div>
              
              {/* Base */}
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-36 h-6 bg-emerald-400 rounded-full shadow-lg"></div>
            </div>
          </div>
          
          <h3 className="text-2xl font-bold text-gray-700 mb-2">
            Spidr Air Fryer
          </h3>
          <p className="text-gray-600 text-sm">
            Premium Design • Smart Technology
          </p>
        </div>
      </div>
    );
  }

  return (
    <img 
      src={src} 
      alt={alt} 
      className={className}
      onError={handleImageError}
    />
  );
};

export default ProductImage;
