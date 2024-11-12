"use client";
import { twMerge } from "tailwind-merge";
import { TracingBeam } from "./ui/tracing-beam";

export function TracingBeamDemo() {
  return (
    <TracingBeam className="px-6">
      <div className="max-w-2xl mx-auto antialiased pt-4 relative">
        {dummyContent.map((item, index) => (
          <div key={`content-${index}`} className="mb-10">
            <h2 className="bg-black text-white rounded-full text-sm w-fit px-4 py-1 mb-4">
              {item.badge}
            </h2>

            <p className={twMerge("text-xl font-bold mb-4")}>
              {item.title}
            </p>

            <div className="text-sm prose prose-sm dark:prose-invert">
              {item?.image && (
                <img
                  src={item.image}
                  alt="blog thumbnail"
                  height="1000"
                  width="1000"
                  className="rounded-lg mb-10 object-cover"
                />
              )}
              {item.description}
            </div>
          </div>
        ))}
      </div>
    </TracingBeam>
  );
}

const dummyContent = [
  {
    title: "Planning and Setup Phase",
    description: (
      <>
        <p>
          Defined the core objectives for the Live Quiz Application, focusing on real-time interaction using Socket.IO, efficient database management with MongoDB, and a user-friendly UI to enhance the quiz experience.
        </p>
        <p>
          <strong>Tech Stack Selection:</strong> Carefully chose the MERN stack (MongoDB, Express.js, React, Node.js) along with Socket.IO for real-time capabilities.
        </p>
        <p>
          <strong>Initial Setup:</strong> Established the MERN stack environment and designed the project's foundational structure, integrating both backend and frontend with necessary Socket.IO configurations.
        </p>
      </>
    ),
    badge: "",
    image:
      "https://plus.unsplash.com/premium_photo-1706559780094-648dbe2b2bd0?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Development and Integration",
    description: (
      <>
        <p>
          Backend development with Node.js and Express focused on building robust APIs for managing quiz data, users, and scores. Integrated MongoDB to handle data efficiently.
        </p>
        <p>
          Real-time functionality using Socket.IO allowed seamless communication, enabling features like live quiz sessions, instant score updates, and user interaction.
        </p>
        <p>
          The React-based frontend offered an intuitive quiz interface with features such as live scoreboards, timers, and dynamic question displays.
        </p>
      </>
    ),
    badge: "",
    image:
      "https://images.unsplash.com/photo-1516321165247-4aa89a48be28?q=80&w=3021&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Testing and Launch",
    description: (
      <>
        <p>
          Extensive testing ensured smooth real-time operations, focusing on reducing latency and handling edge cases. Optimized both backend and frontend for a seamless user experience.
        </p>
        <p>
          Deployed the application using modern cloud services, guaranteeing scalability and reliability. Monitored live performance post-launch to refine the experience based on real user feedback.
        </p>
      </>
    ),
    badge: "",
    image:
      "https://www.slido.com/static/slido-live-quizzes-hero.a15bccb1.1600.jpg",
  },
];

