"use client";

import axios from "axios";
import React, { useMemo, useCallback, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Range } from "react-date-range";
import { useRouter } from "next/navigation";
import { differenceInCalendarDays, eachDayOfInterval, setDate } from "date-fns";
import { SafeListing, SafeUser, SafeReservation } from "@/app/types";
import { categories } from "@/app/components/navbar/Categories";
import ListingHead from "./ListingHead";
import ListingInfo from "./ListingInfo";
import Container from "@/app/Container";
import useLoginModal from "@/app/hooks/useLoginModal";
import ListingReservation from "./ListingReservation";

interface ListingClientProps {
  reservations?: SafeReservation[];
  listing: SafeListing & {
    user: SafeUser;
  };
  currentUser?: SafeUser | null;
}

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};

const ListingClient: React.FC<ListingClientProps> = ({
  listing,
  reservations = [],
  currentUser,
}) => {
  const loginModal = useLoginModal();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(listing.price);
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);

  
  const category = useMemo(() => {
    return categories.find((item) => item.label === listing.category);
  }, [listing.category]);

  const disabledDates = useMemo(() => {
    let dates: Date[] = [];

    reservations.forEach((reservation: any) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate),
      });

      dates = [...dates, ...range];
    });

    return dates;
  }, [reservations]);

  const onCreateReservation = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }
    setIsLoading(true);
    axios
      .post("/api/reservations", {
        totalPrice,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        listingId: listing?.id,
      })
      .then(() => {
        toast("Listing reserved!");
        setDateRange(initialDateRange);
        router.refresh();
      })
      .catch((err) => {
        toast.error("Something went wrong");
      });
      setIsLoading(false);
  }, [totalPrice, dateRange, listing?.id, currentUser, loginModal]);

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const dayCount = differenceInCalendarDays(
        dateRange.endDate,
        dateRange.startDate
      );
      if (dayCount && listing.price) {
        const totalPrice = dayCount * listing.price;
        setTotalPrice(totalPrice);
      } else {
        setTotalPrice(listing.price);
      }
    }
  }, [dateRange, listing.price]);

  return (
    <Container>
      <div className="flex flex-col gap-6 pb-20">
        <ListingHead
          title={listing.title}
          imageSrc={listing.imageSrc}
          locationValue={listing.locationValue}
          id={listing.id}
          currentUser={currentUser}
      />
        <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-8">
          <ListingInfo
            user={listing.user}
            category={category}
            description={listing.description}
            locationValue={listing.locationValue}
            roomCount={listing.roomCount}
            guestCount={listing.guestCount}
            bathroomCount={listing.bathroomCount}
          />
          <div
            className="
            order-first,
            mb-10
            md:order-last
            md:col-span-3
          "
          >
            <ListingReservation
              price={listing.price}
              totalPrice={totalPrice}
              onChangeDates={(value) => setDateRange(value)}
              dateRange={dateRange}
              onSubmit={onCreateReservation}
              disabled={isLoading}
              disabledDates={disabledDates}
            />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ListingClient;
