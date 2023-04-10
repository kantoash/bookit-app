"use client";

import React, { useCallback, useMemo, useState } from "react";
import Container from "../../Container";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { MagnifyingGlassIcon, Bars3Icon } from "@heroicons/react/24/outline";
import MenuItem from "./MenuItem";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import { SafeUser } from "@/app/types";
import Categories from "./Categories";
import useRentModal from "@/app/hooks/useRentModal";
import useSearchModal from "@/app/hooks/useSearchModal";
import { signOut } from "next-auth/react";
import Avatar from "../inputs/Avatar";
import { differenceInCalendarDays, differenceInDays } from "date-fns";
import useCountries from "@/app/hooks/useCountries";

interface UserProps {
  CurrentUser?: SafeUser | null;
}

// userId?: string;
// guestCount?: number;
// roomCount?: number;
// bathroomCount?: number;
// startDate?: string;
// endDate?: string;
// locationValue?: string;
// category?: string;
const Navbar: React.FC<UserProps> = ({ CurrentUser }) => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const RentModal = useRentModal();
  const searchModal = useSearchModal();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);

  const { getByValue } = useCountries();
  const locationValue = searchParams?.get("locationValue");
  const guestCount = searchParams?.get("guestCount");
  const startDate = searchParams?.get("startDate");
  const endDate = searchParams?.get("endDate");

  const locationLabel = useMemo(() => {
    if (locationValue) {
      return getByValue(locationValue as string)?.label;
    }
    return 'Anywhere'
  },[locationValue, getByValue])

  const durationLabel = useMemo(() => {
    if (startDate && endDate) {
      const start = new Date(startDate as string);
      const end = new Date(endDate as string);
      let DaysDifference = differenceInDays(end, start);
      if (DaysDifference === 0) {
        DaysDifference = 1;
      }
      return `${DaysDifference} Days`;
    }
    return 'Any Week'
  }, [startDate, endDate]);

  const guestLabel = useMemo(() => {
    if (guestCount) {
      return `${guestCount} Guests`;
    }

    return 'Add Guests';
  }, [guestCount]);

  const onRent = useCallback(() => {
    if (!CurrentUser) {
      return loginModal.onOpen();
    }
    RentModal.onOpen();
  }, [RentModal]);

  return (
    <div className="fixed w-full  z-20 shadow-md px-4 py-2 bg-white">
      <div className="">
        <Container>
          <div className="flex flex-row items-center justify-between gap-3 ">
            {/* Logo */}
            <div
              onClick={() => router.push("/")}
              className="flex items-center space-x-1 text-xl cursor-pointer"
            >
              <Image
                alt="Logo"
                className="hidden md:block cursor-pointer"
                height="30"
                width="30"
                src="/images/logo.png"
              />{" "}
              <span>Bookit</span>
            </div>

            {/* Search */}
            <div
              onClick={searchModal.onOpen}
              className="border-[1px] border-gray-300 py-1 w-full md:w-auto rounded-full shadow-sm transition cursor-pointer "
            >
              <div className="flex flex-row items-center justify-between">
                <div className="text-sm font-semibold px-5 text-center">
                  {locationLabel}
                </div>
                <div className="text-sm hidden sm:block font-semibold px-5 border-x-[1px] border-gray-300 flex-1 text-center">
                  {durationLabel}
                </div>
                <div className="text-sm font-semibold px-5 pl-6 pr-2 text-gray-600 flex flex-row items-center gap-3">
                  <div className="hidden sm:block">{guestLabel}</div>
                  <div className="p-1 bg-rose-500 rounded-full text-white ">
                    <MagnifyingGlassIcon className="h-4" />
                  </div>
                </div>
              </div>
            </div>

            {/* user Menu */}
            <div className="relative">
              <div className="flex flex-row items-center gap-3">
                <div
                  onClick={onRent}
                  className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-200 transition cursor-pointer"
                >
                  Add your home
                </div>
                <div
                  onClick={() => setIsOpen((val) => !val)}
                  className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-1 rounded-full cursor-pointer hover:shadow-md transition "
                >
                  <Bars3Icon className="h-6" />
                  <div className="hidden md:block border-[1px] rounded-full border-gray-500">
                    <Avatar src={CurrentUser?.image} />
                  </div>
                </div>
              </div>

              {isOpen && (
                <div
                  className="
                absolute
                rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-10 text-sm
            "
                >
                  <div className="flex flex-col cursor-pointer">
                    {!CurrentUser ? (
                      <>
                        <MenuItem onClick={loginModal.onOpen} label="Login" />
                        <MenuItem
                          label="Sign up"
                          onClick={registerModal.onOpen}
                        />
                      </>
                    ) : (
                      <>
                        <MenuItem
                          onClick={() => router.push("/favorites")}
                          label="My favorites"
                        />
                        <MenuItem
                          onClick={() => router.push("/reservations")}
                          label="My reservations"
                        />
                        <MenuItem onClick={onRent} label="Add your home" />
                        <MenuItem
                          onClick={() => router.push("/properties")}
                          label="My properties"
                        />
                        <MenuItem onClick={() => signOut()} label="logout" />
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
          <Categories />
        </Container>
      </div>
    </div>
  );
};

export default Navbar;
