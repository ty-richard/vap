import React from 'react';
import { dm_sans } from '@/app/fonts';
import Image from 'next/image';
import teamMembers from '@/data/team-members.json';

export default function CompanyHistoryView() {
  return (
    <div className="w-full">
      {/* Hero Image or Video */}
      <div className="relative w-full h-[400px]">
        <Image
          src="/static/images/stock_wholesale.jpg"
          alt="Company History"
          fill
          className="object-cover"
          priority
        />
      </div>
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h2 className={`${dm_sans.className} text-4xl font-bold text-navy text-center mb-12`}>
          Our Team
        </h2>
        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <div key={index} className="text-center">
              <div className="relative w-full aspect-square mb-4">
                <Image
                  src={member.imageUrl}
                  alt={member.name}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
              <h3 className={`${dm_sans.className} text-xl font-semibold text-navy mb-2`}>
                {member.name}
              </h3>
              <p className="text-gray-600 font-medium mb-2">{member.role}</p>
              <p className="text-gray-500 text-sm">{member.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 