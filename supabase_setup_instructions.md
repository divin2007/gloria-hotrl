# Gloria Hotel - Database Setup Guide

If you are seeing errors like **"Account partially created"** or getting stuck on the **"Synchronizing Profile"** screen, it means your Supabase project hasn't been configured with the necessary tables and permissions.

### **How to Fix (Required)**

1.  **Go to your Supabase Dashboard:**
    - Navigate to your project.
    - Click on the **SQL Editor** icon in the left sidebar.

2.  **Run the Setup Script:**
    - Click **"New Query"**.
    - Open the file `supabase_setup.sql` from your project folder.
    - Copy all the text from that file and paste it into the Supabase SQL Editor.
    - Click **Run**.
    - You should see a message saying "Success" or "Query returned no rows".

3.  **Confirm the Tables Exist:**
    - Go to the **Table Editor** (grid icon on the left).
    - Ensure you see tables like `profiles`, `rooms`, `reservations`, etc.

4.  **Try Signing Up Again:**
    - Refresh your app.
    - Go to the Signup page and create a new account.
    - It should now redirect you straight to the Guest Dashboard.

---

### **Troubleshooting**

*   **Invalid Login Credentials:** Check that you are using the correct email and password. Also, check your email for a confirmation link (unless you have "Confirm Email" disabled in Supabase settings).
*   **Stuck on Synchronizing:** This means the `profiles` table exists but your specific user profile wasn't created. Click the **"Retry Synchronization"** button in the app. If that fails, make sure you ran the SQL setup script correctly.
*   **Missing Data:** If you don't see rooms or dining options, check that the `rooms` and `dining_venues` tables in your Supabase project have data. You can add data manually in the Table Editor or use the "Admin Portal" in the app (if you have the Admin role).

To give yourself the **Admin role**:
1. Go to the **Table Editor** -> `profiles`.
2. Find your user.
3. Change the `role` from `guest` to `admin`.
4. Refresh the app.
