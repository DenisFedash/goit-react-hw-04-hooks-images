import { Load } from './Loader.styled';

export function Loader() {
  return <Load>Loading...</Load>;
}

// useEffect(() => {
//     if (query !== '') {
//       setIsLoading(prevIsLoading => !prevIsLoading);
//       fetchImages(query, page)
//         .then(({ hits, totalHits }) => {
//           const imagesArray = hits.map(hit => ({
//             id: hit.id,
//             description: hit.tags,
//             smallImage: hit.webformatURL,
//             largeImage: hit.largeImageURL,
//           }));
//           setTotalImages(totalHits);
//           return imagesArray;
//         })
//         .then(imagesArray => {
//           if (page === 1) {
//             setImages(imagesArray);
//           }
//           return imagesArray;
//         })
//         .then(imagesArray => {
//           if (page !== 1) {
//             setImages(prevImages => [...prevImages, ...imagesArray]);
//           }
//         })
//         .catch(error => setError(error))
//         .finally(() => setIsLoading(prevIsLoading => !prevIsLoading));
//     }
//   }, [page, query]);
