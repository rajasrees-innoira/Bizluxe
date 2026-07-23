import React, { useState } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { Button } from './ui/button';
import { useBookConsultation } from '../hooks/useApi';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Input } from './ui/input';
import ctaBg from '@/assets/cta-banner-2.jpg';

export function CTABanner() {
  const textRef = useScrollAnimation<HTMLDivElement>({ type: 'scale-in' });
  const [isOpen, setIsOpen] = useState(false);
  const bookConsultation = useBookConsultation();
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    bookConsultation.mutate(
      { 
        data: {
          name: formData.get('name') as string,
          email: formData.get('email') as string,
          phone: formData.get('phone') as string,
        }
      },
      {
        onSuccess: () => setIsSuccess(true)
      }
    );
  };

  return (
    <>
      <section className="relative h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden" id="consultation">
        <div className="absolute inset-0 z-0">
          <img 
            src={ctaBg} 
            alt="Luxury Sunset" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1F1F1F] via-[#1F1F1F]/40 to-[#1F1F1F]/20"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center flex flex-col items-center">
          <div ref={textRef}>
<h2 className="text-4xl sm:text-5xl md:text-8xl lg:text-[8rem] font-heading font-extrabold uppercase leading-[0.9] tracking-tighter flex flex-col items-center text-center">              <span className="text-white">FIND YOUR</span>
              <span className="text-primary mt-2 md:mt-4 color-[#000000]">EXTRAORDINARY</span>
              <span className="text-white mt-2 md:mt-4">ADDRESS</span>
            </h2>
            
            <p className="mt-8 text-white/80 text-xl font-light max-w-2xl mx-auto">
              Schedule a private consultation with our senior advisory team to explore Dubai's most exclusive real estate.
            </p>

            <Button 
              className="mt-12 bg-white/10 backdrop-blur-md border border-white/30 text-white hover:bg-white hover:text-[#1F1F1F] rounded-full px-10 py-8 text-xl font-medium transition-all duration-500 hover:scale-105"
              onClick={() => setIsOpen(true)}
            >
              Book Private Viewing
            </Button>
          </div>
        </div>
      </section>

      <Dialog open={isOpen} onOpenChange={(open) => {
        setIsOpen(open);
        if(!open) setTimeout(() => setIsSuccess(false), 300);
      }}>
        <DialogContent className="sm:max-w-[600px] bg-[#F7F5F2] border-none p-10 rounded-[40px] shadow-lg">
          <DialogHeader>
            <DialogTitle className="text-3xl font-heading font-bold text-[#1F1F1F] text-center">
              Private Consultation
            </DialogTitle>
            <DialogDescription className="text-center text-[#5F5F5F]">
              Enter your details and our team will contact you.
            </DialogDescription>
          </DialogHeader>

          {isSuccess ? (
            <div className="py-8 text-center">
              <p className="text-primary text-xl font-medium mb-4">Request Confirmed</p>
              <p className="text-[#5F5F5F]">We will be in touch shortly to schedule your viewing.</p>
              <Button 
                className="mt-20 w-full rounded-full bg-[#1F1F1F] text-white py-10"
                onClick={() => setIsOpen(false)}
              >
                Close
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <Input 
                name="name" 
                placeholder="Full Name" 
                required 
                className="h-14 rounded-2xl bg-white border-[#D8D8D8] focus-visible:ring-primary"
              />
              <Input 
                name="email" 
                type="email" 
                placeholder="Email Address" 
                required 
                className="h-14 rounded-2xl bg-white border-[#D8D8D8] focus-visible:ring-primary"
              />
              <Input 
                name="phone" 
                type="tel" 
                placeholder="Phone Number" 
                required 
                className="h-14 rounded-2xl bg-white border-[#D8D8D8] focus-visible:ring-primary"
              />
              <Button 
                type="submit" 
                disabled={bookConsultation.isPending}
                className="w-full h-14 mt-4 rounded-full bg-primary hover:bg-[#A87235] text-white text-lg font-bold shadow-lg"
              >
                {bookConsultation.isPending ? "Submitting..." : "Confirm Request"}
              </Button>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
