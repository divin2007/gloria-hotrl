from playwright.sync_api import sync_playwright

def run(page):
    routes = [
        ("/dashboard/manager", "Manager Dashboard"),
        ("/dashboard/receptionist", "Receptionist Dashboard"),
        ("/dashboard/staff", "Staff Dashboard"),
        ("/signin", "Standalone Sign In"),
        ("/signup", "Standalone Sign Up"),
        ("/admin/new-booking", "New Booking Form"),
        ("/staff/request", "Staff Request Form"),
        ("/admin/maintenance-log", "Maintenance Log Form")
    ]

    for route, name in routes:
        url = f"http://localhost:3000{route}"
        print(f"Verifying {name} at {url}...")
        page.goto(url)
        page.wait_for_timeout(2000)

        # Take screenshot
        filename = route.replace("/", "_").strip("_")
        page.screenshot(path=f"/home/jules/verification/screenshots/final_v6_{filename}.png")

        # Basic check for title/header
        if page.locator("h1, h2").first.is_visible():
            print(f"  [✓] {name} rendered with heading.")
        else:
            print(f"  [!] {name} might have failed to render heading.")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            run(page)
        finally:
            browser.close()
