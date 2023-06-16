import sanityClient, {createClient} from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';


export const client = sanityClient({
    projectId: import.meta.env.VITE_REACT_APP_SANITY_PROJECT_ID,
    dataset: 'production',
    apiVersion: '2023-05-03',
    useCdn: true,
    token: import.meta.env.VITE_REACT_APP_SANITY_TOKEN,
});

const builder = imageUrlBuilder(client);

// export const urlFor = (source : string) => builder.image(source);
export const urlFor = (source: any): string => builder.image(source).toString();
