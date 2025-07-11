import React from 'react';
import CanvasBackground from './components/CanvasBackground';
import InterestForm from './components/InterestForm';
import ProductImage from './components/ProductImage';
import './App.css';

function App() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Interactive Canvas Background */}
      <CanvasBackground />
      
      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Hero Section */}
        <div className="flex-1 flex items-center justify-center px-4 py-12">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              
              {/* Content Side */}
              <div className="text-center lg:text-left order-2 lg:order-1">
                <div className="mb-8">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                    The Future of 
                    <span className="block text-spidr-teal">Air Frying</span>
                  </h1>
                  
                  <div className="bg-spidr-teal/20 backdrop-blur-sm rounded-2xl p-6 lg:p-8 border border-spidr-teal/30">
                    <p className="text-white/90 text-lg lg:text-xl leading-relaxed">
                      <span className="font-semibold text-spidr-light-teal">Spidr Design</span> is revolutionizing 
                      kitchen technology with our groundbreaking air fryer. Experience precision cooking 
                      that delivers restaurant-quality results in your own home.
                    </p>
                  </div>
                </div>

                {/* Feature Highlights */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                    <div className="text-spidr-accent text-2xl mb-2">⚡</div>
                    <h3 className="font-semibold text-white mb-1">Smart Technology</h3>
                    <p className="text-white/70 text-sm">AI-powered cooking algorithms</p>
                  </div>
                  
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                    <div className="text-spidr-accent text-2xl mb-2">🔥</div>
                    <h3 className="font-semibold text-white mb-1">Perfect Results</h3>
                    <p className="text-white/70 text-sm">Consistent, crispy perfection</p>
                  </div>
                  
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                    <div className="text-spidr-accent text-2xl mb-2">🎨</div>
                    <h3 className="font-semibold text-white mb-1">Premium Design</h3>
                    <p className="text-white/70 text-sm">Elegant kitchen centerpiece</p>
                  </div>
                  
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                    <div className="text-spidr-accent text-2xl mb-2">💚</div>
                    <h3 className="font-semibold text-white mb-1">Eco-Friendly</h3>
                    <p className="text-white/70 text-sm">Energy-efficient cooking</p>
                  </div>
                </div>
              </div>

              {/* Product Image Side */}
              <div className="flex justify-center items-start order-1 lg:order-2">
                <div className="relative mt-24 lg:mt-24">
                  {/* Floating animation wrapper */}
                  <div className="animate-bounce-slow">
                    {/* Glow effect */}
                    <div className="absolute inset-0 bg-spidr-teal/30 blur-3xl rounded-full scale-110 animate-pulse"></div>
                    
                    {/* Product image container with solid background */}
                    <div className="relative z-10 bg-gradient-to-br from-spidr-gray/90 to-spidr-dark/90 backdrop-blur-sm rounded-3xl p-8 border border-white/20 shadow-2xl">
                      <ProductImage 
                        src="/assets/airfryer.png" 
                        alt="Spidr Air Fryer - Premium Cooking Technology" 
                        className="w-80 h-80 lg:w-96 lg:h-96 object-contain drop-shadow-2xl"
                      />
                    </div>
                  </div>
                  
                  {/* Decorative elements */}
                  <div className="absolute -top-4 -right-4 w-24 h-24 bg-spidr-accent/20 rounded-full blur-xl animate-pulse"></div>
                  <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-spidr-teal/20 rounded-full blur-xl animate-pulse delay-1000"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <div className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <InterestForm />
          </div>
        </div>

        {/* Footer */}
        <footer className="py-8 px-4 border-t border-white/10">
          <div className="max-w-7xl mx-auto text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="w-8 h-8 bg-spidr-teal rounded-lg flex items-center justify-center mr-3">
                <span className="text-white font-bold">S</span>
              </div>
              <span className="text-white text-xl font-semibold">Spidr Design</span>
            </div>
            <p className="text-white/60 text-sm">
              Revolutionizing kitchen technology, one appliance at a time.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
