const EventHeader = () => {
  const headerOptions = [
    "Plan Your Perfect Event",
    "Create Memorable Experiences",
    "Craft Your Event Vision",
    "Bring Your Ideas to Life",
    "Design Your Dream Event",
    "Get Started: Event Creation",
    "Build Your Event Blueprint",
    "Customize Your Celebration",
    "Event Crafting Zone",
    "Shaping Your Spectacular Event",
  ];

  const randomHeader =
    headerOptions[Math.floor(Math.random() * headerOptions.length)];

  return (
    <h1 className=" text-white h3-bold text-center no-wrap">
      {" "}
      <i> {randomHeader} </i>{" "}
    </h1>
  );
};

export default EventHeader;
