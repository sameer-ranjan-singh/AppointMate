import TestimonialCarousel from "@/components/TestimonialCarousel";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Calendar, Clock, LinkIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const features = [
  {
    icon: Calendar,
    title: "Create Events",
    description: "Easily set up and customize your event types",
  },
  {
    icon: Clock,
    title: "Manage Availability",
    description: "Define your availability to streamline appointment",
  },
  {
    icon: LinkIcon,
    title: "Custom Links",
    description: "Share your personalised appointment link",
  },
];

const howItWorks = [
  {
    step: "Sign Up",
    description: "Create your free Appointment account",
  },
  {
    step: "Set Availability",
    description: "Define when you're available for meeting",
  },
  {
    step: "Share your Link",
    description: "Send your appointment link to clients or colleagues",
  },
  {
    step: "Get Booked",
    description: "Receive confirmation for new appointments automatically",
  },
];

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-16">
      <div className="flex flex-col md:flex-row item-center justify-between gap-12 mb-24">
        <div className="lg:w-1/2">
          <h1 className="text-6xl md:text-7xl font-extrabold pb-6 gradient-title">
            Simplify your Appointment
          </h1>
          <p className="text-lg text-gray-600 mb-10">
            Appointmate helps you manage your time effectively. Create events,
            set your availability, and let other book time with you seamlessly
          </p>
          <Link href="/dashboard">
            <Button size="lg" className="text-lg">
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
        <div className="lg:w-1/2 flex justify-center">
          <div className="relative w-full max-w-md aspect-square">
            <Image
              src={"/meeting.svg"}
              alt="Appointment illustration"
              layout="fill"
              objectFit="contain"
            />
          </div>
        </div>
      </div>
      {/* Key Features */}
      <div className="mb-24">
        <h2 className="text-xl md:text-3xl font-bold text-center mb-12 text-orange-600">
          Key Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            return (
                <Card key={index}>
                  <CardHeader>
                    <feature.icon className="w-12 h-12 text-orange-500 mb-4 mx-auto" />
                    <CardTitle className="text-center text-orange-500">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-center text-gray-600">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
            );
          })}
        </div>
      </div>
      {/* Testimonial */}
      <div className="mb-24">
        <h2 className="text-xl md:text-3xl font-bold text-center mb-12 text-orange-600">
          What Our Users Say
        </h2>
        <TestimonialCarousel />
      </div>
      {/*How it works */}
      <div className="mb-24">
        <h2 className="text-xl md:text-3xl font-bold text-center mb-12 text-orange-600">
          How it works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {howItWorks.map((work, index) => (
            <div key={index} className="text-center">
              <div className="bg-orange-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-orange-600 font-bold text-xl">
                  {index + 1}
                </span>
              </div>
              <h3 className="font-semibold text-lg mb-2">{work.step}</h3>
              <p className="text-gray-600">{work.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-orange-600 text-white rounded-lg p-8 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to simplify your Appointment?</h2>
        <p className="text-xl mb-6">
          Join thousand of professionals who trust AppointMate for efficient
          time management.
        </p>
        <Link href="/dashboard">
          <Button size="lg" variant="secondary" className="text-orange-600">
            Start For Free
            <ArrowRight className="ml-2 h-5 w-5"/>
            </Button>
        </Link>
      </div>
    </main>
  );
}
