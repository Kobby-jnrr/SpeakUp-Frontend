import { Panel } from "../../components/ui/Cards";

export function StudentAboutPage() {
  return (
    <div className="space-y-6">
      {/* CEGRAD INTRODUCTION */}
      <Panel>
        <div className="space-y-5 text-sm leading-6 text-slate-700">
          <div>
            <h1 className="text-2xl font-bold text-slate-950">About CEGRAD</h1>

            <p className="mt-3">
              The Centre for Gender Research, Advocacy and Documentation
              (CEGRAD) is a non-teaching Centre established at the University of
              Cape Coast. CEGRAD focuses mainly on Research, Advocacy, and
              Outreach and operates through its core departments that support
              the delivery of the centre's mandate, mission, and vision.
            </p>

            <p className="mt-3">
              CEGRAD began operation on 1st August 2013 and was officially
              opened on 16th September 2015 by Prof. D. D. Kuupole, the Vice
              Chancellor of the University of Cape Coast (2013-2017). The
              establishment of CEGRAD was in response to the University's
              commitment to creating a safe and inclusive environment that
              recognizes equal opportunities for staff and students.
            </p>
          </div>

          <div>
            <h2 className="text-base font-bold text-slate-950">Our Mission</h2>

            <p className="mt-2">
              To engage in theory and practice to position the University of
              Cape Coast as a leader in gender equality and women's rights
              within the academy and beyond.
            </p>
          </div>

          <div>
            <h2 className="text-base font-bold text-slate-950">Our Vision</h2>

            <p className="mt-2">
              To create a safe, creative, and inclusive space where gender and
              women's rights are fully protected.
            </p>
          </div>

          <div>
            <h2 className="text-base font-bold text-slate-950">
              Our Core Values
            </h2>

            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>
                Conduct gender research and document findings for policy
                influence.
              </li>

              <li>
                Ensure gender sensitivity in university-wide policies and
                programmes.
              </li>

              <li>
                Support faculties and schools to integrate gender awareness into
                their programmes.
              </li>

              <li>Monitor adherence to gender sensitivity in policymaking.</li>

              <li>
                Facilitate the protection of rights and promotion of equality.
              </li>

              <li>
                Coordinate relations within and beyond UCC for the promotion of
                gender interests.
              </li>
            </ul>
          </div>
        </div>
      </Panel>

      {/* ABOUT SPEAKUP */}
      <Panel>
        <div className="space-y-5 text-sm leading-6 text-slate-700">
          <div>
            <h1 className="text-2xl font-bold text-slate-950">About SpeakUp</h1>

            <p className="mt-3">
              SpeakUp is a student safety, abuse reporting, and support platform
              developed to provide students with a secure, confidential, and
              accessible way to report incidents, seek support, and access
              important safety information within the university community.
            </p>

            <p className="mt-3">
              The platform allows students to submit reports, communicate with
              authorized university personnel, monitor the progress of cases,
              and access support resources while promoting a safer and more
              inclusive campus environment.
            </p>
          </div>

          <div>
            <h2 className="text-base font-bold text-slate-950">Our Purpose</h2>

            <p className="mt-2">
              SpeakUp was created to address challenges students face when
              reporting sensitive incidents by providing a secure platform that
              encourages reporting, protects confidentiality, and improves
              communication between students and authorized support personnel.
            </p>
          </div>

          <div>
            <h2 className="text-base font-bold text-slate-950">
              Support Services
            </h2>

            <p className="mt-2">
              Through SpeakUp, students can report incidents confidentially,
              access support resources, learn about their rights, receive
              guidance, and communicate with authorized university personnel.
              CEGRAD remains committed to promoting a safe, respectful, and
              inclusive learning environment for all students.
            </p>
          </div>
        </div>
      </Panel>

      {/* DEVELOPMENT TEAM */}
      <Panel>
        <div className="space-y-5 text-sm text-slate-700">
          <div>
            <h2 className="text-base font-bold text-slate-950">
              SpeakUp Development Team
            </h2>

            <p className="mt-2 leading-6">
              SpeakUp was developed as a final year Computer Science project at
              the University of Cape Coast. The project involved system
              analysis, software development, interface design, testing, and
              documentation carried out by a team of Computer Science students
              under academic supervision.
            </p>
          </div>

          {/* SUPERVISOR */}
          <div className="rounded-lg bg-slate-50 border border-slate-200 p-5">
            <p className="font-bold text-slate-950">Academic Supervisor</p>

            <p className="mt-2 font-semibold">
              Dr. (Mrs.) Alimatu - Saadia Yussiff
            </p>

            <p className="text-xs text-slate-500 mt-2 leading-5">
              Senior Lecturer and Head of the Department of Computer Science and
              Information Technology, University of Cape Coast.
              <br />
              <br />
              Provided academic supervision, guidance, and technical direction
              throughout the development of the SpeakUp platform.
            </p>
          </div>

          {/* STUDENT DEVELOPMENT TEAM */}
          <div>
            <h2 className="text-base font-bold text-slate-950 mb-3">
              Development Team Members
            </h2>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-lg bg-slate-50 border border-slate-200 p-5">
                <p className="font-bold text-slate-950">
                  Project Lead & Software Engineer
                </p>

                <p className="mt-2 font-semibold">
                  Antwi-Boasiako Emmanuel Kwabena
                </p>

                <p className="text-xs text-slate-500 mt-2 leading-5">
                  Responsible for system architecture, backend development,
                  database design, API development, authentication, security
                  implementation, frontend-backend integration, and overall
                  project coordination.
                </p>
              </div>

              <div className="rounded-lg bg-slate-50 border border-slate-200 p-5">
                <p className="font-bold text-slate-950">Frontend Developer</p>

                <p className="mt-2 font-semibold">Aseidu Prince</p>

                <p className="text-xs text-slate-500 mt-2 leading-5">
                  Responsible for frontend development, interface
                  implementation, responsive design, and improving user
                  interaction.
                </p>
              </div>

              <div className="rounded-lg bg-slate-50 border border-slate-200 p-5">
                <p className="font-bold text-slate-950">UI/UX Designer</p>

                <p className="mt-2 font-semibold">Balasu Elipklim Athaliah</p>

                <p className="text-xs text-slate-500 mt-2 leading-5">
                  Responsible for user interface design, usability improvements,
                  user flows, and visual consistency across the platform.
                </p>
              </div>

              <div className="rounded-lg bg-slate-50 border border-slate-200 p-5">
                <p className="font-bold text-slate-950">
                  Research & Documentation
                </p>

                <p className="mt-2 font-semibold">Dankwah Anyan Princess</p>

                <p className="text-xs text-slate-500 mt-2 leading-5">
                  Responsible for research activities, requirements gathering,
                  documentation, and project report preparation.
                </p>
              </div>

              <div className="rounded-lg bg-slate-50 border border-slate-200 p-5">
                <p className="font-bold text-slate-950">
                  Testing & Quality Assurance
                </p>

                <p className="mt-2 font-semibold">Zakari Muktar Junior</p>

                <p className="text-xs text-slate-500 mt-2 leading-5">
                  Responsible for system testing, feature validation,
                  identifying issues, and supporting quality improvements.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Panel>

      {/* SYSTEM INFORMATION */}
      <Panel>
        <div className="text-sm text-slate-700 space-y-2">
          <h2 className="text-base font-bold text-slate-950">
            System Information
          </h2>

          <p>
            <span className="font-semibold">Platform:</span> SpeakUp Student
            Reporting System
          </p>

          <p>
            <span className="font-semibold">Version:</span> 1.0.0
          </p>

          <p>
            <span className="font-semibold">Institution:</span> University of
            Cape Coast
          </p>

          <p>
            <span className="font-semibold">Academic Year:</span> 2025/2026
          </p>
        </div>
      </Panel>
    </div>
  );
}
