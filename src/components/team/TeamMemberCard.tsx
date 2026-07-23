import React from 'react';
import { Linkedin, ArrowUpRight } from 'lucide-react';
import type { TeamMember } from './teamData';

interface Props {
  member: TeamMember;
  reversed: boolean; // controls image-left/text-right vs image-right/text-left
}

function getInitials(name: string) {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

export function TeamMemberCard({ member, reversed }: Props) {
  return (
    <div
      className={`team-card flex flex-col ${
        reversed ? 'md:flex-row-reverse' : 'md:flex-row'
      } items-center gap-8 md:gap-14 lg:gap-20`}
      style={{ willChange: 'transform, opacity' }}
    >
    

      {/* ---- Content ---- */}
      <div className={`w-full md:w-[58%] ${reversed ? 'md:text-right' : 'md:text-left'} text-center md:text-left`}>
        <p className="text-primary font-semibold tracking-[0.25em] uppercase text-xs md:text-sm mb-3">
          {member.role}
        </p>
        <h3 className="text-3xl md:text-5xl font-heading font-bold text-[#1F1F1F] mb-5 leading-tight">
          {member.name}
        </h3>
        <p
          className={`text-[#5F5F5F] font-light leading-relaxed max-w-md mb-7 ${
            reversed ? 'md:ml-auto' : ''
          } mx-auto md:mx-0`}
        >
          {member.bio}
        </p>

        <a
          href={member.href}
          className={`group inline-flex items-center gap-2 text-[#1F1F1F] hover:text-primary font-semibold text-sm transition-colors duration-300 ${
            reversed ? 'md:flex-row-reverse' : ''
          }`}
        >
          <span className="w-12 h-12 rounded-full bg-[#F7F5F2] flex items-center justify-center group-hover:bg-primary transition-colors duration-300">
            <Linkedin size={18} className="text-[#1F1F1F] group-hover:text-white transition-colors duration-300" />
          </span>
          View Profile
          <ArrowUpRight
            size={15}
            className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
          />
        </a>
      </div>
    </div>
  );
}