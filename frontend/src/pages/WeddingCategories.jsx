const WeddingCategories = () => {
  const categories = [
    {
      id: 1,
      title: "Venues",
      description: "Banquet Halls, Marriage Garden / Lawn, Farmhouses, and more beautiful venues",
      image: "https://i.pinimg.com/originals/7b/09/c9/7b09c9e4fad820e6b1688fd6351ef39f.jpg",
      colorClass: "purple"
    },
    {
      id: 2,
      title: "Photographers",
      description: "Professional photographers to capture your precious moments",
      image: "https://images.pexels.com/photos/5759215/pexels-photo-5759215.jpeg?auto=compress&cs=tinysrgb&w=600",
      colorClass: "peach"
    },
    {
      id: 3,
      title: "Makeup",
      description: "Bridal Makeup, Family Makeup, and professional beauty services",
      image: "https://images.pexels.com/photos/31732991/pexels-photo-31732991/free-photo-of-elegant-bride-in-traditional-indian-attire.jpeg?auto=compress&cs=tinysrgb&w=600",
      colorClass: "rose"
    },
    {
      id: 4,
      title: "Pre Wedding Shoot",
      description: "Pre Wedding Shoot Locations and professional photography services",
      image: "https://images.pexels.com/photos/29545399/pexels-photo-29545399/free-photo-of-bengali-couple-in-traditional-attire-at-santiniketan.jpeg?auto=compress&cs=tinysrgb&w=600",
      colorClass: "purple"
    },
    {
      id: 5,
      title: "Planning & Decor",
      description: "Wedding Planners, Decorators, and complete event management",
      image: "https://images.pexels.com/photos/30184621/pexels-photo-30184621/free-photo-of-vibrant-outdoor-wedding-ceremony-with-floral-decor.jpeg?auto=compress&cs=tinysrgb&w=600",
      colorClass: "orange"
    },
    {
      id: 6,
      title: "Bridal Wear",
      description: "Bridal Lehengas, Kanjeevaram / Silk Sarees, and designer collections",
      image: "https://images.pexels.com/photos/2218558/pexels-photo-2218558.jpeg?auto=compress&cs=tinysrgb&w=600",
      colorClass: "olive"
    },
    {
      id: 7,
      title: "Groom Wear",
      description: "Sherwani, Wedding Suits / Tuxes, and traditional groom attire",
      image: "https://images.pexels.com/photos/27998980/pexels-photo-27998980/free-photo-of-best-groom-dress-for-wedding.jpeg?auto=compress&cs=tinysrgb&w=600",
      colorClass: "mint"
    },
    {
      id: 8,
      title: "Mehendi",
      description: "Mehendi Artists and traditional henna services",
      image: "https://images.pexels.com/photos/13102907/pexels-photo-13102907.jpeg?auto=compress&cs=tinysrgb&w=600",
      colorClass: "beige"
    },
    {
      id: 9,
      title: "Foods",
      description: "Catering Services, Cake, Chaat & Food Stalls for your wedding",
      image: "https://i.pinimg.com/originals/73/c5/6f/73c56fcd60b5df9be4a6ea7748594aaa.jpg",
      colorClass: "rose"
    },
    {
      id: 10,
      title: "Music & Dance",
      description: "DJs, Sangeet Choreographers, and Wedding Entertainment",
      image: "https://images.pexels.com/photos/28987832/pexels-photo-28987832/free-photo-of-traditional-rajasthani-dancer-performing-outdoors.jpeg?auto=compress&cs=tinysrgb&w=600",
      colorClass: "olive"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <section className="wedding-categories">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Wedding Categories</h2>
          <p className="text-gray-600 text-lg">Discover everything you need to make your special day perfect</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories.map(category => (
            <div 
              key={category.id}
              className="group bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer transform hover:-translate-y-2"
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={category.image} 
                  alt={category.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              </div>
              <div className="p-5">
                <h3 className="text-xl font-semibold text-gray-800 mb-2 flex items-center justify-between">
                  {category.title}
                  <svg className="w-5 h-5 text-pink-500 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </h3>
                <p className="text-gray-600 text-sm mb-4">{category.description}</p>
                <a 
                  href="#" 
                  className="inline-flex items-center text-pink-600 hover:text-pink-700 font-medium text-sm group"
                >
                  Explore
                  <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default WeddingCategories;