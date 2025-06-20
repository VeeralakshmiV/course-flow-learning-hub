
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, BookOpen, GraduationCap, Settings, ChevronRight, Sparkles, Menu, X, Play, Instagram, Star, Award, Clock, CheckCircle } from "lucide-react";
import AdminDashboard from "@/components/dashboards/AdminDashboard";
import StaffDashboard from "@/components/dashboards/StaffDashboard";
import StudentDashboard from "@/components/dashboards/StudentDashboard";

type UserRole = 'admin' | 'staff' | 'student' | null;

const Index = () => {
  const [currentRole, setCurrentRole] = useState<UserRole>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  if (currentRole) {
    switch (currentRole) {
      case 'admin':
        return <AdminDashboard onLogout={() => setCurrentRole(null)} />;
      case 'staff':
        return <StaffDashboard onLogout={() => setCurrentRole(null)} />;
      case 'student':
        return <StudentDashboard onLogout={() => setCurrentRole(null)} />;
    }
  }

  const heroVideos = [
    {
      id: 1,
      title: "Programming Fundamentals",
      thumbnail: "/placeholder.svg",
      instagramUrl: "https://instagram.com/alphaflyeducation"
    },
    {
      id: 2,
      title: "Web Development Mastery",
      thumbnail: "/placeholder.svg",
      instagramUrl: "https://instagram.com/alphaflyeducation"
    },
    {
      id: 3,
      title: "Data Science Excellence",
      thumbnail: "/placeholder.svg",
      instagramUrl: "https://instagram.com/alphaflyeducation"
    }
  ];

  const features = [
    {
      icon: BookOpen,
      title: "Expert-Led Courses",
      description: "Learn from industry professionals with real-world experience"
    },
    {
      icon: Award,
      title: "Certified Programs",
      description: "Get industry-recognized certifications upon completion"
    },
    {
      icon: Clock,
      title: "Flexible Learning",
      description: "Study at your own pace with 24/7 access to materials"
    },
    {
      icon: Users,
      title: "Community Support",
      description: "Join a vibrant community of learners and mentors"
    }
  ];

  const stats = [
    { number: "5000+", label: "Students Trained" },
    { number: "50+", label: "Expert Instructors" },
    { number: "100+", label: "Courses Available" },
    { number: "95%", label: "Success Rate" }
  ];

  const courses = [
    {
      title: "Full Stack Web Development",
      description: "Master modern web technologies including React, Node.js, and databases",
      duration: "6 months",
      level: "Beginner to Advanced",
      price: "₹25,000",
      rating: 4.9,
      students: 1200
    },
    {
      title: "Data Science & Analytics",
      description: "Learn Python, Machine Learning, and data visualization techniques",
      duration: "8 months",
      level: "Intermediate",
      price: "₹30,000",
      rating: 4.8,
      students: 800
    },
    {
      title: "Digital Marketing",
      description: "Complete digital marketing including SEO, SEM, and social media",
      duration: "4 months",
      level: "Beginner",
      price: "₹15,000",
      rating: 4.7,
      students: 950
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-md border-b border-gray-200 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                AlphaFly Computer Education
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#home" className="text-gray-700 hover:text-blue-600 transition-colors">Home</a>
              <a href="#courses" className="text-gray-700 hover:text-blue-600 transition-colors">Courses</a>
              <a href="#about" className="text-gray-700 hover:text-blue-600 transition-colors">About</a>
              <a href="#contact" className="text-gray-700 hover:text-blue-600 transition-colors">Contact</a>
              
              {/* Login Portals */}
              <div className="flex items-center space-x-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentRole('admin')}
                  className="border-blue-600 text-blue-600 hover:bg-blue-50"
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Admin/Staff Login
                </Button>
                <Button
                  size="sm"
                  onClick={() => setCurrentRole('student')}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  <GraduationCap className="h-4 w-4 mr-2" />
                  Student Portal
                </Button>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-200">
              <div className="flex flex-col space-y-4">
                <a href="#home" className="text-gray-700 hover:text-blue-600 transition-colors">Home</a>
                <a href="#courses" className="text-gray-700 hover:text-blue-600 transition-colors">Courses</a>
                <a href="#about" className="text-gray-700 hover:text-blue-600 transition-colors">About</a>
                <a href="#contact" className="text-gray-700 hover:text-blue-600 transition-colors">Contact</a>
                <div className="flex flex-col space-y-2 pt-4 border-t border-gray-200">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentRole('admin')}
                    className="justify-start"
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    Admin/Staff Login
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => setCurrentRole('student')}
                    className="justify-start bg-gradient-to-r from-blue-600 to-purple-600"
                  >
                    <GraduationCap className="h-4 w-4 mr-2" />
                    Student Portal
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-20 pb-16 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
              Transform Your Future with
              <br />
              AlphaFly Computer Education
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Master cutting-edge technologies with our expert-led courses. From programming to data science, 
              we provide comprehensive training to launch your tech career.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                Explore Courses
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                Watch Demo
                <Play className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Hero Videos Section */}
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {heroVideos.map((video, index) => (
              <Card key={video.id} className="group hover:shadow-xl transition-all duration-500 border-0 bg-white/80 backdrop-blur-sm">
                <CardContent className="p-0">
                  <div className="relative overflow-hidden rounded-lg">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                      <div className="flex items-center space-x-4">
                        <Button
                          size="lg"
                          className="bg-white/20 backdrop-blur-sm hover:bg-white/30 border border-white/30"
                        >
                          <Play className="h-6 w-6 text-white" />
                        </Button>
                        <Button
                          size="lg"
                          variant="outline"
                          className="bg-white/20 backdrop-blur-sm hover:bg-white/30 border border-white/30 text-white hover:text-white"
                          onClick={() => window.open(video.instagramUrl, '_blank')}
                        >
                          <Instagram className="h-6 w-6" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {video.title}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Watch on Instagram →
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-blue-100">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose AlphaFly?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We provide world-class education with industry-relevant curriculum and hands-on experience.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-0 bg-white">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section id="courses" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Popular Courses
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose from our comprehensive range of courses designed to meet industry demands.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-500 border-0 bg-white overflow-hidden">
                <div className="h-2 bg-gradient-to-r from-blue-600 to-purple-600"></div>
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary" className="bg-blue-50 text-blue-600">
                      {course.level}
                    </Badge>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm text-gray-600">{course.rating}</span>
                    </div>
                  </div>
                  <CardTitle className="group-hover:text-blue-600 transition-colors">
                    {course.title}
                  </CardTitle>
                  <CardDescription>
                    {course.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Duration:</span>
                      <span className="font-medium">{course.duration}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Students:</span>
                      <span className="font-medium">{course.students}+</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-blue-600">{course.price}</span>
                      <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                        Enroll Now
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of students who have transformed their careers with AlphaFly Computer Education.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              Get Started Today
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              Contact Us
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <BookOpen className="h-5 w-5 text-white" />
                </div>
                <span className="text-lg font-bold">AlphaFly</span>
              </div>
              <p className="text-gray-400">
                Empowering minds through quality computer education and practical training.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#home" className="hover:text-white transition-colors">Home</a></li>
                <li><a href="#courses" className="hover:text-white transition-colors">Courses</a></li>
                <li><a href="#about" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Courses</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Web Development</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Data Science</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Digital Marketing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Programming</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Contact Info</h3>
              <ul className="space-y-2 text-gray-400">
                <li>📍 Your Address Here</li>
                <li>📞 +91 XXXXX XXXXX</li>
                <li>✉️ info@alphaflyeducation.com</li>
                <li>
                  <a href="https://instagram.com/alphaflyeducation" className="hover:text-white transition-colors flex items-center">
                    <Instagram className="h-4 w-4 mr-2" />
                    Follow us on Instagram
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 AlphaFly Computer Education. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
