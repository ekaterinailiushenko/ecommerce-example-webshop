export const flushPromises = () =>
  new Promise(res => {
    setTimeout(res, 0)
  })
