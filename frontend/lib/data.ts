import { College, LocationOption, FeesRangeOption } from "./types";

export const locations: LocationOption[] = [
  { value: "all", label: "All Locations" },
  { value: "Delhi", label: "Delhi" },
  { value: "Mumbai", label: "Mumbai" },
  { value: "Bangalore", label: "Bangalore" },
  { value: "Chennai", label: "Chennai" },
  { value: "Hyderabad", label: "Hyderabad" },
  { value: "Pune", label: "Pune" },
  { value: "Kolkata", label: "Kolkata" },
  { value: "Jaipur", label: "Jaipur" },
  { value: "Lucknow", label: "Lucknow" },
];

export const feesRanges: FeesRangeOption[] = [
  { value: "all", label: "All Fees", min: 0, max: null },
  { value: "under-2", label: "Under 2 Lakhs", min: 0, max: 200000 },
  { value: "2-5", label: "2 - 5 Lakhs", min: 200000, max: 500000 },
  { value: "5-10", label: "5 - 10 Lakhs", min: 500000, max: 1000000 },
  { value: "above-10", label: "Above 10 Lakhs", min: 1000000, max: null },
];

export const colleges: College[] = [
  {
    id: "1",
    name: "Indian Institute of Technology, Delhi",
    location: "Delhi",
    state: "Delhi",
    fees: 250000,
    rating: 4.8,
    placementPercentage: 95,
    image: "https://images.pexels.com/photos/256490/pexels-photo-256490.jpeg?auto=compress&cs=tinysrgb&w=800",
    type: "Government",
    established: 1961,
    accreditation: "A++ NAAC",
    description:
      "IIT Delhi is one of the premier engineering institutions in India, known for its cutting-edge research, world-class faculty, and exceptional placement records. The institute offers undergraduate, postgraduate, and doctoral programs across various engineering and science disciplines.",
    courses: [
      { name: "B.Tech Computer Science", duration: "4 years", fees: 250000, seats: 120 },
      { name: "B.Tech Electrical Engineering", duration: "4 years", fees: 250000, seats: 80 },
      { name: "B.Tech Mechanical Engineering", duration: "4 years", fees: 250000, seats: 60 },
      { name: "M.Tech AI & ML", duration: "2 years", fees: 150000, seats: 40 },
    ],
    placements: {
      averagePackage: 1800000,
      highestPackage: 20000000,
      topRecruiters: ["Google", "Microsoft", "Amazon", "Goldman Sachs", "McKinsey"],
      year: 2025,
    },
    reviews: [
      { id: "1", author: "Amit Kumar", rating: 5, comment: "Best engineering college in India. The research facilities and faculty are world-class.", date: "2025-01-15" },
      { id: "2", author: "Priya Sharma", rating: 4, comment: "Great academics and placements. The workload is intense but worth it.", date: "2025-02-20" },
      { id: "3", author: "Rahul Verma", rating: 5, comment: "Amazing campus life and incredible peer group. Learned so much beyond academics.", date: "2025-03-10" },
    ],
  },
  {
    id: "2",
    name: "Indian Institute of Technology, Bombay",
    location: "Mumbai",
    state: "Maharashtra",
    fees: 250000,
    rating: 4.9,
    placementPercentage: 97,
    image: "https://images.pexels.com/photos/154732/pexels-photo-154732.jpeg?auto=compress&cs=tinysrgb&w=800",
    type: "Government",
    established: 1958,
    accreditation: "A++ NAAC",
    description:
      "IIT Bombay is recognized as a top-tier institution globally, with outstanding research output and industry connections. Located in the financial capital of India, it provides students unmatched exposure to both academia and industry.",
    courses: [
      { name: "B.Tech Computer Science", duration: "4 years", fees: 250000, seats: 130 },
      { name: "B.Tech Chemical Engineering", duration: "4 years", fees: 250000, seats: 70 },
      { name: "B.Tech Aerospace Engineering", duration: "4 years", fees: 250000, seats: 50 },
      { name: "M.Tech Data Science", duration: "2 years", fees: 150000, seats: 35 },
    ],
    placements: {
      averagePackage: 2100000,
      highestPackage: 22000000,
      topRecruiters: ["Google", "Apple", "Meta", "Bain & Company", "BCG"],
      year: 2025,
    },
    reviews: [
      { id: "1", author: "Sneha Iyer", rating: 5, comment: "The best decision of my life. IIT Bombay opens doors worldwide.", date: "2025-01-08" },
      { id: "2", author: "Vikram Patel", rating: 5, comment: "Incredible faculty and research opportunities. The startup culture is amazing.", date: "2025-02-14" },
    ],
  },
  {
    id: "3",
    name: "National Institute of Technology, Trichy",
    location: "Bangalore",
    state: "Karnataka",
    fees: 175000,
    rating: 4.5,
    placementPercentage: 88,
    image: "https://images.pexels.com/photos/296282/pexels-photo-296282.jpeg?auto=compress&cs=tinysrgb&w=800",
    type: "Government",
    established: 1964,
    accreditation: "A++ NAAC",
    description:
      "NIT Trichy is among the top NITs in India, offering excellent engineering education with strong industry partnerships. The institute has a rich tradition of producing skilled engineers and leaders.",
    courses: [
      { name: "B.Tech Computer Science", duration: "4 years", fees: 175000, seats: 100 },
      { name: "B.Tech Electronics & Communication", duration: "4 years", fees: 175000, seats: 90 },
      { name: "B.Tech Civil Engineering", duration: "4 years", fees: 175000, seats: 60 },
      { name: "M.Tech VLSI Design", duration: "2 years", fees: 120000, seats: 30 },
    ],
    placements: {
      averagePackage: 1200000,
      highestPackage: 12000000,
      topRecruiters: ["TCS", "Infosys", "Wipro", "Cisco", "Deloitte"],
      year: 2025,
    },
    reviews: [
      { id: "1", author: "Karthik R.", rating: 4, comment: "Solid academics and decent placements. Campus life could be better.", date: "2025-01-20" },
      { id: "2", author: "Anjali M.", rating: 5, comment: "Great value for money. The faculty is very supportive and knowledgeable.", date: "2025-03-05" },
    ],
  },
  {
    id: "4",
    name: "Vellore Institute of Technology",
    location: "Chennai",
    state: "Tamil Nadu",
    fees: 350000,
    rating: 4.2,
    placementPercentage: 82,
    image: "https://images.pexels.com/photos/356040/pexels-photo-356040.jpeg?auto=compress&cs=tinysrgb&w=800",
    type: "Private",
    established: 1984,
    accreditation: "A++ NAAC",
    description:
      "VIT is a leading private institution known for its modern infrastructure, diverse student community, and strong placement support. It has consistently ranked among the top private engineering colleges in India.",
    courses: [
      { name: "B.Tech Computer Science", duration: "4 years", fees: 350000, seats: 200 },
      { name: "B.Tech Information Technology", duration: "4 years", fees: 320000, seats: 150 },
      { name: "B.Tech Biotechnology", duration: "4 years", fees: 300000, seats: 60 },
      { name: "MBA", duration: "2 years", fees: 400000, seats: 120 },
    ],
    placements: {
      averagePackage: 800000,
      highestPackage: 5000000,
      topRecruiters: ["Microsoft", "Adobe", "Oracle", "SAP", "Flipkart"],
      year: 2025,
    },
    reviews: [
      { id: "1", author: "Divya S.", rating: 4, comment: "Good infrastructure and placements. The campus is beautiful.", date: "2025-02-01" },
      { id: "2", author: "Arjun K.", rating: 3, comment: "Decent college but fees are high compared to government colleges.", date: "2025-03-15" },
    ],
  },
  {
    id: "5",
    name: "BITS Pilani",
    location: "Hyderabad",
    state: "Telangana",
    fees: 450000,
    rating: 4.7,
    placementPercentage: 93,
    image: "https://images.pexels.com/photos/208637/pexels-photo-208637.jpeg?auto=compress&cs=tinysrgb&w=800",
    type: "Private",
    established: 1964,
    accreditation: "A++ NAAC",
    description:
      "BITS Pilani is one of the most prestigious private engineering institutions in India, known for its flexible academic structure, strong industry interface, and entrepreneurial culture. Its unique practice school program provides real-world experience.",
    courses: [
      { name: "B.E. Computer Science", duration: "4 years", fees: 450000, seats: 110 },
      { name: "B.E. Electronics & Instrumentation", duration: "4 years", fees: 450000, seats: 60 },
      { name: "B.E. Chemical Engineering", duration: "4 years", fees: 450000, seats: 40 },
      { name: "M.E. Software Systems", duration: "2 years", fees: 350000, seats: 30 },
    ],
    placements: {
      averagePackage: 1500000,
      highestPackage: 15000000,
      topRecruiters: ["Google", "Amazon", "Microsoft", "Deloitte", "KPMG"],
      year: 2025,
    },
    reviews: [
      { id: "1", author: "Meera J.", rating: 5, comment: "BITS changed my life. The freedom and opportunities here are unmatched.", date: "2025-01-25" },
      { id: "2", author: "Siddharth N.", rating: 4, comment: "Excellent peer group and faculty. Practice School is a game changer.", date: "2025-02-18" },
    ],
  },
  {
    id: "6",
    name: "Delhi Technological University",
    location: "Delhi",
    state: "Delhi",
    fees: 180000,
    rating: 4.3,
    placementPercentage: 85,
    image: "https://images.pexels.com/photos/154629/pexels-photo-154629.jpeg?auto=compress&cs=tinysrgb&w=800",
    type: "Government",
    established: 1941,
    accreditation: "A NAAC",
    description:
      "DTU is a prestigious government engineering college in Delhi with a strong legacy of producing skilled engineers. Known for its excellent placements and vibrant campus culture, DTU consistently ranks among the top engineering colleges in North India.",
    courses: [
      { name: "B.Tech Computer Science", duration: "4 years", fees: 180000, seats: 100 },
      { name: "B.Tech Information Technology", duration: "4 years", fees: 180000, seats: 60 },
      { name: "B.Tech Mechanical Engineering", duration: "4 years", fees: 180000, seats: 70 },
      { name: "MBA", duration: "2 years", fees: 250000, seats: 80 },
    ],
    placements: {
      averagePackage: 1000000,
      highestPackage: 8000000,
      topRecruiters: ["Amazon", "Adobe", "Goldman Sachs", "EY", "PwC"],
      year: 2025,
    },
    reviews: [
      { id: "1", author: "Rohit G.", rating: 4, comment: "Great placements and location advantage in Delhi.", date: "2025-01-30" },
      { id: "2", author: "Neha P.", rating: 4, comment: "Good college with decent facilities. The campus needs some renovation.", date: "2025-03-22" },
    ],
  },
  {
    id: "7",
    name: "Manipal Institute of Technology",
    location: "Pune",
    state: "Maharashtra",
    fees: 400000,
    rating: 4.1,
    placementPercentage: 78,
    image: "https://images.pexels.com/photos/239898/pexels-photo-239898.jpeg?auto=compress&cs=tinysrgb&w=800",
    type: "Private",
    established: 1953,
    accreditation: "A NAAC",
    description:
      "Manipal Institute of Technology is a well-known private engineering college offering world-class infrastructure and diverse academic programs. The multicultural campus and international collaborations set it apart.",
    courses: [
      { name: "B.Tech Computer Science", duration: "4 years", fees: 400000, seats: 150 },
      { name: "B.Tech Electronics & Communication", duration: "4 years", fees: 380000, seats: 120 },
      { name: "B.Tech Mechatronics", duration: "4 years", fees: 380000, seats: 40 },
      { name: "M.Tech Cyber Security", duration: "2 years", fees: 300000, seats: 25 },
    ],
    placements: {
      averagePackage: 750000,
      highestPackage: 4000000,
      topRecruiters: ["Accenture", "Cognizant", "IBM", "HCL", "Tech Mahindra"],
      year: 2025,
    },
    reviews: [
      { id: "1", author: "Pooja R.", rating: 4, comment: "Great campus and international exposure. A bit expensive though.", date: "2025-02-10" },
      { id: "2", author: "Aditya M.", rating: 3, comment: "Good college but placement stats could be better for non-CS branches.", date: "2025-04-01" },
    ],
  },
  {
    id: "8",
    name: "Jadavpur University",
    location: "Kolkata",
    state: "West Bengal",
    fees: 120000,
    rating: 4.4,
    placementPercentage: 86,
    image: "https://images.pexels.com/photos/358508/pexels-photo-358508.jpeg?auto=compress&cs=tinysrgb&w=800",
    type: "Government",
    established: 1955,
    accreditation: "A NAAC",
    description:
      "Jadavpur University is a prestigious state university known for its academic rigor, research contributions, and affordable education. It has a strong alumni network and excellent placement records, particularly in engineering and technology.",
    courses: [
      { name: "B.E. Computer Science", duration: "4 years", fees: 120000, seats: 80 },
      { name: "B.E. Electronics & Telecom", duration: "4 years", fees: 120000, seats: 60 },
      { name: "B.E. Chemical Engineering", duration: "4 years", fees: 120000, seats: 40 },
      { name: "M.E. Computer Science", duration: "2 years", fees: 80000, seats: 25 },
    ],
    placements: {
      averagePackage: 900000,
      highestPackage: 7000000,
      topRecruiters: ["TCS", "Cognizant", "Capgemini", "Ericsson", "L&T"],
      year: 2025,
    },
    reviews: [
      { id: "1", author: "Sanjay D.", rating: 5, comment: "Best value for money. Excellent education at minimal fees.", date: "2025-01-12" },
      { id: "2", author: "Ritu B.", rating: 4, comment: "Strong academics. Infrastructure needs improvement but faculty is great.", date: "2025-03-18" },
    ],
  },
  {
    id: "9",
    name: "IIIT Hyderabad",
    location: "Hyderabad",
    state: "Telangana",
    fees: 300000,
    rating: 4.6,
    placementPercentage: 92,
    image: "https://images.pexels.com/photos/358499/pexels-photo-358499.jpeg?auto=compress&cs=tinysrgb&w=800",
    type: "Government",
    established: 1998,
    accreditation: "A++ NAAC",
    description:
      "IIIT Hyderabad is a premier research-oriented institution specializing in information technology and computer science. Known for its exceptional research output and industry partnerships, it has one of the best placement records in India.",
    courses: [
      { name: "B.Tech Computer Science", duration: "4 years", fees: 300000, seats: 90 },
      { name: "B.Tech Electronics & Communication", duration: "4 years", fees: 300000, seats: 50 },
      { name: "MS by Research (CS)", duration: "2-5 years", fees: 200000, seats: 20 },
      { name: "M.Tech AI", duration: "2 years", fees: 250000, seats: 30 },
    ],
    placements: {
      averagePackage: 1600000,
      highestPackage: 18000000,
      topRecruiters: ["Google", "Microsoft", "Adobe", "Nvidia", "Qualcomm"],
      year: 2025,
    },
    reviews: [
      { id: "1", author: "Kavitha S.", rating: 5, comment: "The research culture here is incredible. Best for CS enthusiasts.", date: "2025-02-08" },
      { id: "2", author: "Pranav T.", rating: 4, comment: "Small campus but big opportunities. Faculty is outstanding.", date: "2025-04-05" },
    ],
  },
  {
    id: "10",
    name: "Thapar Institute of Engineering",
    location: "Jaipur",
    state: "Rajasthan",
    fees: 320000,
    rating: 4.0,
    placementPercentage: 79,
    image: "https://images.pexels.com/photos/358507/pexels-photo-358507.jpeg?auto=compress&cs=tinysrgb&w=800",
    type: "Private",
    established: 1956,
    accreditation: "A+ NAAC",
    description:
      "Thapar Institute is a leading private engineering college in North India with a strong reputation for academic excellence and industry-relevant curriculum. The institute has produced many notable alumni in technology and business.",
    courses: [
      { name: "B.Tech Computer Science", duration: "4 years", fees: 320000, seats: 120 },
      { name: "B.Tech Electronics & Communication", duration: "4 years", fees: 300000, seats: 80 },
      { name: "B.Tech Biotechnology", duration: "4 years", fees: 280000, seats: 40 },
      { name: "MBA", duration: "2 years", fees: 350000, seats: 60 },
    ],
    placements: {
      averagePackage: 850000,
      highestPackage: 6000000,
      topRecruiters: ["Infosys", "Wipro", "TCS", "HCL", "Mahindra"],
      year: 2025,
    },
    reviews: [
      { id: "1", author: "Gaurav S.", rating: 4, comment: "Good college with decent placements in North India.", date: "2025-01-28" },
      { id: "2", author: "Swati K.", rating: 3, comment: "Average experience. Could improve on industry exposure.", date: "2025-03-30" },
    ],
  },
  {
    id: "11",
    name: "SRM Institute of Science & Technology",
    location: "Chennai",
    state: "Tamil Nadu",
    fees: 280000,
    rating: 3.9,
    placementPercentage: 75,
    image: "https://images.pexels.com/photos/356044/pexels-photo-356044.jpeg?auto=compress&cs=tinysrgb&w=800",
    type: "Private",
    established: 2002,
    accreditation: "A++ NAAC",
    description:
      "SRM Institute is one of the largest private universities in India, offering a wide range of programs with modern infrastructure and international collaborations. The diverse student body and extensive facilities make it a popular choice.",
    courses: [
      { name: "B.Tech Computer Science", duration: "4 years", fees: 280000, seats: 250 },
      { name: "B.Tech AI & Data Science", duration: "4 years", fees: 300000, seats: 120 },
      { name: "B.Tech Mechanical Engineering", duration: "4 years", fees: 250000, seats: 100 },
      { name: "MBBS", duration: "5.5 years", fees: 1500000, seats: 150 },
    ],
    placements: {
      averagePackage: 650000,
      highestPackage: 3500000,
      topRecruiters: ["TCS", "Infosys", "Cognizant", "Amazon", "Wipro"],
      year: 2025,
    },
    reviews: [
      { id: "1", author: "Harish V.", rating: 4, comment: "Huge campus with great facilities. Placements are improving.", date: "2025-02-25" },
      { id: "2", author: "Lavanya P.", rating: 3, comment: "Good infrastructure but too many students. Needs better faculty ratio.", date: "2025-04-10" },
    ],
  },
  {
    id: "12",
    name: "Netaji Subhas University of Technology",
    location: "Delhi",
    state: "Delhi",
    fees: 160000,
    rating: 4.2,
    placementPercentage: 83,
    image: "https://images.pexels.com/photos/356039/pexels-photo-356039.jpeg?auto=compress&cs=tinysrgb&w=800",
    type: "Government",
    established: 1983,
    accreditation: "A NAAC",
    description:
      "NSUT is a well-established government engineering college in Delhi with strong placement records and academic reputation. The institute has recently been upgraded to a university, expanding its scope and programs.",
    courses: [
      { name: "B.Tech Computer Science", duration: "4 years", fees: 160000, seats: 90 },
      { name: "B.Tech Information Technology", duration: "4 years", fees: 160000, seats: 60 },
      { name: "B.Tech Electronics & Communication", duration: "4 years", fees: 160000, seats: 70 },
      { name: "MBA", duration: "2 years", fees: 220000, seats: 60 },
    ],
    placements: {
      averagePackage: 950000,
      highestPackage: 7500000,
      topRecruiters: ["Microsoft", "Adobe", "Deloitte", "EY", "KPMG"],
      year: 2025,
    },
    reviews: [
      { id: "1", author: "Manish T.", rating: 4, comment: "Great ROI. Government college with private college level placements.", date: "2025-01-18" },
      { id: "2", author: "Shreya G.", rating: 4, comment: "Good location advantage in Delhi. Campus is being upgraded.", date: "2025-03-08" },
    ],
  },
];

export function formatFees(fees: number): string {
  if (fees >= 100000) {
    return `${(fees / 100000).toFixed(1)} Lakhs`;
  }
  return `${fees.toLocaleString("en-IN")}`;
}

export function formatSalary(salary: number): string {
  if (salary >= 10000000) {
    return `${(salary / 10000000).toFixed(1)} Crore`;
  }
  if (salary >= 100000) {
    return `${(salary / 100000).toFixed(1)} LPA`;
  }
  return `${salary.toLocaleString("en-IN")}`;
}
