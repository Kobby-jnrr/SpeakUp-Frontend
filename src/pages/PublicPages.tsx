import {
  ArrowRight,
  ShieldCheck,
  FileText,
  MessageCircle,
  LockKeyhole,
  GraduationCap,
  CheckCircle,
  Users,
  Headphones,
} from "lucide-react";

import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import { Button } from "../components/ui/Button";
import { Panel } from "../components/ui/Cards";

export function HomePage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
      {/* NAVBAR */}
      <header
        className="
        sticky
        top-0
        z-50
        border-b
        border-slate-200
        bg-white/90
        backdrop-blur
        "
      >
        <div
          className="
          mx-auto
          flex
          max-w-7xl
          items-center
          justify-between
          px-6
          py-4
        "
        >
          <Link
            to="/"
            className="
            flex
            items-center
            gap-2
            text-xl
            font-bold
            "
          >
            <img
              src="/images/speaks2.png"
              alt="SpeakUp Logo"
              className="
                h-10
                w-10
                object-contain
              "
            />
            SpeakUp
          </Link>

          <nav
            className="
            hidden
            md:flex
            items-center
            gap-7
            text-sm
            font-medium
            text-slate-600
            "
          >
            <a href="#about" className="hover:text-blue-600">
              About
            </a>

            <a href="#features" className="hover:text-blue-600">
              Features
            </a>

            <a href="#how" className="hover:text-blue-600">
              How It Works
            </a>

            <a href="#contact" className="hover:text-blue-600">
              Contact
            </a>
          </nav>

          <Link to="/login">
            <Button>Log In</Button>
          </Link>
        </div>
      </header>
      {/* HERO */}
      <section
        className="
        relative
        overflow-hidden
        "
      >
        <div
          className="
          absolute
          inset-0
          -z-10
          bg-gradient-to-br
          from-white
          via-blue-50
          to-blue-100
          "
        />

        <div
          className="
          mx-auto
          grid
          max-w-7xl
          items-center
          gap-12
          px-6
          py-24
          lg:grid-cols-2
          "
        >
          <Reveal>
            <p
              className="
              text-sm
              font-semibold
              uppercase
              tracking-wide
              text-blue-700
              "
            >
              University Student Safety Platform
            </p>

            <h1
              className="
              mt-4
              text-4xl
              font-bold
              tracking-tight
              sm:text-6xl
              "
            >
              A safer way for students to report, seek support, and be heard.
            </h1>

            <p
              className="
              mt-6
              max-w-xl
              text-lg
              leading-8
              text-slate-600
              "
            >
              Every student deserves a safe and supportive learning environment.
              SpeakUp removes the barriers to reporting by providing a secure
              and confidential platform where students can report concerns, seek
              support, and connect with trusted university personnel.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/register">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Create Account
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>

              <a href="#features">
                <Button
                  variant="secondary"
                  className="
                    border-blue-200
                    text-blue-700
                    hover:bg-blue-50
                    "
                >
                  Explore Platform
                </Button>
              </a>
            </div>
          </Reveal>

          {/* IMAGE + SECURITY CARD */}

          <Reveal delay={0.2}>
            <div className="relative">
              <motion.img
                initial={{
                  opacity: 0,
                  scale: 0.9,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                transition={{
                  duration: 0.8,
                }}
                src="https://images.unsplash.com/photo-1524088484081-4ca7e08e3e19?q=80&w=791&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Students supporting each other"
                className="
                h-[420px]
                w-full
                rounded-3xl
                object-cover
                shadow-xl
                "
              />

              <div
                className="
                absolute
                -bottom-8
                left-6
                right-6
                "
              >
                <Panel className="bg-white shadow-lg">
                  <div className="flex gap-3">
                    <ShieldCheck
                      className="
                      h-10
                      w-10
                      text-blue-600
                      "
                    />

                    <div>
                      <h2 className="font-bold">Confidential Support</h2>

                      <p
                        className="
                      mt-1
                      text-sm
                      text-slate-600
                      "
                      >
                        Your concerns are handled securely by authorized
                        university personnel.
                      </p>
                    </div>
                  </div>
                </Panel>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
      <MotivationBanner
        image="https://images.unsplash.com/photo-1529156069898-49953e39b3ac"
        title="You Are Not Alone"
        text="Whatever challenge you face, SpeakUp provides a safe and confidential place where you can share your concerns and receive support."
      />
      {/* ABOUT */}
      <Reveal>
        <section
          id="about"
          className="
          mx-auto
          max-w-7xl
          px-6
          py-20
          "
        >
          <Panel>
            <h2 className="text-2xl font-bold">
              Empowering Students Through Safe Reporting
            </h2>

            <p
              className="
            mt-4
            text-sm
            leading-7
            text-slate-700
            "
            >
              Many students remain silent because they are unsure where to
              report concerns or fear that their voices will not be heard.
              SpeakUp addresses these challenges by providing a secure reporting
              system that prioritizes confidentiality, accessibility, and trust.
              Every report submitted through SpeakUp is directed to authorized
              personnel who can provide appropriate support, ensuring students
              receive guidance throughout the reporting and resolution process.
            </p>

            <p
              className="
            mt-3
            text-sm
            leading-7
            text-slate-700
            "
            >
              The system promotes confidentiality, accessibility, and effective
              communication between students and support personnel.
            </p>
          </Panel>
        </section>
      </Reveal>
      <MotivationBanner
        reverse
        image="https://images.unsplash.com/photo-1516321318423-f06f85e504b3"
        title="Your Voice Matters"
        text="Speaking up is the first step toward creating a safer and more respectful university environment."
      />
      {/* FEATURES */}
      <section
        id="features"
        className="
        mx-auto
        max-w-7xl
        px-6
        py-10
        "
      >
        <Reveal>
          <h2
            className="
          text-center
          text-2xl
          font-bold
          "
          >
            Platform Features
          </h2>
        </Reveal>

        <div
          className="
        mt-8
        grid
        gap-8
        md:grid-cols-3
        "
        >
          <AnimatedCard>
            <FeatureCard
              icon={<FileText />}
              title="Incident Reporting"
              text="Submit detailed reports about incidents affecting your 
              safety or well-being using an easy-to-follow reporting process. 
              Students can provide important information while choosing whether 
              to reveal their identity or remain anonymous when appropriate"
            />
          </AnimatedCard>

          <AnimatedCard>
            <FeatureCard
              icon={<MessageCircle />}
              title="Support Communication"
              text="Communicate directly with authorized university personnel 
              through a secure messaging system. Students receive updates, 
              respond to requests for additional information, 
              and stay informed throughout the resolution process."
            />
          </AnimatedCard>

          <AnimatedCard>
            <FeatureCard
              icon={<LockKeyhole />}
              title="Privacy & Confidentiality"
              text="Every report is handled with strict confidentiality. 
              SpeakUp protects sensitive student information and ensures that 
              only authorized personnel have access to submitted reports and conversations."
            />
          </AnimatedCard>
        </div>
      </section>{" "}
      <MotivationBanner
        image="https://images.unsplash.com/photo-1521791136064-7986c2920216"
        title="Do Not Be Afraid. We Are Here For You."
        text="Your reports are handled with confidentiality and care by authorized support personnel."
      />
      {/* HOW IT WORKS */}
      <Reveal>
        <section
          id="how"
          className="
          mx-auto
          max-w-7xl
          px-6
          py-20
          "
        >
          <Panel>
            <h2 className="text-2xl font-bold">How SpeakUp Works</h2>

            <div
              className="
            mt-8
            grid
            gap-8
            md:grid-cols-3
            "
            >
              <Step
                number="1"
                title="Create Account"
                text="Register securely and access your personal reporting portal."
              />

              <Step
                number="2"
                title="Submit Report"
                text="Complete a simple reporting form describing your concern. 
                Students can include supporting information and communicate directly 
                with the appropriate university office."
              />

              <Step
                number="3"
                title="Receive Support"
                text="University support personnel review submitted reports, 
                provide assistance, and keep students informed through 
                secure conversations and status updates until the case is resolved"
              />
            </div>
          </Panel>
        </section>
      </Reveal>
      <MotivationBanner
        reverse
        image="https://images.unsplash.com/photo-1542744173-8e7e53415bb0"
        title="Together We Build A Safer Campus"
        text="Every report helps improve student safety and strengthens the university community."
      />
      {/* CEGRAD */}
      <Reveal>
        <section
          className="
          mx-auto
          max-w-7xl
          px-6
          py-10
          "
        >
          <Panel>
            <GraduationCap
              className="
              h-10
              w-10
              text-blue-600
              "
            />

            <h2
              className="
            mt-4
            text-xl
            font-bold
            "
            >
              Supporting a Safer and More Inclusive University Community
            </h2>

            <p
              className="
            mt-3
            text-sm
            leading-7
            text-slate-700
            "
            >
              SpeakUp complements the efforts of the Centre for Gender Research,
              Advocacy and Documentation (CEGRAD) by providing a secure digital
              channel for students to report incidents and access support
              services. The platform promotes respect, equality, accountability,
              and student well-being while encouraging a campus culture where
              every voice matters.
            </p>
          </Panel>
        </section>
      </Reveal>
      <MotivationBanner
        image="https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
        title="Speak Freely. We Listen."
        text="SpeakUp connects students with the right people who can provide guidance, support, and action."
      />
      {/* CTA */}
      <Reveal>
        <section className="px-6 py-20">
          <motion.div
            whileHover={{
              scale: 1.02,
            }}
            className="
        relative
        mx-auto
        max-w-5xl
        overflow-hidden
        rounded-3xl
        p-12
        text-center
        text-white
      "
          >
            {/* Background Image */}
            <img
              src="https://plus.unsplash.com/premium_photo-1663040539957-c46f7f434b6f?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Students supporting each other"
              className="
          absolute
          inset-0
          h-full
          w-full
          object-cover
        "
            />

            {/* Dark Overlay */}
            <div
              className="
          absolute
          inset-0
          bg-[#082642]/80
        "
            />

            {/* Content */}
            <div className="relative z-10">
              <h2
                className="
            text-3xl
            font-bold
          "
              >
                Your voice matters.
              </h2>

              <p
                className="
            mt-4
            text-blue-100
          "
              >
                No concern is too small when it comes to your safety and
                well-being. SpeakUp provides a confidential space where students
                can report incidents, seek guidance, and receive support from
                trusted university personnel. Your voice can help create a safer
                environment for everyone.
              </p>

              <div
                className="
            mt-7
            flex
            flex-wrap
            justify-center
            gap-3
          "
              >
                <Link to="/register">
                  <Button>Get Started</Button>
                </Link>

                <Link to="/login">
                  <Button variant="secondary">Sign In</Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </section>
      </Reveal>
      {/* FOOTER */}
      <footer
        id="contact"
        className="
        border-t
        bg-white
        "
      >
        <div
          className="
          mx-auto
          grid
          max-w-7xl
          gap-10
          px-6
          py-14
          md:grid-cols-4
          "
        >
          <div>
            <div
              className="
    flex
    items-center
    gap-2
    font-bold
    text-lg
  "
            >
              <img
                src="/images/speaks2.png"
                alt="SpeakUp Logo"
                className="
      h-8
      w-8
      object-contain
    "
              />
              SpeakUp
            </div>

            <p
              className="
              mt-4
              text-sm
              leading-6
              text-slate-600
              "
            >
              A university student safety platform designed to promote
              confidential reporting, support, and communication.
            </p>
          </div>

          <div>
            <h3 className="font-bold">Quick Links</h3>

            <div
              className="
              mt-4
              space-y-3
              text-sm
              text-slate-600
              "
            >
              <p>About SpeakUp</p>

              <p>Features</p>

              <p>How It Works</p>

              <p>Privacy</p>
            </div>
          </div>

          <div>
            <h3 className="font-bold">University Support</h3>

            <p
              className="
              mt-4
              text-sm
              leading-7
              text-slate-600
              "
            >
              University of Cape Coast
              <br />
              Centre for Gender Research, Advocacy and Documentation
              <br />
              Student Support Services
            </p>
          </div>

          <div>
            <h3 className="font-bold">Contact</h3>

            <p
              className="
              mt-4
              text-sm
              leading-7
              text-slate-600
              "
            >
              Need assistance?
              <br />
              Access the SpeakUp portal or contact university support.
            </p>
          </div>
        </div>

        <div
          className="
          border-t
          py-5
          text-center
          text-sm
          text-slate-500
          "
        >
          © {new Date().getFullYear()} SpeakUp. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

function Reveal({
  children,

  delay = 0,
}: {
  children: React.ReactNode;

  delay?: number;
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 40,
        scale: 0.98,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      viewport={{
        once: true,
        amount: 0.2,
      }}
      transition={{
        duration: 0.6,
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}

function FeatureCard({
  icon,

  title,

  text,
}: {
  icon: React.ReactNode;

  title: string;

  text: string;
}) {
  return (
    <Panel>
      <div
        className="
      text-blue-600
      "
      >
        {icon}
      </div>

      <h3
        className="
        mt-4
        font-bold
        "
      >
        {title}
      </h3>

      <p
        className="
        mt-2
        text-sm
        text-slate-600
        "
      >
        {text}
      </p>
    </Panel>
  );
}

function AnimatedCard({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 50,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
      }}
      transition={{
        duration: 0.5,
      }}
      whileHover={{
        y: -8,
      }}
    >
      {children}
    </motion.div>
  );
}

function Step({
  number,

  title,

  text,
}: {
  number: string;

  title: string;

  text: string;
}) {
  return (
    <div>
      <div
        className="
        flex
        h-10
        w-10
        items-center
        justify-center
        rounded-full
        bg-blue-600
        text-white
        font-bold
        "
      >
        {number}
      </div>

      <h3
        className="
      mt-4
      font-bold
      "
      >
        {title}
      </h3>

      <p
        className="
      mt-2
      text-sm
      text-slate-600
      "
      >
        {text}
      </p>
    </div>
  );
}

function FeaturePoint({ text }: { text: string }) {
  return (
    <div
      className="
    flex
    items-center
    gap-2
    "
    >
      <CheckCircle
        className="
        h-5
        w-5
        text-green-600
        "
      />

      <span>{text}</span>
    </div>
  );
}

export function NotFoundPage() {
  return (
    <div
      className="
    flex
    min-h-screen
    items-center
    justify-center
    "
    >
      <h1
        className="
      text-3xl
      font-bold
      "
      >
        Page Not Found
      </h1>
    </div>
  );
}

function MotivationBanner({
  image,
  title,
  text,
  reverse = false,
}: {
  image: string;
  title: string;
  text: string;
  reverse?: boolean;
}) {
  return (
    <Reveal>
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div
          className={`
          grid
          items-center
          gap-10
          overflow-hidden
          rounded-3xl
          bg-white
          shadow-lg
          md:grid-cols-2
          ${reverse ? "md:flex-row-reverse" : ""}
          `}
        >
          {/* IMAGE */}

          <motion.img
            initial={{
              opacity: 0,
              scale: 0.85,
              x: reverse ? 80 : -80,
            }}
            whileInView={{
              opacity: 1,
              scale: 1,
              x: 0,
            }}
            viewport={{
              once: true,
              amount: 0.3,
            }}
            transition={{
              duration: 0.8,
            }}
            src={image}
            alt={title}
            className="
            h-[350px]
            w-full
            object-cover
            "
          />

          {/* TEXT */}

          <motion.div
            initial={{
              opacity: 0,
              y: 40,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.7,
              delay: 0.2,
            }}
            className="p-8 md:p-12"
          >
            <img
              src="/images/speaks2.png"
              alt="SpeakUp Logo"
              className="
              h-12
              w-12
              object-contain
            "
            />

            <h2
              className="
              mt-5
              text-3xl
              font-bold
              text-[#082642]
              "
            >
              {title}
            </h2>

            <p
              className="
              mt-4
              leading-7
              text-slate-600
              "
            >
              {text}
            </p>

            <div
              className="
              mt-6
              h-1
              w-20
              rounded-full
              bg-blue-600
              "
            />
          </motion.div>
        </div>
      </section>
    </Reveal>
  );
}
