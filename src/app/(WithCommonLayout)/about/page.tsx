import { Card, CardBody } from "@nextui-org/card";
import { Heart, Newspaper, PawPrintIcon as Paw, Users } from "lucide-react";
import Image from "next/image";

import SignUp from "@/src/components/UI/SignUp";

export default function About() {
  return (
    <section className="py-32 bg-gradient-to-l from-blue-200 to-pink-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-8">
        <section className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">About Paw Prints & Tales</h1>
          <p className="text-xl text-gray-600">
            Nurturing pets, sharing stories, building a community of animal
            lovers.
          </p>
        </section>

        <section className="mb-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-semibold mb-4">
                Our Mission & Vision
              </h2>
              <p className="text-gray-600 mb-4">
                At Paw Prints & Tales, we&apos;re passionate about enhancing the
                lives of pets and their humans through expert advice,
                heartwarming stories, and a supportive community.
              </p>
              <p className="text-gray-600">
                We envision a world where every pet receives the love, care, and
                understanding they deserve, and where pet owners are empowered
                with knowledge and support.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardBody className="flex flex-col items-center justify-center p-6">
                  <Paw className="h-12 w-12 text-primary mb-2" />
                  <h3 className="font-semibold">Expert Care</h3>
                </CardBody>
              </Card>
              <Card>
                <CardBody className="flex flex-col items-center justify-center p-6">
                  <Heart className="h-12 w-12 text-primary mb-2" />
                  <h3 className="font-semibold">Loving Support</h3>
                </CardBody>
              </Card>
              <Card>
                <CardBody className="flex flex-col items-center justify-center p-6">
                  <Users className="h-12 w-12 text-primary mb-2" />
                  <h3 className="font-semibold">Community</h3>
                </CardBody>
              </Card>
              <Card>
                <CardBody className="flex flex-col items-center justify-center p-6">
                  <Newspaper className="h-12 w-12 text-primary mb-2" />
                  <h3 className="font-semibold">Inspiring Stories</h3>
                </CardBody>
              </Card>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-6 text-center">
            Meet Our Team
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Dr. John Doe",
                role: "Veterinarian & Founder",
                image: "/dr1.png",
              },
              {
                name: "Sam Thompson",
                role: "Pet Behavior Specialist",
                image: "/dr1.jpeg",
              },
              {
                name: "Olivia Chen",
                role: "Content Creator & Pet Enthusiast",
                image: "/dr1.jpg",
              },
            ].map((member) => (
              <Card key={member.name}>
                <CardBody className="flex flex-col items-center p-6">
                  <Image
                    alt={member.name}
                    className="rounded-full mb-4"
                    height={120}
                    src={member.image}
                    width={120}
                  />
                  <h3 className="font-semibold text-lg">{member.name}</h3>
                  <p className="text-gray-600">{member.role}</p>
                </CardBody>
              </Card>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-semibold mb-4">Our Blog</h2>
            <p className="text-gray-600 mb-6">
              Paw Prints & Tales is more than just a blog—it&apos;s a treasure
              trove of pet care wisdom, heartwarming stories, and a platform for
              pet lovers to connect and share their experiences.
            </p>
          </div>
        </section>

        <section className="text-center">
          <h2 className="text-3xl font-semibold mb-4">Join Our Community</h2>
          <p className="text-gray-600 mb-6">
            Have a tale to tell or seeking advice? We&apos;d love to hear from
            you! Join our community of pet enthusiasts and make a difference in
            the lives of pets everywhere.
          </p>
          <SignUp />
        </section>
      </div>
    </section>
  );
}
