import React from 'react';
import { dm_sans, inter } from '@/app/fonts';
import naicsCodes from '@/data/naics-codes.json';

export default function GovernmentServicesView() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h2 className={`${dm_sans.className} text-4xl font-bold text-navy text-center mb-8`}>
          Proven Partner
        </h2>
        <div className={`${inter.className} text-navy space-y-4`}>
          <p className="text-lg">
            Veterans Alliance Partners has been a reliable partner for government agencies, schools, hospitals, and other institutions purchasing through bids.
          </p>
          <p className="text-lg">
            Our strong purchasing power and affiliations within industry groups allow us to offer highly competitive pricing. Additionally, our extensive manufacturer connections help us source the precise equipment needed for your specific requirements. If you are a governmental agency and would like to use GSA contract pricing, please reach out to: https://vetalliancepartners.com/
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12 max-w-6xl mx-auto">
        <div className="border-2 border-navy rounded-lg p-6 bg-light">
          <p className={`${inter.className} font-bold text-navy mb-2`}>GSA Contract:</p>
          <p className={`${inter.className} text-navy`}>TBD</p>
        </div>
        <div className="border-2 border-navy rounded-lg p-6 bg-light">
          <p className={`${inter.className} font-bold text-navy mb-2`}>DUNS:</p>
          <p className={`${inter.className} text-navy`}>08082083</p>
        </div>
        <div className="border-2 border-navy rounded-lg p-6 bg-light">
          <p className={`${inter.className} font-bold text-navy mb-2`}>Unique Entity Identification:</p>
          <p className={`${inter.className} text-navy`}>K4DKGKLLUYB3</p>
        </div>
        <div className="border-2 border-navy rounded-lg p-6 bg-light">
          <p className={`${inter.className} font-bold text-navy mb-2`}>Cage Code:</p>
          <p className={`${inter.className} text-navy`}>7XHC9</p>
        </div>
      </div>
      {/* NAICS Codes Section */}
      <div className="mt-12 max-w-6xl mx-auto">
        <h3 className={`${dm_sans.className} text-2xl font-bold text-navy text-center mb-8`}>
          NAICS Codes
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {naicsCodes.map((code, index) => (
            <div key={index} className="p-6">
              <p className={`${inter.className} font-bold text-navy mb-2`}>Code {code.naicsCode}:</p>
              <p className={`${inter.className} text-navy`}>{code.naicsItem}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 