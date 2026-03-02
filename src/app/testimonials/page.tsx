import { Quote, Star, Video, Play } from "lucide-react";

const TESTIMONIALS = [
  {
    name: "Dr. Sarah Chen",
    title: "Medical Director",
    practice: "Elite Aesthetic Center",
    location: "Beverly Hills, CA",
    quote: "The transformation was unbelievable. Within 60 days, our front desk started reporting that patients were finding us through ChatGPT. By day 90, we had to hire an additional patient coordinator just to handle the influx.",
    results: "+340% AI visibility",
    rating: 5,
    image: "SC",
  },
  {
    name: "Dr. Marcus Rodriguez",
    title: "Practice Owner",
    practice: "Miami Implant Specialists",
    location: "Miami, FL",
    quote: "Around day 45, something shifted. We started getting calls from patients saying, 'ChatGPT recommended you.' By month 4, our consultation calendar was fully booked 3 weeks out. We've since expanded our surgical team.",
    results: "$3.4M loss prevented",
    rating: 5,
    image: "MR",
  },
  {
    name: "Jennifer Walsh",
    title: "Marketing Director",
    practice: "Radiance MedSpa Network",
    location: "California (6 locations)",
    quote: "The key was treating each location as both independent AND connected. The GEO strategy understood that nuance. AI-referred patients now represent 34% of our new consultations with the highest conversion rates.",
    results: "400% ROI achieved",
    rating: 5,
    image: "JW",
  },
  {
    name: "Dr. Emily Park",
    title: "Board Certified Dermatologist",
    practice: "Park Dermatology & Aesthetics",
    location: "San Francisco, CA",
    quote: "I was skeptical at first—SEO has always been a black box for me. But when I asked Perplexity about the best dermatologist in SF and saw my competitor recommended instead of me, I knew we had a problem. StackMatrices fixed that in 4 months.",
    results: "#1 AI recommendation",
    rating: 5,
    image: "EP",
  },
  {
    name: "Dr. James Morrison",
    title: "Oral & Maxillofacial Surgeon",
    practice: "NYC Dental Implant Center",
    location: "New York, NY",
    quote: "The quality of AI-referred patients is exceptional. They come in already educated about implants, knowing our credentials, and ready to proceed. Our close rate went from 45% to 78% with these leads.",
    results: "78% close rate",
    rating: 5,
    image: "JM",
  },
  {
    name: "Lisa Thompson",
    title: "CEO",
    practice: "Glow MedSpa Group",
    location: "Texas (4 locations)",
    quote: "We've worked with 3 other marketing agencies before. None of them understood AI visibility like StackMatrices. Their systematic approach to GEO has transformed how we acquire patients across all locations.",
    results: "186 AI referrals/mo",
    rating: 5,
    image: "LT",
  },
];

const VIDEO_TESTIMONIALS = [
  {
    title: "How We Captured $2M in AI Traffic",
    practice: "Premier Plastic Surgery",
    duration: "3:24",
    thumbnail: "Video 1",
  },
  {
    title: "From Invisible to #1 in 90 Days",
    practice: "LA Dental Specialists",
    duration: "4:15",
    thumbnail: "Video 2",
  },
  {
    title: "Multi-Location GEO Strategy",
    practice: "Texas MedSpa Network",
    duration: "5:30",
    thumbnail: "Video 3",
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-600"}`}
        />
      ))}
    </div>
  );
}

export default function TestimonialsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-navy via-navy-light to-navy-dark text-white py-16 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-primary text-sm font-semibold tracking-widest uppercase mb-4">
            Testimonials
          </p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Trusted by Medical Leaders
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            See how practices like yours have transformed their patient acquisition 
            through strategic GEO implementation.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {[
            { value: "50+", label: "Practices Served" },
            { value: "$12M+", label: "Revenue Recovered" },
            { value: "4.9/5", label: "Client Rating" },
            { value: "89%", label: "Avg Improvement" },
          ].map((stat, idx) => (
            <div key={idx} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20">
              <div className="text-3xl font-bold text-primary mb-1">{stat.value}</div>
              <div className="text-sm text-gray-300">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Video Testimonials */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
            <Video className="w-6 h-6 text-primary" />
            Video Stories
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {VIDEO_TESTIMONIALS.map((video, idx) => (
              <div
                key={idx}
                className="group relative bg-white/5 border border-white/10 rounded-xl overflow-hidden cursor-pointer hover:border-primary/50 transition-colors"
              >
                <div className="aspect-video bg-gradient-to-br from-primary/20 to-navy flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Play className="w-8 h-8 text-white ml-1" />
                  </div>
                </div>
                <div className="absolute bottom-2 right-2 bg-black/70 px-2 py-1 rounded text-xs">
                  {video.duration}
                </div>
                
                <div className="p-4">
                  <h3 className="font-semibold mb-1">{video.title}</h3>
                  <p className="text-sm text-gray-400">{video.practice}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quote Testimonials */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TESTIMONIALS.map((testimonial, idx) => (
            <div
              key={idx}
              className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors"
            >
              <div className="flex items-start justify-between mb-4">
                <Quote className="w-8 h-8 text-primary/50" />
                <StarRating rating={testimonial.rating} />
              </div>
              
              <p className="text-gray-300 mb-6 italic">"{testimonial.quote}"...</p>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-primary font-bold">{testimonial.image}</span>
                </div>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-gray-400">{testimonial.title}</p>
                  <p className="text-xs text-primary">{testimonial.practice}</p>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-white/10">
                <span className="text-sm text-primary font-semibold">{testimonial.results}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
