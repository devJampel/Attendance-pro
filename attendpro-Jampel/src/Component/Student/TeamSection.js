import React from 'react';
import dema from '../image/dema.png';
import pemayeshi from '../image/pemayeshi.png';

const teamMembers = [
  {
    id: 1,
    name: 'Chencho Dema',
    image: dema,
    email: '12210045.gcit@rub.edu.bt'
  },
  {
    id: 2,
    name: 'Pema Yeshey Tshering',
    image: pemayeshi,
    email: '12210075.gcit@rub.edu.bt'
  },
  {
    id: 3,
    name: 'Sonam Tshering',
    image: dema,
    email: '12210024.gcit@rub.edu.bt'
  },
  {
    id: 4,
    name: 'Jampel Dorji',
    image: pemayeshi,
    email: '12210003.gcit@rub.edu.bt'
  }
];

export default function TeamSection() {
  return (
    <div className="container mx-auto mt-16">
      <h2 className="text-center text-4xl font-bold mb-10">Meet Our Team</h2>
      <div className="flex flex-wrap justify-center">
        {teamMembers.map(member => (
          <div key={member.id} className="max-w-xs mx-4 mb-8">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <img src={member.image} alt={member.name} className="w-full" />
              <div className="p-4">
                <h3 className="text-lg font-medium">{member.name}</h3>
                <p className="text-sm text-gray-600">
                  <a href={`mailto:${member.email}`} className="text-blue-500 hover:underline">
                    {member.email}
                  </a>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
