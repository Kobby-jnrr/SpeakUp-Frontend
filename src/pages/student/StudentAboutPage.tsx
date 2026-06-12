import { Panel } from "../../components/ui/Cards";

export function StudentAboutPage() {
  return (
    <div className="space-y-6">
      <Panel>
        <h1 className="text-2xl font-bold text-slate-950">About Us</h1>
        <p className="mt-2 text-sm text-slate-600">
          Centre for Gender Research, Advocacy and Documentation (CEGRAD),
          University of Cape Coast
        </p>
      </Panel>
      <Panel>
        <div className="space-y-5 text-sm leading-6 text-slate-700">
          <div>
            <h2 className="text-base font-bold text-slate-950">Who We Are</h2>
            <p className="mt-2">
              CEGRAD is the Centre for Gender Research, Advocacy and
              Documentation at the University of Cape Coast (UCC), Ghana. We
              serve as a research, advocacy and documentation focal point on
              Gender and Women's Studies within the university and beyond.
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
              To create a safe, creative and inclusive space where gender and
              women's rights are fully protected.
            </p>
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-950">What We Do</h2>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>
                Conduct gender research and document findings for policy
                influence
              </li>
              <li>
                Ensure gender sensitivity in university-wide policies and
                programmes
              </li>
              <li>
                Support faculties and schools to engender their taught
                programmes
              </li>
              <li>Monitor adherence to gender sensitivity in policymaking</li>
              <li>
                Facilitate the protection of women's rights and promotion of
                gender equity
              </li>
              <li>
                Coordinate relations within and beyond UCC for the promotion of
                gender interests
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-950">Support Services</h2>
            <p className="mt-2">
              Through this platform, students can report incidents
              confidentially, access counseling and emergency contacts, and
              learn about their rights. CEGRAD is committed to ensuring a
              gender-equal and inclusive learning environment for all.
            </p>
          </div>
        </div>
      </Panel>
    </div>
  );
}
