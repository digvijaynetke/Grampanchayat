// // You can replace these with actual award images
// import awardImage1 from '../images/back.jpg';
// import awardImage2 from '../images/back.jpg';
// import awardImage3 from '../images/back.jpg';

// const Awards = () => {
//   const awards = [
//     {
//       id: 1,
//       image: awardImage1,
//       title: 'सौर ऊर्जेवर पुरस्कार',
//       description: 'सौर ऊर्जा यशस्वी उपक्रम, नवीन ऊर्जा आणि घर आणि शाळांसाठी पर्यावरणास अनुकूल योजना.',
//       date: '22 Sep 2025',
//       category: 'पुरस्कार / यशोगाथा',
//       village: 'वडाळीभोई'
//     },
//     {
//       id: 2,
//       image: awardImage2,
//       title: 'जलसंधारणातील गौरव',
//       description: 'यशस्वी जलसंधारणामुळे पाण्याची उपलब्धता सुधारली, पाण्याच्या स्रोतांची शुद्धी, विहिरींचे संरक्षण आणि पाणी साठवणूक वाढवणे.',
//       date: '22 Sep 2025',
//       category: 'पुरस्कार / यशोगाथा',
//       village: 'वडाळीभोई'
//     },
//     {
//       id: 3,
//       image: awardImage3,
//       title: 'TB मुक्त पंचायत पुरस्कार',
//       description: 'TB मुक्त पंचायत पुरस्कार हा एक सकारात्मक आणि प्रेरणादायी उदाहरण आहे, गावातील आरोग्य सेवा आणि सार्वजनिक सहभागाचे परिणाम.',
//       date: '22 Sep 2025',
//       category: 'पुरस्कार / यशोगाथा',
//       village: 'वडाळीभोई'
//     }
//   ];

//   return (
//     <section className="py-16 bg-white">
//       <div className="container mx-auto px-4">
//         <div className="max-w-7xl mx-auto">
//           {/* Sub-heading and Line */}
//           <div className="mb-4">
//             <p className="text-sm text-gray-500 text-center mb-2">माहिती</p>
//             <div className="h-px bg-gray-300 w-full"></div>
//           </div>

//           {/* Main Heading */}
//           <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-teal-800">
//             पुरस्कार / यशोगाथा
//           </h2>

//           {/* Awards Grid */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
//             {awards.map((award) => (
//               <div 
//                 key={award.id}
//                 className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow duration-300"
//               >
//                 {/* Image Container with Avatar Overlay */}
//                 <div className="relative">
//                   <img 
//                     src={award.image} 
//                     alt={award.title} 
//                     className="w-full h-[250px] object-cover"
//                   />
//                   {/* Avatar Icon Overlapping Bottom-Left */}
//                   <div className="absolute bottom-4 left-4 w-12 h-12 bg-gray-300 rounded-full border-2 border-white flex items-center justify-center shadow-md">
//                     <svg className="w-6 h-6 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
//                       <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
//                     </svg>
//                   </div>
//                 </div>

//                 {/* Metadata Bar */}
//                 <div className="px-4 pt-4 pb-2 space-y-2">
//                   <div className="flex flex-wrap items-center gap-3 text-xs text-gray-600">
//                     <div className="flex items-center gap-1">
//                       <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
//                         <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
//                       </svg>
//                       <span>{award.village}</span>
//                     </div>
//                     <div className="flex items-center gap-1">
//                       <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
//                         <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
//                       </svg>
//                       <span>{award.date}</span>
//                     </div>
//                     <div className="flex items-center gap-1">
//                       <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
//                         <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                       </svg>
//                       <span>{award.category}</span>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Award Title */}
//                 <div className="px-4 pb-3">
//                   <h3 className="text-xl md:text-2xl font-bold text-teal-800 mb-3">
//                     {award.title}
//                   </h3>
//                 </div>

//                 {/* Description */}
//                 <div className="px-4 pb-6">
//                   <p className="text-sm md:text-base text-gray-700 leading-relaxed">
//                     {award.description}
//                   </p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Awards;

