import axios from 'axios'


export function addNewReview(review){
  return () => {
    axios.post('/api/reviews', review)
      .then(res => res.data)
      .catch(console.error)
  }
}
