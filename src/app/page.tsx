import StartMyPage from "@/components/StartMyPage";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signIn } from "next-auth/react";

export default function Home() {
  return (
    <section className="max-w-lg mx-auto text-center mt-16">
      <div className="text-gray-700">
        <p>
          <FontAwesomeIcon icon={faStar} />
          <FontAwesomeIcon icon={faStar} />
          <FontAwesomeIcon icon={faStar} />
          <FontAwesomeIcon icon={faStar} />
          <FontAwesomeIcon icon={faStar} />
        </p>
        <p className="mt-2">Loved by 100,000+ creators</p>
      </div>
      <h1 className="text-6xl font-bold mt-4">
        Find your <br />creative work
      </h1>
      <h2 className="mt-4 mb-8">
        Accept support for your work.<br /> It's easier than you think.
      </h2>
      <StartMyPage />
    </section>
  );
}
