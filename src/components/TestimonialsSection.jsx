import { useEffect, useState } from "react";
import { Quote, Star } from "lucide-react";

const TestimonialsSection = ({ testimonials }) => {
  const [index, setIndex] = useState(0);

  const itemsPerView = 3;

  // Auto slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) =>
        prev + itemsPerView >= testimonials.length ? 0 : prev + itemsPerView
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [testimonials.length]); 

  // Get current 3 cards
  const visibleTestimonials = testimonials.slice(
    index,
    index + itemsPerView
  );

  // If less than 3 (end case), wrap around
  const filledTestimonials =
    visibleTestimonials.length < itemsPerView
      ? [...visibleTestimonials, ...testimonials.slice(0, itemsPerView - visibleTestimonials.length)]
      : visibleTestimonials;

  return (
    <section className="bg-gray-50 py-20 px-5">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h2 className="text-4xl font-bold text-[#213591]">
          Our Customers <span className="text-[#E8021E]">Love Us</span>
        </h2>
      </div>

      {/* SLIDER WRAPPER */}
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-700">
        {filledTestimonials.map((t, i) => (
          <div
            key={i}
            className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center relative"
          >
            {/* Quote Icon */}
            <Quote
              className="text-gray-100 fill-gray-100 absolute top-6"
              size={40}
            />

            {/* Quote */}
            <p className="mt-10 mb-8 text-gray-700 leading-relaxed font-medium">
              "{t.quote}"
            </p>

            {/* Stars */}
            <div className="flex text-yellow-400 mb-6">
              {[...Array(5)].map((_, starIndex) => (
                <Star key={starIndex} size={18} fill="currentColor" />
              ))}
            </div>

            {/* Profile */}
            <div className="flex items-center gap-4 text-left">
              <img
                src={t.image}
                alt={t.name}
                className="w-14 h-14 rounded-full object-cover shadow-md"
              />
              <div>
                <h4 className="font-bold text-gray-800 text-lg">{t.name}</h4>
                <p className="text-gray-500 text-sm">{t.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TestimonialsSection;