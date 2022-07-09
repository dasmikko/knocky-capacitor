self.addEventListener('fetch', async (event) => {
    const url = event.request.url;
    console.log(url)
    console.log(self)
    console.log(await cookieStore.getAll())
    console.log(await event)
})