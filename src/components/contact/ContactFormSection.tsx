import React, { useLayoutEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'framer-motion';
import { CheckCircle2, Mail, MapPin, Phone, ArrowRight } from 'lucide-react';
import { useSubmitInquiry } from '../../hooks/useApi';
import { useGsap } from '../../hooks/useGsap';
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

const formSchema = z.object({
  name: z.string().min(2, 'Please enter your full name'),
  email: z.string().email('Enter a valid email address'),
  phone: z.string().min(8, 'Enter a valid phone number'),
  reason: z.string().min(1, 'Please select a reason'),
  message: z.string().min(10, 'Tell us a little more (min. 10 characters)'),
});

type ContactFormValues = z.infer<typeof formSchema>;


const CONTACT_DETAILS = [
  {
    icon: Phone,
    label: 'Call Us',
    value: '+971 58 108 3300',
    href: 'tel:+971 58 108 3300',
  },
   {
      icon: Mail,
      label: 'Email Us',
      value: 'inquiries@bizluxeproperties.ae',
      href: 'mailto:inquiries@bizluxeproperties.ae',
    },
  {
    icon: MapPin,
    label: 'Visit Us',
    value: '1301 Aspin Commercial Tower, Shaikh Zayed Road , Dubai',
    href: 'https://maps.google.com/maps?vet=10CAAQoqAOahcKEwiIiK292OWVAxUAAAAAHQAAAAAQDA..i&pvq=Cg0vZy8xMXhyeV9kOGZxIgoKBDEzMDEQAhgD&lqi=CjYxMzAxIEFzcGluIENvbW1lcmNpYWwgVG93ZXIsIFNoYWlraCBaYXllZCBSb2FkICwgRHViYWlItsPY39-8gIAIWkcQABgAGAEYAhgDGAQYBRgGGAciMzEzMDEgYXNwaW4gY29tbWVyY2lhbCB0b3dlciBzaGFpa2ggemF5ZWQgcm9hZCBkdWJhaZIBHWNvbW1lcmNpYWxfcmVhbF9lc3RhdGVfYWdlbmN5&fvr=1&cs=0&um=1&ie=UTF-8&fb=1&gl=in&sa=X&ftid=0x3e5f43531eb93d77:0x7f1e207e2c49b657',
    
  },
];


/** Magnetic wrapper - button drifts slightly toward the cursor on hover. */
function MagneticButton({ children, ...props }: React.ComponentProps<typeof Button>) {
  const ref = useRef<HTMLButtonElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left - rect.width / 2) * 0.25;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.35;
    setPos({ x, y });
  };

  return (
    <motion.div
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: 'spring', stiffness: 200, damping: 14, mass: 0.4 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setPos({ x: 0, y: 0 })}
      className="inline-block"
    >
      <Button ref={ref} {...props}>
        {children}
      </Button>
    </motion.div>
  );
}

export function ContactFormSection() {
  const { gsap } = useGsap();
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const [isSuccess, setIsSuccess] = useState(false);
  const submitInquiry = useSubmitInquiry();

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: { name: '', email: '', phone: '', reason: '', message: '' },
  });

  useLayoutEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        leftRef.current,
        { autoAlpha: 0, y: 50 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', end: 'top 40%', scrub: 1 },
        },
      );

      gsap.fromTo(
        Array.from(cardsRef.current?.children ?? []),
        { autoAlpha: 0, y: 30 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: { trigger: cardsRef.current, start: 'top 85%', end: 'top 55%', scrub: 1 },
        },
      );

      gsap.fromTo(
        formRef.current,
        { autoAlpha: 0, y: 60, scale: 0.98 },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: { trigger: formRef.current, start: 'top 85%', end: 'top 45%', scrub: 1 },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function onSubmit(values: ContactFormValues) {
    submitInquiry.mutate(
      { data: values },
      {
        onSuccess: () => {
          setIsSuccess(true);
          form.reset();
        },
      },
    );
  }

  return (
    <section ref={sectionRef} className="relative py-24 md:py-32 bg-[#F7F5F2] overflow-hidden" id="contact-form">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-12 items-start">
          {/* Left - storytelling copy + contact details */}
          <div>
            <div ref={leftRef}>
              <p className="text-primary font-medium tracking-[0.3em] uppercase mb-4 text-sm">Get In Touch</p>
              <h2 className="text-4xl md:text-6xl font-heading font-bold text-[#1F1F1F] leading-[1.05] mb-6">
                A Conversation
                <br />
                <span className="text-primary italic font-medium">Worth Having</span>
              </h2>
              <p className="text-[#5F5F5F] text-lg font-light leading-relaxed max-w-md">
                Every extraordinary address starts with a conversation. Share a few details
                and one of our senior advisors will personally curate a shortlist built
                around exactly what you're looking for.
              </p>
            </div>

            <div ref={cardsRef} className="mt-12 space-y-4">
              {CONTACT_DETAILS.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    target={item.href.startsWith('http') ? '_blank' : undefined}
                    rel="noreferrer"
                    className="group flex items-center gap-5 bg-white border border-[#D8D8D8]/60 rounded-3xl p-5 md:p-6 hover:border-primary/50 hover:-translate-y-1 transition-all duration-300 shadow-sm hover:shadow-warm"
                  >
                    <div className="w-12 h-12 rounded-full bg-[#F7F5F2] flex items-center justify-center shrink-0 group-hover:bg-primary transition-colors duration-300">
                      <Icon className="w-5 h-5 text-primary group-hover:text-white transition-colors duration-300" strokeWidth={1.5} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[#5F5F5F] text-xs uppercase tracking-wider mb-1">{item.label}</p>
                      <p className="text-[#1F1F1F] font-semibold truncate">{item.value}</p>
                    </div>
                    <ArrowRight
                      size={18}
                      className="ml-auto text-[#5F5F5F] shrink-0 group-hover:text-primary group-hover:translate-x-1 transition-all duration-300"
                    />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Right - glass form */}
          <div ref={formRef} className="w-full">
            <div className="bg-white/70 backdrop-blur-2xl border border-white/60 rounded-[36px] md:rounded-[48px] p-8 md:p-12 shadow-[0_40px_100px_-30px_rgba(31,31,31,0.25)] relative overflow-hidden">
              <div
                className="pointer-events-none absolute -top-24 -right-24 w-72 h-72 rounded-full opacity-30 blur-3xl"
                style={{ background: 'radial-gradient(circle, hsl(29 53% 36% / 0.5), transparent 70%)' }}
              />

              {isSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="relative flex flex-col items-center justify-center text-center py-16"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.15, type: 'spring', stiffness: 200, damping: 12 }}
                  >
                    <CheckCircle2 className="w-20 h-20 text-primary mb-6" />
                  </motion.div>
                  <h3 className="text-3xl font-heading font-bold text-[#1F1F1F] mb-4">Message Received</h3>
                  <p className="text-[#5F5F5F] text-lg max-w-sm">
                    Thank you - a senior advisor will be in touch with you shortly, in complete confidence.
                  </p>
                  <Button
                    variant="outline"
                    className="mt-10 rounded-full px-8 border-[#D8D8D8]"
                    onClick={() => setIsSuccess(false)}
                  >
                    Send Another Message
                  </Button>
                </motion.div>
              ) : (
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="relative space-y-5">
                    <h3 className="text-2xl font-heading font-bold text-[#1F1F1F] mb-2">Send a Private Inquiry</h3>
                    <p className="text-[#5F5F5F] mb-6">We typically respond within 60 minutes.</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                placeholder="Full Name"
                                className="h-14 rounded-2xl bg-white border-[#D8D8D8] focus-visible:ring-primary"
                                {...field}
                              />
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
                              <Input
                                placeholder="Phone Number"
                                className="h-14 rounded-2xl bg-white border-[#D8D8D8] focus-visible:ring-primary"
                                {...field}
                              />
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
                            <Input
                              placeholder="Email Address"
                              className="h-14 rounded-2xl bg-white border-[#D8D8D8] focus-visible:ring-primary"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="reason"
                      render={({ field }) => (
                        <FormItem>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="h-14 rounded-2xl bg-white border-[#D8D8D8] focus:ring-primary">
                                <SelectValue placeholder="Reason for Inquiry" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="rounded-2xl">
                              <SelectItem value="buy">Buying a Property</SelectItem>
                              <SelectItem value="sell">Selling / Listing a Property</SelectItem>
                              <SelectItem value="invest">Investment Advisory</SelectItem>
                              <SelectItem value="management">Property Management</SelectItem>
                              <SelectItem value="other">Something Else</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Textarea
                              placeholder="Tell us what you're looking for..."
                              className="min-h-[120px] rounded-2xl bg-white border-[#D8D8D8] px-6 py-4 focus-visible:ring-primary resize-none"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <MagneticButton
                      type="submit"
                      disabled={submitInquiry.isPending}
                      className="w-full h-16 rounded-full bg-primary hover:bg-[#A87235] text-white text-lg font-bold shadow-lg group"
                    >
                      {submitInquiry.isPending ? (
                        'Sending...'
                      ) : (
                        <span className="inline-flex items-center gap-2">
                          Send Message
                          <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
                        </span>
                      )}
                    </MagneticButton>
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