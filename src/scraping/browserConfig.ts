
let browserConfig = {
    headless: false,
    ignoreDefaultArgs: ["--disable-extensions"],
    ignoreHTTPSErrors: true,
    args: ["--no-sandbox", "--use-gl=egl", "--start-maximized"]
}

export default browserConfig
