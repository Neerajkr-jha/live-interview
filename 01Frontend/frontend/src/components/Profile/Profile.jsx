import React from "react";

function Profile() {
  const profile = {
    personal: {
      name: "jhon doe",
      age: 24,
      gender: "Male",
      dob: "1999-08-14",
      email: "jhondoe@example.com",
      phone: "+91 9876543210",
      address: "Bengaluru, Karnataka, India",
    },
    education: [
      {
        level: "Postgraduate (M.Tech in Computer Science)",
        college: "Indian Institute of Technology, Delhi",
        year: "2023",
        grade: "8.7 CGPA",
      },
      {
        level: "Undergraduate (B.Tech in Information Technology)",
        college: "Delhi Technological University",
        year: "2021",
        grade: "8.2 CGPA",
      },
      {
        level: "Higher Secondary (Class XII)",
        school: "DAV Public School, Patna",
        year: "2017",
        grade: "92%",
      },
      {
        level: "Secondary (Class X)",
        school: "DAV Public School, Patna",
        year: "2015",
        grade: "9.6 CGPA",
      },
    ],
    professional: {
      currentRole: "Software Engineer",
      company: "Infosys",
      experience: "2 Years",
      skills: ["React", "Node.js", "MongoDB", "Python", "AI/ML", "Cloud"],
      certifications: [
        "AWS Certified Solutions Architect",
        "Google Cloud Associate Engineer",
        "Scrum Master Certified",
      ],
    },
  };

  return (
    <div className="ml-20 min-h-screen bg-gray-50 p-8 mt-15">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        {/* Personal Details */}
        <h1 className="text-3xl font-bold text-purple-700 mb-6">Profile</h1>
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Personal Details
          </h2>
          <div className="grid grid-cols-2 gap-6 text-gray-800">
            <p><span className="font-semibold">Name:</span> {profile.personal.name}</p>
            <p><span className="font-semibold">Age:</span> {profile.personal.age}</p>
            <p><span className="font-semibold">Gender:</span> {profile.personal.gender}</p>
            <p><span className="font-semibold">Date of Birth:</span> {profile.personal.dob}</p>
            <p><span className="font-semibold">Email:</span> {profile.personal.email}</p>
            <p><span className="font-semibold">Phone:</span> {profile.personal.phone}</p>
            <p className="col-span-2"><span className="font-semibold">Address:</span> {profile.personal.address}</p>
          </div>
        </section>

        {/* Education */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Education
          </h2>
          <div className="space-y-4">
            {profile.education.map((edu, idx) => (
              <div key={idx} className="p-4 border rounded-lg bg-gray-50">
                <p className="font-semibold">{edu.level}</p>
                <p>{edu.college || edu.school}</p>
                <p><span className="font-semibold">Year:</span> {edu.year}</p>
                <p><span className="font-semibold">Grade:</span> {edu.grade}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Professional Details */}
        <section>
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Professional Details
          </h2>
          <div className="space-y-4 text-gray-800">
            <p><span className="font-semibold">Current Role:</span> {profile.professional.currentRole}</p>
            <p><span className="font-semibold">Company:</span> {profile.professional.company}</p>
            <p><span className="font-semibold">Experience:</span> {profile.professional.experience}</p>

            {/* Skills Box */}
            <div className="p-4 border rounded-lg bg-gray-50">
              <h3 className="font-semibold text-gray-700 mb-2">Key Skills</h3>
              <ul className="list-disc ml-6">
                {profile.professional.skills.map((skill, idx) => (
                  <li key={idx}>{skill}</li>
                ))}
              </ul>
            </div>

            {/* Certifications Box */}
            <div className="p-4 border rounded-lg bg-gray-50">
              <h3 className="font-semibold text-gray-700 mb-2">Achievements & Certifications</h3>
              <ul className="list-disc ml-6">
                {profile.professional.certifications.map((cert, idx) => (
                  <li key={idx}>{cert}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Profile;