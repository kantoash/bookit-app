import React from "react";
import EmptyState from "../components/inputs/EmptyState";
import ClientOnly from "../ClientOnly";
import getCurrentUser from "../actions/getCurrentUser";
import getFavorites from "../actions/getFavorites";
import FavoritesClient from "./FavoritesClient";

const page = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState title="Unauthorized" subtitle="Please login" />
      </ClientOnly>
    );
  }

  const favorites = await getFavorites();
  if (!favorites) {
    return (
      <ClientOnly>
        <EmptyState
          title="No favorites found"
          subtitle="Looks like you have no favorites things"
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
     <FavoritesClient listings={favorites} currentUser={currentUser} />
    </ClientOnly>
  );
};

export default page;
