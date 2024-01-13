import EventForm from "@/components/shared/EventForm";
import EventHeader from "@/components/shared/EventHeader";
import React from "react";

const CreateEvent = () => {
  return (
    <>
      <section className=" w-full wrapper py-6 md:py-10 bg-eventBanner-img bg-center bg-no-repeat">
        {/* <h3 className='wrapper text-white h3-bold text-center'> */}

        <EventHeader />

        {/* </h3> */}
      </section>

      <section className="wrapper my-8 ">
        <EventForm />
      </section>
    </>
  );
};

export default CreateEvent;
