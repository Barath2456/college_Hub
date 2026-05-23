const prisma = require("../lib/prisma");

const colleges = [
  {
    name: "Indian Institute of Technology, Delhi",
    location: "Delhi",
    state: "Delhi",
    fees: 250000,
    rating: 4.8,
    placementPercentage: 95,
    description: "IIT Delhi is one of the premier public research and engineering universities in India. Known for its world-class research facility, elite peer environment, and exceptionally high placement rates, it ranks among the topmost institutes in the country.",
    image: "https://images.pexels.com/photos/256490/pexels-photo-256490.jpeg?auto=compress&cs=tinysrgb&w=800",
    type: "Government",
    established: 1961,
    accreditation: "A++ NAAC",
    courses: [
      { name: "B.Tech Computer Science & Engineering", duration: "4 years", fees: 250000, seats: 120 },
      { name: "B.Tech Electrical Engineering", duration: "4 years", fees: 250000, seats: 100 },
      { name: "B.Tech Mechanical Engineering", duration: "4 years", fees: 250000, seats: 90 },
      { name: "M.Tech Artificial Intelligence", duration: "2 years", fees: 150000, seats: 40 }
    ],
    placements: {
      averagePackage: 2200000,
      highestPackage: 24000000,
      topRecruiters: ["Google", "Microsoft", "Goldman Sachs", "Amazon", "Uber"],
      year: 2025
    },
    reviews: [
      { id: "1", author: "Aman Gupta", rating: 5, comment: "Unparalleled academic environment, great research facilities and amazing hostels.", date: "2025-02-12" },
      { id: "2", author: "Kavya Sethi", rating: 4.5, comment: "Workload is intense but the exposure and opportunities are completely worth it.", date: "2025-03-01" }
    ]
  },
  {
    name: "Indian Institute of Technology, Bombay",
    location: "Mumbai",
    state: "Maharashtra",
    fees: 250000,
    rating: 4.9,
    placementPercentage: 97,
    description: "IIT Bombay, situated in Powai, Mumbai, is a globally recognized hub of technological education and research. Offering excellent infrastructure, a rich campus life, and unmatched global recognition, it represents the absolute pinnacle of Indian engineering.",
    image: "https://images.pexels.com/photos/154732/pexels-photo-154732.jpeg?auto=compress&cs=tinysrgb&w=800",
    type: "Government",
    established: 1958,
    accreditation: "A++ NAAC",
    courses: [
      { name: "B.Tech Computer Science & Engineering", duration: "4 years", fees: 250000, seats: 130 },
      { name: "B.Tech Aerospace Engineering", duration: "4 years", fees: 250000, seats: 60 },
      { name: "B.Tech Chemical Engineering", duration: "4 years", fees: 250000, seats: 80 },
      { name: "M.Tech Data Science", duration: "2 years", fees: 150000, seats: 35 }
    ],
    placements: {
      averagePackage: 2350000,
      highestPackage: 26000000,
      topRecruiters: ["Google", "Apple", "Meta", "Rubrik", "Bain & Co"],
      year: 2025
    },
    reviews: [
      { id: "1", author: "Rohit Shinde", rating: 5, comment: "Hostel life is beautiful, campus is extremely green, and tech placements are elite.", date: "2025-01-20" }
    ]
  },
  {
    name: "National Institute of Technology, Trichy",
    location: "Chennai",
    state: "Tamil Nadu",
    fees: 145000,
    rating: 4.6,
    placementPercentage: 91,
    description: "NIT Trichy is officially recognized as the premier National Institute of Technology in India. It boasts outstanding research projects, excellent industry collaborations, and an engineering layout that attracts top employers from around the globe.",
    image: "https://images.pexels.com/photos/296282/pexels-photo-296282.jpeg?auto=compress&cs=tinysrgb&w=800",
    type: "Government",
    established: 1964,
    accreditation: "A++ NAAC",
    courses: [
      { name: "B.Tech Computer Science & Engineering", duration: "4 years", fees: 145000, seats: 110 },
      { name: "B.Tech Electronics & Communication", duration: "4 years", fees: 145000, seats: 100 },
      { name: "B.Tech Civil Engineering", duration: "4 years", fees: 145000, seats: 80 }
    ],
    placements: {
      averagePackage: 1550000,
      highestPackage: 5200000,
      topRecruiters: ["Microsoft", "Cisco", "Nvidia", "TCS", "Texas Instruments"],
      year: 2025
    },
    reviews: [
      { id: "1", author: "Sriram V.", rating: 4.8, comment: "Top NIT with amazing campus culture. Best placements in South India outside IITs.", date: "2025-04-10" }
    ]
  },
  {
    name: "Vellore Institute of Technology",
    location: "Chennai",
    state: "Tamil Nadu",
    fees: 380000,
    rating: 4.3,
    placementPercentage: 86,
    description: "VIT is one of India's most highly acclaimed private engineering universities. Featuring state-of-the-art labs, international credit transfer systems, and highly structured placement campaigns, it is a premier choice for engineering enthusiasts.",
    image: "https://images.pexels.com/photos/356040/pexels-photo-356040.jpeg?auto=compress&cs=tinysrgb&w=800",
    type: "Private",
    established: 1984,
    accreditation: "A++ NAAC",
    courses: [
      { name: "B.Tech Computer Science & Engineering", duration: "4 years", fees: 380000, seats: 300 },
      { name: "B.Tech Information Technology", duration: "4 years", fees: 360000, seats: 200 },
      { name: "B.Tech Electronics Engineering", duration: "4 years", fees: 350000, seats: 150 }
    ],
    placements: {
      averagePackage: 920000,
      highestPackage: 7500000,
      topRecruiters: ["Microsoft", "Intel", "Adobe", "Cognizant", "Infosys"],
      year: 2025
    },
    reviews: [
      { id: "1", author: "Ananya Nair", rating: 4, comment: "Strict rules but infrastructure is outstanding. Placement record is incredibly high.", date: "2025-02-18" }
    ]
  },
  {
    name: "SRM Institute of Science & Technology",
    location: "Chennai",
    state: "Tamil Nadu",
    fees: 290000,
    rating: 4.0,
    placementPercentage: 81,
    description: "SRM Institute is a massive private university in Chennai. With excellent infrastructure, dynamic student clubs, and broad international partnerships, it provides students an energetic, cosmopolitan campus atmosphere.",
    image: "https://images.pexels.com/photos/356044/pexels-photo-356044.jpeg?auto=compress&cs=tinysrgb&w=800",
    type: "Private",
    established: 1985,
    accreditation: "A++ NAAC",
    courses: [
      { name: "B.Tech Computer Science & Engineering", duration: "4 years", fees: 290000, seats: 400 },
      { name: "B.Tech AI & Machine Learning", duration: "4 years", fees: 310000, seats: 180 },
      { name: "B.Tech Mechanical Engineering", duration: "4 years", fees: 260000, seats: 120 }
    ],
    placements: {
      averagePackage: 780000,
      highestPackage: 4200000,
      topRecruiters: ["Amazon", "TCS", "Wipro", "Capgemini", "LTI"],
      year: 2025
    },
    reviews: [
      { id: "1", author: "Rajesh Kumar", rating: 4, comment: "Great campus life and active student community. Highly recommended.", date: "2025-03-05" }
    ]
  },
  {
    name: "Anna University (CEG Campus)",
    location: "Chennai",
    state: "Tamil Nadu",
    fees: 55000,
    rating: 4.5,
    placementPercentage: 88,
    description: "College of Engineering, Guindy (CEG), Anna University, is the oldest technical institution in India. CEG offers elite-tier state university education with remarkably low fees, premium academic heritage, and highly respected graduates globally.",
    image: "https://images.pexels.com/photos/208637/pexels-photo-208637.jpeg?auto=compress&cs=tinysrgb&w=800",
    type: "Government",
    established: 1794,
    accreditation: "A++ NAAC",
    courses: [
      { name: "B.E. Computer Science & Engineering", duration: "4 years", fees: 55000, seats: 120 },
      { name: "B.E. Electronics & Communication", duration: "4 years", fees: 55000, seats: 100 },
      { name: "B.E. Information Technology", duration: "4 years", fees: 60000, seats: 80 }
    ],
    placements: {
      averagePackage: 1100000,
      highestPackage: 3800000,
      topRecruiters: ["Cisco", "Qualcomm", "Citibank", "TCS Digital", "Zoho"],
      year: 2025
    },
    reviews: [
      { id: "1", author: "Praveen R.", rating: 4.6, comment: "Unbelievably low fees and highly reputable legacy. CEG opens many doors.", date: "2025-01-14" }
    ]
  },
  {
    name: "BITS Pilani, Hyderabad Campus",
    location: "Hyderabad",
    state: "Telangana",
    fees: 480000,
    rating: 4.7,
    placementPercentage: 94,
    description: "BITS Pilani Hyderabad Campus is highly distinguished for its premium private engineering curriculum, zero attendance rule, and strong startup culture. Its mandatory industrial Practice School program guarantees robust corporate experience.",
    image: "https://images.pexels.com/photos/154629/pexels-photo-154629.jpeg?auto=compress&cs=tinysrgb&w=800",
    type: "Private",
    established: 2008,
    accreditation: "A++ NAAC",
    courses: [
      { name: "B.E. Computer Science", duration: "4 years", fees: 480000, seats: 120 },
      { name: "B.E. Electronics & Communication", duration: "4 years", fees: 480000, seats: 100 },
      { name: "B.E. Mechanical Engineering", duration: "4 years", fees: 480000, seats: 80 }
    ],
    placements: {
      averagePackage: 1950000,
      highestPackage: 6000000,
      topRecruiters: ["Google", "Nvidia", "Salesforce", "JPMorgan Chase", "Schlumberger"],
      year: 2025
    },
    reviews: [
      { id: "1", author: "Vikranth Reddy", rating: 5, comment: "No attendance criteria means you get complete freedom to code and innovate.", date: "2025-02-15" }
    ]
  },
  {
    name: "International Institute of Information Technology, Hyderabad",
    location: "Hyderabad",
    state: "Telangana",
    fees: 360000,
    rating: 4.8,
    placementPercentage: 98,
    description: "IIIT Hyderabad is highly recognized as India's premier computer science research institution. The institute offers intense coding, top-tier research labs, and record-breaking programming placements that challenge global standards.",
    image: "https://images.pexels.com/photos/358499/pexels-photo-358499.jpeg?auto=compress&cs=tinysrgb&w=800",
    type: "Private",
    established: 1998,
    accreditation: "A++ NAAC",
    courses: [
      { name: "B.Tech Computer Science & Engineering", duration: "4 years", fees: 360000, seats: 100 },
      { name: "B.Tech Electronics & Communication", duration: "4 years", fees: 360000, seats: 60 }
    ],
    placements: {
      averagePackage: 2600000,
      highestPackage: 10200000,
      topRecruiters: ["Google", "Microsoft", "CodeNation", "Adobe", "Qualcomm"],
      year: 2025
    },
    reviews: [
      { id: "1", author: "Suhasini Rao", rating: 5, comment: "Toughest curriculum but absolute best coding culture. Placement stats speak for themselves.", date: "2025-03-24" }
    ]
  },
  {
    name: "RV College of Engineering",
    location: "Bangalore",
    state: "Karnataka",
    fees: 250000,
    rating: 4.4,
    placementPercentage: 89,
    description: "RVCE is a top-ranking private engineering institution in Bangalore. Boasting a prime location in the Silicon Valley of India, it provides unparalleled industry projects, dynamic campus hackathons, and high technical placements.",
    image: "https://images.pexels.com/photos/239898/pexels-photo-239898.jpeg?auto=compress&cs=tinysrgb&w=800",
    type: "Private",
    established: 1963,
    accreditation: "A NAAC",
    courses: [
      { name: "B.E. Computer Science & Engineering", duration: "4 years", fees: 250000, seats: 180 },
      { name: "B.E. Information Science", duration: "4 years", fees: 230000, seats: 120 },
      { name: "B.E. Telecommunication", duration: "4 years", fees: 200000, seats: 60 }
    ],
    placements: {
      averagePackage: 1080000,
      highestPackage: 4800000,
      topRecruiters: ["Cisco", "Amazon", "Intel", "Walmart Global Tech", "Goldman Sachs"],
      year: 2025
    },
    reviews: [
      { id: "1", author: "Ganesh Hegde", rating: 4.5, comment: "Amazing location advantage with standard tech jobs in Bengaluru.", date: "2025-01-30" }
    ]
  },
  {
    name: "College of Engineering, Pune",
    location: "Pune",
    state: "Maharashtra",
    fees: 135000,
    rating: 4.5,
    placementPercentage: 90,
    description: "COEP Pune is an autonomous engineering institute affiliated to Savitribai Phule Pune University. It is celebrated for its highly technical student clubs, intense competitions, and highly successful alumni operating across global tech hubs.",
    image: "https://images.pexels.com/photos/358508/pexels-photo-358508.jpeg?auto=compress&cs=tinysrgb&w=800",
    type: "Government",
    established: 1854,
    accreditation: "A++ NAAC",
    courses: [
      { name: "B.Tech Computer Engineering", duration: "4 years", fees: 135000, seats: 120 },
      { name: "B.Tech Instrumentation & Control", duration: "4 years", fees: 130000, seats: 60 },
      { name: "B.Tech Metallurgy", duration: "4 years", fees: 110000, seats: 60 }
    ],
    placements: {
      averagePackage: 1150000,
      highestPackage: 4500000,
      topRecruiters: ["Tata Motors", "Barclays", "Mastercard", "Nvidia", "Deloitte"],
      year: 2025
    },
    reviews: [
      { id: "1", author: "Pranav Joshi", rating: 4.7, comment: "COEP has a stellar reputation in Pune and Maharashtra. Placements are solid.", date: "2025-02-14" }
    ]
  },
  {
    name: "Jadavpur University, Faculty of Engineering",
    location: "Kolkata",
    state: "West Bengal",
    fees: 10000,
    rating: 4.6,
    placementPercentage: 92,
    description: "Jadavpur University is unique in offering world-class engineering education at a subsidized cost of under Rs. 10,000 annually. It boasts massive Return on Investment (ROI), a highly competitive research structure, and a phenomenal placement record.",
    image: "https://images.pexels.com/photos/358507/pexels-photo-358507.jpeg?auto=compress&cs=tinysrgb&w=800",
    type: "Government",
    established: 1955,
    accreditation: "A++ NAAC",
    courses: [
      { name: "B.E. Computer Science & Engineering", duration: "4 years", fees: 10000, seats: 90 },
      { name: "B.E. Electronics & Telecommunication", duration: "4 years", fees: 10000, seats: 80 },
      { name: "B.E. Power Engineering", duration: "4 years", fees: 8000, seats: 40 }
    ],
    placements: {
      averagePackage: 1480000,
      highestPackage: 8500000,
      topRecruiters: ["Google", "Microsoft", "Amazon", "Wells Fargo", "PwC"],
      year: 2025
    },
    reviews: [
      { id: "1", author: "Sayan Roy", rating: 5, comment: "Literally the best ROI in the country. World-class faculty and brilliant peer group.", date: "2025-03-10" }
    ]
  },
  {
    name: "Malaviya National Institute of Technology",
    location: "Jaipur",
    state: "Rajasthan",
    fees: 150000,
    rating: 4.3,
    placementPercentage: 86,
    description: "MNIT Jaipur is a premier public technical university in Rajasthan. Supported by outstanding government funding, clean aesthetic campus infrastructure, and a great location, it provides premium academic training.",
    image: "https://images.pexels.com/photos/356039/pexels-photo-356039.jpeg?auto=compress&cs=tinysrgb&w=800",
    type: "Government",
    established: 1963,
    accreditation: "A++ NAAC",
    courses: [
      { name: "B.Tech Computer Science & Engineering", duration: "4 years", fees: 150000, seats: 110 },
      { name: "B.Tech Electrical Engineering", duration: "4 years", fees: 150000, seats: 90 },
      { name: "B.Tech Civil Engineering", duration: "4 years", fees: 150000, seats: 80 }
    ],
    placements: {
      averagePackage: 1240000,
      highestPackage: 4400000,
      topRecruiters: ["Amazon", "Salesforce", "Cisco", "L&T", "Deloitte"],
      year: 2025
    },
    reviews: [
      { id: "1", author: "Harsh Sharma", rating: 4.4, comment: "Beautiful campus and good placements. The city of Jaipur is great to live in.", date: "2025-04-05" }
    ]
  },
  {
    name: "National Institute of Technology, Surathkal",
    location: "Bangalore",
    state: "Karnataka",
    fees: 150000,
    rating: 4.7,
    placementPercentage: 93,
    description: "NITK Surathkal, Karnataka, is famous for its private beach, robust engineering research facilities, and excellent IT/Core placements. It stands as a top destination for serious academic minds seeking top-tier infrastructure.",
    image: "https://images.pexels.com/photos/256490/pexels-photo-256490.jpeg?auto=compress&cs=tinysrgb&w=800",
    type: "Government",
    established: 1960,
    accreditation: "A++ NAAC",
    courses: [
      { name: "B.Tech Computer Science & Engineering", duration: "4 years", fees: 150000, seats: 120 },
      { name: "B.Tech Information Technology", duration: "4 years", fees: 150000, seats: 100 },
      { name: "B.Tech ECE", duration: "4 years", fees: 150000, seats: 90 }
    ],
    placements: {
      averagePackage: 1720000,
      highestPackage: 5400000,
      topRecruiters: ["Microsoft", "Uber", "Qualcomm", "Oracle", "Morgan Stanley"],
      year: 2025
    },
    reviews: [
      { id: "1", author: "Shruti Shetty", rating: 4.8, comment: "We have our own beach! Placements are absolutely amazing and campus life is superb.", date: "2025-02-28" }
    ]
  },
  {
    name: "Netaji Subhas University of Technology",
    location: "Delhi",
    state: "Delhi",
    fees: 190000,
    rating: 4.4,
    placementPercentage: 88,
    description: "NSUT Delhi is a leading state government autonomous university in Dwarka, Delhi. It features a lush 145-acre campus, competitive engineering societies, and robust corporate links that recruit top software talent.",
    image: "https://images.pexels.com/photos/356044/pexels-photo-356044.jpeg?auto=compress&cs=tinysrgb&w=800",
    type: "Government",
    established: 1983,
    accreditation: "A NAAC",
    courses: [
      { name: "B.Tech Computer Engineering", duration: "4 years", fees: 190000, seats: 150 },
      { name: "B.Tech Information Technology", duration: "4 years", fees: 190000, seats: 120 },
      { name: "B.Tech Electronics & Communication", duration: "4 years", fees: 190000, seats: 100 }
    ],
    placements: {
      averagePackage: 1350000,
      highestPackage: 6400000,
      topRecruiters: ["Google", "Adobe", "Microsoft", "Deloitte", "Goldman Sachs"],
      year: 2025
    },
    reviews: [
      { id: "1", author: "Kshitiz Verma", rating: 4.5, comment: "Dwarka campus is extremely green, peer group is top-notch, and placements are excellent.", date: "2025-01-28" }
    ]
  },
  {
    name: "Harcourt Butler Technical University",
    location: "Lucknow",
    state: "Uttar Pradesh",
    fees: 135000,
    rating: 4.1,
    placementPercentage: 82,
    description: "HBTU Kanpur (with active admissions in Lucknow/Kanpur region) is one of the oldest technical universities in North India. Widely recognized for its Chemical and Paint technology disciplines, it attracts major core and IT companies across India.",
    image: "https://images.pexels.com/photos/239898/pexels-photo-239898.jpeg?auto=compress&cs=tinysrgb&w=800",
    type: "Government",
    established: 1921,
    accreditation: "A NAAC",
    courses: [
      { name: "B.Tech Chemical Engineering", duration: "4 years", fees: 135000, seats: 60 },
      { name: "B.Tech Computer Science & Engineering", duration: "4 years", fees: 135000, seats: 80 },
      { name: "B.Tech Mechanical Engineering", duration: "4 years", fees: 135000, seats: 60 }
    ],
    placements: {
      averagePackage: 840000,
      highestPackage: 3600000,
      topRecruiters: ["Asian Paints", "HUL", "Cognizant", "Infosys", "Reliance"],
      year: 2025
    },
    reviews: [
      { id: "1", author: "Shashank Mishra", rating: 4.2, comment: "Excellent alumni network. Chemical and paint technologies have stellar core placements.", date: "2025-03-15" }
    ]
  }
];

async function main() {
  console.log("Cleaning up existing colleges...");
  await prisma.savedCollege.deleteMany();
  await prisma.college.deleteMany();

  console.log("Seeding colleges...");
  const result = await prisma.college.createMany({
    data: colleges,
  });

  console.log(`Inserted ${result.count} colleges.`);
  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
