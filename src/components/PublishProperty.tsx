import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useSubmitInquiry } from '../hooks/useApi';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import penthouseBg from '@/assets/penthouse-interior.jpg';
import { CheckCircle2 } from 'lucide-react';

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(8, "Valid phone number required"),
  propertyType: z.string().min(1, "Please select property type"),
  location: z.string().optional(),
  price: z.string().optional(),
  message: z.string().optional(),
});

export function PublishProperty() {
  const [isSuccess, setIsSuccess] = useState(false);
  const submitInquiry = useSubmitInquiry();
  const headingRef = useScrollAnimation<HTMLDivElement>({ type: 'fade-up' });
  const formRef = useScrollAnimation<HTMLDivElement>({ type: 'scale-in', staggerDelay: 0.2 });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      propertyType: "",
      location: "",
      price: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    submitInquiry.mutate(
      { data: values },
      {
        onSuccess: () => {
          setIsSuccess(true);
          form.reset();
        },
      }
    );
  }

  return (
    <section className="relative py-32 min-h-[900px] flex items-center" id="publish">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        {/* <img src={penthouseBg} alt="Luxury Property" className="w-full h-full object-cover" /> */}
        <div className="absolute inset-0 bg-[#F7F5F2]/60 backdrop-blur-[2px]"></div>
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          
          <div ref={headingRef} className="w-full lg:w-1/2 text-Bronze-900">
            <h2 className="text-5xl md:text-7xl font-heading font-bold mb-6 leading-tight">
              LIST YOUR LUXURY <br/>
              <span className="text-5xl md:text-7xl font-heading font-bold mb-6 leading-tight">PROPERTY WITH Bizluxe</span>
            </h2>
            <p className="text-Bronze-900 text-lg font-light leading-relaxed max-w-lg mb-10">
              Access our exclusive network of ultra-high-net-worth buyers globally. We ensure maximum discretion and unparalleled marketing for Dubai's finest homes.
            </p>
            <div className="space-y-6 text-Bronze-900">
              <div className="flex items-center gap-4">
                <div className="w-2 h-2 rounded-full bg-primary"></div>
                <span className="text-lg">Bespoke Marketing Campaigns</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-2 h-2 rounded-full bg-primary"></div>
                <span className="text-lg">Global HNWI Network Access</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-2 h-2 rounded-full bg-primary"></div>
                <span className="text-lg">White-glove Concierge Service</span>
              </div>
            </div>
          </div>

          <div ref={formRef} className="w-full lg:w-1/2">
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-[40px] md:rounded-[60px] p-8 md:p-12 shadow-2xl">
              
              {isSuccess ? (
                <div className="flex flex-col items-center justify-center text-center py-16 text-Bronze-900">
                  <CheckCircle2 className="w-20 h-20 text-primary mb-6" />
                  <h3 className="text-3xl font-heading font-bold mb-4">Inquiry Received</h3>
                  <p className="text-Bronze-900/80 text-lg">
                    A senior partner will contact you shortly to discuss your property in complete confidence.
                  </p>
                  <Button 
                    variant="outline" 
                    className="mt-8 border-white/30 text-black bg-white hover:bg-white/90 rounded-full px-8"
                    onClick={() => setIsSuccess(false)}
                  >
                    Submit Another
                  </Button>
                </div>
              ) : (
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <h3 className="text-2xl font-heading font-bold text-Bronze-900 mb-8">Request an Appraisal</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input placeholder="Full Name" className="bg-white/5 border-white/20 text-Bronze-900 placeholder:text-Bronze-900/50 h-14 rounded-2xl px-6 focus-visible:ring-primary" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input placeholder="Phone Number" className="bg-white/5 border-white/20 text-Bronze-900 placeholder:text-Bronze-900/50 h-14 rounded-2xl px-6 focus-visible:ring-primary" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input placeholder="Email Address" className="bg-white/5 border-white/20 text-Bronze-900 placeholder:text-Bronze-900/50 h-14 rounded-2xl px-6 focus-visible:ring-primary" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="propertyType"
                        render={({ field }) => (
                          <FormItem>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="bg-white/5 border-white/20 text-Bronze-900 h-14 rounded-2xl px-6 focus:ring-primary">
                                  <SelectValue placeholder="Property Type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className="bg-[#1F1F1F] border-white/10 text-Bronze-900 rounded-2xl">
                                <SelectItem value="mansion">Mansion</SelectItem>
                                <SelectItem value="villa">Luxury Villa</SelectItem>
                                <SelectItem value="penthouse">Penthouse</SelectItem>
                                <SelectItem value="apartment">Apartment</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="location"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input placeholder="Community / Area" className="bg-white/5 border-white/20 text-Bronze-900 placeholder:text-Bronze-900/50 h-14 rounded-2xl px-6 focus-visible:ring-primary" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Textarea 
                              placeholder="Additional details about your property..." 
                              className="bg-white/5 border-white/20 text-Bronze-900 placeholder:text-Bronze-900/50 min-h-[120px] rounded-2xl px-6 py-4 focus-visible:ring-primary resize-none" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button 
                      type="submit" 
                      disabled={submitInquiry.isPending}
                      className="w-full h-16 rounded-full bg-primary hover:bg-[#A87235] text-white text-lg font-bold transition-all shadow-lg hover:shadow-primary/25"
                    >
                      {submitInquiry.isPending ? "Submitting..." : "Submit Inquiry"}
                    </Button>
                  </form>
                </Form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
