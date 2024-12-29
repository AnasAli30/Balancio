
import opensea from '@api/opensea';

export const getNftinfo=async(ca)=>{
        opensea.auth(import.meta.env.VITE_OPENSEA);
        opensea.server('https://api.opensea.io');
        let collec_Data;
        let collection_data;
       let floor_Data;
        await opensea.get_contract({chain: 'base', address: ca})
          .then(({ data }) => collec_Data = data)
          .catch(err => console.error("opensea error:" ,err));
      
       await opensea.get_best_listings_on_collection_v2({limit: '1', collection_slug: collec_Data.collection})
          .then(({ data }) => floor_Data = data)
          .catch(err => console.error(err));

          await opensea.get_collection({collection_slug: collec_Data.collection})
          .then(({ data }) => collection_data = data)
          .catch(err => console.error("opensea error:" ,err));
        
          if(!floor_Data?.listings?.length){
            console.log(floor_Data)
            return false;
          }
          return {floor_Data,collection_data}
}
