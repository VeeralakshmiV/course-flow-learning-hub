
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Star, Quote } from "lucide-react";

interface GoogleReview {
  author_name: string;
  author_url: string;
  language: string;
  profile_photo_url: string;
  rating: number;
  relative_time_description: string;
  text: string;
  time: number;
}

const TestimonialsSection = () => {
  const [reviews, setReviews] = useState<GoogleReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fallback testimonials in case Google Reviews API is not available
  const fallbackTestimonials = [
    {
      author_name: "Priya Sharma",
      rating: 5,
      text: "AlphaFly Computer Education transformed my career! The instructors are incredible and the hands-on approach really helped me land my dream job in web development.",
      relative_time_description: "2 weeks ago",
      profile_photo_url: "/placeholder.svg"
    },
    {
      author_name: "Rohit Kumar",
      rating: 5,
      text: "Best computer training institute in the city! The curriculum is up-to-date with industry standards. Highly recommend for anyone looking to upgrade their tech skills.",
      relative_time_description: "1 month ago",
      profile_photo_url: "/placeholder.svg"
    },
    {
      author_name: "Anjali Patel",
      rating: 5,
      text: "Excellent teaching methodology and great support from the faculty. The practical projects helped me build a strong portfolio. Thank you AlphaFly!",
      relative_time_description: "3 weeks ago",
      profile_photo_url: "/placeholder.svg"
    },
    {
      author_name: "Vikash Singh",
      rating: 5,
      text: "Outstanding experience! The data science course was comprehensive and the instructors were very knowledgeable. Got placed in a top tech company.",
      relative_time_description: "1 week ago",
      profile_photo_url: "/placeholder.svg"
    },
    {
      author_name: "Sneha Reddy",
      rating: 5,
      text: "Amazing learning environment with modern facilities. The course content is well-structured and the placement assistance is excellent.",
      relative_time_description: "2 months ago",
      profile_photo_url: "/placeholder.svg"
    }
  ];

  useEffect(() => {
    fetchGoogleReviews();
  }, []);

  const fetchGoogleReviews = async () => {
    try {
      // Note: In a real implementation, you would need:
      // 1. Google Places API key
      // 2. Your business place_id
      // 3. A backend endpoint to securely handle the API call
      
      // For now, we'll use fallback testimonials
      // To implement Google Reviews API:
      // const response = await fetch(`/api/google-reviews?place_id=YOUR_PLACE_ID`);
      // const data = await response.json();
      // setReviews(data.result.reviews);
      
      // Simulate API delay
      setTimeout(() => {
        setReviews(fallbackTestimonials as GoogleReview[]);
        setLoading(false);
      }, 1000);
      
    } catch (err) {
      console.error('Error fetching Google reviews:', err);
      setError('Failed to load reviews');
      setReviews(fallbackTestimonials as GoogleReview[]);
      setLoading(false);
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400'
        }`}
      />
    ));
  };

  if (loading) {
    return (
      <section className="py-20 bg-gray-800/30 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              What Our <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Students Say</span>
            </h2>
            <div className="flex justify-center items-center space-x-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gray-800/30 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            What Our <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Students Say</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Don't just take our word for it - hear from our successful students who have transformed their careers.
          </p>
        </div>

        <div className="max-w-7xl mx-auto">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {reviews.map((review, index) => (
                <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                  <Card className="group hover:shadow-2xl transition-all duration-700 border-gray-700 bg-gray-800/50 backdrop-blur-sm hover:bg-gray-800/70 transform hover:scale-105 h-full">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4 mb-4">
                        <img
                          src={review.profile_photo_url}
                          alt={review.author_name}
                          className="w-12 h-12 rounded-full object-cover border-2 border-blue-500/30"
                        />
                        <div>
                          <h4 className="font-semibold text-white">{review.author_name}</h4>
                          <p className="text-sm text-gray-400">{review.relative_time_description}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-1 mb-4">
                        {renderStars(review.rating)}
                      </div>
                      
                      <div className="relative">
                        <Quote className="absolute -top-2 -left-2 h-8 w-8 text-blue-400/30" />
                        <p className="text-gray-300 leading-relaxed pl-6 group-hover:text-gray-200 transition-colors">
                          {review.text}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex -left-12 bg-gray-800/80 border-gray-700 text-white hover:bg-gray-700" />
            <CarouselNext className="hidden md:flex -right-12 bg-gray-800/80 border-gray-700 text-white hover:bg-gray-700" />
          </Carousel>
        </div>

        {error && (
          <div className="text-center mt-8">
            <p className="text-gray-400 text-sm">
              Reviews loaded from cache. Connect Google Reviews API for live updates.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default TestimonialsSection;
