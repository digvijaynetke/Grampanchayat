const PopulationStats = () => {
  const genderStats = [
    { category: 'महिला', female: 926, male: 0, total: 926 },
    { category: 'पुरुष', female: 0, male: 891, total: 891 },
    { category: 'एकूण लोकसंख्या', female: 926, male: 891, total: 1853 },
  ];

  const casteStats = [
    { category: 'अनुसुचीत जाती (SC)', female: 68, male: 72, total: 140 },
    { category: 'अनुसुचीत जमाती(ST)', female: 16, male: 12, total: 28 },
    { category: 'इतर मागास वग(OBC)', female: 55, male: 78, total: 133 },
    { category: 'विशेष मागास प्रवर्ग (SBC)', female: 90, male: 66, total: 150 },
    { category: 'भटक्या जमाती -अ (VJ)', female: 110, male: 120, total: 230 },
    { category: 'भटक्या जमाती - ब(NT-B)', female: 95, male: 72, total: 162 },
    { category: 'भटक्या जमाती - क (NT-C)', female: 88, male: 100, total: 188 },
    { category: 'भटक्या जमाती - ड (NT-D)', female: 65, male: 80, total: 145 },
    { category: 'खुला प्रवर्ग(OPEN))', female: 92, male: 75, total: 167 },
    { category: 'एकूण लोकसंख्या', female: 679, male: 665, total: 1344 },
  ];

  const villageStats = [
    { category: 'महिला', female: 579, male: 0, total: 579 },
    { category: 'पुरुष', female: 0, male: 590, total: 590 },
    { category: 'एकूण', female: 579, male: 590, total: 1169 },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto space-y-12">
          {/* गावातील लोकसंख्या */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-800">
              गावाची लोकसंख्या
            </h2>
            <h3 className="text-xl md:text-2xl text-center mb-8 text-gray-700">
              आमच्या गावातील पुरुष, स्त्रिया व एकूण लोकसंख्या माहिती
            </h3>
            
            <div className="overflow-x-auto">
              <table className="w-full bg-white rounded-lg shadow-md overflow-hidden">
                <thead className="bg-blue-600 text-white">
                  <tr>
                    <th className="px-4 py-3 text-left">महिला</th>
                    <th className="px-4 py-3 text-left">पुरुष</th>
                    <th className="px-4 py-3 text-left">एकूण</th>
                  </tr>
                </thead>
                <tbody>
                  {villageStats.map((stat, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                      <td className="px-4 py-3">{stat.female || '-'}</td>
                      <td className="px-4 py-3">{stat.male || '-'}</td>
                      <td className="px-4 py-3 font-semibold">{stat.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* गावातील जातीनुसार मतदार संघ */}
          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-center mb-8 text-gray-800">
              गावातील जातीनुसार मतदार संघ
            </h3>
            
            <div className="overflow-x-auto">
              <table className="w-full bg-white rounded-lg shadow-md overflow-hidden">
                <thead className="bg-blue-600 text-white">
                  <tr>
                    <th className="px-4 py-3 text-left">जात / समाज</th>
                    <th className="px-4 py-3 text-left">महिला</th>
                    <th className="px-4 py-3 text-left">पुरुष</th>
                    <th className="px-4 py-3 text-left">एकूण</th>
                  </tr>
                </thead>
                <tbody>
                  {casteStats.map((stat, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                      <td className="px-4 py-3 font-medium">{stat.category}</td>
                      <td className="px-4 py-3">{stat.female}</td>
                      <td className="px-4 py-3">{stat.male}</td>
                      <td className="px-4 py-3 font-semibold">{stat.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PopulationStats;

