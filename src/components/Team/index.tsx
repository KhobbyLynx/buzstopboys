import { TeamType } from "@/types/team";
import SectionTitle from "../common/SectionTitle";
import SingleTeam from "./SingleTeam";

const teamData: TeamType[] = [
  {
    id: 1,
    name: "Heneba K. Safo",
    designation: "Executive Director/Founder",
    image: "/image/team/ceo.svg",
    facebookLink: "/#",
    twitterLink: "/#",
    instagramLink: "/#",
  },
  {
    id: 2,
    name: "Samuel Apraku",
    designation: "Human Resources Manager",
    image: "/image/team/member.svg",
    facebookLink: "/#",
    twitterLink: "/#",
    instagramLink: "/#",
  },
  {
    id: 3,
    name: "Kwame Baah",
    designation: "Volunteer Coordinator",
    image: "/image/team/member1.svg",
    facebookLink: "/#",
    twitterLink: "/#",
    instagramLink: "/#",
  },
  {
    id: 4,
    name: "Elle Custers",
    designation: "Advocacy Specialist",
    image: "/image/team/member2.svg",
    facebookLink: "/#",
    twitterLink: "/#",
    instagramLink: "/#",
  },
];

const Team = () => {
  return (
    <section
      id="team"
      className="overflow-hidden pb-12 pt-20 lg:pb-[36px] lg:pt-[120px]"
    >
      <div className="container mx-auto mb-20">
        <div className="mb-[60px]">
          <SectionTitle
            subtitle="Our Team"
            title="Meet the Team"
            paragraph="At BuzStopBoys, our team is a group of passionate individuals committed to transforming communities through cleanliness and care. Each member brings unique skills, dedication, and a shared vision for a healthier, cleaner Ghana."
            width="640px"
            center
          />
        </div>

        <div className="-mx-4 flex flex-wrap justify-center">
          {teamData.map((team, i) => (
            <SingleTeam key={i} team={team} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;