export const removeShow = (id) => {
  console.log('called');
  return {
    type: 'REMOVE_SHOW',
    id
  }
}