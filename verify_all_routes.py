from playwright.sync_api import sync_playwright

def run_verify(page):
    routes = [
        "/", "/rooms", "/dining", "/events", "/signin",
        "/admin", "/admin/front-desk", "/admin/reservations",
        "/admin/housekeeping", "/admin/maintenance", "/staff/tasks"
    ]
    for route in routes:
        url = f"http://localhost:3000{route}"
        print(f"--- Checking {url} ---")
        try:
            page.goto(url)
            page.wait_for_timeout(2000)
            filename = route.replace("/", "_").strip("_") or "home"
            page.screenshot(path=f"/home/jules/verification/screenshots/final_{filename}.png")
            print(f"Successfully verified {route}")
        except Exception as e:
            print(f"Failed to load {route}: {e}")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context()
        page = context.new_page()

        page.on("console", lambda msg: print(f"CONSOLE ERROR: {msg.text}") if msg.type == "error" else None)
        page.on("pageerror", lambda err: print(f"PAGE ERROR: {err}"))

        run_verify(page)
        context.close()
        browser.close()
