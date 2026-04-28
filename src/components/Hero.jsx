import { ArrowRight, CheckCircle2, Phone } from "lucide-react";
import Header from "./Header";
import Footer from "./Footer";
import TestimonialsSection from "./TestimonialsSection";

 

const basePath = "/assets/";

const insuranceTypes = [
    { title: "Life", image: basePath + "li-1.png" }, 
    { title: "Car", image: basePath + "car.png" },
    { title: "Bike", image: basePath + "red-scooter-1.png" }, 
    { title: "Health", image: basePath + "health.png" },
  ];

const quoteItems = [
  { title: "Bike", image: basePath + "red-scooter-1.png" },
  { title: "Car", image: basePath + "car.png" },
  { title: "Health", image: basePath + "health.png" },
  { title: "Term", image: basePath + "term.png" },
  { title: "Investment Tax Planning", image: basePath + "investment.png" },
  { title: "Saving For Child", image: basePath + "saving-child.png" },
  { title: "Pension & Retirement", image: basePath + "pension.png" },
];

/* helper to reuse quoteItems images */
const getImage = (title) =>
  quoteItems.find((item) => item.title === title)?.image;

const stats = [
  { number: "3 Lakh+", label: "TRAINED ADVISORS", image: basePath + "TRAINED-ADVISORS.png" },
  { number: "45 Lakh+", label: "HAPPY CUSTOMERS", image: basePath + "HAPPY-CUSTOMERS.png" },
  { number: "45+", label: "INSURANCE PARTNERS", image: basePath + "INSURANCE-PARTNERS.png" },
  { number: "1 Crore+", label: "POLICIES SOLD", image: basePath + "POLICIES-SOLD-1.png" },
];


const testimonials = [
  { 
    name: "Priya Nair", 
    role: "Logistics Manager", 
    image: "/assets/21.jpg", 
    quote: "Warehouse insurance policy lene ka process simple aur transparent tha. Navlakha Insurance ne best plan recommend kiya. Bahut satisfied hoon!" 
  },
  { 
    name: "Arjun Verma", 
    role: "Entrepreneur", 
    image: "/assets/24.jpg", 
    quote: "Transit insurance ke liye Navlakha Insurance par bharosa kiya aur unhone quick aur hassle-free service di. Truly reliable!" 
  },
  { 
    name: "Shreya Mehta", 
    role: "Teacher", 
    image: "/assets/31.jpg", 
    quote: "Navlakha Insurance ne mujhe best health policy suggest ki. Process simple tha aur team bahut hi helpful rahi. Highly recommended!" 
  },

  // 👉 New 3 testimonials added
  { 
    name: "Rohan Patel", 
    role: "Business Owner", 
    image: "/assets/11.jpg", 
    quote: "Navlakha Insurance team ne mujhe commercial insurance samajhva ma bahu help kari. Claim process pan bahu fast hato." 
  },
  { 
    name: "Ananya Joshi", 
    role: "HR Executive", 
    image: "/assets/42.jpg", 
    quote: "Customer support bahu responsive chhe. Health insurance select karva ma proper guidance mali. Very smooth experience." 
  },
  { 
    name: "Krina Shah", 
    role: "Freelancer", 
    image: "/assets/55.jpg", 
    quote: "Affordable plans ane clear explanation. Navlakha Insurance e perfect policy choose karva ma help kari. Totally satisfied!" 
  },
];

const steps = [
  { title: "Choosing Right Policy", cta: "Compare Quotes", image: basePath + "POLICIES-SOLD-2.png" },
  { title: "Compare Quotes From 45+ Insurers", cta: "Connect With Our Experts", image: basePath + "POLICIES-SOLD-3.png" },
  { title: "Hassle-free Claim Assistance", cta: "Enquire Now", image: basePath + "2150797566-Photoroom-1-1.png" },
];
const productImages = [
  "Untitled-design-29.png",
  "Untitled-design-37.png",
  "Untitled-design-38.png",
  "Untitled-design-28.png",
  "Untitled-design-36.png",
  "Untitled-design-30.png",
  "Untitled-design-35.png",
  "Untitled-design-31.png",
  "Untitled-design-32.png",
  "Untitled-design-33.png",
  "Untitled-design-34.png",
];

const productsRaw = [
  { title: "Health Insurance", description: "Covers medical expenses, hospitalization, and emergencies, ensuring quality healthcare access for you and your family with complete financial protection." },
  { title: "Motor Insurance", description: "Protects vehicles against accidents, theft, and damages, including third-party liabilities, ensuring worry-free driving and fast, reliable claims support." },
  { title: "Liability Insurance", description: "Provides coverage against legal claims for property damage or injuries, protecting individuals and businesses from unexpected financial liabilities and lawsuits." },
  { title: "Travel Insurance", description: "Covers medical emergencies, trip cancellations, lost luggage, and travel delays for worry-free journeys." },
  { title: "Property Insurance", description: "Secures homes, offices, and commercial properties against fire, theft, and natural disasters." },
  { title: "Fire Insurance", description: "Protects property from fire, lightning, and explosion damage with financial support after incidents." },
  { title: "Warehouse Insurance", description: "Covers stored goods against fire, theft, and disasters, safeguarding inventory value." },
  { title: "Transit Insurance", description: "Protects goods in transit against theft, fire, and accidental damage during transportation." },
  { title: "Commercial Vehicle Insurance", description: "Protect your business vehicles with comprehensive coverage for smooth operations." },
  { title: "Transport Line Claim Specialist", description: "Expert claim specialists ensuring quick, hassle-free settlements for transport businesses." },
  { title: "Life Insurance", description: "Secure your family’s future with life insurance and financial protection in times of uncertainty." },
];

const products = productsRaw.map((item, index) => ({
  title: item.title,
  description: item.description,
  image: basePath + productImages[index],
}));


const partners = [
  { file: "Untitled-design-11.png", name: "Reliance general insurance" },
  { file: "Untitled-design-12.png", name: "HDFC ergo general insurance" },
  { file: "Untitled-design-13.png", name: "ICICI Lombard general insurance" },
  { file: "Untitled-design-14.png", name: "Digit insurance" },
  { file: "Untitled-design-15.png", name: "Shriram general insurance" },
  { file: "Untitled-design-16.png", name: "Sbi general insurance" },
  { file: "Untitled-design-17.png", name: "Royal insurance general insurance" },
  { file: "Untitled-design-18.png", name: "National insurance company" },
  { file: "Untitled-design-19.png", name: "Oriental" },
  { file: "Untitled-design-20.png", name: "New india assurance" },
  { file: "Untitled-design-26.png", name: "United India Insurance Company Limited" },
  { file: "Untitled-design-22.png", name: "IFFCO tokio insurance company" },
  { file: "Untitled-design-25.png", name: "Bajaj Allianz General Insurance" },
  { file: "Untitled-design-24.png", name: "Magma" },
];

const blogCards = [
  {
    image: basePath + "125089.jpg",
    title: "Property Insurance Protecting Your Valuable Assets",
  },
  {
    image: basePath + "127981.jpg",
    title: "Travel Insurance Your Trusted Companion",
  },
  {
    image: basePath + "134016.jpg",
    title: "Liability Insurance Protecting You",
  },
];

const Index = () => {
  return (
   
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-cyan-50 text-gray-900">
      {/* HERO */}
     
  <section id="home" className="mx-auto max-w-7xl px-5 pb-20 pt-20 lg:px-8 lg:pb-28 lg:pt-28">
  <div className="max-w-4xl">
    {/* Heading with split colors as per image */}
    <h1 className="text-balance text-4xl font-bold leading-tight tracking-tight md:text-6xl">
      <span className="text-[#003d63]">Protecting What </span>
      <span className="text-[#72b056]">Matters Most All Type General </span>
      <span className="text-[#003d63]">Insurance</span>
    </h1>
    
    {/* Subtext */}
    <p className="mt-6 text-xl font-medium text-gray-800">
      Get a quote or compare
    </p>
  </div>

  {/* Icons Grid */}
  <div className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-4 lg:grid-cols-7">
    {quoteItems.map((item, index) => (
      <a 
        key={item.title} 
        href="#contact" 
        className="group flex flex-col items-center text-center" 
        style={{ animationDelay: `${index * 90}ms` }}
      >
        {/* Icon Container with Green Border */}
        <span className="flex size-24 items-center justify-center rounded-xl border-2 border-[#72b056] bg-white p-4 transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-lg">
          <img 
            src={item.image} 
            alt={`${item.title} insurance`} 
            className="h-full w-full object-contain" 
            loading="lazy" 
          />
        </span>
        
        {/* Title with Navy Color */}
        <span className="mt-3 block text-sm font-bold leading-tight text-[#003d63] md:text-base">
          {item.title}
        </span>
      </a>
    ))}
  </div>
</section>

      {/* STATS */}
    <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
  {/* Heading */}
  <h2 className="text-center text-3xl font-bold md:text-4xl">
    <span className="text-[#003d63]">Why </span>
    <span className="text-[#72b056]">Navlakha Insurance?</span>
  </h2>

  {/* Stats Grid */}
  <div className="mt-16 grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
    {stats.map((stat) => (
      <div key={stat.label} className="flex flex-col items-center text-center">
        
        {/* Double Circle Border Container */}
        <div className="relative flex size-48 items-center justify-center">
          {/* Outer Thin Circle */}
          <div className="absolute inset-0 rounded-full border border-[#72b056] opacity-40"></div>
          {/* Inner Circle with Image */}
          <div className="flex size-[90%] items-center justify-center rounded-full border border-[#72b056] bg-transparent p-2">
            <img 
              src={stat.image} 
              alt={stat.label} 
              className="h-full w-full object-contain" 
              loading="lazy" 
            />
          </div>
        </div>

        {/* Stats Number */}
        <h3 className="mt-8 text-3xl font-bold text-[#003d63]">
          {stat.number}
        </h3>
        
        {/* Stats Label (Uppercase as per image) */}
        <p className="mt-2 text-sm font-bold tracking-wide text-[#003d63] uppercase">
          {stat.label}
        </p>
      </div>
    ))}
  </div>
</section>

      {/* STEPS */}
     <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
  {/* Section Heading */}
  <h2 className="mb-16 text-center text-3xl font-bold md:text-4xl">
    <span className="text-[#72b056]">Navlakha Insurance </span>
    <span className="text-[#003d63]">With You On Every Step</span>
  </h2>

  {/* Stepper Line - visible on desktop */}
  <div className="relative mb-12 hidden lg:block">
    <div className="absolute left-0 top-1/2 h-[1px] w-full -translate-y-1/2 border-t-2 border-dotted border-gray-300"></div>
    <div className="relative flex justify-around">
      {[1, 2, 3].map((num) => (
        <div key={num} className="flex size-10 items-center justify-center rounded-full border border-gray-300 bg-white text-sm font-bold shadow-sm">
          {num}
        </div>
      ))}
    </div>
  </div>

  {/* Steps Grid */}
  <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
    {steps.map((step, i) => (
      <div key={i} className="flex flex-col items-center text-center">
        {/* Title */}
        <h3 className="text-xl font-bold text-[#003d63]">{step.title}</h3>

        {/* Image with Blue Circle Background */}
        <div className="relative mt-8 flex h-64 w-64 items-end justify-center">
          <div className="absolute bottom-4 size-48 rounded-full bg-[#1a5d9a]"></div>
          <img 
            src={step.image} 
            alt={step.title} 
            className="relative z-10 h-full w-full object-contain" 
          />
        </div>

        {/* Description */}
        <p className="mt-6 min-h-[3rem] text-base font-bold text-[#003d63]">
          {step.description}
        </p>

        {/* Button with Green Accent */}
        <button className="relative mt-6 overflow-hidden rounded-sm bg-[#003d63] px-8 py-3 text-sm font-bold text-white transition-all hover:opacity-90">
          <div className="absolute left-0 top-0 h-full w-1.5 bg-[#72b056]"></div>
          {step.cta}
        </button>
      </div>
    ))}
  </div>
</section>

      {/* products */}
  <section className="mx-auto max-w-7xl px-5 py-20">
        <h2 className="text-center text-3xl font-bold mb-12">
          <span className="text-[#003d63]">Types Of </span>
          <span className="text-[#72b056]">Insurance Products</span>
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 border-l border-t border-gray-300">
          {products.map((product, i) => (
            <div key={i} className="border-r border-b border-gray-300 bg-white">
              
              <img src={product.image} className="h-48 w-full object-cover" />

              <div className="p-5 text-center">
                <h3 className="text-lg font-bold text-[#2e7d32]">
                  {product.title}
                </h3>

                <p className="text-sm mt-3 text-[#003d63]">
                  {product.description}
                </p>

                <button className="mt-5 bg-[#003d63] text-white px-6 py-2 rounded relative overflow-hidden">
                  <span className="absolute left-0 top-0 w-1.5 h-full bg-[#72b056]"></span>
                  Quick Enquiry
                </button>
              </div>

            </div>
          ))}
        </div>
      </section>

      {/* partners */}

   {/* partners */}
<section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
  {/* Section Heading */}
  <h2 className="mb-12 text-center text-3xl font-bold md:text-4xl">
    <span className="text-[#003d63]">Our </span>
    <span className="text-[#72b056]">Trusted Insurance Partners</span>
  </h2>

  {/* Grid */}
  <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7">
    {partners.map((partner, index) => (
      <div key={index} className="group">

        {/* Card */}
        <div className="flex h-40 w-full flex-col items-center justify-center rounded-sm border border-dashed border-[#003d63]/50 bg-white p-3 text-center transition-all group-hover:border-[#72b056] group-hover:shadow-md">

          {/* Image */}
          <img
            src={basePath + partner.file}
            alt={partner.name}
            className="max-h-39 w-full object-contain"
            loading="lazy"
          />

          {/* Name inside card */}
          <p className="mt-3 text-[11px] font-medium leading-tight text-[#003d63] md:text-xs">
            {partner.name}
          </p>

        </div>
      </div>
    ))}
  </div>
</section>


  <section id="contact" className="bg-[#eef2ff] px-5 py-16 lg:px-8">
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.2fr_0.8fr_1fr]">
        
        {/* Left Side: Heading */}
        <div className="text-left">
          <h2 className="text-4xl lg:text-5xl font-bold leading-tight">
            <span className="text-[#10375c]">Get Free Advice</span> <span className="text-[#10375c]">From Our</span>
            <br />
            <span className="text-[#68a357]">Certified Insurance Advisors</span>
          </h2>
        </div>

        {/* Center: Character Image */}
        <div className="relative flex justify-center">
          <img 
            src="/assets/advisor.png" 
            alt="Certified insurance advisor" 
            className="h-80 w-auto object-contain" 
            loading="lazy" 
          />
        </div>

        {/* Right Side: Selection Card */}
        <div className="rounded-2xl bg-white p-8 shadow-xl border border-gray-100">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-4 mb-8">
            {insuranceTypes.map((item) => (
              <div key={item.title} className="flex flex-col items-center">
                <div className="group flex h-20 w-20 items-center justify-center rounded-xl border-2 border-[#68a357]/30 bg-white p-3 transition-all hover:border-[#68a357] hover:shadow-md">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="h-full w-full object-contain" 
                    loading="lazy" 
                  />
                </div>
                <p className="mt-2 text-sm font-semibold text-gray-600">{item.title}</p>
              </div>
            ))}
          </div>

          <div className="flex justify-center">
            <a 
              href="tel:8320291588" 
              className="inline-flex w-full items-center justify-center gap-3 rounded-md bg-[#0a3d62] px-6 py-3 text-lg font-bold text-white transition hover:bg-[#082d49] active:scale-95 shadow-lg"
            >
              Talk to an Advisor
            </a>
          </div>
        </div>

      </div>
    </section>

      <TestimonialsSection testimonials={testimonials} />

      {/* BLOG*/}
     
    <section className="bg-site-warm/70 px-5 py-16 lg:px-8">
  <div className="mx-auto max-w-7xl">

    {/* TITLE */}
    <h2 className="text-center text-3xl font-extrabold">
      <span className="text-[#003d63]">Insurance </span>
      <span className="text-[#72b056]">Blogs</span>
    </h2>

    {/* GRID */}
    <div className="mt-10 grid gap-7 lg:grid-cols-3">
      {blogCards.map((blog) => (
        <article
          key={blog.title}
          className="overflow-hidden rounded-lg border border-border/50 bg-card shadow-card"
        >
          <img
            src={blog.image}
            alt={blog.title}
            className="h-56 w-full object-cover"
            loading="lazy"
          />

          <div className="p-6">

            {/* DATE (GREEN) */}
            <p className="font-extrabold text-[#72b056]">
              26 Jul, 2025
            </p>

            {/* TITLE (BLUE) */}
            <h3 className="mt-3 text-2xl font-extrabold text-[#003d63]">
              {blog.title}
            </h3>

            {/* READ MORE (GREEN + BLUE MIX) */}
            <a
              href="#contact"
              className="mt-5 inline-flex items-center gap-2 font-extrabold text-[#72b056] hover:text-[#003d63] transition"
            >
              Read More
              <ArrowRight className="size-4" />
            </a>

          </div>
        </article>
      ))}
    </div>
  </div>
</section>

    </main>
  );
};

export default Index;