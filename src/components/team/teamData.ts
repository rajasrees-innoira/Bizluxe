import team1 from '@/assets/team/team_2_1.png';
import team2 from '@/assets/team/team_2_2.png';
import team3 from '@/assets/team/team_2_3.png';
import team4 from '@/assets/team/team_2_4.png';
import team5 from '@/assets/team/team_2_5.png';
import team6 from '@/assets/team/team_2_6.png';
import team7 from '@/assets/team/team_2_7.png';
import team8 from '@/assets/team/team_2_8.png';
export interface TeamMember {
  id: number;
  name: string;
  role: string;
  bio: string;
  href: string;
  /**
   * PLACEHOLDER - drop the person's photo file into src/assets/team/ and
   * update this import path. Until then, an elegant monogram placeholder
   * renders instead (see TeamMemberCard.tsx).
   *
   * Example once you have real photos:
   *   import vickiePhoto from '@/assets/team/vickie-wisozk.jpg';
   *   ... image: vickiePhoto
   *
   * Until an image is set, TeamSection.tsx renders a monogram placeholder.
   */
  image?: string;
}

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 1,
    name: 'Vickie Wisozk',
    role: 'Real Estate Manager',
    bio: 'Oversees BizLuxe\'s senior advisory desk, matching discerning clients with Dubai\'s most exceptional addresses.',
    href: '#',
    image: team1,
  },
  {
    id: 2,
    name: 'Renee Strosin',
    role: 'Property Developer',
    bio: 'Shapes new luxury developments from concept to completion, with an eye for architecture that lasts generations.',
    href: '#',
    image: team2,
  },
  {
    id: 3,
    name: 'Zulia Era',
    role: 'Listing Coordinator',
    bio: 'Curates and manages our portfolio of off-market and signature listings with meticulous attention to detail.',
    href: '#',
    image: team3,
  },
  {
    id: 4,
    name: 'Bernice Roberts',
    role: 'Leasing Consultant',
    bio: 'Guides tenants and landlords through seamless, white-glove leasing experiences across Dubai\'s finest communities.',
    href: '#',
    image: team4,
  },
  {
    id: 5,
    name: 'Martha Leffler',
    role: 'Real Estate Manager',
    bio: 'Brings over a decade of ultra-luxury market expertise to every client relationship she leads.',
    href: '#',
    image: team5,
  },
  {
    id: 6,
    name: 'Thomas Kirlin',
    role: 'Listing Coordinator',
    bio: 'Ensures every property in our collection is presented with the precision and polish it deserves.',
    href: '#',
    image: team6,
  },
  {
    id: 7,
    name: 'Maliha Nancy',
    role: 'Property Developer',
    bio: 'Partners with landowners and architects to bring visionary residential concepts to life.',
    href: '#',
    image: team7,
  },
  {
    id: 8,
    name: 'Annie Murazik',
    role: 'Leasing Consultant',
    bio: 'Specialises in high-net-worth leasing, delivering discretion and speed at every stage.',
    href: '#',
    image: team8,
  },
];