import { Title } from "./Title";

export const Description: React.FC = () => {
  return (
    <>
      <section className="relative h-fit pb-20 md:pl-24">
        <Title
          title="Unveiling the Duality of Oppression and Liberation"
          className="md:w-1/2"
        />

        <p className="px-8 md:px-0 md:w-1/2 py-8 md:py-12 text-lg z-10 text-justify">
          <span className="font-bold">Butterfly</span> is a conceptual album
          that explores the duality between oppression and freedom, personal and
          collective transformation, and the quest for redemption and rebirth.
          It would address both personal and universal themes, drawing on the
          metaphor of the butterfly (freedom, beauty, and transformation) and
          the chains (limitations, oppression, and struggles).
        </p>

        <div className="absolute bottom-0 top-0 right-0 -z-10">
          <img
            src="/lamar-red.jpg"
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-background to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent"></div>
        </div>
      </section>
    </>
  );
};
