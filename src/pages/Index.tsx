
import { useState, useEffect } from "react";
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
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    <div className="min-h-screen bg-gray-900 text-white overflow-x-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900/20 to-purple-900/20"></div>
        <div className="absolute inset-0 opacity-30">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-blue-400 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-gray-900/95 backdrop-blur-md border-b border-gray-800 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3 animate-fade-in">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center transform hover:scale-110 transition-transform duration-300">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                AlphaFly Computer Education
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#home" className="text-gray-300 hover:text-blue-400 transition-all duration-300 relative group">
                Home
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a href="#courses" className="text-gray-300 hover:text-blue-400 transition-all duration-300 relative group">
                Courses
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a href="#about" className="text-gray-300 hover:text-blue-400 transition-all duration-300 relative group">
                About
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a href="#contact" className="text-gray-300 hover:text-blue-400 transition-all duration-300 relative group">
                Contact
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
              </a>
              
              {/* Login Portals */}
              <div className="flex items-center space-x-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentRole('admin')}
                  className="border-blue-500 text-blue-400 hover:bg-blue-500/10 hover:scale-105 transition-all duration-300"
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Admin/Staff Login
                </Button>
                <Button
                  size="sm"
                  onClick={() => setCurrentRole('student')}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 hover:scale-105 transition-all duration-300 shadow-lg shadow-blue-500/25"
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
                className="text-gray-300 hover:text-white"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-800 animate-fade-in">
              <div className="flex flex-col space-y-4">
                <a href="#home" className="text-gray-300 hover:text-blue-400 transition-colors">Home</a>
                <a href="#courses" className="text-gray-300 hover:text-blue-400 transition-colors">Courses</a>
                <a href="#about" className="text-gray-300 hover:text-blue-400 transition-colors">About</a>
                <a href="#contact" className="text-gray-300 hover:text-blue-400 transition-colors">Contact</a>
                <div className="flex flex-col space-y-2 pt-4 border-t border-gray-800">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentRole('admin')}
                    className="justify-start border-blue-500 text-blue-400 hover:bg-blue-500/10"
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    Admin/Staff Login
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => setCurrentRole('student')}
                    className="justify-start bg-gradient-to-r from-blue-500 to-purple-600"
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

      {/* Hero Section with Parallax */}
      <section id="home" className="relative pt-20 pb-32 overflow-hidden">
        <div 
          className="absolute inset-0 z-0"
          style={{
            transform: `translateY(${scrollY * 0.5}px)`
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/10 to-gray-900"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-20">
            <div className="inline-flex items-center space-x-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-6 py-2 mb-6 animate-fade-in">
              <Sparkles className="h-4 w-4 text-blue-400" />
              <span className="text-blue-400 text-sm font-medium">Transform Your Future</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-8 animate-fade-in">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-blue-600 bg-clip-text text-transparent">
                AlphaFly
              </span>
              <br />
              <span className="text-white">Computer Education</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto mb-12 animate-fade-in leading-relaxed">
              Master cutting-edge technologies with our expert-led courses. From programming to data science, 
              we provide comprehensive training to launch your tech career into the stratosphere.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center animate-fade-in">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 hover:scale-105 transition-all duration-300 text-lg px-8 py-4 shadow-2xl shadow-blue-500/25"
              >
                Explore Courses
                <ChevronRight className="ml-2 h-6 w-6" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-blue-500 text-blue-400 hover:bg-blue-500/10 hover:scale-105 transition-all duration-300 text-lg px-8 py-4"
              >
                Watch Demo
                <Play className="ml-2 h-6 w-6" />
              </Button>
            </div>
          </div>

          {/* Hero Videos Section */}
          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {heroVideos.map((video, index) => (
              <Card 
                key={video.id} 
                className="group hover:shadow-2xl transition-all duration-700 border-0 bg-gray-800/50 backdrop-blur-sm hover:bg-gray-800/70 transform hover:scale-105 hover:-translate-y-2"
                style={{
                  animationDelay: `${index * 200}ms`
                }}
              >
                <CardContent className="p-0">
                  <div className="relative overflow-hidden rounded-lg">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent group-hover:from-gray-900/60 transition-all duration-500 flex items-center justify-center">
                      <div className="flex items-center space-x-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                        <Button
                          size="lg"
                          className="bg-blue-600/80 backdrop-blur-sm hover:bg-blue-600 border border-blue-400/30 shadow-lg shadow-blue-500/25"
                        >
                          <Play className="h-6 w-6 text-white" />
                        </Button>
                        <Button
                          size="lg"
                          variant="outline"
                          className="bg-purple-600/80 backdrop-blur-sm hover:bg-purple-600 border border-purple-400/30 text-white hover:text-white shadow-lg shadow-purple-500/25"
                          onClick={() => window.open(video.instagramUrl, '_blank')}
                        >
                          <Instagram className="h-6 w-6" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-semibold text-white group-hover:text-blue-400 transition-colors text-lg">
                      {video.title}
                    </h3>
                    <p className="text-sm text-gray-400 mt-2 flex items-center">
                      <Instagram className="h-4 w-4 mr-2" />
                      Watch on Instagram →
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section with Parallax */}
      <section 
        className="py-20 relative overflow-hidden"
        style={{
          transform: `translateY(${scrollY * 0.3}px)`
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className="text-center group hover:scale-110 transition-all duration-500"
                style={{
                  animationDelay: `${index * 100}ms`
                }}
              >
                <div className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">
                  {stat.number}
                </div>
                <div className="text-gray-300 text-lg group-hover:text-white transition-colors">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-800/30 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 animate-fade-in">
              Why Choose <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">AlphaFly?</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto animate-fade-in">
              We provide world-class education with industry-relevant curriculum and hands-on experience.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="group hover:shadow-2xl transition-all duration-500 border-gray-700 bg-gray-800/50 backdrop-blur-sm hover:bg-gray-800/70 transform hover:scale-105 hover:-translate-y-2"
                style={{
                  animationDelay: `${index * 150}ms`
                }}
              >
                <CardContent className="p-8 text-center">
                  <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg shadow-blue-500/25">
                    <feature.icon className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-blue-400 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300 group-hover:text-gray-200 transition-colors">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section id="courses" className="py-20 bg-gray-900 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Popular <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Courses</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Choose from our comprehensive range of courses designed to meet industry demands.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course, index) => (
              <Card 
                key={index} 
                className="group hover:shadow-2xl transition-all duration-700 border-gray-700 bg-gray-800/50 backdrop-blur-sm overflow-hidden transform hover:scale-105 hover:-translate-y-2"
                style={{
                  animationDelay: `${index * 200}ms`
                }}
              >
                <div className="h-2 bg-gradient-to-r from-blue-500 to-purple-600 group-hover:h-3 transition-all duration-300"></div>
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-4">
                    <Badge variant="secondary" className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                      {course.level}
                    </Badge>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm text-gray-300">{course.rating}</span>
                    </div>
                  </div>
                  <CardTitle className="group-hover:text-blue-400 transition-colors text-white text-xl">
                    {course.title}
                  </CardTitle>
                  <CardDescription className="text-gray-300">
                    {course.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Duration:</span>
                      <span className="font-medium text-white">{course.duration}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Students:</span>
                      <span className="font-medium text-white">{course.students}+</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">{course.price}</span>
                      <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 hover:scale-105 transition-all duration-300 shadow-lg shadow-blue-500/25">
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
      <section className="py-20 bg-gradient-to-r from-blue-600/20 to-purple-600/20 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Start Your <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Journey?</span>
          </h2>
          <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
            Join thousands of students who have transformed their careers with AlphaFly Computer Education.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-gray-900 hover:bg-gray-100 hover:scale-105 transition-all duration-300 text-lg px-8 py-4 shadow-2xl"
            >
              Get Started Today
              <ChevronRight className="ml-2 h-6 w-6" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white/10 hover:scale-105 transition-all duration-300 text-lg px-8 py-4"
            >
              Contact Us
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-16 relative">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="animate-fade-in">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <BookOpen className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-bold">AlphaFly</span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Empowering minds through quality computer education and practical training for a digital future.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-6 text-lg">Quick Links</h3>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#home" className="hover:text-blue-400 transition-colors">Home</a></li>
                <li><a href="#courses" className="hover:text-blue-400 transition-colors">Courses</a></li>
                <li><a href="#about" className="hover:text-blue-400 transition-colors">About</a></li>
                <li><a href="#contact" className="hover:text-blue-400 transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-6 text-lg">Courses</h3>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#" className="hover:text-blue-400 transition-colors">Web Development</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Data Science</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Digital Marketing</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Programming</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-6 text-lg">Contact Info</h3>
              <ul className="space-y-3 text-gray-400">
                <li>📍 Your Address Here</li>
                <li>📞 +91 XXXXX XXXXX</li>
                <li>✉️ info@alphaflyeducation.com</li>
                <li>
                  <a href="https://instagram.com/alphaflyeducation" className="hover:text-blue-400 transition-colors flex items-center">
                    <Instagram className="h-4 w-4 mr-2" />
                    Follow us on Instagram
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 AlphaFly Computer Education. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
