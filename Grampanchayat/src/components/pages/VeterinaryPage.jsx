// import PageHero from '../PageHero';
// import infoImage from '../../images/back.jpg';
// import gavImage from '../../images/back.jpg';

// const VeterinaryPage = () => {
//   const veterinaryCenters = [
//     {
//       id: 1,
//       name: 'पशुवैद्यकीय दवाखाना 1',
//       description: 'गावातील मुख्य पशुवैद्यकीय केंद्र जिथे पशुधनासाठी सर्व प्रकारच्या वैद्यकीय सेवा उपलब्ध आहेत.',
//       services: ['पशु उपचार', 'टीकाकरण', 'पशु आरोग्य तपासणी', 'सल्ला'],
//       contact: '+91 8292939470',
//       location: 'वडाळीभोई'
//     },
//     {
//       id: 2,
//       name: 'पशुवैद्यकीय दवाखाना 2',
//       description: 'गावातील दुसरे पशुवैद्यकीय केंद्र जिथे पशुधनाच्या आरोग्यासाठी सेवा दिल्या जातात.',
//       services: ['पशु उपचार', 'आरोग्य सल्ला', 'दवाखाना'],
//       contact: '+91 8292939470',
//       location: 'वडाळीभोई'
//     }
//   ];

//   return (
//     <div>
//       <PageHero 
//         title="पशुवैद्यकीय दवाखाने" 
//         subtitle="माहिती"
//         image={gavImage}
//       />
//       <section className="py-16 bg-white">
//       <div className="container mx-auto px-4">
//         <div className="max-w-7xl mx-auto">
//           <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-teal-800">
//             पशुवैद्यकीय दवाखाने
//           </h2>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//             {veterinaryCenters.map((center) => (
//               <div
//                 key={center.id}
//                 className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow duration-300"
//               >
//                 <div className="p-6">
//                   <h3 className="text-2xl font-bold text-teal-800 mb-3">
//                     {center.name}
//                   </h3>
//                   <p className="text-gray-700 mb-4 leading-relaxed">
//                     {center.description}
//                   </p>
                  
//                   <div className="mb-4">
//                     <h4 className="font-semibold text-gray-800 mb-2">सेवा:</h4>
//                     <ul className="list-disc list-inside text-gray-600 space-y-1">
//                       {center.services.map((service, index) => (
//                         <li key={index}>{service}</li>
//                       ))}
//                     </ul>
//                   </div>

//                   <div className="space-y-2">
//                     <div className="flex items-center gap-2 text-gray-600">
//                       <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
//                         <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
//                       </svg>
//                       <span>{center.contact}</span>
//                     </div>
//                     <div className="flex items-center gap-2 text-gray-600">
//                       <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
//                         <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
//                       </svg>
//                       <span>{center.location}</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//     </div>
//   );
// };

// export default VeterinaryPage;

