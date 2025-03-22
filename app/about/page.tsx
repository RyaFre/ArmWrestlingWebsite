import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function TrainingPage() {
  return (
    <main className="flex flex-col min-h-screen">
      <section className="bg-primary-foreground py-12">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-start gap-4">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-primary">
              Training Guides & Resources
            </h1>
            <p className="max-w-[700px] text-muted-foreground md:text-xl">
              Comprehensive training techniques and strategies from professional arm wrestlers and coaches.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 lg:py-20">
        <div className="container px-4 md:px-6">
          <Tabs defaultValue="beginners" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="beginners">Beginners</TabsTrigger>
              <TabsTrigger value="intermediate">Intermediate</TabsTrigger>
              <TabsTrigger value="advanced">Advanced</TabsTrigger>
            </TabsList>
            <TabsContent value="beginners" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden">
                  <Image
                    src="https://images.pexels.com/photos/6456160/pexels-photo-6456160.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                    alt="Beginner arm wrestling training"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold text-primary">Getting Started with Arm Wrestling</h2>
                  <p className="text-muted-foreground">
                    New to arm wrestling? Our beginner's guide covers all the fundamentals you need to know to start
                    your journey in this exciting sport.
                  </p>
                  <div className="space-y-2">
                    <h3 className="font-semibold text-primary">What You'll Learn:</h3>
                    <ul className="space-y-1 list-disc list-inside text-muted-foreground">
                      <li>Proper arm wrestling stance and grip techniques</li>
                      <li>Basic rules and regulations</li>
                      <li>Essential safety practices to prevent injuries</li>
                      <li>Fundamental training exercises for beginners</li>
                      <li>Understanding leverage and body positioning</li>
                    </ul>
                  </div>
                  <Button className="mt-4">View Full Guide</Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                <Card>
                  <CardContent className="p-6 space-y-4">
                    <div className="relative h-[200px] rounded-md overflow-hidden mb-4">
                      <Image
                        src="https://images.pexels.com/photos/4164757/pexels-photo-4164757.jpeg?auto=compress&cs=tinysrgb&w=800"
                        alt="Basic grip training"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <h3 className="text-xl font-bold text-primary">Basic Grip Training</h3>
                    <p className="text-sm text-muted-foreground">
                      Learn the fundamental grip exercises that build the foundation for arm wrestling success.
                    </p>
                    <Button variant="outline" className="w-full">
                      Watch Video
                    </Button>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 space-y-4">
                    <div className="relative h-[200px] rounded-md overflow-hidden mb-4">
                      <Image
                        src="https://images.pexels.com/photos/6456303/pexels-photo-6456303.jpeg?auto=compress&cs=tinysrgb&w=800"
                        alt="Proper form and technique"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <h3 className="text-xl font-bold text-primary">Proper Form & Technique</h3>
                    <p className="text-sm text-muted-foreground">
                      Master the correct stance, grip, and body positioning for effective and safe arm wrestling.
                    </p>
                    <Button variant="outline" className="w-full">
                      Read Guide
                    </Button>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 space-y-4">
                    <div className="relative h-[200px] rounded-md overflow-hidden mb-4">
                      <Image
                        src="https://images.pexels.com/photos/4498603/pexels-photo-4498603.jpeg?auto=compress&cs=tinysrgb&w=800"
                        alt="Beginner workout routine"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <h3 className="text-xl font-bold text-primary">Beginner Workout Routine</h3>
                    <p className="text-sm text-muted-foreground">
                      Follow our 4-week starter program designed specifically for new arm wrestlers.
                    </p>
                    <Button variant="outline" className="w-full">
                      Get Workout Plan
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="intermediate" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden">
                  <Image
                    src="https://images.pexels.com/photos/6456159/pexels-photo-6456159.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                    alt="Intermediate arm wrestling training"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold text-primary">Advancing Your Arm Wrestling Skills</h2>
                  <p className="text-muted-foreground">
                    Ready to take your arm wrestling to the next level? Our intermediate guide focuses on developing
                    specialized techniques and building targeted strength.
                  </p>
                  <div className="space-y-2">
                    <h3 className="font-semibold text-primary">What You'll Learn:</h3>
                    <ul className="space-y-1 list-disc list-inside text-muted-foreground">
                      <li>Advanced grip and wrist control techniques</li>
                      <li>Specialized training for side pressure and top pressure</li>
                      <li>Strategic approaches to different opponent styles</li>
                      <li>Periodization training for competition preparation</li>
                      <li>Recovery methods for intensive training</li>
                    </ul>
                  </div>
                  <Button className="mt-4">View Full Guide</Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                <Card>
                  <CardContent className="p-6 space-y-4">
                    <div className="relative h-[200px] rounded-md overflow-hidden mb-4">
                      <Image
                        src="https://images.pexels.com/photos/4162487/pexels-photo-4162487.jpeg?auto=compress&cs=tinysrgb&w=800"
                        alt="Advanced grip techniques"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <h3 className="text-xl font-bold text-primary">Advanced Grip Techniques</h3>
                    <p className="text-sm text-muted-foreground">
                      Specialized exercises to develop crushing, pinching, and supporting grip strength.
                    </p>
                    <Button variant="outline" className="w-full">
                      Watch Video
                    </Button>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 space-y-4">
                    <div className="relative h-[200px] rounded-md overflow-hidden mb-4">
                      <Image
                        src="https://images.pexels.com/photos/4162451/pexels-photo-4162451.jpeg?auto=compress&cs=tinysrgb&w=800"
                        alt="Tactical training"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <h3 className="text-xl font-bold text-primary">Tactical Training</h3>
                    <p className="text-sm text-muted-foreground">
                      Learn to analyze opponents and develop strategic approaches to different arm wrestling styles.
                    </p>
                    <Button variant="outline" className="w-full">
                      Read Guide
                    </Button>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 space-y-4">
                    <div className="relative h-[200px] rounded-md overflow-hidden mb-4">
                      <Image
                        src="https://images.pexels.com/photos/4397840/pexels-photo-4397840.jpeg?auto=compress&cs=tinysrgb&w=800"
                        alt="Intermediate workout routine"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <h3 className="text-xl font-bold text-primary">8-Week Power Program</h3>
                    <p className="text-sm text-muted-foreground">
                      Follow our comprehensive training program designed to build arm wrestling-specific strength.
                    </p>
                    <Button variant="outline" className="w-full">
                      Get Workout Plan
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="advanced" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden">
                  <Image
                    src="https://images.pexels.com/photos/8111311/pexels-photo-8111311.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                    alt="Advanced arm wrestling training"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold text-primary">Elite Arm Wrestling Training</h2>
                  <p className="text-muted-foreground">
                    For serious competitors and professional arm wrestlers, our advanced training resources provide
                    cutting-edge techniques and strategies.
                  </p>
                  <div className="space-y-2">
                    <h3 className="font-semibold text-primary">What You'll Learn:</h3>
                    <ul className="space-y-1 list-disc list-inside text-muted-foreground">
                      <li>Competition-specific peaking programs</li>
                      <li>Advanced biomechanical analysis of technique</li>
                      <li>Mental preparation and psychological strategies</li>
                      <li>Injury prevention and rehabilitation protocols</li>
                      <li>Nutrition and supplementation for elite performance</li>
                    </ul>
                  </div>
                  <Button className="mt-4">View Full Guide</Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                <Card>
                  <CardContent className="p-6 space-y-4">
                    <div className="relative h-[200px] rounded-md overflow-hidden mb-4">
                      <Image
                        src="https://images.pexels.com/photos/6456147/pexels-photo-6456147.jpeg?auto=compress&cs=tinysrgb&w=800"
                        alt="Competition preparation"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <h3 className="text-xl font-bold text-primary">Competition Preparation</h3>
                    <p className="text-sm text-muted-foreground">
                      Complete guide to peaking for tournaments with specialized training cycles.
                    </p>
                    <Button variant="outline" className="w-full">
                      Watch Video
                    </Button>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 space-y-4">
                    <div className="relative h-[200px] rounded-md overflow-hidden mb-4">
                      <Image
                        src="https://images.pexels.com/photos/4164761/pexels-photo-4164761.jpeg?auto=compress&cs=tinysrgb&w=800"
                        alt="Elite techniques"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <h3 className="text-xl font-bold text-primary">Elite Techniques</h3>
                    <p className="text-sm text-muted-foreground">
                      Master advanced moves and counters used by world champion arm wrestlers.
                    </p>
                    <Button variant="outline" className="w-full">
                      Read Guide
                    </Button>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 space-y-4">
                    <div className="relative h-[200px] rounded-md overflow-hidden mb-4">
                      <Image
                        src="https://images.pexels.com/photos/4162577/pexels-photo-4162577.jpeg?auto=compress&cs=tinysrgb&w=800"
                        alt="Pro training system"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <h3 className="text-xl font-bold text-primary">Pro Training System</h3>
                    <p className="text-sm text-muted-foreground">
                      Complete 12-week program with periodization, nutrition, and recovery protocols.
                    </p>
                    <Button variant="outline" className="w-full">
                      Get Pro System
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <section className="py-12 bg-accent text-accent-foreground">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter">Train with the Pros</h2>
              <p className="text-lg">
                Book a personalized training session with our team of professional arm wrestlers and coaches.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>One-on-one coaching sessions</span>
                </li>
                <li className="flex items-center gap-2">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Technique analysis and correction</span>
                </li>
                <li className="flex items-center gap-2">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Customized training programs</span>
                </li>
                <li className="flex items-center gap-2">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Virtual and in-person options available</span>
                </li>
              </ul>
              <Button asChild className="mt-4 bg-primary hover:bg-primary/90">
                <Link href="/contact">Book a Session</Link>
              </Button>
            </div>
            <div className="relative h-[300px] rounded-lg overflow-hidden">
              <Image
                src="https://images.pexels.com/photos/6456160/pexels-photo-6456160.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Professional coaching"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

