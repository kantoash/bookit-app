"use client";

import React, { useMemo, useState } from "react";
import Modal from "./Modal";
import useRentModal from "@/app/hooks/useRentModal";
import { categories } from "../navbar/Categories";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import CountrySelect from "../inputs/CountrySelect";
import dynamic from "next/dynamic";
import Counter from "../inputs/Counter";
import CategoryInput from "../inputs/CategoryInput";
import ImageUpload from "../inputs/ImageUpload";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Input from "../inputs/Input";

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

const RentModal = () => {
  const RentModal = useRentModal();
  const router = useRouter();
  const [isloading, setIsLoading] = useState(false);
  const [step, setStep] = useState(STEPS.CATEGORY);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      category: "",
      location: null,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: "",
      price: "1",
      title: "",
      description: "",
    },
  });

  if (isloading) {
    toast("Loading...");
  }

  const category = watch("category");
  const location = watch("location");
  const guestCount = watch("guestCount");
  const roomCount = watch("roomCount");
  const bathroomCount = watch("bathroomCount");
  const imageSrc = watch("imageSrc");
  
   const Map = useMemo(
    () =>
      dynamic(() => import("../inputs/Map"), {
        ssr: false,
      }),
    [location]
  );

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const onBack = () => {
    setStep((val) => val - 1);
  };
  const onNext = () => {
    setStep((val) => val + 1);
  };

  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) {
      return "Create";
    }
    return "Next";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) {
      return undefined;
    }
    return "Back";
  }, [step]);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (step !== STEPS.PRICE) {
      return onNext();
    }
    setIsLoading(true);

    axios
      .post("/api/listings", data)
      .then(() => {
        toast.success("Listing Created!");
        router.refresh();
        reset();
        setStep(STEPS.CATEGORY);
        RentModal.onClose();
      })
      .catch(() => {
        toast.error("something is wrong!");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  let bodyContent = (
    <div className="flex flex-col gap-4">
      <header className="text-lg">Which of these describes your places?</header>
      <p>Pick a category</p>
      <main className="flex flex-wrap gap-2">
        {categories.map((item, index) => (
          <CategoryInput
            icon={item.icon}
            label={item.label}
            selected={category === item.label}
            setValue={(value) => setCustomValue("category", value)}
            key={index}
          />
        ))}
      </main>
    </div>
  );

  if (step === STEPS.LOCATION) {
    bodyContent = (
      <div className="flex flex-col gap-4">
        <header className="text-lg">Where is your place located?</header>
        <p>Help guests find you!</p>
        <main className="space-y-4">
          <CountrySelect
            value={location}
            onChange={(value) => setCustomValue("location", value)}
          />
          <Map center={location?.latlng} />
        </main>
      </div>
    );
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-4">
        <header className="text-lg">Share some basics about your place?</header>
        <p>What amenities do you have!</p>
        <main className=" flex flex-col mt-8 gap-y-10">
          <Counter
            title="Guests"
            subtitle="How many guests do you allow!"
            value={guestCount}
            onChange={(value) => setCustomValue("guestCount", value)}
          />
          <Counter
            title="Rooms"
            subtitle="How many Rooms do you have!"
            value={roomCount}
            onChange={(value) => setCustomValue("roomCount", value)}
          />
          <Counter
            title="bathroom Count"
            subtitle="How many bathroom do you have!"
            value={bathroomCount}
            onChange={(value) => setCustomValue("bathroomCount", value)}
          />
        </main>
      </div>
    );
  }

  if (step === STEPS.IMAGES) {
    bodyContent = (
      <div className="flex flex-col gap-4">
        <header className="text-lg">Add a photo of your place</header>
        <p>what your place look like!</p>
        <ImageUpload
          value={imageSrc}
          onChange={(value) => setCustomValue("imageSrc", value)}
        />
      </div>
    );
  }

  if (step === STEPS.DESCRIPTION) {
    bodyContent = (
      <div className="flex flex-col gap-4">
        <header className="text-lg">How would you describe your place?</header>
        <p>Short is best!</p>
        <div className="space-y-2">
          <Input
            id="title"
            type="text"
            label="title"
            errors={errors}
            register={register}
            disabled={isloading}
            required
          />
          <Input
            id="description"
            type="text"
            label="Description"
            disabled={isloading}
            register={register}
            errors={errors}
            required
          />
        </div>
      </div>
    );
  }

  if (step === STEPS.PRICE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <header className="text-lg">Now, set your price?</header>
        <p>How much do you charge per night!</p>
        <Input
        id="price"
        type="text"
        label="Price"
        disabled={isloading}
        register={register}
        errors={errors}
        required
        />
      </div>
    );
  }
  return (
    <Modal
      isOpen={RentModal.isOpen}
      onClose={RentModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      title="Add your home"
      body={bodyContent}
    />
  );
};

export default RentModal;
