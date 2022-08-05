function useUser() {
  return {
    name: 'user',
    boards: [
      {
        id: 1,
        name: 'Platform Launch'
      },
      {
        id: 2,
        name: 'Marketing Plan'
      },
      {
        id: 3,
        name: 'Roadmap'
      }
    ]
  }
}

export default useUser
