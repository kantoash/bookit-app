import React from "react";
import { SafeListing, SafeUser } from "../types";
import Container from "../Container";
import ListingCard from "../components/ListingsCard";

interface FavoritesClientProps {
  listings: SafeListing[];
  currentUser: SafeUser;
}

const FavoritesClient: React.FC<FavoritesClientProps> = ({
  listings,
  currentUser,
}) => {
  return (
    <Container>
      <div
        className="
      pt-24
      grid 
      grid-cols-1 
      sm:grid-cols-2 
      md:grid-cols-3 
      lg:grid-cols-4
      xl:grid-cols-5
      2xl:grid-cols-6
      gap-8
    "
      >
        {listings.map((listing) => (
          <ListingCard
            currentUser={currentUser}
            key={listing.id}
            data={listing}
          />
        ))}
      </div>
    </Container>
  );
};

export default FavoritesClient;
