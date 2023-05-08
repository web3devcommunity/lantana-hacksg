import { createClient } from './client';
import { PublicationSortCriteria } from "@lens-protocol/client";
export const queryFeed = async () => {
    const lensClient = await createClient();
    
    const results = await  lensClient.explore.publications({
        sortCriteria: PublicationSortCriteria.TopCommented
    });

    console.log('results', results);

    return results;
}